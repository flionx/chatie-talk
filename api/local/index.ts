import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import getAiResponse from '../utils/getAiResponse';
import catchError from '../utils/catchError';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app: Application = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const AI_TOKEN = process.env.AI_TOKEN;

    if (!AI_TOKEN) {
      catchError(res, "API Token is missing", 500);
      return;
    } 

    const {message} = req.body;

    if (!message) {
      catchError(res, "Missing message", 400);
      return;
    }

    const aiResponse = await getAiResponse(message, AI_TOKEN)
    res.status(200).json(aiResponse);
  } catch (error) {
    catchError(res, error)
  }
});

const PORT = process.env.PORT || 3001 ;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});