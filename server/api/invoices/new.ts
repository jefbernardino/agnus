export default defineEventHandler(async (event) => {
    // @ts-ignore
    const [rows, fields] = await event["db"].execute("SELECT * FROM produtos WHERE ativo = 1");
    return {
        columns: fields.map((i: any) => i.id),
        entries: rows,
    };
});
