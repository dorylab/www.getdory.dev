import { readFile } from 'node:fs/promises';
import path from 'node:path';

let cachedLogoDataUrl: string | undefined;
let cachedHomeScreenshotDataUrl: string | undefined;

export async function getOgLogoDataUrl() {
  if (!cachedLogoDataUrl) {
    const logo = await readFile(path.join(process.cwd(), 'public/logo.png'));
    cachedLogoDataUrl = `data:image/png;base64,${logo.toString('base64')}`;
  }

  return cachedLogoDataUrl;
}

export async function getHomeOgScreenshotDataUrl() {
  if (!cachedHomeScreenshotDataUrl) {
    const screenshot = await readFile(path.join(process.cwd(), 'public/actions.png'));
    cachedHomeScreenshotDataUrl = `data:image/png;base64,${screenshot.toString('base64')}`;
  }

  return cachedHomeScreenshotDataUrl;
}
