import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const body = event['body'] ? destr(event['body']) : await readBody(event);

    const values = [
        body.nome, body.email, body.tipo, body.login, body.senha, body.resgate, body.ativo
    ]

    // @ts-ignore
    const [rows, fields] = await event["db"].execute(
        "INSERT INTO vendedores (nome, email, tipo, login, senha, resgate, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values
    );

    return { entry: values };
});
