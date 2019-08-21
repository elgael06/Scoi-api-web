//libreria
import React from 'react';

//componentes
import DetallesColaborador from './DetallesColaborador';
import TablaAsignacion from './TablaAsignacion';

//variables globales
const obtener_datos_venta = (venta, valor) => venta.length > 0 ? venta.find(e => e)[valor] : "";

const AsignacionEmpleado = ({ asignacion, detalles, tickets }) => {
    //variables
    const datos = a => obtener_datos_venta(detalles, a);
    let nombre = datos("nombre_cajero");
    let folio = datos("folio");
    //funciones
    const cerrar = () => {
        document.querySelector("#asignacion_empleado").style.display = "none";
    }

    return (<div className="modal" id="asignacion_empleado">
        <div className="panel panel-warning" style={{ maxWidth: "1170px", width: "90%" }}>
            <div className="panel-heading" >
                <u className="close" style={{ fontSize: 14 }} onClick={cerrar}> cerrar</u>
                <label>Asignacion : {asignacion}</label>
            </div>
            <div className="panel-group">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <DetallesColaborador detalles={{
                            folio,
                            nombre
                        }} />
                    </div>
                </div>
            </div>
            <div className="panel-body" >
                <div style={{ overflow: "auto", maxHeight: "400px", minHeight: "200px" }}>
                    <TablaAsignacion tickets={tickets} />
                </div>
            </div>
        </div>
    </div>);
}


export default AsignacionEmpleado;