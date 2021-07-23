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
  return `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`;
}

export default { deleteMediaIfExists, getMediaUrl };
