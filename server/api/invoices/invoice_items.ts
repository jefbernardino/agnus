import type { IncomingMessage, ServerResponse } from "http";
import { fromNodeMiddleware, getQuery } from "h3";
import destr from "destr";

export default async (req: IncomingMessage, res: ServerResponse) => {
    const query = req['params'] ? destr(req['params']) : await getQuery(req);
    const [rows, fields] = await req["db"].execute("" +
        "SELECT p.*, produto.nome, produto.imagem " +
        "FROM pedidos_has_produtos p " +
        "LEFT JOIN produtos produto ON p.produto_id = produto.id " +
        "WHERE p.pedido_id = ?", [query.id]);

    return {
        columns: fields.map((i: any) => i.id),
        entries: rows,
    };
};
