import type { IncomingMessage, ServerResponse } from "http";
import { fromNodeMiddleware, useQuery } from "h3";
import destr from "destr";

export default async (req: IncomingMessage, res: ServerResponse) => {
    const query = req['params'] ? destr(req['params']) : await useQuery(req);
    const [rows, fields] = await req["db"].execute("" +
        "SELECT * FROM clientes " +
        "LEFT JOIN vendedores as vendedores on clientes.vendedor_id = vendedores.id " +
        "WHERE clientes.id = ?", [query.id]);

    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.name),
        entry: rows[0] || {},
        // message: res.statusMessage
    }
};
