export default defineEventHandler(async (event) => {
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);
    // @ts-ignore
    const [rows, fields] = await event["db"].execute("" +
        "SELECT c.*, v.nome as vendedor " +
        "FROM clientes c " +
        "INNER JOIN vendedores v ON c.vendedor_id = v.id " +
        "WHERE c.vendedor_id = ? " +
        "GROUP BY c.id ORDER BY c.id DESC", [query.id]);
    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entries: rows,
        // message: res.statusMessage
    };
});
