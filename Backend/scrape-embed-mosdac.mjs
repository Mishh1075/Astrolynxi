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
// Import the new crawler function
import { crawlWebsiteForUrls } from './scripts/crawl-site.js';

(async () => {
  try {
    console.log('📡 Starting comprehensive website crawl for mosdac.gov.in...');
    const baseUrl = 'https://mosdac.gov.in/';
    const maxCrawlDepth = 2; // You can adjust this depth
    const { htmlUrls, pdfUrls, docxUrls, xlsxUrls } = await crawlWebsiteForUrls(baseUrl, maxCrawlDepth);

    console.log('🧭 Crawl complete:');
    console.log(`🔗 HTML URLs found: ${htmlUrls.length}`);
    console.log(`📄 PDF URLs found: ${pdfUrls.length}`);
    console.log(`📝 DOCX URLs found: ${docxUrls.length}`);
    console.log(`📊 XLSX URLs found: ${xlsxUrls.length}`);
    console.log(`Total unique URLs found: ${htmlUrls.length + pdfUrls.length + docxUrls.length + xlsxUrls.length}`);

    console.log('🧪 Loading and embedding documents...');
    const res = await embedDocuments({ htmlUrls, pdfUrls, docxUrls, xlsxUrls });

    console.log('✅ Embed complete:', res);
  } catch (err) {
    console.error('🔥 Error during scrape+embed:', err);
  }
})(); 