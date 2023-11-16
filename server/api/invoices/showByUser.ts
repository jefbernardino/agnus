import destr from "destr";

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const query = event['params'] ? destr(event['params']) : await getQuery(event);
    // @ts-ignore
    const [rows, fields] = await event["db"].execute("" +
        "SELECT pedido.*, cliente.nome as cliente_nome, vendedor.nome as vendedor_nome, " +
        "(SELECT SUM(php.valor * php.quantidade)) AS valor_total " +
        "FROM pedidos pedido " +
        "LEFT JOIN pedidos_has_produtos AS php ON pedido.id = php.pedido_id " +
        "LEFT JOIN vendedores vendedor ON pedido.vendedor_id = vendedor.id " +
        "LEFT JOIN clientes cliente on pedido.cliente_id = cliente.id " +
        "WHERE pedido.id = ? AND pedido.vendedor_id = ? " + 
        "GROUP BY pedido.id", [query.id, query.vendedor_id]);

    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entry: rows[0] || {},
        // message: res.statusMessage
    }
});
