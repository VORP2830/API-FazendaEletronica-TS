import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const databaseURL: any = process.env.DATABASE_URL

export const db = mysql.createPool(databaseURL);