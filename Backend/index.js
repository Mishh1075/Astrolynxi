import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

// Routes
import chatRouter from './routes/chat.js';
app.use('/api/chat', chatRouter);

app.get('/', (req, res) => {
  res.send('AstroLynx backend is running.');
});

app.listen(PORT, () => {
  console.log(`AstroLynx backend listening on port ${PORT}`);
}); 