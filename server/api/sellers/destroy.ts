import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);

    const values = [ query.id ]

    // @ts-ignore
    const [rows, fields] = await event["db"].execute("DELETE FROM vendedores WHERE id = ?", values);

    return { entry: values };
});
