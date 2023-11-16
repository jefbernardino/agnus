import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const body = event['body'] ? destr(event['body']) : await readBody(event);
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);

    const values = [
        body.nome, body.email, body.tipo, body.login, body.senha, body.resgate, body.ativo, query.id
    ]

    // @ts-ignore
    const [rows, fields] = await event["db"].execute(
        "UPDATE vendedores SET nome = ?, email = ?, tipo = ?, login = ?, senha = ?, resgate = ?, ativo = ? where id = ?",
        values
    );

    return { entry: values };
});
