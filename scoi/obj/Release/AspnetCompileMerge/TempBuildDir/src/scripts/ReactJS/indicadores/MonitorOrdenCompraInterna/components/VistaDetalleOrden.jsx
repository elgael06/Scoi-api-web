import React, { useState } from 'react';
import Moneda from '../../../ComponentesGlobales/Moneda';



const VistaDetalleOrden = ({ orden, cerrar}) => {
    const { Folio, Detalle, Tipo, Fecha_mod, Productos, Establecimiento_solicita } = orden;
    let total = 0;

    for (let d of Productos) {
        total += d.Total
    }

    return (<div class="modal" style={{display:"flex"}}>
        <div class="panel panel-primary" style={{ maxWidth: "950px" }}>
            <div class="panel-heading">
                <i class="fa fa-close close" onClick={cerrar}></i>
            <label>Orden Compra # { Folio }. </label>
            </div>
            <div class="panel-body">
                <DatosOrden detalle={Detalle} Tipo={Tipo} Fecha_mod={Fecha_mod} Establecimiento_solicita={Establecimiento_solicita} />
                <label style={{ padding: "5px" }}>Productos: {Productos.length}</label>
                <TablaProductos productos={Productos} />
                <TotalProductos total={total} />
            </div>
            <div class="panel-footer" style={{ height: "50px" }}>
                <i class="fa fa-close btn btn-danger" onClick={cerrar} style={{ float: "right" }}> Cerrar</i>
            </div>
        </div>
    </div>);
}

const DatosOrden = ({ detalle, Tipo, Fecha_mod, Establecimiento_solicita}) => {
    const { Elaboro, Surtio, Autorizo, Recoge, Tipo_recoge, Uso_mercancia } = detalle;
    const fecha = function () {
        let f = Fecha_mod.split(" ");
        return f[0];
    }();

    return (<div class="row">
        <ColInput titulo={"Elaboro"} dato={Elaboro || ""} tamanio={4} />
        <ColInput titulo={"Surtio"} dato={Surtio || ""} tamanio={4} />
        <ColInput titulo={"Autorizo"} dato={Autorizo || ""} tamanio={4} />
        <ColInput titulo={"Recoge"} dato={Recoge || ""} tamanio={4} />
        <ColInput titulo={"Tipo Recoge"} dato={Tipo_recoge || ""} tamanio={2} />
        <ColInput titulo={"Establecimiento"} dato={Establecimiento_solicita || ""} tamanio={3} />
        <ColInput titulo={"Tipo"} dato={Tipo || ""} tamanio={1} />
        <ColInput titulo={"Fecha"} dato={fecha || ""} tamanio={2} />
        <ColText titulo={"Uso"} dato={Uso_mercancia || ""} tamanio={12} />
    </div>);
}

const TablaProductos = ({ productos }) => <div style={{ maxHeight: "400px", overflow: "auto", border:"solid 2px #3498DB",borderRadius:"5px",borderBottomRightRadius:"0"}}>
    <table class="table table-bordered table-condensed">
        <thead >
            <tr>
                <th class="bg-blue">Codigo</th>
                <th class="bg-blue">Descripcion</th>
                <th class="bg-blue">Abreviatura</th>
                <th class="bg-blue">Cantidad</th>
                <th class="bg-blue">Costo</th>
                <th class="bg-blue">Promedio</th>
                <th class="bg-blue">Precio</th>
                <th class="bg-blue">Total</th>
            </tr>
        </thead>
        <tbody>
            {
                productos.map(e => <tr>
                    <td style={{ textAlign: "center" }}>{e.Codigo}</td>
                    <td>{e.Descripcion}</td>
                    <td style={{textAlign:"center"}}>{e.Abrebiatura}</td>
                    <td style={{ textAlign: "center" }}>{e.Cantida}</td>
                    <td style={{ textAlign: "right" }}>
                        <Moneda cantidad={e.Ultimo_costo} />                        
                    </td>
                    <td style={{ textAlign: "right" }}>
                        <Moneda cantidad={e.Costo_promedio} />   
                        
                    </td>
                    <td style={{ textAlign: "right" }}>
                        <Moneda cantidad={e.Precio_venta} />                            
                    </td>
                    <td style={{ textAlign: "right" }}>
                        <Moneda cantidad={e.Total} />                            
                    </td>
                </tr>)
            }
        </tbody>
    </table>
</div>;

const TotalProductos = ({ total }) => <div style={{ color: "#000", textAlign: "right", float: "right", width: "200px", border:"solid 2px #3498DB",borderBottomRightRadius:"5px",borderBottomLeftRadius:"5px",borderTop:"none",padding:"5px" }}
    class="form-group-sm form-inline" >
    <label style={{float:"left"}}>Total :</label>
    <Moneda style={{ float: "left" }} cantidad={total} />
</div>

const ColInput = ({ titulo,dato,tamanio }) => (<div class={`col-sm-${tamanio || 2} form-group-sm`} style={{padding:"5px"}}>
        <label>{titulo}</label>
        <i class="form-control">{ dato }</i>
</div>);

const ColText = ({ titulo, dato, tamanio }) => (<div class={`col-sm-${tamanio || 2} form-group-sm`}>
        <label>{titulo}</label>
        <textarea class="form-control" cols="5" style={{ resize: "none" }}>{dato}</textarea>
    </div>);

export default VistaDetalleOrden;