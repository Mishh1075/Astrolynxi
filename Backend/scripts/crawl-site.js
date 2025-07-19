import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { URL } from 'url';

export async function crawlWebsiteForUrls(baseUrl, maxDepth = 2) {
  const visitedUrls = new Set();
  const urlsToVisit = [{ url: baseUrl, depth: 0 }];
  const foundUrls = { htmlUrls: new Set(), pdfUrls: new Set(), docxUrls: new Set(), xlsxUrls: new Set() };
  const domain = new URL(baseUrl).hostname;

  while (urlsToVisit.length > 0) {
    const { url: currentUrl, depth } = urlsToVisit.shift();
    if (visitedUrls.has(currentUrl) || depth > maxDepth) {
      continue;
    }
    console.log(`Crawling: ${currentUrl} (Depth: ${depth})`);
    visitedUrls.add(currentUrl);
    try {
      const response = await fetch(currentUrl);
      if (!response.ok) {
        console.error(`❌ HTTP error! Status: ${response.status} for ${currentUrl}`);
        continue;
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        foundUrls.htmlUrls.add(currentUrl);
        const html = await response.text();
        const $ = cheerio.load(html);
        $('a').each((i, link) => {
          const href = $(link).attr('href');
          if (href) {
            try {
              const absoluteUrl = new URL(href, currentUrl).href;
              const linkDomain = new URL(absoluteUrl).hostname;
              if (linkDomain === domain && !visitedUrls.has(absoluteUrl)) {
                if (absoluteUrl.endsWith('.pdf')) {
                  foundUrls.pdfUrls.add(absoluteUrl);
                } else if (absoluteUrl.endsWith('.docx')) {
                  foundUrls.docxUrls.add(absoluteUrl);
                } else if (absoluteUrl.endsWith('.xlsx')) {
                  foundUrls.xlsxUrls.add(absoluteUrl);
                } else if (absoluteUrl.includes('.html') || !absoluteUrl.includes('.')) {
                  urlsToVisit.push({ url: absoluteUrl, depth: depth + 1 });
                }
              }
            } catch (urlError) {
              // Invalid URL or parsing error
            }
          }
        });
      } else if (currentUrl.endsWith('.pdf')) {
        foundUrls.pdfUrls.add(currentUrl);
      } else if (currentUrl.endsWith('.docx')) {
        foundUrls.docxUrls.add(currentUrl);
      } else if (currentUrl.endsWith('.xlsx')) {
        foundUrls.xlsxUrls.add(currentUrl);
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`🔥 Error crawling ${currentUrl}:`, error.message);
    }
  }
  return {
    htmlUrls: Array.from(foundUrls.htmlUrls),
    pdfUrls: Array.from(foundUrls.pdfUrls),
    docxUrls: Array.from(foundUrls.docxUrls),
    xlsxUrls: Array.from(foundUrls.xlsxUrls),
  };
} 