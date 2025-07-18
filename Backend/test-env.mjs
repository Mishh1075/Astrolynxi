import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 💡 Force-load the .env file from Backend dir
dotenv.config({ path: path.join(__dirname, '.env') });

console.log("🧪 GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY || 'Not found 💀'); 