//Libreria
import React, { useState, Fragment } from 'react';
import dia_semana from '../../../../Globales/Ordenamiento/dia_semana';
import Moneda from '../../../ComponentesGlobales/Moneda';
import Porcentaje from '../../../ComponentesGlobales/Margen';
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

    <td style={{ textAlign: "right", color: datos.margen_anterior > 0 ? "#000" : "#FF0000" }}><Porcentaje valor={datos.margen_anterior}/></td>
    <td style={{ textAlign: "right", color: datos.margen_semana_pasado > 0 ? "#000" : "#FF0000" }}><Porcentaje valor={datos.margen_semana_pasado}/></td>
    <td style={{ textAlign: "right", color: datos.margen_actual > 0 ? "#000" : "#FF0000" }}><Porcentaje valor={datos.margen_actual} /></td>

    <td style={{ textAlign: "right", color: datos.margen_actual_anterior > 0 ? "#000" : "#FF0000" }}><Porcentaje valor={datos.margen_actual_anterior}/></td>
</Fragment>;
//Filas Conceptos
const FilaConcepto = ({ monitor, Children, subConcepto, color, left, consulta }) => {
    //estados
    const [toggle, setToggle] = useState(true);
    //eventos
    const icono = toggle ? "btn-default fa fa-plus" : "btn-default fa fa-minus" ;
    //variables
    let color_ = color ? color : { background: "#FFF", color: "#000" };
    let lista = [(<tr style={color_}><Fila datos={monitor}>
        <label class={icono} style={{ background: color_.background, color: color_.color, marginLeft: left||0 }} onClick={() => setToggle(!toggle)}>{" " + monitor.clasificador}</label>
    </Fila></tr>)];
    //this condition check status toggle bottom children
    toggle || lista.push(monitor[subConcepto].map(e => <Children consulta={consulta} monitor={e} />));

    return lista;
}
//Fila Final
const FilaProductos = ({ monitor, consulta }) => <tr onClick={() => consulta(monitor.codigo_producto)} style={{ background: "#FFF", color: "#000", marginLeft: 65 }} title={monitor.codigo_producto}> <Fila datos={monitor} >
    <label class="btn-default fa fa-arrow-right" style={{ background: "#FFF", color: "#000", marginLeft: 65 }}>{ monitor.clasificador}</label>
</Fila></tr>;
//Componentes Por Concepto
const Establecimiento = ({ monitor, consulta }) => {
    monitor.Dias= dia_semana(monitor.Dias);
    return <FilaConcepto
        monitor={monitor}
        Children={Dia}
        subConcepto={"Dias"}
        consulta={producto => consulta(producto, monitor.codigo_establecimiento)}
        color={{ background: "#ffff8d", color: "#000" }}
    />
}
const Dia = ({ monitor, consulta }) => <FilaConcepto
    monitor={monitor}
    Children={Clases}
    subConcepto={"Clases"}
    left={15}
    consulta={consulta}
    color={{ background: "#fff9c4", color: "#000" }}
/>
const Clases = ({ monitor, consulta}) => <FilaConcepto
    monitor={monitor}
    Children={Categoria}
    subConcepto={"Categorias"}
    left={30}
    consulta={consulta}
    color={{ background: "#fff3e0", color: "#000" }}
/>
const Categoria = ({ monitor, consulta}) => <FilaConcepto
    monitor={monitor}
    Children={Familia}
    subConcepto={"Familias"}
    left={45}
    consulta={consulta}
    color={{ background: "#f5f5f5", color: "#000" }}
/>
const Familia = ({ monitor, consulta}) => <FilaConcepto
    monitor={monitor}
    Children={FilaProductos}
    subConcepto={"Productos"}
    left={60}
    consulta={consulta}
    color={{ background: "#fafafa", color: "#000" }}
/>
export default TablaVentas;