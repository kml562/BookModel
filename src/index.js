import * as dotenv from 'dotenv'
import { startSever } from './db/mongoose.js';
import app from './app.js';
dotenv.config();

const { PORT, MONGO_URI } = process.env;
startSever(app,PORT, MONGO_URI)