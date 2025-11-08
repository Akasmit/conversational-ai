import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
// import { createDataStreamResponse } from 'ai';

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  console.warn('[server] GROQ_API_KEY is missing. Create a .env file with GROQ_API_KEY=...');
}
const groq = createGroq({ apiKey: apiKey ?? '' });

// Helper function to convert UI messages to model messages
function convertToModelMessages(uiMessages: any[]) {
  return uiMessages.map((msg) => {
    let textContent = '';
    
    // Check for 'parts' array (Assistant UI format)
    if (Array.isArray(msg.parts)) {
      textContent = msg.parts
        .filter((part: any) => part.type === 'text')
        .map((part: any) => part.text)
        .join('');
    }
    // Check for 'content' array
    else if (Array.isArray(msg.content)) {
      textContent = msg.content
        .filter((part: any) => part.type === 'text')
        .map((part: any) => part.text)
        .join('');
    }
    // Check for string content
    else if (typeof msg.content === 'string') {
      textContent = msg.content;
    }
    
    return {
      role: msg.role,
      content: textContent,
    };
  });
}

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post('/api/chat', async (req, res) => {
  console.log('[server] ========================================');
  console.log('[server] Received chat request');
  
  try {
    if (!apiKey) {
      console.error('[server] Missing API key');
      res.status(500).json({ error: 'Missing GROQ_API_KEY on server' });
      return;
    }

    const { messages = [] } = req.body ?? {};
    
    console.log('[server] Number of messages:', messages.length);

    if (!messages.length) {
      console.warn('[server] No messages in request');
      res.status(400).json({ error: 'No messages provided' });
      return;
    }

    // Convert UI messages to model messages
    const modelMessages = convertToModelMessages(messages);
    console.log('[server] Converted message:', modelMessages[modelMessages.length - 1]);

    console.log('[server] Calling Groq API...');
    
    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      messages: modelMessages,
    });

    console.log('[server] Creating stream response...');
    
    // Use the textStream directly and format it properly
    const encoder = new TextEncoder();
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let chunkCount = 0;
    
    // Stream the text directly
    for await (const textChunk of result.textStream) {
      chunkCount++;
      // Send in the AI SDK data stream format: 0:"chunk"\n
      const formatted = `0:${JSON.stringify(textChunk)}\n`;
      res.write(formatted);
      
      if (chunkCount <= 3) {
        console.log(`[server] Sent: ${formatted.trim()}`);
      }
    }
    
    console.log(`[server] Complete. Total chunks: ${chunkCount}`);
    res.end();
    
  } catch (err: any) {
    console.error('[server] ERROR:', err?.message);
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Failed to stream response',
        details: err?.message || 'Unknown error'
      });
    } else {
      res.end();
    }
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
app.listen(PORT, () => {
  console.log(`✅ Groq API running at http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for: http://localhost:5173, http://localhost:5174`);
  console.log(`🔑 API Key configured: ${apiKey ? 'YES' : 'NO'}`);
});