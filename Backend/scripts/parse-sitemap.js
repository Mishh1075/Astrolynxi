import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export async function fetchMosdacUrlsFromSitemap() {
  const sitemapUrl = 'https://www.mosdac.gov.in/sitemap.xml';
  const res = await axios.get(sitemapUrl);
  const xml = res.data;

  const parser = new XMLParser();
  const json = parser.parse(xml);

  const urls = json.urlset.url.map(entry => entry.loc);

  // 🧼 Filter out obviously broken/invalid/internal URLs
  const cleanUrls = urls.filter(url =>
    url &&
    !url.includes('<nolink>') &&
    !url.includes('/internal/') &&
    !url.includes('logout') &&
    !url.includes('register') &&
    !url.includes('feedback')
  );

  const skipped = urls.length - cleanUrls.length;
  console.log(`🚫 Skipped ${skipped} junk/internal URLs`);

  const htmlUrls = cleanUrls.filter(url => !url.endsWith('.pdf') && !url.endsWith('.zip'));
  const pdfUrls = cleanUrls.filter(url => url.endsWith('.pdf'));

  console.log(`🧭 Sitemap loaded: ${urls.length} total`);
  console.log(`🔗 HTML: ${htmlUrls.length}, 📄 PDFs: ${pdfUrls.length}`);

  return { htmlUrls, pdfUrls, docxUrls: [], xlsxUrls: [] };
} 