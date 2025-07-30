// Script to re-embed documents with optimized settings for precise answers
import fetch from 'node-fetch';
globalThis.fetch = fetch;

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

import { embedDocuments } from '../rag-pipeline/embedDocuments.js';
import { crawlWebsiteForUrls } from './crawl-site.js';
import { RAG_CONFIG } from '../config/rag-config.js';

console.log('🚀 Starting re-embedding with optimized settings for precise answers...');
console.log('📊 Current RAG Configuration:');
console.log('  - Chunk Size:', RAG_CONFIG.chunking.chunkSize, 'characters');
console.log('  - Chunk Overlap:', RAG_CONFIG.chunking.chunkOverlap, 'characters');
console.log('  - Retrieval k:', RAG_CONFIG.retrieval.k, 'chunks');
console.log('  - Score Threshold:', RAG_CONFIG.retrieval.scoreThreshold);
console.log('  - Temperature:', RAG_CONFIG.llm.temperature);

(async () => {
  try {
    console.log('📡 Crawling MOSDAC website for fresh content...');
    const baseUrl = 'https://mosdac.gov.in/';
    const maxCrawlDepth = 2;
    const { htmlUrls, pdfUrls, docxUrls, xlsxUrls } = await crawlWebsiteForUrls(baseUrl, maxCrawlDepth);

    console.log('🧭 Crawl results:');
    console.log(`  🔗 HTML URLs: ${htmlUrls.length}`);
    console.log(`  📄 PDF URLs: ${pdfUrls.length}`);
    console.log(`  📝 DOCX URLs: ${docxUrls.length}`);
    console.log(`  📊 XLSX URLs: ${xlsxUrls.length}`);

    if (htmlUrls.length + pdfUrls.length + docxUrls.length + xlsxUrls.length === 0) {
      console.log('⚠️ No documents found. Using sample URLs for testing...');
      const sampleUrls = {
        htmlUrls: ['https://mosdac.gov.in/'],
        pdfUrls: [],
        docxUrls: [],
        xlsxUrls: []
      };
      
      console.log('🧪 Embedding with sample data...');
      const res = await embedDocuments(sampleUrls);
      console.log('✅ Sample embedding complete:', res);
    } else {
      console.log('🧪 Embedding documents with optimized settings...');
      const res = await embedDocuments({ htmlUrls, pdfUrls, docxUrls, xlsxUrls });
      console.log('✅ Embedding complete:', res);
    }

    console.log('🎯 Optimization complete! Your AI should now provide more precise answers.');
    console.log('💡 Tips for testing:');
    console.log('  - Ask specific questions about ISRO missions');
    console.log('  - Request technical details about satellite data');
    console.log('  - Ask for specific weather information');
    console.log('  - The AI will now cite exact sources and provide more detailed responses');

  } catch (err) {
    console.error('🔥 Error during re-embedding:', err);
  }
})(); 