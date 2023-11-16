export default defineEventHandler(async (event) => {
    // @ts-ignore
    const [rows, fields] = await event["db"].execute("SELECT * FROM administradores order by nome");
    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entries: rows,
        // message: res.statusMessage
    };
});
