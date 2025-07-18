// debug-env.mjs
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

console.log("✅ ENV CHECK:");
console.log("PINECONE_API_KEY:", process.env.PINECONE_API_KEY || '❌ Not Found');
console.log("PINECONE_ENVIRONMENT:", process.env.PINECONE_ENVIRONMENT || '❌ Not Found');
console.log("PINECONE_INDEX_NAME:", process.env.PINECONE_INDEX_NAME || '❌ Not Found');
console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY || '❌ Not Found');
