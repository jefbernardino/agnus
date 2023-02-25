import type { IncomingMessage } from "http";
import { readBody } from "h3";
import destr from "destr";

export default async (req: IncomingMessage) => {
    // @ts-ignore
    const body = req['body'] ? destr(req['body']) : await readBody(req);

    const values = [
        body.nome, body.email, body.tipo, body.login, body.senha, body.resgate, body.ativo
    ]

    // @ts-ignore
    const [rows, fields] = await req["db"].execute(
        "INSERT INTO vendedores (nome, email, tipo, login, senha, resgate, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values
    );

    return { entry: values };
};
