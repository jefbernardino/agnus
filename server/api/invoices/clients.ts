import type { IncomingMessage, ServerResponse } from "http";
import { fromNodeMiddleware, getQuery } from "h3";

export default async (req: IncomingMessage, res: ServerResponse) => {
    // @ts-ignore
    const query = req['params'] ? destr(req['params']) : await getQuery(req);
    // @ts-ignore
    const [rows, fields] = await req["db"].execute("SELECT * FROM clientes WHERE ativo = 1 AND vendedor_id = ?", [query.id]);
    return {
        columns: fields.map((i: any) => i.id),
        entries: rows,
    };
};
