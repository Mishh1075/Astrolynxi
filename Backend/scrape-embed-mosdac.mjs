// ⬇️ This must be the FIRST thing in your file
import fetch from 'node-fetch';
globalThis.fetch = fetch;

// ⬇️ Then .env setup
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

// ⬇️ Now test if your env vars actually loaded
console.log("✅ Loaded ENV vars:", {
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
  PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
});

// ⬇️ Only after that, import any other stuff like Pinecone
import { embedDocuments } from './rag-pipeline/embedDocuments.js';
import { fetchMosdacUrlsFromSitemap } from './scripts/parse-sitemap.js';

(async () => {
  try {
    console.log('📡 Reading from MOSDAC sitemap...');
    const { htmlUrls, pdfUrls, docxUrls, xlsxUrls } = await fetchMosdacUrlsFromSitemap();

    console.log('🧪 Loading and embedding documents...');
    const res = await embedDocuments({ htmlUrls, pdfUrls, docxUrls, xlsxUrls });

    console.log('✅ Embed complete:', res);
  } catch (err) {
    console.error('🔥 Error during scrape+embed:', err);
  }
})(); 