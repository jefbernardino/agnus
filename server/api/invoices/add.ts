import type { IncomingMessage } from "http";
import { readBody } from "h3";
import destr from "destr";

export default async (req: IncomingMessage) => {
    // @ts-ignore
    const body = req['body'] ? destr(req['body']) : await readBody(req);

    const values = [
        body.empresa_faturar, body.vendedor_id, body.cliente_id, body.data, body.prazo_pagamento,
        body.data_entrega, body.ipi, body.valor, body.observacao, body.status, body.ativo
    ]

    // @ts-ignore
    const addInvoice = await req["db"].execute(
        "INSERT INTO pedidos (empresa_faturar, vendedor_id, cliente_id, data, prazo_pagamento, data_entrega, ipi, valor, observacao, status, ativo) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values,
    );

    const invoiceId = addInvoice[0].insertId

    // @ts-ignore
    await req["db"].query(
        'INSERT INTO pedidos_has_produtos (pedido_id, produto_id, espessura, quantidade, valor) VALUES ?',
        // @ts-ignore
        [body.produtos.map(product => [
            invoiceId, product.produto_id, product.espessura, product.quantidade, parseFloat(product.valor)
        ])]
    );

    return { entry: values };
};
