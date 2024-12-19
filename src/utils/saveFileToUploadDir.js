// src/utils/saveFileToUploadDir.js
import path from 'path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

//save and delete from temporary
export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${process.env.APP_DOMAIN}/uploads/${file.filename}`;
};
