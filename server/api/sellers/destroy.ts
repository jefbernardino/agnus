import type { IncomingMessage, ServerResponse } from "http";
import { getQuery } from "h3";
import destr from "destr";

export default async (req: IncomingMessage, res: ServerResponse) => {
    // @ts-ignore
    const query = req['params'] ? destr(req['params']) : await getQuery(req);

    const values = [ query.id ]

    // @ts-ignore
    const [rows, fields] = await req["db"].execute("DELETE FROM vendedores WHERE id = ?", values);

    return { entry: values };
};