import axios from 'axios';
import * as cheerio from 'cheerio'; // ✅ for ESM
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import ExcelJS from 'exceljs';
import fs from 'fs/promises';
import path from 'path';

// Clean text helper
function cleanText(text) {
  return text.replace(/\s+/g, ' ').replace(/\n+/g, ' ').trim();
}

// Scrape static HTML
async function scrapeHtmlPage(url) {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  $('nav, footer, script, style, header, noscript, form, iframe, svg').remove();
  const title = $('title').text() || url;
  const bodyText = cleanText($('body').text());
  return [{
    content: bodyText,
    metadata: {
      source: url,
      fileType: 'html',
      title
    }
  }];
}

// File parsers
async function parsePdf(buffer, sourceUrl, title) {
  const data = await pdfParse(buffer);
  return [{
    content: cleanText(data.text),
    metadata: { source: sourceUrl, fileType: 'pdf', title }
  }];
}

async function parseDocx(buffer, sourceUrl, title) {
  const result = await mammoth.extractRawText({ buffer });
  return [{
    content: cleanText(result.value),
    metadata: { source: sourceUrl, fileType: 'docx', title }
  }];
}

async function parseXlsx(buffer, sourceUrl, title) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  let allText = '';
  workbook.eachSheet((sheet) => {
    sheet.eachRow((row) => {
      allText += row.values.join(' ') + '\n';
    });
  });
  return [{
    content: cleanText(allText),
    metadata: { source: sourceUrl, fileType: 'xlsx', title }
  }];
}

// Download & parse
async function downloadAndParseFile(url, fileType) {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(res.data);
  const title = path.basename(url);
  if (fileType === 'pdf') return parsePdf(buffer, url, title);
  if (fileType === 'docx') return parseDocx(buffer, url, title);
  if (fileType === 'xlsx') return parseXlsx(buffer, url, title);
  throw new Error('Unsupported file type: ' + fileType);
}

// 👇 MAIN LOADER FUNCTION 👇
export async function loadDocs({ htmlUrls = [], pdfUrls = [], docxUrls = [], xlsxUrls = [] } = {}) {
  let docs = [];

  for (const url of htmlUrls) {
    try {
      const htmlDocs = await scrapeHtmlPage(url);
      docs = docs.concat(htmlDocs);
    } catch (e) {
      console.error('❌ Failed to scrape HTML:', url, e.message);
    }
  }

  for (const url of pdfUrls) {
    try {
      const pdfDocs = await downloadAndParseFile(url, 'pdf');
      docs = docs.concat(pdfDocs);
    } catch (e) {
      console.error('❌ Failed to parse PDF:', url, e.message);
    }
  }

  for (const url of docxUrls) {
    try {
      const docxDocs = await downloadAndParseFile(url, 'docx');
      docs = docs.concat(docxDocs);
    } catch (e) {
      console.error('❌ Failed to parse DOCX:', url, e.message);
    }
  }

  for (const url of xlsxUrls) {
    try {
      const xlsxDocs = await downloadAndParseFile(url, 'xlsx');
      docs = docs.concat(xlsxDocs);
    } catch (e) {
      console.error('❌ Failed to parse XLSX:', url, e.message);
    }
  }

  return docs;
}

// ✨ Optional test runner ✨
if (process.env.NODE_ENV === 'test') {
  const urls = {
    htmlUrls: ['https://www.mosdac.gov.in/'], // or any basic URL
    pdfUrls: [],
    docxUrls: [],
    xlsxUrls: []
  };

  loadDocs(urls).then(docs => {
    console.log('✅ Loaded docs:', docs.length);
    console.dir(docs[0], { depth: 2 });
  }).catch(err => {
    console.error('🔥 Error loading docs:', err.message);
  });
}
