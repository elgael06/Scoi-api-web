//libreria
import React from 'react';


const FilaProductos = ({ productos }) => productos.map(producto => <tr>
    <td>{producto.codigo}</td>
    <td >{producto.descripcion}</td>
    <td style={{ textAlign: "right" }}>${producto.importe}</td>
    <td style={{ textAlign: "right" }}>${producto.importe_descuento}</td>
    <td style={{ textAlign: "right" }}>{producto.margen}%</td>
    <td style={{ textAlign: "right" }}>{producto.venta_pz}</td>
    <td style={{ textAlign: "right" }}>${producto.utilidad}</td>
    <td style={{ textAlign: "center" }}>--</td>
    <td>{producto.tipo}</td>
</tr>);

export default FilaProductos;