import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);
    // @ts-ignore
    const [rows, fields] = await event["db"].execute("" +
        "SELECT p.*, produto.nome, produto.imagem " +
        "FROM pedidos_has_produtos p " +
        "LEFT JOIN produtos produto ON p.produto_id = produto.id " +
        "WHERE p.pedido_id = ?", [query.id]);

    return {
        columns: fields.map((i: any) => i.id),
        entries: rows,
    };
});
