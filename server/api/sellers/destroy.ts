import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);

    const values = [ (query.id * -1), 0, query.id ]
    const valueIds = [ (query.id * -1), query.id ]

    // @ts-ignore
    await event["db"].execute("SET FOREIGN_KEY_CHECKS=0;");

    // @ts-ignore
    await event["db"].execute(
        "UPDATE clientes SET vendedor_id = ? where vendedor_id = ?",
        valueIds
    );

    // @ts-ignore
    await event["db"].execute(
        "UPDATE pedidos SET vendedor_id = ? where vendedor_id = ?",
        valueIds
    );

    // @ts-ignore
    await event["db"].execute(
        "UPDATE vendedores SET id = ?, ativo = ? where id = ?",
        values
    );

    // @ts-ignore
    await event["db"].execute("SET FOREIGN_KEY_CHECKS=1;");

    return { entry: values };
});
