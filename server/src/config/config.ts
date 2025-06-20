import dotenv from 'dotenv';

dotenv.config();
interface Config {
  port: number;
  nodeEnv: string;
  mailPassword: string;
  email: string;
  mongoDBUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mailPassword: process.env.EMAILPASSWORD || '',
  email: process.env.EMAIL || '',
  mongoDBUrl: process.env.MONGODB || '',
};

export default config;
