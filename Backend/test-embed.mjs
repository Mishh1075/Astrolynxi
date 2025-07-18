import { embedDocuments } from './rag-pipeline/embedDocuments.js';
 
(async () => {
  await embedDocuments({ htmlUrls: ['https://example.com'], pdfUrls: [], docxUrls: [], xlsxUrls: [] });
})(); 