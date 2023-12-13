import destr from "destr";
import nodemailer from 'nodemailer';
import moment from "moment";

let BRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

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

    let client = {}
    let seller = {}

    if(body.cliente_id) {
      // @ts-ignore
      const [rows] = await event["db"].execute("SELECT * FROM clientes WHERE id = ?", [body.cliente_id]);
      client = rows[0] || {}
    }

    if(body.vendedor_id) {
        // @ts-ignore
        const [rows] = await event["db"].execute("SELECT * FROM vendedores WHERE id = ?", [body.vendedor_id]);
        seller = rows[0] || {}
    }

    const values = [
        body.empresa_faturar, body.vendedor_id, body.cliente_id, body.data, body.prazo_pagamento,
        body.data_entrega, body.ipi, body.valor, body.observacao, body.status, body.ativo, body.created, body.modified
    ]

    // @ts-ignore
    const addInvoice = await event["db"].execute(
        "INSERT INTO pedidos (empresa_faturar, vendedor_id, cliente_id, data, prazo_pagamento, data_entrega, ipi, valor, observacao, status, ativo, created, modified) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

    let total = 0;

    let productList = body.produtos.map((product) => {
        if(product.produto_id) {
            let qtde = parseFloat(product.quantidade.replace('.', '').replace(',', '.'))
            let val = parseFloat(product.valor.replace('.', '').replace(',', '.'))

            total += (qtde * val)
            return `<tr>
              <td style="text-align: left">${product.nome}</td>
              <td style="text-align: center">${product.espessura}</td>
              <td style="text-align: center">${product.quantidade}</td>
              <td style="text-align: right">${BRL.format(val)}</td>
              <td style="text-align: right">${BRL.format(qtde * val)}</td>
            </tr>`
        }
    }).join("");

    try {
        await transporter.sendMail({
            from: 'contato@agnusplast.com.br',
            to: 'jefbernardino@gmail.com',
            subject: 'Novo pedido feito pelo site',
            // text: 'TESTE DE EMAIL!',
            html: `
<div size="A4" style="background-color:#f5f5f5;margin:0;padding:5px 0 5px 0;width:100%" dir="ltr">
<table style="width:100%" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center" valign="top">
<div>&nbsp;</div>
<table style="border:1px solid #dcdcdc;border-radius:3px;max-width:920px;background-color:#fdfdfd" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center" valign="top">
<table style="border-radius:3px 3px 0px 0px;color:#ffffff;border-bottom-width:0px;font-weight:bold;line-height:100%;vertical-align:middle;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;width:600px;background-color:#557da1" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding:10px 5px;display:block">
<h1 style="color:#ffffff;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:300;line-height:150%;margin:0;text-align:center">
Novo pedido de ${seller.nome}
</h1>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center" valign="top">
<table style="width:600px" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="background-color:#fdfdfd" valign="top">
<table style="width:100%" border="0" cellspacing="0" cellpadding="20">
<tbody>
<tr>
<td style="padding:5px" valign="top">
<div style="color:#737373;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:12px;line-height:150%;text-align:center">
<p style="margin:0 0 16px">Você recebeu um pedido de <strong>${client.nome}</strong>, feito por <strong>${seller.nome}</strong>. O pedido é o seguinte:</p>
<h2 style="color:#557da1;display:block;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:10px 0;text-align:left">
<a style="color:#557da1;font-weight:normal;text-decoration:underline" href="#">
Pedido #${invoiceId}
</a> 
(${moment(new Date().toJSON()).format('DD/MM/YYYY')})
</h2>
<table style="width: 100%">
<tr>
<td class="col-md-3"><b>Prazo para pagamento:</b><br />${body.prazo_pagamento}</td>
<td class="col-md-3"><b>Data entrega:</b><br />${moment(body.data_entrega).format('DD/MM/YYYY')}</td>
<td class="col-md-3"><b>IPI:</b><br />${body.ipi}</td>
</tr>
</table>
<table style="width:100%;color:#737373;border:1px solid #e4e4e4" border="1" cellspacing="0" cellpadding="6">
<thead>
<tr>
<th style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px">
Produto
</th>
<th style="text-align:center;color:#737373;border:1px solid #e4e4e4;padding:4px">
Espessura
</th>
<th style="text-align:center;color:#737373;border:1px solid #e4e4e4;padding:4px">
Qtde
</th>
<th style="text-align:right;color:#737373;border:1px solid #e4e4e4;padding:4px">
Preço Unitário
</th>
<th style="text-align:right;color:#737373;border:1px solid #e4e4e4;padding:4px">
Subtotal
</th>
</tr>
</thead>
<tbody>
${productList}
</tbody>
<tfoot>
<tr>
<th style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px" colspan="4">
Total:
</th>
<td style="text-align:right;color:#737373;border:1px solid #e4e4e4;padding:4px">
<span>${BRL.format(total)}</span>
</td>
</tr>
<tr>
<th style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:8px" colspan="5">
<strong>Observação</strong>
</th>
</tr>
<tr>
<td style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:8px" colspan="5">
<span>${body.observacao}</span>
</td>
</tr>
<tr>
  <th style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:8px" colspan="5">
    <strong>Empresa a faturar</strong>
  </th>
</tr>
<tr>
  <td style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:8px" colspan="5">
    <span>${body.empresa_faturar === 'Agnusplast' ? 'Agnusplast Indústria e Comércio' : 'J Colombo Comércio e Embalagens'}</span>
  </td>
</tr>
</tfoot>
</table>
<h2 style="color:#557da1;display:block;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:130%;margin:10px 0 8px;text-align:left">
Dados do cliente - ${client.razao_social}
</h2>
<table style="width:100%;color:#737373;border:1px solid #e4e4e4" border="1" cellspacing="0" cellpadding="4">
  <thead>
    <tr>
      <th style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px">
        Nome
      </th>
      <th style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px">
        Email
      </th>
      <th style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px">
        CPF / CNPJ
      </th>
      <th style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px">
        IE
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${client.nome}</td>
      <td>${client.email}</td>
      <td>${client.cpfcnpj}</td>
      <td>${client.ie}</td>
    </tr>
    <tr>
      <td style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px">CEP</td>
      <td style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px">Endereço</td>
      <td style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px">Telefone</td>
      <td style="text-align:left;color:#737373;border:1px solid #e4e4e4;padding:4px">Contato</td>
    </tr>
    <tr>
      <td>${client.cep}</td>
      <td>${client.endereco}</td>
      <td>${client.telefone}</td>
      <td>${client.contato}</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">
        <strong>Cidade / UF:</strong>
        <span style="color:#505050;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif">
          ${client.cidade}
        </span>
      </td>
      <td colspan="2">
        <strong>Vendedor:</strong>
        <span style="color:#505050;font-family:'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif">
          ${seller.nome}
        </span>
      </td>
    </tr>
  </tfoot>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td align="center" valign="top">
<table style="width:600px" border="0" cellspacing="0" cellpadding="10">
<tbody>
<tr>
<td style="padding:0" valign="top">
<table style="width:100%" border="0" cellspacing="0" cellpadding="10">
<tbody>
<tr>
<td style="padding:0 5px 5px 5px;border:0;color:#99b1c7;font-family:Arial;font-size:12px;line-height:125%;text-align:center" colspan="2" valign="middle">
<p>&copy; ${moment(new Date).format('YYYY')} Grupo Agnus / Agnus Plast – Todos os Direitos reservados</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
            `
        });
    } catch (ex) {
        console.log(`Falha ao enviar e-mail: ${ex}`);
    }

    return { entry: values };
});
