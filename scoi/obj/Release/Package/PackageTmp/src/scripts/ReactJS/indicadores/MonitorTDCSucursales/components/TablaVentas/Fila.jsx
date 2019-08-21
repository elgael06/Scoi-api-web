//Libreria
import React, { Fragment } from 'react';
import Moneda from '../../../../ComponentesGlobales/Moneda';
import Porcentaje from '../../../../ComponentesGlobales/Margen';


//Atributos Por Conceptos
const Fila = ({ children, datos }) => <Fragment>
    <td>{children}</td>
    <td style={{ textAlign: "right", color: datos.venta_anterior > 0 ? "#000" : "#FF0000" }}><Moneda cantidad={datos.venta_anterior} /></td>
    <td style={{ textAlign: "right", color: datos.venta_semana_pasado > 0 ? "#000" : "#FF0000" }}><Moneda cantidad={datos.venta_semana_pasado} /></td>
    <td style={{ textAlign: "right", color: datos.venta_actual > 0 ? "#000" : "#FF0000" }}><Moneda cantidad={datos.venta_actual} /></td>

    <td style={{ textAlign: "right", color: datos.diferencia_actual > 0 ? "#000" : "#FF0000" }}><label>{datos.diferencia_actual}%</label></td>
    <td style={{ textAlign: "right", color: datos.crecimiento_actual_anterior > 0 ? "#000" : "#FF0000" }}><Moneda cantidad={datos.crecimiento_actual_anterior} /></td>

    <td style={{ textAlign: "right", color: datos.piezas_anterior > 0 ? "#000" : "#FF0000" }}><label>{datos.piezas_anterior}</label></td>
    <td style={{ textAlign: "right", color: datos.piezas_semana_pasado > 0 ? "#000" : "#FF0000" }}><label>{datos.piezas_semana_pasado}</label></td>
    <td style={{ textAlign: "right", color: datos.piezas_actual > 0 ? "#000" : "#FF0000" }}><label>{datos.piezas_actual}</label></td>

    <td style={{ textAlign: "right", color: datos.margen_anterior > 0 ? "#000" : "#FF0000" }}><Porcentaje valor={datos.margen_anterior} /></td>
    <td style={{ textAlign: "right", color: datos.margen_semana_pasado > 0 ? "#000" : "#FF0000" }}><Porcentaje valor={datos.margen_semana_pasado} /></td>
    <td style={{ textAlign: "right", color: datos.margen_actual > 0 ? "#000" : "#FF0000" }}><Porcentaje valor={datos.margen_actual} /></td>

    <td style={{ textAlign: "right", color: datos.margen_actual_anterior > 0 ? "#000" : "#FF0000" }}><Porcentaje valor={datos.margen_actual_anterior} /></td>
</Fragment>;

export default Fila;