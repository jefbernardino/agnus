import type { IncomingMessage, ServerResponse } from "http";
import mysql from 'mysql2/promise'

export default async (req: IncomingMessage, res: ServerResponse) => {
    req["db"] = await mysql.createConnection({
        host: 'agnusplast.com.br',
        user: 'agnus365_megalu',
        password: 'megalu2211',
        database: 'agnus365_novosite',
        waitForConnections: true,
        connectionLimit: 0,
        queueLimit: 0,
    });
}
