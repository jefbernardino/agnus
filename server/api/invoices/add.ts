import destr from "destr";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    name: 'no-reply@agnusplast.com.br',
    host: 'mail.agnusplast.com.br',
    service: 'mail.agnusplast.com.br',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const body = event['body'] ? destr(event['body']) : await readBody(event);

    const values = [
        body.empresa_faturar, body.vendedor_id, body.cliente_id, body.data, body.prazo_pagamento,
        body.data_entrega, body.ipi, body.valor, body.observacao, body.status, body.ativo
    ]

    // @ts-ignore
    const addInvoice = await event["db"].execute(
        "INSERT INTO pedidos (empresa_faturar, vendedor_id, cliente_id, data, prazo_pagamento, data_entrega, ipi, valor, observacao, status, ativo) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        values,
    );

    const invoiceId = addInvoice[0].insertId

    // @ts-ignore
    await event["db"].query(
        'INSERT INTO pedidos_has_produtos (pedido_id, produto_id, espessura, quantidade, valor) VALUES ?',
        // @ts-ignore
        [body.produtos.map(product => [
            invoiceId, product.produto_id, product.espessura, product.quantidade, parseFloat(product.valor)
        ])]
    );

    try {
        await transporter.sendMail({
            from: 'contato@agnusplast.com.br',
            to: 'jefbernardino@gmail.com',
            subject: 'New contact form message',
            text: 'TESTE DE EMAIL!'
        });
    } catch (ex) {
        console.log(`Falha ao enviar e-mail: ${ex}`);
    }

    return { entry: values };
});
