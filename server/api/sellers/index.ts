export default defineEventHandler(async (event) => {
    const [rows, fields] = await event["db"].execute("SELECT * FROM vendedores order by nome");
    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entries: rows,
        // message: res.statusMessage
    };
});
