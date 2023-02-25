import type { IncomingMessage } from "http";
import { readBody } from "h3";
import destr from "destr";

export default async (req: IncomingMessage) => {
    // @ts-ignore
    const body = req['body'] ? destr(req['body']) : await readBody(req);

    const values = [
        body.vendedor_id, body.razao_social, body.nome, body.email, body.telefone, body.cpfcnpj,
        body.ie, body.cep, body.endereco, body.cidade, body.contato, body.ativo
    ]

    // @ts-ignore
    const [rows, fields] = await req["db"].execute(
        "INSERT INTO clientes (vendedor_id, razao_social, nome, email, telefone, cpfcnpj, ie, cep, endereco, cidade, contato, ativo) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values
    );

    return { entry: values };
};
