import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const body = event['body'] ? destr(event['body']) : await readBody(event);

    const values = [
        body.nome, body.email, body.usuario, body.senha, body.resgate, body.role, body.ativo
    ]

    // @ts-ignore
    const [rows, fields] = await event["db"].execute(
        "INSERT INTO administradores (nome, email, usuario, senha, resgate, role, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values
    );

    return { entry: values };
});
