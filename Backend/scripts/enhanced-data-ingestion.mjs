// Enhanced Data Ingestion for AstroLynx
// This script adds comprehensive ISRO satellite data

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

// Comprehensive ISRO satellite data URLs
const ISRO_DATA_SOURCES = {
  htmlUrls: [
    'https://www.isro.gov.in/',
    'https://www.isro.gov.in/spacecraft',
    'https://www.isro.gov.in/launchers',
    'https://www.isro.gov.in/missions',
    'https://www.isro.gov.in/chandrayaan-3',
    'https://www.isro.gov.in/insat-3d',
    'https://www.isro.gov.in/cartosat-3',
    'https://www.isro.gov.in/resourcesat-2a',
    'https://www.isro.gov.in/risat-1',
    'https://www.isro.gov.in/oceansat-3',
    'https://mosdac.gov.in/',
    'https://mosdac.gov.in/missions',
    'https://mosdac.gov.in/satellite-products',
    'https://mosdac.gov.in/data-access',
  ],
  pdfUrls: [
    // Add any PDF URLs you have access to
  ],
  docxUrls: [
    // Add any DOCX URLs you have access to
  ],
  xlsxUrls: [
    // Add any XLSX URLs you have access to
  ]
};

console.log('🚀 Starting enhanced data ingestion for precise satellite answers...');
console.log('📊 Current RAG Configuration:');
console.log('  - Chunk Size:', RAG_CONFIG.chunking.chunkSize, 'characters');
console.log('  - Retrieval k:', RAG_CONFIG.retrieval.k, 'chunks');
console.log('  - Score Threshold:', RAG_CONFIG.retrieval.scoreThreshold);

(async () => {
  try {
    console.log('📡 Adding comprehensive ISRO satellite data...');
    console.log(`🔗 HTML URLs: ${ISRO_DATA_SOURCES.htmlUrls.length}`);
    
    const res = await embedDocuments(ISRO_DATA_SOURCES);
    console.log('✅ Enhanced data ingestion complete:', res);

    console.log('🎯 Your AI should now provide much more precise satellite answers!');
    console.log('💡 Test with these questions:');
    console.log('  - "What are the specifications of CARTOSAT-3?"');
    console.log('  - "What is the mission of Chandrayaan-3?"');
    console.log('  - "What are the capabilities of INSAT-3D?"');
    console.log('  - "What is the resolution of RESOURCESAT-2A?"');

  } catch (err) {
    console.error('🔥 Error during enhanced data ingestion:', err);
  }
})(); 