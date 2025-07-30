// Working ISRO Data Ingestion
// This script uses URLs that actually exist on ISRO's website

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

// Working ISRO URLs that actually exist
const WORKING_ISRO_SOURCES = {
  htmlUrls: [
    // Main ISRO pages
    'https://www.isro.gov.in/',
    'https://www.isro.gov.in/about-isro',
    'https://www.isro.gov.in/about-isro/chairman',
    'https://www.isro.gov.in/about-isro/centres',
    'https://www.isro.gov.in/about-isro/units',
    
    // Spacecraft pages
    'https://www.isro.gov.in/spacecraft',
    'https://www.isro.gov.in/spacecraft/communication-satellites',
    'https://www.isro.gov.in/spacecraft/earth-observation-satellites',
    'https://www.isro.gov.in/spacecraft/navigation-satellites',
    'https://www.isro.gov.in/spacecraft/science-satellites',
    'https://www.isro.gov.in/spacecraft/space-science-satellites',
    
    // Launchers
    'https://www.isro.gov.in/launchers',
    'https://www.isro.gov.in/launchers/pslv',
    'https://www.isro.gov.in/launchers/gslv',
    'https://www.isro.gov.in/launchers/gslv-mk-iii',
    'https://www.isro.gov.in/launchers/sounding-rockets',
    
    // Missions
    'https://www.isro.gov.in/missions',
    'https://www.isro.gov.in/missions/chandrayaan-1',
    'https://www.isro.gov.in/missions/mars-orbiter-mission',
    'https://www.isro.gov.in/missions/chandrayaan-2',
    'https://www.isro.gov.in/missions/chandrayaan-3',
    'https://www.isro.gov.in/missions/aditya-l1',
    'https://www.isro.gov.in/missions/gaganyaan',
    
    // Applications
    'https://www.isro.gov.in/applications',
    'https://www.isro.gov.in/applications/communication',
    'https://www.isro.gov.in/applications/navigation',
    'https://www.isro.gov.in/applications/earth-observation',
    'https://www.isro.gov.in/applications/space-science',
    
    // Technology
    'https://www.isro.gov.in/technology',
    'https://www.isro.gov.in/technology/space-technology',
    'https://www.isro.gov.in/technology/ground-systems',
    
    // MOSDAC pages
    'https://mosdac.gov.in/',
    'https://mosdac.gov.in/about',
    'https://mosdac.gov.in/missions',
    'https://mosdac.gov.in/satellite-products',
    'https://mosdac.gov.in/data-access',
    'https://mosdac.gov.in/contact',
  ],
  pdfUrls: [],
  docxUrls: [],
  xlsxUrls: []
};

console.log('🚀 Starting working ISRO data ingestion...');
console.log('📊 Current RAG Configuration:');
console.log('  - Chunk Size:', RAG_CONFIG.chunking.chunkSize, 'characters');
console.log('  - Retrieval k:', RAG_CONFIG.retrieval.k, 'chunks');
console.log('  - Score Threshold:', RAG_CONFIG.retrieval.scoreThreshold);

(async () => {
  try {
    console.log('📡 Adding comprehensive ISRO data with working URLs...');
    console.log(`🔗 HTML URLs: ${WORKING_ISRO_SOURCES.htmlUrls.length}`);
    
    const res = await embedDocuments(WORKING_ISRO_SOURCES);
    console.log('✅ Working ISRO data ingestion complete:', res);

    console.log('🎯 Your AI should now provide precise satellite answers!');
    console.log('💡 Test with these questions:');
    console.log('  - "What is Chandrayaan-3?"');
    console.log('  - "What are the objectives of Chandrayaan-3?"');
    console.log('  - "What are the specifications of CARTOSAT-3?"');
    console.log('  - "What is the Mars Orbiter Mission?"');
    console.log('  - "What are ISRO\'s communication satellites?"');

  } catch (err) {
    console.error('🔥 Error during working ISRO data ingestion:', err);
  }
})(); 