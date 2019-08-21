//libreria
import React from 'react';

const cavecera_tabla = [
    "asignacion",
    "ticket",
    "Piezas",
    "Costo",
    "importe",
    "Utilidad",
    "Margen",
    "Tipo",
    "cliente",
];

const TablaAsignaciones = ({ datos, seleccion }) => <table className="table" >
    <thead>
        <tr>
            {cavecera_tabla.map(e => <th className="active">{e}</th>)}
        </tr>
    </thead>
    <tbody>
        {datos.map(e => <tr className={e.margen_actual > 5 || "danger"}>
            <td onClick={() => seleccion(e.asignacion_actual)}>
                <u>{e.asignacion_actual}</u>
            </td>
            <td>{e.ticket}</td>
            <td>{e.venta_piezas_actual}</td>
            <td>${e.costo_actual}</td>
            <td>${e.importe_sin_IVA_actual}</td>
            <td>${e.utilidad_bruta_actual}</td>
            <td>{e.margen_actual}%</td>
            <td>{e.tipo_de_venta}</td>
            <td>{e.cliente}</td>
        </tr>)}
    </tbody>
</table>;

export default TablaAsignaciones;
