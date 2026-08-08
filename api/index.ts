import { createApp } from "../server/app";

// Create the Express app once (reused across serverless invocations)
const app = createApp();

// Vercel serverless handler — Express app exported as default
export default app;