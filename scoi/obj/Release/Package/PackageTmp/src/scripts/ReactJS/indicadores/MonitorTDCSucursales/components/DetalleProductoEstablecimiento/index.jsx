//libreria
import React from 'react';

import Detalle from './Detalle';
import TablaAsignaciones from './TablaAsignaciones';
//variables globales
const obtener_datos_venta = (venta, valor) => venta != null ? venta.find(e => e)[valor] : valor;

const DetalleProductoEstablecimiento = ({ venta, asignacion }) => {
    //variables
    const datos = a => obtener_datos_venta(venta,a);
    let establecimiento = datos("establecimiento"),
        codigo_producto = datos("cod_prod"),
        descripcion_producto = datos("descripcion");
    //funciones
    const cerrar = () => document.querySelector("#detall_eproducto").style.display = "none";

    return (<div className="modal" id="detall_eproducto" style={{display:"flex"}}>
        <div className="panel panel-primary" style={{maxWidth:"970px",width:"90%"}}>
            <div className="panel-heading">
                <u className="close" style={{ fontSize: 14 }} onClick={cerrar}> cerrar</u>
                <label>Detalle Venta.</label>
            </div>
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <Detalle detalle={{ establecimiento, codigo_producto, descripcion_producto }} />
                    </div>
                    <div className="panel-body">
                        <div style={{ overflow: "auto", maxHeight: "600px" }}>
                            <TablaAsignaciones datos={venta || []} seleccion={asignacion} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default DetalleProductoEstablecimiento;