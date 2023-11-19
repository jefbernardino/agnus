import destr from "destr";

export default defineEventHandler(async (event) => {
    const query = event['params'] ? destr(event['params']) : await getQuery(event);
    const [rows, fields] = await event["db"].execute("" +
        "SELECT * " +
        "FROM administradores " +
        "WHERE usuario = ? AND resgate = ?", [query.usuario, query.resgate]);

    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entry: rows[0] || {},
        // message: res.statusMessage
    }
})
