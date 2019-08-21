//Libreria
import React from 'react';

//componentes
import Establecimiento from './Establecimiento';

//Variables
const componentesTabla = ["Venta Año Anterior", "Venta Semana Anterior", " Venta Año Act.", " % Crec Año Anterior vs Act.", "Deficit o Crec", "pz Año Anterior", "pz Semana Ant.", "pz Año Act.", "Margen Año Anterior", "Margen Semana Ant.", "Margen Año Act.", "Def o Crec Margen"];
//Principal
const TablaVentas = ({ monitor, detalle }) => {
    console.log("Monitor=>", monitor);
    return <div class="panel panel-body" >
        <div style={{ overflow: "auto", maxHeight: "750px" }}>
            <table class="table">
                <thead>
                    <tr style={{ background: "#1e88e5", color:"#FFF"}}>
                        <th style={{ background: "#1e88e5", color: "#FFF" }}>Concepto</th>
                        {componentesTabla.map(e => <th style={{ background: "#1e88e5", color: "#FFF" }}>{e}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {monitor.sort((a, b) => a.clasificador > b.clasificador ? 1 : -1).map(e => <Establecimiento consulta={detalle} monitor={e} />)}
                </tbody>
            </table>
        </div>
    </div>
}

export default TablaVentas;