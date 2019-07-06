import React, { useState } from 'react';

const VistaDetalleOrden = ({ orden }) => {

    const cerrar = () => {
        document.querySelector("#").style.display = "none";
    }

    return (<div class="modal" id="VistaDetalleOrden">
        <div class="panel panel-primary" style="max-width:950px">
            <div class="panel-heading">
                <i class="fa fa-close close" onClick={cerrar}></i>
            <label>Orden Compra # { orden.Folio }. </label>
            </div>
        </div>
        <div class="panel-body">
            <DatosOrden detalle={orden.Detalle} />

        </div>
        <div class="panel-footer" style={{ height: "50px"}}>
            <i class="fa fa-close btn btn-danger" onClick={cerrar} style={{ float: "right"}}> Cerrar</i>
        </div>
    </div>);
}

const DatosOrden = ({ detalle }) => {

    return (<div class="row">
        <ColInput titulo={"Elaboro"} dato={detalle.Elaboro} tamanio={4} />
        <ColInput titulo={"Surtio"} dato={detalle.Surtio} tamanio={4} />
        <ColInput titulo={"Autorizo"} dato={detalle.Autorizo} tamanio={4} />
        <ColInput titulo={"Recoge"} dato={detalle.Recoge} tamanio={4} />
        <ColInput titulo={"Tipo Recoge"} dato={detalle.Tipo_recoge} tamanio={2} />
        <ColInput titulo={"Tipo"} dato={detalle.Tipo} tamanio={3} />
        <ColInput titulo={"Fecha"} dato={detalle._mod} tamanio={3} />

        <div class="col-sm-12 form-group-sm">
            <label>Uso</label>
            <textarea class="form-control" cols="5" style="resize:none">{ detalle.Uso_mercancia }</textarea>
        </div>
    </div>);
}

const ColInput = ({ titulo,dato,tamanio }) => {

    return (<div class={`col-sm-${tamanio || 2} form-group-sm`}>
        <label>{titulo}</label>
        <i class="form-control">{ dato }</i>
    </div>);
}
const ColText = ({ titulo, dato, tamanio }) => {

    return (<div class={`col-sm-${tamanio || 2} form-group-sm`}>
        <label>{titulo}</label>
        <textarea class="form-control" cols="5" style="resize:none">{dato}</textarea>
    </div>);
}

export default VistaDetalleOrden;