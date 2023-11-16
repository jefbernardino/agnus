import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const body = event['body'] ? destr(event['body']) : await readBody(event);
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);

    const values = [
        body.nome, body.email, body.usuario, body.resgate, body.resgate, body.role, body.ativo, query.id
    ]

    // @ts-ignore
    const [rows, fields] = await event["db"].execute(
        "UPDATE administradores SET nome = ?, email = ?, usuario = ?, senha = ?, resgate = ?, role = ?, ativo = ? where id = ?",
        values
    );

    return { entry: values };
});
