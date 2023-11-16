import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const body = event['body'] ? destr(event['body']) : await readBody(event);
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);

    const values = [
        body.vendedor_id, body.razao_social, body.nome, body.email, body.telefone, body.cpfcnpj,
        body.ie, body.cep, body.endereco, body.cidade, body.contato, body.ativo, query.id
    ]

    // @ts-ignore
    const [rows, fields] = await event["db"].execute(
        "UPDATE clientes SET vendedor_id = ?, razao_social = ?, nome = ?, email = ?, telefone = ?, " +
        "cpfcnpj = ?, ie = ?, cep = ?, endereco = ?, cidade = ?, contato = ?, ativo = ? where id = ?",
        values
    );

    return { entry: values };
});
