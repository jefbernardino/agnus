import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    // @ts-ignore
    event["db"] = await mysql.createConnection({
        host: 'agnusplast.com.br',
        port: '3306',
        user: 'agnus365_megalu',
        password: 'megalu2211',
        database: 'agnus365_novosite',
        // host: 'localhost',
        // port: '3306',
        // user: 'root',
        // password: '',
        // database: 'agnusplast',
        waitForConnections: true,
        connectionLimit: 0,
        queueLimit: 0,
    });
});
