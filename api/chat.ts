import type { VercelRequest, VercelResponse } from "@vercel/node";
import getAiResponse from "./utils/getAiResponse";
import catchError from "./utils/catchError";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://chatie-talk.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

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
}