import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

console.log('✅ .env loaded');
console.log('ENV:', {
  apiKey: process.env.PINECONE_API_KEY,
  env: process.env.PINECONE_ENVIRONMENT,
  index: process.env.PINECONE_INDEX_NAME,
});
