import 'reflect-metadata';
const dotenv = require('dotenv');
import path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '.env.test') });
