import { type SQLiteDatabase } from "expo-sqlite"

export async function initialize(database: SQLiteDatabase) {
    try {
        await database.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sells (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      product TEXT NOT NULL,
      price REAL NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      quantity INTEGER NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

  `)
        console.log('[initialize]: Banco de dados iniciado com sucesso.')
    } catch (error) {
        console.warn('[initialize]: Erro ao criar banco de dados.' + error)
    }

}