import type { IncomingMessage } from "http";
import { readBody, getQuery } from "h3";
import destr from "destr";

export default async (req: IncomingMessage) => {
    // @ts-ignore
    const body = req['body'] ? destr(req['body']) : await readBody(req);
    // @ts-ignore
    const query = req['params'] ? destr(req['params']) : await getQuery(req);

    const values = [
        body.nome, body.email, body.tipo, body.login, body.senha, body.resgate, body.ativo, query.id
    ]

    // @ts-ignore
    const [rows, fields] = await req["db"].execute(
        "UPDATE vendedores SET nome = ?, email = ?, tipo = ?, login = ?, senha = ?, resgate = ?, ativo = ? where id = ?",
        values
    );

    return { entry: values };
};
