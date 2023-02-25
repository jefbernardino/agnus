import type { IncomingMessage } from "http";
import { readBody, getQuery } from "h3";
import destr from "destr";

export default async (req: IncomingMessage) => {
    // @ts-ignore
    const body = req['body'] ? destr(req['body']) : await readBody(req);
    // @ts-ignore
    const query = req['params'] ? destr(req['params']) : await getQuery(req);

    const values = [
        body.nome, body.preco, body.tipo, body.ativo, query.id
    ]

    // @ts-ignore
    const [rows, fields] = await req["db"].execute(
        "UPDATE produtos SET nome = ?, preco = ?, tipo = ?, ativo = ? where id = ?",
        values
    );

    return { entry: values };
};
