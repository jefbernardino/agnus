export default defineEventHandler(async (event) => {
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);
    // @ts-ignore
    const [rows, fields] = await event["db"].execute("SELECT * FROM clientes WHERE ativo = 1 AND vendedor_id = ?", [query.id]);
    return {
        columns: fields.map((i: any) => i.id),
        entries: rows,
    };
});
