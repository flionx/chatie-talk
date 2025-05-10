import { VercelResponse } from "@vercel/node";
import { Response } from "express"

const catchError = (res: Response | VercelResponse, error: unknown, status = 500) => {
    res.status(status).json({error: error instanceof Error ? error.message : String(error)});
}   

export default catchError