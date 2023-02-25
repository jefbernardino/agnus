import type { IncomingMessage } from "http";
import { readBody, getQuery } from "h3";
import destr from "destr";

export default async (req: IncomingMessage) => {
    // @ts-ignore
    const body = req['body'] ? destr(req['body']) : await readBody(req);
    // @ts-ignore
    const query = req['params'] ? destr(req['params']) : await getQuery(req);

    const values = [
        body.vendedor_id, body.razao_social, body.nome, body.email, body.telefone, body.cpfcnpj,
        body.ie, body.cep, body.endereco, body.cidade, body.contato, body.ativo, query.id
    ]

    // @ts-ignore
    const [rows, fields] = await req["db"].execute(
        "UPDATE clientes SET vendedor_id = ?, razao_social = ?, nome = ?, email = ?, telefone = ?, " +
        "cpfcnpj = ?, ie = ?, cep = ?, endereco = ?, cidade = ?, contato = ?, ativo = ? where id = ?",
        values
    );

    return { entry: values };
};
