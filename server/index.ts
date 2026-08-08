import dotenv from "dotenv";
import { createApp } from "./app";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = createApp();

app.listen(PORT, () => {
  console.log(`AIROTIX Chat Server running on http://localhost:${PORT}`);
});