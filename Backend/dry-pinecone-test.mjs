import fetch from 'node-fetch';
globalThis.fetch = fetch;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pinecone } from '@pinecone-database/pinecone';

// Pathing to the .env file in the root folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// ✅ THE FIX: Initialize the client without the 'environment' property
const client = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  // environment: process.env.PINECONE_ENVIRONMENT, // No longer needed
});

(async () => {
  console.log('--- Verifying Environment Variables ---');
  console.log('API Key Loaded:', !!process.env.PINECONE_API_KEY);
  console.log('PINECONE_ENVIRONMENT Loaded (for reference, but not used in client config):', process.env.PINECONE_ENVIRONMENT);
  console.log('------------------------------------');

  try {
    console.log("🟡 Attempting to connect to Pinecone...");
    // The index name is still needed for 'client.index()'
    const index = client.index(process.env.PINECONE_INDEX_NAME);
    const stats = await index.describeIndexStats();
    console.log("✅ Connection successful! Index stats:", stats);
  } catch (err) {
    console.error("❌ Pinecone connection failed:", err);
  }
})();