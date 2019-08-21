//libreria
import React, { useState } from 'react';

//componentes
import FilaProductos from './FilaProductos';


const FilaTicket = ({ ticket }) => {
    //estado
    const [toggle, setToggle] = useState(true);
    const lista = [];
    const btn_toggle = toggle ? "btn fa fa-plus" : "btn fa fa-minus";

    const redondeo = dato => Math.round(dato * 100) / 100;

    lista.push(<tr style={{ background: "rgb(251, 250, 250)" }}>
        <td><i className={btn_toggle} onClick={() => setToggle(!toggle)}></i></td>
        <td>{ticket.ticket}</td>
        <td style={{ textAlign: "right" }}>${ticket.importe}</td>
        <td style={{ textAlign: "right" }}>${ticket.importe_descuento}</td>
        <td style={{ textAlign: "right" }}>{redondeo(ticket.margen)}%</td>
        <td style={{ textAlign: "right" }}>{ticket.venta_pz}</td>
        <td style={{ textAlign: "right" }}>${ticket.utilidad}</td>
        <td style={{ textAlign: "center" }}>{ticket.hora}</td>
        <td>{ticket.fecha}</td>
    </tr>);
    toggle || lista.push(<FilaProductos productos={ticket.productos} />);
    return lista;
}

export default FilaTicket;