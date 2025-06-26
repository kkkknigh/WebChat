import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

import { API_URL, API_KEY } from './src/llm/llmConfig.js';

app.post('/api/llm', async (req, res) => {
  try {
    const { model, messages } = req.body;
    const response = await axios.post(
      API_URL,
      { model, messages },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});