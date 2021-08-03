import { Request, Express } from 'express';
import multer from 'multer';
import path from 'path';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback) => callback(null, 'images'),
  filename: (req, file, callback) => {
    const filePath = path.parse(file.originalname.split(' ').join('_'));
    const extension = MIME_TYPES[file.mimetype as keyof typeof MIME_TYPES];
    callback(null, `${filePath.name}${Date.now()}.${extension}`);
  },
});

const mw = multer({ storage }).single('image');

export default mw;
