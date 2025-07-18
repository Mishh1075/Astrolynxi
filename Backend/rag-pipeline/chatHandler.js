import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../Backend/.env') });

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { ConversationalRetrievalQAChain } from '@langchain/community/chains';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import { GoogleGenerativeAIEmbeddings } from '@langchain/community/embeddings/googlevertexai';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'astrolynx-index';
const PINECONE_PROJECT_NAME = process.env.PINECONE_PROJECT_NAME;

// Helper: Load Pinecone retriever
async function getRetriever() {
  const pinecone = new Pinecone({
    apiKey: PINECONE_API_KEY,
    environment: PINECONE_ENVIRONMENT,
  });
  const index = pinecone.Index(PINECONE_INDEX_NAME);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new GoogleGenerativeAIEmbeddings({ apiKey: GOOGLE_API_KEY }),
    { pineconeIndex: index }
  );
  return vectorStore.asRetriever();
}

// Main chat handler
export async function askAstroLynx(message, history = []) {
  const retriever = await getRetriever();
  const llm = new ChatGoogleGenerativeAI({
    apiKey: GOOGLE_API_KEY,
    model: 'gemini-pro',
    temperature: 0.2,
  });
  const chain = ConversationalRetrievalQAChain.fromLLM(llm, retriever, {
    returnSourceDocuments: true,
  });
  // Format history for LangChain (array of { role, content })
  const chatHistory = history.map(h => [h.role, h.content]);
  const res = await chain.call({
    question: message,
    chat_history: chatHistory,
  });
  // Format sources
  const sources = (res.sourceDocuments || []).map(doc => ({
    source: doc.metadata?.source,
    fileType: doc.metadata?.fileType,
    title: doc.metadata?.title,
    chunk: doc.pageContent?.slice(0, 200) // preview
  }));
  return {
    answer: res.text,
    history,
    sources,
  };
} 