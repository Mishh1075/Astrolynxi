import express from 'express';
import { askAstroLynx } from '../rag-pipeline/chatHandler.js';

const router = express.Router();

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }
    const response = await askAstroLynx(message, history || []);
    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router; 