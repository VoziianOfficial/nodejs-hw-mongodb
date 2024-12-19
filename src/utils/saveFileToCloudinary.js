// src/utils/saveFileToCloudinary.js

import { v2 as cloudinary } from 'cloudinary';

import { CLOUDINARY } from '../constants/index.js';
import fs from 'node:fs/promises';

cloudinary.config({
  secure: true,
  cloud_name: process.env[CLOUDINARY.CLOUD_NAME],
  api_key: process.env[CLOUDINARY.API_KEY],
  api_secret: process.env[CLOUDINARY.API_SECRET],
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
