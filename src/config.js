import dotenv from 'dotenv';

dotenv.config();

const config = {};

process.env.DATABASE_URI
const NODE_ENV = process.env.NODE_ENV;
console.log(NODE_ENV)

switch (NODE_ENV) {
  case 'test':
    config.DATABASE_URI = process.env.DATABASE_URI_TEST;
    break;
  default:
    config.DATABASE_URI = process.env.DATABASE_URI;
}

export default config;
