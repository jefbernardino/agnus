import type { IncomingMessage, ServerResponse } from "http";
import { fromNodeMiddleware, getQuery } from "h3";
import destr from "destr";

export default async (req: IncomingMessage, res: ServerResponse) => {
    const query = req['params'] ? destr(req['params']) : await getQuery(req);
    const [rows, fields] = await req["db"].execute("" +
        "SELECT pedido.*, cliente.nome as cliente_nome, vendedor.nome as vendedor_nome, " +
        "(SELECT SUM(php.valor * php.quantidade)) AS valor_total " +
        "FROM pedidos pedido " +
        "LEFT JOIN pedidos_has_produtos AS php ON pedido.id = php.pedido_id " +
        "LEFT JOIN vendedores vendedor ON pedido.vendedor_id = vendedor.id " +
        "LEFT JOIN clientes cliente on pedido.cliente_id = cliente.id " +
        "WHERE pedido.id = ?", [query.id]);

    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entry: rows[0] || {},
        // message: res.statusMessage
    }
};
