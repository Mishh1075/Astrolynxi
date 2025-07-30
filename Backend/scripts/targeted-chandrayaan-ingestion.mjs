// Targeted Chandrayaan-3 Data Ingestion
// This script focuses specifically on Chandrayaan-3 content

import fetch from 'node-fetch';
globalThis.fetch = fetch;

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

import { embedDocuments } from '../rag-pipeline/embedDocuments.js';
import { RAG_CONFIG } from '../config/rag-config.js';

// Specific Chandrayaan-3 and related URLs
const CHANDRAYAAN_SOURCES = {
  htmlUrls: [
    'https://www.isro.gov.in/chandrayaan-3',
    'https://www.isro.gov.in/chandrayaan-3-mission',
    'https://www.isro.gov.in/chandrayaan-3-landing',
    'https://www.isro.gov.in/chandrayaan-3-updates',
    'https://www.isro.gov.in/chandrayaan-3-science',
    'https://www.isro.gov.in/chandrayaan-3-payloads',
    'https://www.isro.gov.in/chandrayaan-3-lander',
    'https://www.isro.gov.in/chandrayaan-3-rover',
    'https://www.isro.gov.in/chandrayaan-3-orbiter',
    'https://www.isro.gov.in/chandrayaan-3-launch',
    'https://www.isro.gov.in/chandrayaan-3-timeline',
    'https://www.isro.gov.in/chandrayaan-3-objectives',
    'https://www.isro.gov.in/chandrayaan-3-technology',
    'https://www.isro.gov.in/chandrayaan-3-results',
    'https://www.isro.gov.in/chandrayaan-3-discoveries',
    'https://www.isro.gov.in/chandrayaan-3-data',
    'https://www.isro.gov.in/chandrayaan-3-images',
    'https://www.isro.gov.in/chandrayaan-3-videos',
    'https://www.isro.gov.in/chandrayaan-3-publications',
    'https://www.isro.gov.in/chandrayaan-3-team',
    // Also include general lunar mission pages
    'https://www.isro.gov.in/lunar-missions',
    'https://www.isro.gov.in/moon-mission',
    'https://www.isro.gov.in/space-science',
    'https://www.isro.gov.in/planetary-science',
  ],
  pdfUrls: [],
  docxUrls: [],
  xlsxUrls: []
};

console.log('🌙 Starting targeted Chandrayaan-3 data ingestion...');
console.log('📊 Current RAG Configuration:');
console.log('  - Chunk Size:', RAG_CONFIG.chunking.chunkSize, 'characters');
console.log('  - Retrieval k:', RAG_CONFIG.retrieval.k, 'chunks');
console.log('  - Score Threshold:', RAG_CONFIG.retrieval.scoreThreshold);

(async () => {
  try {
    console.log('📡 Adding comprehensive Chandrayaan-3 data...');
    console.log(`🔗 HTML URLs: ${CHANDRAYAAN_SOURCES.htmlUrls.length}`);
    
    const res = await embedDocuments(CHANDRAYAAN_SOURCES);
    console.log('✅ Chandrayaan-3 data ingestion complete:', res);

    console.log('🎯 Your AI should now provide precise Chandrayaan-3 answers!');
    console.log('💡 Test with these questions:');
    console.log('  - "What is Chandrayaan-3?"');
    console.log('  - "What are the objectives of Chandrayaan-3?"');
    console.log('  - "What instruments are on Chandrayaan-3?"');
    console.log('  - "When did Chandrayaan-3 land on the moon?"');
    console.log('  - "What did Chandrayaan-3 discover?"');

  } catch (err) {
    console.error('🔥 Error during Chandrayaan-3 data ingestion:', err);
  }
})(); 