// import type { IncomingMessage, ServerResponse } from "http";
// import { fromNodeMiddleware, getQuery } from "h3";
// import destr from "destr";
//
// export default async (req: IncomingMessage, res: ServerResponse) => {
//     // @ts-ignore
//     const query = req['params'] ? destr(req['params']) : await getQuery(req);
//     // @ts-ignore
//     const [rows, fields] = await req["db"].execute("" +
//         "SELECT * " +
//         "FROM administradores " +
//         "WHERE usuario = ? AND resgate = ?", [query.usuario, query.resgate]);
//
//     return {
//         // status: res.statusCode,
//         columns: fields.map((i: any) => i.id),
//         entry: rows[0] || {},
//         // message: res.statusMessage
//     }
// };

import { fromNodeMiddleware, getQuery } from "h3";

export default defineEventHandler(async (event) => {
    // // @ts-ignore
    const { usuario, resgate } = getQuery(event)

    // @ts-ignore
    const [rows, fields] = await event.context.db.execute("" +
        "SELECT * " +
        "FROM administradores " +
        "WHERE usuario = ? AND resgate = ?", [usuario, resgate]);

    console.log("rows", rows)
    console.log("fields", fields)

    return {
        // status: res.statusCode,
        columns: fields.map((i: any) => i.id),
        entry: rows[0] || {},
        // message: res.statusMessage
    }
});
