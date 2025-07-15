import dotenv from 'dotenv';
dotenv.config();

console.log("ENV:", {
  apiKey: process.env.PINECONE_API_KEY,
  env: process.env.PINECONE_ENV,
  index: process.env.PINECONE_INDEX_NAME,
});

import { loadDocs } from '../utils/loadDocs.js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { PineconeClient } from '@pinecone-database/pinecone';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_ENV = process.env.PINECONE_ENV;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'astrolynx';


// Helper: Initialize Pinecone client and index
async function getPineconeIndex() {
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey: PINECONE_API_KEY,
    environment: PINECONE_ENV,
  });
  const index = pinecone.Index(PINECONE_INDEX_NAME);
  // Test connection
  try {
    const res = await index.upsert({
      vectors: [{ id: "test", values: new Array(768).fill(0) }],
    });
    console.log("✅ Test vector upserted:", res);
  } catch (err) {
    console.error("❌ Pinecone test failed:", err);
  }
  return index;
}

// Retry helper for upserts
async function upsertWithRetry(index, batch, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await index.upsert({ vectors: batch });
    } catch (e) {
      if (i < retries - 1 && (e.code === 'ECONNRESET' || e.message.includes('fetch failed'))) {
        await new Promise(res => setTimeout(res, delay * (2 ** i)));
      } else {
        throw e;
      }
    }
  }
}

// Main embedding pipeline
export async function embedDocuments({ htmlUrls = [], pdfUrls = [], docxUrls = [], xlsxUrls = [] } = {}) {
  // 1. Load and parse documents
  const docs = await loadDocs({ htmlUrls, pdfUrls, docxUrls, xlsxUrls });
  if (!docs.length) {
    console.log('No documents to embed.');
    return { status: 'No documents found.' };
  }

  // 2. Chunk documents (200–500 tokens)
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1500, // ~200-500 tokens (approx 4 chars/token)
    chunkOverlap: 200,
  });
  let allChunks = [];
  for (const doc of docs) {
    const chunks = await splitter.createDocuments([doc.content], [doc.metadata]);
    allChunks = allChunks.concat(chunks);
  }

  // 3. Embed chunks
  const embedder = new GoogleGenerativeAIEmbeddings({ apiKey: GOOGLE_API_KEY });
  const texts = allChunks.map(chunk => chunk.pageContent);
  const metadatas = allChunks.map(chunk => chunk.metadata);
  const vectors = await embedder.embedDocuments(texts);

  // 4. Upsert to Pinecone
  const index = await getPineconeIndex();
  const upserts = vectors.map((values, i) => ({
    id: `${metadatas[i].source}-${i}`,
    values,
    metadata: metadatas[i],
  }));

  const BATCH_SIZE = 100;
  for (let i = 0; i < upserts.length; i += BATCH_SIZE) {
    const batch = upserts.slice(i, i + BATCH_SIZE);
    await upsertWithRetry(index, batch);
  }

  return { status: 'Success', chunks: upserts.length };
}
