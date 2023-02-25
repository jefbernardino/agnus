import type { IncomingMessage, ServerResponse } from "http";
import { fromNodeMiddleware, getQuery } from "h3";
import destr from "destr";

export default async (req: IncomingMessage, res: ServerResponse) => {
    // @ts-ignore
    const query = req['params'] ? destr(req['params']) : await getQuery(req);
    // @ts-ignore
    const [rows, fields] = await req["db"].execute("" +
        "SELECT * " +
        "FROM administradores " +
        "WHERE usuario = ? AND resgate = ?", [query.usuario, query.resgate]);

    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entry: rows[0] || {},
        // message: res.statusMessage
    }
};
