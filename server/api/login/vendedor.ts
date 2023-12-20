import destr from "destr";

export default defineEventHandler(async (event) => {
    const query = event['params'] ? destr(event['params']) : await getQuery(event);
    const [rows, fields] = await event["db"].execute("" +
        "SELECT * " +
        "FROM vendedores " +
        "WHERE login = ? AND resgate = ? AND ativo = ? AND id > 0", [query.login, query.resgate, 1]);

    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entry: rows[0] || {},
        // message: res.statusMessage
    }
});
