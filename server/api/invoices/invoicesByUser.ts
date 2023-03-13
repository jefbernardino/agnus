import type { IncomingMessage, ServerResponse } from "http";

export default async (req: IncomingMessage, res: ServerResponse) => {
    // @ts-ignore
    const query = req['params'] ? destr(req['params']) : await getQuery(req);
    // @ts-ignore
    const [rows, fields] = await req["db"].execute("" +
        "SELECT p.*, c.nome AS cliente_nome, v.nome AS vendedor_nome, " +
        "(SELECT SUM(php.valor * php.quantidade)) AS valor_total " +
        "FROM pedidos AS p " +
        "LEFT JOIN pedidos_has_produtos AS php ON p.id = php.pedido_id " +
        "LEFT JOIN vendedores v ON p.vendedor_id = v.id " +
        "LEFT JOIN clientes c ON p.cliente_id = c.id " +
        "WHERE p.vendedor_id = ? " +
        "GROUP BY p.id ORDER BY p.id DESC", [query.id]);
    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entries: rows,
        // message: res.statusMessage
    };
};
