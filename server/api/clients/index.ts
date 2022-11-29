import type { IncomingMessage, ServerResponse } from "http";

export default async (req: IncomingMessage, res: ServerResponse) => {
    const [rows, fields] = await req["db"].execute("SELECT c.*, v.nome as vendedor " +
        "FROM clientes c " +
        "INNER JOIN vendedores v ON c.vendedor_id = v.id " +
        "ORDER BY c.nome");
    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entries: rows,
        // message: res.statusMessage
    };
};
