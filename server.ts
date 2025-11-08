import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

const app = express();
app.use(cors());
app.use(express.json());

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY! });

app.post('/api/chat', async (req, res) => {
  const { messages = [] } = req.body ?? {};

  const result = await streamText({
    model: groq('llama-3.1-8b-instant'),
    messages,
  });

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  // Stream the response
  for await (const chunk of result.textStream) {
    res.write(chunk);
  }
  
  res.end();
});

app.listen(8787, () => console.log('✅ Groq API running at http://localhost:8787'));
