
import React, { useState } from 'react';
import ORDEN_DATOS_TABLA from '../manager/OrdenDatosTabla';
import { redondeo, moneyFormat } from '../../../../Globales/moneda';
import ExportToExcel from '../../../../Globales/ExportarExcel';
import estiloModal from '../../../models/mEstiloModal';

const ModalMovimientosPorEstablecimiento = ({ establecimiento }) => {
    const conceptos = establecimiento.lista_conceptos || [];
    const anios = establecimiento.lista_anios || [];
    const meses = anios.flatMap(m => m.Meses) || [];
    const semanas = meses.flatMap(s => s.Semanas) || [];
    const cerrar = () => document.getElementById("modal_movimientos_por_establecimiento").style.display = "none";

    return (<div id="modal_movimientos_por_establecimiento"
        style={estiloModal}>
        <div className="panel panel-default animate" style={{ width: "90%" }}>
            <div className="panel-heading" style={{ background: "#006699", color: "#FFFFFF" }}>
                <i className="btn btn-danger fa fa-close" style={{ float: "right" }} onClick={cerrar}></i>
                <h4> <i className="fa fa-calendar"></i> MOVIMIENTOS A DETALLE {establecimiento.establecimiento || ""}.</h4>
            </div>
            <div className="panel-body">
                <label style={{ color: "#666666", display: "block", fontSize: "20px" }}>
                    MOVIMIENTOS OPERACIONAL POR SEMANA DEL AÑO.
                </label>
                <div style={{ maxHeight: "600px", border: "solid 1px #444", overflow: "auto", marginTop: "30px" }} >
                    <table class="table table-condensed" id="tabla_movimientos_por_establecimientos">
                        <CaveceraTabla establecimiento={establecimiento.establecimiento} anios={anios} meses={meses} semanas={semanas} />
                        <CuerpoTabla conceptos={conceptos} movimientos={establecimiento} semanas={semanas}/>
                    </table>
                </div>                
            </div>
            <div class="panel-footer">
                <i class="fa fa-file-excel-o btn btn-success" onClick={() => ExportToExcel("tabla_movimientos_por_establecimientos", "tabla_movimientos_por_establecimientos")}> Guardar A Excel</i>
                <i style={{ float: "right" }} class="fa fa-close btn btn-danger" onClick={cerrar}> Cerrar</i>
            </div>
        </div>
    </div>);
}

const CaveceraTabla = ({ establecimiento, anios, meses, semanas }) => {
    const obtener_semanas_anio = anio => anio ? anios.flatMap(m => m.Meses).flatMap(s => s.Semanas).length : 1;

    return (<thead>
        <tr>
            <th rowSpan="3" colSpan="2" style={{ backgroundColor: "#0077b3", color: "azure",maxWidth:"200px" }}>{establecimiento || ""}</th>
            <th rowSpan="3" style={{ fontSize: "20px", width: "140px", textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "0", width: "130px" }}> TOTAL</th>
            {anios.map(a => <th colSpan={obtener_semanas_anio(a)} style={{ textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "0" }}>{a.Anio}</th>)}
        </tr>
        <tr>{meses.map(a => <th colSpan={a.Semanas.length} style={{ textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "30px" }}>{a.Mes}</th>)}</tr>
        <tr>{semanas.map(a => <th style={{ textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "60px", width: "130px" }}>{a.Semana}</th>)}</tr>
    </thead>);
}

const CuerpoTabla = ({ conceptos, movimientos, semanas}) => {
    let filtro = {
        Lista_SemanaAnios: [],
        Total_Costo: 0,
        Lista_clasificadores:[]
    }
    return (<tbody>{ORDEN_DATOS_TABLA.map(dato => <FillaConcepto
            concepto={dato}
            filtro={conceptos.find(e => e.concepto == dato.descripcion) || filtro}
            movimientos={movimientos}
            semanas={semanas} />)}
    </tbody>);
}

const FillaConcepto = ({ concepto, filtro, movimientos, semanas}) => {
    const [toggle, setToggle] = useState(false);
    let lista = [];
    let Totales = null;
    const styleBtn = toggle ? "btn fa fa-minus" : "btn fa fa-plus";

    const Atributo = () => concepto.att == "concepto" ?
        <i class={styleBtn} onClick={() => setToggle(!toggle)} style={{ color: "#FFF" }}></i> : <i class="btn fa fa-chevron-right" style={{ color: "#FFF" }}></i>;

    if (concepto.att == "concepto") { Totales = () => <TotalSemana semanas={semanas} color={concepto.fondo} filtro={filtro} />}
    else if (concepto.att == "utilidad") { Totales = () => <TotalUtilidades semanas={semanas} color={concepto.fondo} movimientos={movimientos} />}
    else Totales = () =>  <TotalMargenes
                descripcion={concepto.att || "TRUPUT_NETA"}
                semanas={semanas}
                color={concepto.fondo}
                movimientos={movimientos}
            />
    lista.push(<tr>
        <td colSpan="2" style={{ background: concepto.fondo, color: "#FFF" }}>
            <Atributo />
            {concepto.descripcion}
        </td>
        <Totales />
    </tr>);

    !toggle || lista.push(filtro.Lista_clasificadores.flatMap(e => <FilaClasificadores clasificador={e} semanas={semanas} />));

    return lista;
}

const TotalUtilidades = ({ movimientos, semanas, color }) => {
    let lista = [], total = movimientos.UTILIDAD_EN_OPERACIONES ? movimientos.UTILIDAD_EN_OPERACIONES.Total_Costo : 0;
    const conceptos = movimientos.lista_conceptos;

    const obtenerTotalSemana = (concepto,semana )=> {
        let total_semana = 0;

        for (let dato of concepto.Lista_SemanaAnios.filter(e => e.Semana == semana)) {
            total_semana += dato.Total_Costo;
        }
        return total_semana;
    }

    lista.push(semanas.flatMap(semana => {
        let total_semana = 0;
        !conceptos || (function () {
            let ventas = conceptos.find(e => e.concepto == "VENTAS NETAS") || { Lista_SemanaAnios: [] };
            let costo = conceptos.find(e => e.concepto == "COSTO DE VENTAS") || { Lista_SemanaAnios: [] };

            total_semana = (obtenerTotalSemana(costo, semana.Semana) + obtenerTotalSemana(ventas, semana.Semana)) || 0;
        }());

        return <td style={{ background: color, color: color != "#FFF" ? "#FFF" : "#000", textAlign: "right" }}>
            {total_semana != 0 ? moneyFormat(redondeo(total_semana)):"" }
        </td>
    }));

    lista.unshift(<td style={{ background: color, color: color != "#FFF" ? "#FFF" : "#000", textAlign: "right" }}>{moneyFormat(redondeo(total))}</td>);

    return lista;
}

const TotalMargenes = ({descripcion, movimientos, semanas, color }) => {
    let lista = [];
    try {lista.push(semanas.flatMap(semana => {          
            let total = redondeo( movimientos.Lista_SemanaAnios.find(e => e.Semana == semana.Semana)[descripcion].Total_Costo ) || "--";
            return (<td style={{ background: color, color: color != "#FFF" ? "#FFF" : "#000", textAlign: "right" }}>{total} %</td>)
        }));}
    catch (e) {  }
    try {
        lista.push(<td style={{ background: color, color: color != "#FFF" ? "#FFF" : "#000", textAlign: "right" }}>
            {redondeo(movimientos[descripcion].Total_Costo)} %
        </td>)
    } catch (e) { }
    return lista;
}

const TotalSemana = ({ filtro, semanas, color }) => {
    const { Lista_SemanaAnios, Total_Costo} = filtro;

    let lista = semanas.map(semana => {
        let total = Lista_SemanaAnios.find(e => e.Semana == semana.Semana) ? moneyFormat(redondeo(Lista_SemanaAnios.find(e => e.Semana == semana.Semana).Total_Costo)) : " ";
        return (<td style={{ background: color, color: color != "#FFF" ? "#FFF" : "#000",textAlign:"right" }}>{ total }</td>);
    });
    lista.unshift(<td style={{ background: color, color: color != "#FFF" ? "#FFF" : "#000", textAlign: "right" }}>{moneyFormat(redondeo(Total_Costo))}</td>);

    return lista;
}

const FilaClasificadores = ({ clasificador, semanas }) => {
    const [toggle, setToggle] = useState(false);

    const styleBtn = toggle ? "btn fa fa-minus" : "btn fa fa-plus";
    let lista = [];

    lista.push(<tr>
        <td colSpan="2" style={{ background: "rgb(99, 142, 198)", color: "#FFF" }}>
            <i class={styleBtn} onClick={() => setToggle(!toggle)} style={{ color: "#FFF" }}></i>
            {clasificador.clasificador}
        </td>
        <TotalSemana semanas={semanas} color={"rgb(99, 142, 198)"} filtro={clasificador} />
    </tr>);
    !toggle || lista.push(clasificador.Lista_subclasificadores.map(e => <SubCasificador subclasificador={e} semanas={semanas} />))

    return lista;
}

const SubCasificador = ({ subclasificador, semanas }) => {
    const [toggle, setToggle] = useState(false);
    const styleBtn = toggle ? "btn fa fa-minus" : "btn fa fa-plus";
    let lista = [];

    lista.push( <tr style={{ background: "rgb(141, 157, 178)", color: "#FFF" }}>
        <td colSpan="2">
            <i class={styleBtn} onClick={() => setToggle(!toggle)} style={{ color: "#FFF" }}></i>
            {subclasificador.subclacificador}
        </td>
        <TotalSemana semanas={semanas} color={"rgb(141, 157, 178)"} filtro={subclasificador} />
    </tr>);
    !toggle || lista.push(<FilaMovimientos movimientos={subclasificador.Lista_movimientos} semanas={semanas} />)

    return lista;
}

const FilaMovimientos = ({ movimientos, semanas }) => {
    let lista_movimientos = [];
    for (let mov of movimientos) {
        if (lista_movimientos.findIndex(e => e.nombre == mov.Tipo_movimiento) === -1)
            lista_movimientos.push({
                nombre: mov.Tipo_movimiento,
                filtro: movimientos.filter(e => e.Tipo_movimiento == mov.Tipo_movimiento)
            })
    }
    return lista_movimientos.map(mov =>(<tr style={{ background: "#FFF", color: "#000" }}>
            <td colSpan="2">
                <i class="fa fa-arrow-right" style={{ marginRight: "20px", marginLeft: "25px" }}></i>
                {mov.nombre}
            </td>
            <TotalSemanaMovimientos semanas={semanas} filtro={mov.filtro} />
        </tr>));
}

const TotalSemanaMovimientos = ({ filtro, semanas }) => {
    let TotalMov = 0;
    let lista = semanas.map(semana => {
        let total = filtro.find(e => e.Semana == semana.Semana) ? moneyFormat(redondeo(filtro.find(e => e.Semana == semana.Semana).Precio_venta)) : " ";
        TotalMov += total != " " ? filtro.find(e => e.Semana == semana.Semana).Precio_venta : 0;
        return (<td style={{ background: "#FFF", color: "#000", textAlign: "right" }}>{total}</td>);
    });
    lista.unshift(<td style={{ background: "#FFF", color: "#000", textAlign: "right" }}>{moneyFormat(redondeo(TotalMov))}</td>);

    return lista;
}

export default ModalMovimientosPorEstablecimiento;
