import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY! });

app.post('/api/chat', async (req, res) => {
  // messages: [{ role: 'user'|'assistant'|'system', content: string }]
  const { messages } = req.body ?? { messages: [] };

  const result = await streamText({
    model: openai('gpt-4o-mini'),        // pick any model/provider you like
    messages,                             // pass the transcript
  });

  // streamText returns a Web Standard ReadableStream
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  const reader = result.toAIStream().getReader();
  const encoder = new TextEncoder();

  res.writeHead(200);
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) res.write(encoder.encode(value));
  }
  res.end();
});

const PORT = 8787;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
