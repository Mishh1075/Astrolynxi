import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔑 ENV:', process.env); // Log all env keys

console.log("🔍 GOOGLE_API_KEY from .env:", process.env.GOOGLE_API_KEY);
console.log("🔍 PINECONE_API_KEY from .env:", process.env.PINECONE_API_KEY);

console.log("ENV:", {
  apiKey: process.env.PINECONE_API_KEY,
  env: process.env.PINECONE_ENVIRONMENT,
  index: process.env.PINECONE_INDEX_NAME,
  projectName: process.env.PINECONE_PROJECT_NAME,
});

import { loadDocs } from '../utils/loadDocs.js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { RAG_CONFIG } from '../config/rag-config.js';

// Polyfill fetch if needed (Node < 18)
import fetch from 'node-fetch';
globalThis.fetch = fetch;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'astrolynx-bot';

// Helper: Initialize Pinecone client and index
export function getPineconeIndex() {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    // The 'environment' property is no longer valid for this SDK version.
    // The Pinecone SDK will typically infer the correct host/environment from the API key.
  });
  return pinecone.index(process.env.PINECONE_INDEX_NAME);
}

// Retry helper for upserts
async function upsertWithRetry(index, batch, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      console.log("🧾 Upsert payload:", {
        vectors: batch,
        namespace: "default"
      });
      // Corrected: Pass vectors directly as the first argument, and options object as second
      return await index.upsert(batch, { namespace: "default" });
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
  console.log("👀 embedDocuments() was called!");
  console.log("⚙️ Starting embedDocuments with:");
  console.log("HTML URLs:", htmlUrls.length);
  console.log("PDF URLs:", pdfUrls.length);
  console.log("DOCX URLs:", docxUrls.length);
  console.log("XLSX URLs:", xlsxUrls.length);

  // 1. Load and parse documents
  let docs = [];
  for (const url of htmlUrls) {
    try {
      console.log(`🌐 Scraping HTML: ${url}`);
      const htmlDocs = await loadDocs({ htmlUrls: [url] });
      docs = docs.concat(htmlDocs);
      console.log(`  📄 Scraped: ${htmlDocs.length} docs from ${url}`);
    } catch (e) {
      console.error(`❌ Failed to scrape HTML: ${url} - ${e.message}`);
    }
  }
  for (const url of pdfUrls) {
    try {
      console.log(`📄 Downloading PDF: ${url}`);
      const pdfDocs = await loadDocs({ pdfUrls: [url] });
      docs = docs.concat(pdfDocs);
      console.log(`  📄 Scraped: ${pdfDocs.length} docs from ${url}`);
    } catch (e) {
      console.error(`❌ Failed to scrape PDF: ${url} - ${e.message}`);
    }
  }
  for (const url of docxUrls) {
    try {
      console.log(`📄 Downloading DOCX: ${url}`);
      const docxDocs = await loadDocs({ docxUrls: [url] });
      docs = docs.concat(docxDocs);
      console.log(`  📄 Scraped: ${docxDocs.length} docs from ${url}`);
    } catch (e) {
      console.error(`❌ Failed to scrape DOCX: ${url} - ${e.message}`);
    }
  }
  for (const url of xlsxUrls) {
    try {
      console.log(`📄 Downloading XLSX: ${url}`);
      const xlsxDocs = await loadDocs({ xlsxUrls: [url] });
      docs = docs.concat(xlsxDocs);
      console.log(`  📄 Scraped: ${xlsxDocs.length} docs from ${url}`);
    } catch (e) {
      console.error(`❌ Failed to scrape XLSX: ${url} - ${e.message}`);
    }
  }
  console.log("📄 Docs loaded:", docs.length);
  if (!docs.length) {
    console.warn("🚫 No documents loaded!");
  }

  // 2. Chunk documents using configuration
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: RAG_CONFIG.chunking.chunkSize,
    chunkOverlap: RAG_CONFIG.chunking.chunkOverlap,
    separators: RAG_CONFIG.chunking.separators,
  });
  let allChunks = [];
  for (const doc of docs) {
    const chunks = await splitter.createDocuments([doc.content], [doc.metadata]);
    allChunks = allChunks.concat(chunks);
    console.log(`✂️ Chunks created for ${doc.metadata.source}: ${chunks.length}`);
  }
  console.log("🔪 Chunks created:", allChunks.length);
  if (!allChunks.length) {
    console.warn("🚫 No chunks generated!");
  }

  // 3. Embed chunks
  console.log("🔍 GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY);
  const embedder = new GoogleGenerativeAIEmbeddings({ apiKey: GOOGLE_API_KEY });
  const texts = allChunks.map(chunk => chunk.pageContent);
  const metadatas = allChunks.map(chunk => chunk.metadata);
  console.log(`🧠 Embedding ${texts.length} chunks...`);
  const vectors = await embedder.embedDocuments(texts);
  console.log("🧠 Vectors created:", vectors.length);
  if (!vectors.length) {
    console.warn("🚫 No vectors generated!");
  }

  // 📊 FINAL DEBUG
  console.log("📊 FINAL DEBUG:", {
    docs: docs.length,
    chunks: allChunks.length,
    vectors: vectors.length,
    sampleVector: vectors[0]
  });

  if (!vectors.length) {
    console.warn("⚠️ No vectors to upsert. Skipping Pinecone upload.");
    return { status: "skipped", docs, chunks: allChunks, vectors };
  }

  // 4. Upsert to Pinecone
  const index = getPineconeIndex();
  console.log("📌 Index name:", index.name);
  // Minimal upsert test
  try {
    // Corrected: Pass vectors directly as the first argument, and options object as second
    const testRes = await index.upsert(
      [
        {
          id: 'test-vec',
          values: Array(768).fill(0.42),
          metadata: { source: 'debug' }
        }
      ],
      { namespace: 'default' }
    );
    console.log('✅ Minimal upsert test result:', testRes);
  } catch (err) {
    console.error('❌ Minimal upsert test failed:', err);
  }

  // BEGIN Option A: Flatten 'loc' metadata
  const upserts = vectors.map((values, i) => {
    const originalMetadata = metadatas[i];
    const newMetadata = { ...originalMetadata }; // Copy existing metadata

    // If 'loc' exists and is an object, convert it to flattened fields
    if (newMetadata.loc && typeof newMetadata.loc === 'object') {
      if (newMetadata.loc.lines) {
        newMetadata.loc_from = newMetadata.loc.lines.from;
        newMetadata.loc_to = newMetadata.loc.lines.to;
      }
      delete newMetadata.loc; // Remove the original complex 'loc' object
    }

    return {
      id: `${originalMetadata.source}-${i}`,
      values,
      metadata: newMetadata,
    };
  });
  // END Option A

  if (vectors && vectors.length > 0) {
    console.log('🧬 Example upsert vector:', JSON.stringify({
      id: upserts[0]?.id,
      values: upserts[0]?.values,
      metadata: upserts[0]?.metadata
    }, null, 2));
  }

  const BATCH_SIZE = 100;
  for (let i = 0; i < upserts.length; i += BATCH_SIZE) {
    const batch = upserts.slice(i, i + BATCH_SIZE);
    if (batch.length > 0) {
      await upsertWithRetry(index, batch);
    } else {
      console.warn("⚠️ Skipping upsert — no vectors to store.");
    }
  }

  return { status: 'Success', docs, chunks: allChunks, vectors };
}