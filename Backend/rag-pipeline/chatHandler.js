import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../Backend/.env') });

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { RAG_CONFIG } from '../config/rag-config.js';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'astrolynx-bot';
const PINECONE_PROJECT_NAME = process.env.PINECONE_PROJECT_NAME;

// Helper: Load Pinecone retriever
async function getRetriever() {
  const pinecone = new Pinecone({
    apiKey: PINECONE_API_KEY,
  });
  const index = pinecone.Index(PINECONE_INDEX_NAME);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new GoogleGenerativeAIEmbeddings({ apiKey: GOOGLE_API_KEY }),
    { pineconeIndex: index }
  );
  
  // Configure retriever for more precise answers
  const retriever = vectorStore.asRetriever({
    k: RAG_CONFIG.retrieval.k,
    scoreThreshold: RAG_CONFIG.retrieval.scoreThreshold,
    filter: {}, // Can add metadata filters here if needed
  });
  
  return retriever;
}

// Main chat handler
export async function askAstroLynx(message, history = []) {
  const retriever = await getRetriever();
  const llm = new ChatGoogleGenerativeAI({
    apiKey: GOOGLE_API_KEY,
    model: RAG_CONFIG.llm.model,
    temperature: RAG_CONFIG.llm.temperature,
    maxOutputTokens: RAG_CONFIG.llm.maxOutputTokens,
  });
  
  const chain = ConversationalRetrievalQAChain.fromLLM(llm, retriever, {
    returnSourceDocuments: true,
    qaTemplate: RAG_CONFIG.prompts.qaTemplate,
    questionGeneratorTemplate: RAG_CONFIG.prompts.questionGeneratorTemplate,
  });
  
  // Format history for LangChain (array of { role, content })
  const chatHistory = history.map(h => [h.role, h.content]);
  const res = await chain.call({
    question: message,
    chat_history: chatHistory,
  });
  
  // Enhanced source formatting with more details
  const sources = (res.sourceDocuments || []).map(doc => ({
    source: doc.metadata?.source,
    fileType: doc.metadata?.fileType,
    title: doc.metadata?.title,
    chunk: doc.pageContent?.slice(0, 300), // Increased preview length
    similarity: doc.metadata?.score || 'N/A', // Include similarity score if available
  }));
  
  return {
    answer: res.text,
    history,
    sources,
    retrievalScore: sources.length > 0 ? sources[0].similarity : null, // Include top retrieval score
  };
} 