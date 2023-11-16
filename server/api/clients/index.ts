export default defineEventHandler(async (event) => {
    // @ts-ignore
    const [rows, fields] = await event["db"].execute("SELECT c.*, v.nome as vendedor " +
        "FROM clientes c " +
        "INNER JOIN vendedores v ON c.vendedor_id = v.id " +
        "ORDER BY c.nome"
    );

    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entries: rows,
        // message: res.statusMessage
    };
});
