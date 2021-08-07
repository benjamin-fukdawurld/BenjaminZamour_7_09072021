import path from 'path';
import { promises as fs } from 'fs';

import { Request } from 'express';

async function deleteMediaIfExists(filename: string) {
  const filePath = path.resolve(path.dirname(''), 'medias', filename);
  return async () => {
    try {
      await fs.access(filePath);
    } catch (err) {
      return;
    }

    fs.unlink(filePath);
  };
}

function getMediaUrl(req: Request): string | null {
  if (!req.file) {
    return null;
  }
  return `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
}

function capitalizeText(text: string): string {
  return text
    .trim()
    .replace(/ +/g, ' ')
    .split(' ')
    .map((s: string): string => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

function deepCopy(object: any): any {
  return JSON.parse(JSON.stringify(object));
}

export default { deleteMediaIfExists, getMediaUrl, capitalizeText, deepCopy };
