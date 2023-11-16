import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const body = event['body'] ? destr(event['body']) : await readBody(event);

    const values = [
        body.nome, body.preco, body.tipo, body.ativo
    ]

    // @ts-ignore
    const [rows, fields] = await event["db"].execute(
        "INSERT INTO produtos (nome, preco, tipo, ativo) VALUES (?, ?, ?, ?)",
        values
    );

    return { entry: values };
});
