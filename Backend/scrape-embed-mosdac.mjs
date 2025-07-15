import axios from 'axios';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
dotenv.config();

import { embedDocuments } from './rag-pipeline/embedDocuments.js';

const SEED_URLS = [
  'https://www.mosdac.gov.in/live/',
  'https://www.mosdac.gov.in/satellite-data-info/',
  'https://www.mosdac.gov.in/faq/',
  'https://www.mosdac.gov.in/terms/',
  'https://www.mosdac.gov.in/privacy/',
  'https://www.mosdac.gov.in/aboutus.php',
  'https://www.mosdac.gov.in/contactus.php'
];



function isInternal(url) {
  return url.startsWith('https://www.mosdac.gov.in/') || url.startsWith('/');
}

function normalizeUrl(url) {
  if (url.startsWith('/')) return `https://www.mosdac.gov.in${url}`;
  return url;
}

function isRelevant(url) {
  const lower = url.toLowerCase();
  return !(
    lower.includes('login') ||
    lower.includes('logout') ||
    lower.includes('register') ||
    lower.includes('signup') ||
    lower.includes('form') ||
    lower.includes('feedback') ||
    lower.includes('contact') ||
    lower.includes('search') ||
    lower.includes('javascript:') ||
    lower.includes('terms') ||
    lower.includes('privacy') ||
    lower.includes('policy') ||
    lower.includes('help') ||
    lower.includes('faq') ||
    lower.includes('copyright')
  );
}

async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.get(url);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        console.warn(`⚠️  404 Not Found: ${url}`);
        return null;
      }
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.warn(`⚠️  Failed to fetch ${url}: ${e.message}`);
        return null;
      }
    }
  }
}

async function crawlMosdac(seedUrls) {
  const visited = new Set();
  const htmlUrls = new Set();
  const pdfUrls = new Set();
  const queue = [...seedUrls];

  while (queue.length) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    const res = await fetchWithRetry(url);
    if (!res) continue;
    const $ = cheerio.load(res.data);
    $('a').each((_, el) => {
      let href = $(el).attr('href');
      if (!href) return;
      if (!isInternal(href)) return;
      href = normalizeUrl(href);
      if (!isRelevant(href)) return;
      if (visited.has(href)) return;
      if (href.endsWith('.pdf')) {
        pdfUrls.add(href);
      } else if (
        href.endsWith('.php') ||
        href.endsWith('/') ||
        !href.includes('.')
      ) {
        htmlUrls.add(href);
        queue.push(href);
      }
    });
  }
  return {
    htmlUrls: Array.from(htmlUrls),
    pdfUrls: Array.from(pdfUrls),
    docxUrls: [],
    xlsxUrls: []
  };
}

(async () => {
  try {
    console.log('🌐 Crawling MOSDAC from seed URLs...');
    const { htmlUrls, pdfUrls, docxUrls, xlsxUrls } = await crawlMosdac(SEED_URLS);
    console.log(`🔗 Found: ${htmlUrls.length} HTML, ${pdfUrls.length} PDFs`);
    if (docxUrls.length || xlsxUrls.length) {
      console.log(`(Also found: ${docxUrls.length} DOCX, ${xlsxUrls.length} XLSX)`);
    }
    console.log('🧪 Loading and parsing documents...');
    const res = await embedDocuments({ htmlUrls, pdfUrls, docxUrls, xlsxUrls });
    console.log('✅ Embed success:', res);
  } catch (err) {
    console.error('🔥 Something went sideways:', err.message);
  }
})(); 