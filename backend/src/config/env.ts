import dotenv from 'dotenv';

dotenv.config();


console.log(
  'DATABASE_URL loaded:',
  Boolean(process.env.DATABASE_URL),
  'Host:',
  process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]
);

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL,
};