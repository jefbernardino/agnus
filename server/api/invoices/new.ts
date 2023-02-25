import type { IncomingMessage, ServerResponse } from "http";
import { fromNodeMiddleware, getQuery } from "h3";

export default async (req: IncomingMessage, res: ServerResponse) => {
    // @ts-ignore
    const [rows, fields] = await req["db"].execute("SELECT * FROM produtos WHERE ativo = 1");
    return {
        columns: fields.map((i: any) => i.id),
        entries: rows,
    };
};
