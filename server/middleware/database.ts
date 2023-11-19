import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    event["db"] = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_DATA,
        waitForConnections: true,
        connectionLimit: 0,
        queueLimit: 0,
    });
});
