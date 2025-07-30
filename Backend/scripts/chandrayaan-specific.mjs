// Chandrayaan-3 Specific Data Ingestion
// This script focuses on adding more Chandrayaan-3 specific content

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

// URLs that might contain Chandrayaan-3 content
const CHANDRAYAAN_SOURCES = {
  htmlUrls: [
    // Try different URL patterns that might work
    'https://www.isro.gov.in/',
    'https://www.isro.gov.in/updates',
    'https://www.isro.gov.in/news',
    'https://www.isro.gov.in/press-release',
    'https://www.isro.gov.in/media',
    'https://www.isro.gov.in/gallery',
    'https://www.isro.gov.in/publications',
    'https://www.isro.gov.in/achievements',
    'https://www.isro.gov.in/history',
    'https://www.isro.gov.in/timeline',
    'https://www.isro.gov.in/milestones',
    'https://www.isro.gov.in/success-stories',
    'https://www.isro.gov.in/space-programmes',
    'https://www.isro.gov.in/space-activities',
    'https://www.isro.gov.in/space-exploration',
    'https://www.isro.gov.in/lunar-programme',
    'https://www.isro.gov.in/mars-programme',
    'https://www.isro.gov.in/solar-system',
    'https://www.isro.gov.in/planetary-missions',
    'https://www.isro.gov.in/interplanetary-missions',
    // Also try some working MOSDAC pages
    'https://mosdac.gov.in/',
    'https://mosdac.gov.in/satellite-data',
    'https://mosdac.gov.in/earth-observation',
    'https://mosdac.gov.in/weather-satellites',
    'https://mosdac.gov.in/ocean-satellites',
  ],
  pdfUrls: [],
  docxUrls: [],
  xlsxUrls: []
};

console.log('🌙 Starting Chandrayaan-3 specific data ingestion...');
console.log('📊 Current RAG Configuration:');
console.log('  - Chunk Size:', RAG_CONFIG.chunking.chunkSize, 'characters');
console.log('  - Retrieval k:', RAG_CONFIG.retrieval.k, 'chunks');
console.log('  - Score Threshold:', RAG_CONFIG.retrieval.scoreThreshold);

(async () => {
  try {
    console.log('📡 Adding Chandrayaan-3 specific data...');
    console.log(`🔗 HTML URLs: ${CHANDRAYAAN_SOURCES.htmlUrls.length}`);
    
    const res = await embedDocuments(CHANDRAYAAN_SOURCES);
    console.log('✅ Chandrayaan-3 specific data ingestion complete:', res);

    console.log('🎯 Your AI should now provide better Chandrayaan-3 answers!');
    console.log('💡 Test with these questions:');
    console.log('  - "What is Chandrayaan-3?"');
    console.log('  - "What are the objectives of Chandrayaan-3?"');
    console.log('  - "When did Chandrayaan-3 land on the moon?"');
    console.log('  - "What did Chandrayaan-3 discover?"');

  } catch (err) {
    console.error('🔥 Error during Chandrayaan-3 specific data ingestion:', err);
  }
})(); 