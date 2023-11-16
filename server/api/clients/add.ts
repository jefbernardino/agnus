import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const body = event['body'] ? destr(event['body']) : await readBody(event);

    const values = [
        body.vendedor_id, body.razao_social, body.nome, body.email, body.telefone, body.cpfcnpj,
        body.ie, body.cep, body.endereco, body.cidade, body.contato, body.ativo
    ]

    // @ts-ignore
    const [rows, fields] = await event["db"].execute(
        "INSERT INTO clientes (vendedor_id, razao_social, nome, email, telefone, cpfcnpj, ie, cep, endereco, cidade, contato, ativo) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values
    );

    return { entry: values };
});
