import sqlite3 from 'sqlite3';
import { PrismaClient } from '@prisma/client';
const db = new sqlite3.Database('meinedatenbank.db');


export function createPrisma() {
    return new PrismaClient({});
}

// Schließe die Datenbank, wenn du fertig bist
db.close();
