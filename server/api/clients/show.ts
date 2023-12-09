import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);

    // @ts-ignore
    const [rows, fields] = await event["db"].execute("" +
        "SELECT clientes.* FROM clientes " +
        "LEFT JOIN vendedores on clientes.vendedor_id = vendedores.id " +
        "WHERE clientes.id = ?", [query.id]);

    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.name),
        entry: rows[0] || {},
        // message: res.statusMessage
    }
});
