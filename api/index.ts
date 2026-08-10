import type { VercelRequest, VercelResponse } from "@vercel/node";

// Vercel serverless health check at /api
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.json({ status: "ok", message: "AIROTIX API is running" });
}