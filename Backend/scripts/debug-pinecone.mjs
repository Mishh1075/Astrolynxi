// Debug Pinecone Index - Check what data is actually stored
import fetch from 'node-fetch';
globalThis.fetch = fetch;

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'astrolynx-bot';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

console.log('🔍 Debugging Pinecone Index...');
console.log('📊 Environment Check:');
console.log('  - PINECONE_API_KEY:', PINECONE_API_KEY ? '✅ Set' : '❌ Missing');
console.log('  - PINECONE_INDEX_NAME:', PINECONE_INDEX_NAME);
console.log('  - GOOGLE_API_KEY:', GOOGLE_API_KEY ? '✅ Set' : '❌ Missing');

(async () => {
  try {
    // Initialize Pinecone
    const pinecone = new Pinecone({
      apiKey: PINECONE_API_KEY,
    });
    
    const index = pinecone.Index(PINECONE_INDEX_NAME);
    console.log('✅ Connected to Pinecone index:', index.name);
    
    // Get index stats
    const stats = await index.describeIndexStats();
    console.log('📊 Index Statistics:');
    console.log('  - Total Vector Count:', stats.totalVectorCount);
    console.log('  - Namespaces:', Object.keys(stats.namespaces || {}));
    
    // Test a simple query
    const embedder = new GoogleGenerativeAIEmbeddings({ apiKey: GOOGLE_API_KEY });
    const testQuery = "What is Chandrayaan-3?";
    console.log('🧪 Testing query:', testQuery);
    
    const queryEmbedding = await embedder.embedQuery(testQuery);
    console.log('✅ Query embedding generated, length:', queryEmbedding.length);
    
    // Search the index (removed namespace parameter)
    const searchResults = await index.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true
    });
    
    console.log('🔍 Search Results:');
    console.log('  - Results found:', searchResults.matches?.length || 0);
    
    if (searchResults.matches && searchResults.matches.length > 0) {
      searchResults.matches.forEach((match, i) => {
        console.log(`\n📄 Result ${i + 1}:`);
        console.log('  - Score:', match.score);
        console.log('  - ID:', match.id);
        console.log('  - Source:', match.metadata?.source);
        console.log('  - Title:', match.metadata?.title);
        console.log('  - File Type:', match.metadata?.fileType);
        if (match.metadata?.chunk) {
          console.log('  - Content Preview:', match.metadata.chunk.substring(0, 100) + '...');
        }
      });
    } else {
      console.log('❌ No search results found!');
    }
    
    // Check if we have any ISRO-related content
    const isroQuery = await embedder.embedQuery("ISRO satellite missions");
    const isroResults = await index.query({
      vector: isroQuery,
      topK: 3,
      includeMetadata: true
    });
    
    console.log('\n🔍 ISRO Content Check:');
    console.log('  - ISRO results found:', isroResults.matches?.length || 0);
    
    if (isroResults.matches && isroResults.matches.length > 0) {
      isroResults.matches.forEach((match, i) => {
        console.log(`  - Result ${i + 1}: ${match.metadata?.source} (Score: ${match.score})`);
      });
    }
    
  } catch (err) {
    console.error('🔥 Error debugging Pinecone:', err);
  }
})(); 