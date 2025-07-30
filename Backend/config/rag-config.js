// RAG Configuration for AstroLynx
// This file contains all the settings for document processing and retrieval

export const RAG_CONFIG = {
  // Document Chunking Settings
  chunking: {
    chunkSize: 800, // Characters per chunk (~200 tokens)
    chunkOverlap: 150, // Overlap between chunks
    separators: ["\n\n", "\n", ". ", "! ", "? ", " ", ""], // Splitting strategy
  },
  
  // Retrieval Settings
  retrieval: {
    k: 5, // Number of chunks to retrieve
    scoreThreshold: 0.60, // Minimum similarity score (0-1) - Lowered further to prioritize ISRO content
    maxTokens: 2048, // Maximum response length
  },
  
  // LLM Settings
  llm: {
    model: 'gemini-1.5-flash-latest',
    temperature: 0.1, // Lower = more precise, Higher = more creative
    maxOutputTokens: 2048,
  },
  
  // Embedding Settings
  embedding: {
    model: 'google-generative-ai',
    dimensions: 768, // Vector dimensions
  },
  
  // Document Processing
  processing: {
    maxWordCount: 50000, // Maximum words per document
    minWordCount: 50, // Minimum words per document
    supportedFormats: ['html', 'pdf', 'docx', 'xlsx'],
  },
  
  // Prompt Templates
  prompts: {
    qaTemplate: `You are AstroLynx, a specialized AI assistant for ISRO satellite data and space science information. 

IMPORTANT INSTRUCTIONS:
- Provide precise, factual answers based ONLY on the retrieved documents
- If the information is not in the retrieved documents, say "I don't have specific information about that in my current knowledge base"
- Use specific data, numbers, and technical details when available
- Cite the exact source documents in your response
- Be concise but comprehensive
- Focus on ISRO missions, satellite data, weather information, and space science
- For Chandrayaan-3 questions, provide specific details about the mission, objectives, landing, and discoveries
- For satellite questions, provide technical specifications and capabilities

Context from retrieved documents:
{context}

Question: {question}

Answer based on the context above:`,
    
    questionGeneratorTemplate: `Given the following conversation history and a new question, rephrase the new question to be a standalone question that captures all relevant context.

Chat History:
{chat_history}

New Question: {question}

Standalone Question:`,
  },
  
  // Metadata Fields to Extract
  metadata: {
    required: ['source', 'fileType', 'title'],
    optional: ['headings', 'wordCount', 'pageCount', 'sheetNames', 'author', 'date'],
  },
};

// Helper function to get configuration
export function getRAGConfig() {
  return RAG_CONFIG;
}

// Helper function to update configuration
export function updateRAGConfig(updates) {
  Object.assign(RAG_CONFIG, updates);
  return RAG_CONFIG;
} 