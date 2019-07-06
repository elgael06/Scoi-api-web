
import React from 'react';


import Moneda from '../../../ComponentesGlobales/Moneda';

function redondeo(numero) {
    return Math.round(numero * 100) / 100;
}

const VistaTablaPrincipal = ({ lista, evento, Totales, eventoEstablecimiento }) => {
    const lista_conceptos = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD BRUTA", "MARGEN BRUTO", "UTILIDAD OPERACIONAL", "IMPUESTOS PTU 10%", "UTILIDAD NETA", "MARGEN NETO"];

  //const lista_conceptos = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD BRUTA", "MARGEN BRUTO", "UTILIDAD OPERACIONAL", "UTILIDAD NETA", "TRUPUT NETA OPERACIONAL", "IMPUESTOS PTU 10%", "UTILIDAD NETA", "TRUPUT NETA", "RETIROS UTILIDAD", "MARGEN NETO"];
    const lista_establecimientos = [];
    ///<-----------------------------------------------------------------
    const Establecimiento = () => {
        const res = [];
        lista.forEach((elemento) => {
            if (elemento.establecimiento != "GASTOS ESPECIALES") {
                res.push(
                    <th key={elemento.folio_establecimiento} style={{ background: "#0066ff", position: "sticky", top: "0" }}>
                        <i style={{ background: "#0066ff", border: "none" }} onClick={() => eventoEstablecimiento(elemento)} className="btn btn-info ">{elemento.establecimiento}</i>
                    </th>);
                lista_establecimientos.push(elemento.establecimiento);
            }
        });
        return res;
    }
    ///<-----------------------------------------------------------------
    const Conceptos = () => {
        const resultados = [];
        lista_conceptos.forEach((concepto, p) => {

            if (concepto.search("UTILIDAD NETA") > -1) {
                resultados.push(<tr key={p} style={{ width: "300px", background: "#f37021" }}>
                    <th >
                        <label style={{ color: "azure" }}>
                            {concepto}
                        </label>
                    </th>
                </tr>);
            } else {
                if (concepto.search("UTILIDAD") > -1 && concepto.search("RETIROS") == -1)
                    resultados.push(
                        <tr key={p}>
                            <th style={{ background: "#cceeff" }}>
                                <i className="glyphicon glyphicon-triangle-right"></i>
                                <label >
                                    {concepto}
                                </label>
                            </th>
                        </tr>
                    );
                else if (concepto.search("IMPUESTOS") > -1)
                    resultados.push(
                        <tr key={concepto}>
                            <th style={{ background: "#ccff99" }}>
                                <i className="glyphicon glyphicon-triangle-right"></i>
                                <label >
                                    {concepto}
                                </label>
                            </th>
                        </tr>
                    );
                else if (concepto.search("TRUPUT") > -1)
                    resultados.push(
                        <tr key={concepto}>
                            <th style={{ backgroundColor: "#ffcc99" }}>
                                <i className="glyphicon glyphicon-triangle-right"></i>
                                <label >
                                    {concepto}
                                </label>
                            </th>
                        </tr>)
                else
                    resultados.push(
                        <tr key={concepto}>
                            <th onClick={() => evento(concepto)}>
                                <i className="glyphicon glyphicon-triangle-right"></i>
                                <label >
                                    {concepto}
                                </label>
                                <i className="glyphicon glyphicon-info-sign"
                                    style={{ float: "right", fontSize: "18px", color: "#8c8c8c" }}
                                ></i>
                            </th>
                        </tr>
                    );
            }
        });
        return resultados;
    }
    ///<-----------------------------------------------------------------
    const TotalConceptoPorEstablecimiento = ({ list, lista_est }) => {
        const resultados = [];
        let totales = 0, retiros = 0;

        list.forEach(concepto => {
            const Trconceptos = [];
            ///<-----------------------------------------------------------------
            const total_conceptotos_component = (cons) => {
                resultados.push(<tr key={concepto}>
                    {Trconceptos}
                    <th style={{ textAlign: "right" }}>
                        <Moneda cantidad={cons || 0} />
                    </th>
                </tr>);
            }
            ///<-----------------------------------------------------------------
            const total_utilidades_component = (utilidad) => {
                resultados.push(<tr key={concepto}>
                    {Trconceptos}
                    <th style={{ textAlign: "right", background: "#cceeff" }}>
                        <Moneda cantidad={utilidad || 0} />
                    </th>
                </tr>);
            }
            ///<-----------------------------------------------------------------
            const total_Truput_component = (utilidad) => {
                resultados.push(<tr key={concepto}>
                    {Trconceptos}
                    <th style={{ textAlign: "right", backgroundColor: "#ffcc99" }}>
                        <label>
                            {redondeo(utilidad) || "--"} <i className="fa fa-percent"></i>
                        </label>
                    </th>
                </tr>)
            }
            ///<-----------------------------------------------------------------
            const total_Impuestos_component = (utilidad) => {
                resultados.push(
                    <tr key={concepto}>
                        {Trconceptos}
                        <th
                            style={{ textAlign: "right", background: "#ccff99" }}>
                            <Moneda cantidad={utilidad || 0} />
                        </th>
                    </tr>
                );
            }
            ///<-----------------------------------------------------------------
            const total_total_componet = (Total_Costo) => {
                resultados.push(
                    <tr key={concepto}>
                        {Trconceptos}
                        <th style={{ background: totales > 0 ? "#009933" : "#ff0000", color: "azure", textAlign: "right" }}>
                            <Moneda cantidad={Total_Costo || 0} />
                        </th>
                    </tr>
                );
            }
            const despues_de_retiro = (total) => {
                resultados.push(
                    <tr key={concepto}>
                        {Trconceptos}
                        <th style={{ background: total > 0 ? "green" : "red", color: "azure", textAlign: "right" }}>
                            <Moneda cantidad={total || 0} />
                        </th>
                    </tr>
                );
            }

            lista.forEach(establecimiento => {
                const pos = lista_est.indexOf(establecimiento.establecimiento);
                //establecimiemto
                ///<-----------------------------------------------------------------
                const conceptotos_component = (cons) => {
                    var a = redondeo(cons.Total_Costo);

                    if (establecimiento.establecimiento != "GASTOS ESPECIALES") {
                        Trconceptos[pos] = <td key={concepto + "_" + establecimiento.establecimiento} style={{ textAlign: "right" }}>
                            <Moneda cantidad={a || 0} />
                        </td>;
                    }
                }
                ///<-----------------------------------------------------------------
                const utilidades_component = (utilidad) => {
                    var a = redondeo(utilidad.Total_Costo);
                    Trconceptos[pos] = <td key={concepto + "_" + establecimiento.establecimiento} style={{ textAlign: "right", background: "#cceeff" }}>
                        <Moneda cantidad={a || 0} />
                    </td>;
                }
                ///<-----------------------------------------------------------------
                const Truput_component = (utilidad) => {
                    var a = redondeo(utilidad.Total_Costo);
                    Trconceptos[pos] = <td key={concepto + "_" + establecimiento.establecimiento} style={{ textAlign: "right", background: "#ffcc99" }}>
                        <label>
                            {a || "--"} <i className="fa fa-percent"></i>
                        </label>
                    </td>;
                }
                ///<-----------------------------------------------------------------
                const Impuestos_component = (utilidad) => {
                    var a = redondeo(utilidad.Total_Costo);
                    Trconceptos[pos] = <td key={concepto + "_" + establecimiento.establecimiento} style={{ textAlign: "right", background: "#ccff99" }}>
                        <Moneda cantidad={a || 0} />
                    </td>;
                }
                ///<-----------------------------------------------------------------
                const total_componet = (Total_Costo) => {
                    totales += Total_Costo;
                    if (Total_Costo > 0)
                        Trconceptos[pos] = <th key={concepto + "_" + establecimiento.establecimiento} style={{ background: "#009933", color: "azure", textAlign: "right" }}>
                            <Moneda cantidad={Total_Costo || 0} />
                        </th>;
                    else Trconceptos[pos] = <th key={concepto + "_" + establecimiento.establecimiento} style={{ background: "#ff0000", color: "azure", textAlign: "right" }}>
                        <Moneda cantidad={Total_Costo || 0} />
                    </th>;
                }
                const despues_de_retiro = (total) => {
                    Trconceptos[pos] = <th key={concepto + "_" + establecimiento.establecimiento} style={{ background: "gray", color: "azure", textAlign: "center" }}>
                        {total}
                    </th>;
                }

                switch (concepto) {
                    case "VENTAS NETAS":
                        conceptotos_component(establecimiento.VENTAS_NETAS);
                        break;
                    case "COSTO DE VENTAS":
                        conceptotos_component(establecimiento.COSTO_DE_VENTAS);
                        break;
                    case "MARGEN BRUTO":
                        Truput_component(establecimiento.TRUPUT_DE_OPERACION);
                        break;
                    case "UTILIDAD BRUTA":
                        utilidades_component(establecimiento.UTILIDAD_EN_OPERACIONES);
                        break;
                    case "UTILIDAD OPERACIONAL":
                        conceptotos_component(establecimiento.GASTOS_DE_OPERACION);
                        break;
                    case "UTILIDAD NETA":
                        utilidades_component(establecimiento.UTILIDAD_NETA_OPERACIONES);
                        break;
                    case "TRUPUT NETA OPERACIONAL":
                        Truput_component(establecimiento.TRUPUT_NETA_OPERACIONAL);
                        break;
                    case "IMPUESTOS ISR":
                        Impuestos_component(establecimiento.IMPUESTOS_ISR);
                        break;
                    case "IMPUESTOS PTU 10%":
                        Impuestos_component(establecimiento.IMPUESTOS_PTU);
                        break;
                    case "TRUPUT NETA":
                        Truput_component(establecimiento.TRUPUT_NETA);
                        break;
                    case "RETIROS UTILIDAD":
                        conceptotos_component(establecimiento.GASTOS_FAMILIA_IZABAL);
                        break;
                    case "UTILIDAD NETA":
                        total_componet(establecimiento.Total_Costo);
                        break;
                    case "MARGEN NETO":
                        despues_de_retiro(" -- ");
                        break;
                }
            });

            switch (concepto) {
                case "VENTAS NETAS":
                    total_conceptotos_component(Totales.VENTAS_NETAS.Total_Costo);
                    break;
                case "COSTO DE VENTAS":
                    total_conceptotos_component(Totales.COSTO_DE_VENTAS.Total_Costo);
                    break;
                case "MARGEN BRUTO":
                    total_Truput_component(Totales.TRUPUT_DE_OPERACION.Total_Costo);
                    break;
                case "UTILIDAD BRUTA":
                    total_utilidades_component(Totales.UTILIDAD_EN_OPERACIONES.Total_Costo);
                    break;
                case "UTILIDAD OPERACIONAL":
                    total_conceptotos_component(Totales.GASTOS_DE_OPERACION.Total_Costo);
                    break;
                case "UTILIDAD NETA":
                    total_utilidades_component(Totales.UTILIDAD_NETA_OPERACIONES.Total_Costo);
                    break;
                case "TRUPUT NETA OPERACIONAL":
                    total_Truput_component(Totales.TRUPUT_NETA_OPERACIONAL.Total_Costo);
                    break;
                case "IMPUESTOS ISR":
                    total_Impuestos_component(Totales.IMPUESTOS_ISR.Total_Costo);
                    break;
                case "IMPUESTOS PTU 10%":
                    total_Impuestos_component(Totales.IMPUESTOS_PTU.Total_Costo);
                    break;
                case "TRUPUT NETA":
                    total_Truput_component(Totales.TRUPUT_NETA.Total_Costo);
                    break;
                case "RETIROS UTILIDAD":
                    retiros = Totales.GASTOS_FAMILIA_IZABAL.Total_Costo;
                    total_conceptotos_component(Totales.GASTOS_FAMILIA_IZABAL.Total_Costo);
                    break;
                case "UTILIDAD NETA":
                    total_total_componet(Totales.Total_Costo);
                    break;
                case "MARGEN NETO":
                    despues_de_retiro(totales);
                    break;
            }
        });

        return resultados;
    }
    return (<div className="panel-body">
        <div style={{ height: "540px", overflowX: "scroll" }} >
            <span style={{ height: "90%", position: "sticky", left: "0", zIndex: "999", background: "azure", width: "20%", minWidth: "260px", display: "inline-block" }}>
                <table className="table">
                    <thead >
                        <tr className="info">
                            <th style={{ width: "260px", background: "#005ce6", zIndex: "999", position: "sticky", top: "0" }} >
                                <i style={{ width: "260px", background: "#005ce6", border: "none" }}
                                    className="btn btn-info"><i className="glyphicon glyphicon-usd"></i> CONCEPTOS</i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <Conceptos />
                    </tbody>
                </table>
            </span>
            <span style={{ height: "90%", width: "80%", display: "inline-block", zIndex: "990" }}>
                <table className="table table-bordered">
                    <thead style={{ zIndex: "990" }}>
                        <tr className="">
                            <Establecimiento />
                            <th style={{ background: "#1aa3ff", zIndex: "990", position: "sticky", top: "0" }}>
                                <i style={{ background: "#1aa3ff", border: "none" }}
                                    className="btn btn-info">
                                    TOTAL
                                    </i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <TotalConceptoPorEstablecimiento
                            list={lista_conceptos}
                            lista_est={lista_establecimientos}
                        />
                    </tbody>
                </table>
            </span>
        </div>
        <canvas id="dashboard_graficos" style={{ height: "320px" }}>

        </canvas>
    </div>);
}

export default VistaTablaPrincipal;