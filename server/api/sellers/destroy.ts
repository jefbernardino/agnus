import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);

    const values = [ (query.id * -1), query.id ]

    // // @ts-ignore
    // const [rows, fields] = await event["db"].execute("DELETE FROM vendedores WHERE id = ?", values);

    // @ts-ignore
    const [rows, fields] = await event["db"].execute(
        "UPDATE vendedores SET id = ? where id = ?",
        values
    );

    return { entry: values };
});
