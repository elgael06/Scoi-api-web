import React from 'react';
import Moneda from '../../../ComponentesGlobales/Moneda';

const lista_conceptos = [
    { concepto: "VENTAS NETAS",          bg: "#FFF",     attr:"VENTAS_NETAS" },
    { concepto: "COSTO DE VENTAS",       bg: "#FFF",     attr:"COSTO_DE_VENTAS" },
    { concepto: "UTILIDAD BRUTA",        bg: "#7EAFEE",  attr:"UTILIDAD_EN_OPERACIONES" },
    { concepto: "MARGEN BRUTO",          bg: "#D3AA80",  attr:"TRUPUT_DE_OPERACION" },
    { concepto: "GASTOS DE OPERACION",   bg: "#FFF",     attr:"GASTOS_DE_OPERACION" },
    { concepto: "UTILIDAD OPERACIONAL",  bg: "#f37021",  attr:"UTILIDAD_NETA_OPERACIONES" },
    { concepto: "MARGEN OPERACIONAL",    bg: "#D3AA80",  attr:"TRUPUT_NETA_OPERACIONAL" },
    { concepto: "IMPUESTOS PTU 10%",     bg: "#86A477",  attr:"IMPUESTOS_PTU" },
    { concepto: "UTILIDAD NETA",         bg: "#f37021",  attr:"Total_Costo" },
    { concepto: "MARGEN NETO",           bg: "#D3AA80",  attr:"TRUPUT_NETA" },
    { concepto: "RETIROS UTILIDAD",      bg: "#FFF",     attr:"GASTOS_FAMILIA_IZABAL" },
    { concepto: "UTILIDAD NETA DESPUES DE RETIRO", bg: "rgb(131, 117, 109)", attr: "TOTAL" }
];

let lista_establecimientos = [];

const VistaTablaPrincipal = ({ lista, evento, Totales, eventoEstablecimiento }) => {

    console.log("Lista => ", lista);
    const existencia_datos = estatus => estatus ? "" :"none" ;

    return (<div className="panel-body">
        <div style={{ height: "690px", overflowX: "auto", display: existencia_datos(lista.length > 0)}}>
            <table class="table table-bordered table-condensed " id="estado_de_resultados">
                <CaveceraTabla lista={lista} evEstablecimiento={eventoEstablecimiento} />
                <CuerpoTabla lista={lista} evConcepto={evento} Totales={Totales} />
            </table>
        </div>
        <canvas id="dashboard_graficos" style={{ height: "320px", display: existencia_datos(lista.length > 0)}}>

        </canvas>
        <div class="bg-warning" style={{ display: existencia_datos(lista.length === 0 ) }}>
            <h3 style={{padding:"30px"}}> Sin Informacion A Mostrar ...</h3>
        </div>
    </div>)
}

const CaveceraTabla = ({ lista, evEstablecimiento}) => {
    return (<thead>
        <tr className="info">
            <th style={{ width: "260px", background: "#005ce6", zIndex: "999", position: "sticky", top: "0" ,left:0}} >
                <i style={{ width: "260px", background: "#005ce6", border: "none" }}
                    className="btn btn-info">
                    <i className="glyphicon glyphicon-usd"></i>
                    {" "} CONCEPTOS
                 </i>
            </th>
            <Establecimiento lista={lista} evEstablecimiento={evEstablecimiento} />
            <th style={{ background: "#1aa3ff", zIndex: "990", position: "sticky", top: "0" }}>
                <p style={{ background: "#1aa3ff", border: "none" }} className="btn btn-info">
                    TOTAL
               </p>
            </th>
        </tr>
    </thead>);
}

const CuerpoTabla = ({ lista, evConcepto, Totales }) => {

    return (<tbody class="talbe">
        {lista_conceptos.map(e => {
            const colorBG = total => e.concepto === "UTILIDAD NETA" ? total > 0 ? "green" : "red" : e.bg;
            const un_t = e.concepto === "UTILIDAD NETA" ? Totales.Total_Costo : 0;

            return (<tr>
                <Concepto concepto={e} evConcepto={() => evConcepto(e.concepto)} />
                <ConceptoEstablecimientos
                    concepto={e}
                    lista={lista}
                    colorBG={colorBG}
                />
                <TotalesConceptos
                    Totales={Totales}
                    concepto={e}
                    colorBG={colorBG(un_t)}
                />
            </tr>);
        })}
    </tbody>);
}

const Concepto = ({ concepto, evConcepto }) => {
    const ev = concepto.bg == "#FFF" ? evConcepto : () => { };
    const Icono = concepto.bg == "#FFF" ? (<i class="glyphicon glyphicon-info-sign" style={{ float: "right", fontSize: "18px", color: "#8c8c8c" }}></i>) : <p></p>;
    return (<th key={concepto.concepto} style={{ width: "300px", background: concepto.bg,position:"sticky", left: 0, zIndex:998 }} onClick={ev} >
        <label style={{ color: concepto.bg != "#FFF" ? "azure" :"#000" }}>
            {concepto.concepto}
        </label>
        {Icono}
    </th>);
}

const Establecimiento = ({ lista, evEstablecimiento }) => {
    lista_establecimientos = [];
    const res = [];
    lista.forEach((elemento) => {
        if (elemento.establecimiento != "GASTOS ESPECIALES") {
            res.push(
                <th key={elemento.folio_establecimiento} style={{ background: "#0066ff", position: "sticky", top: "0" }} onClick={() => evEstablecimiento(elemento)}>
                    <p style={{ background: "#0066ff", border: "none" }}
                        class="btn btn-info ">
                        {elemento.establecimiento}
                    </p>
                </th>);
            lista_establecimientos.push(elemento.establecimiento);
        }
    });
    return res;
}

const ConceptoEstablecimientos = ({ concepto, lista, colorBG}) => {
          
    return lista_establecimientos.map(e => {

        const establecimiento = lista[lista.findIndex(l => l.establecimiento === e)];
        const un_t = concepto.concepto === "UTILIDAD NETA" ? establecimiento.Total_Costo : 0;

        return <td style={{ background: colorBG(un_t), color: colorBG(un_t) != "#FFF" ? "azure" : "#000", textAlign: "right" }} >
            <ComprobarConcepto
                establecimiento={establecimiento}
                concepto={concepto}
           />
       </td>
    })
}

const TotalesConceptos = ({ Totales, concepto, colorBG }) => {
    if (concepto.attr === "TOTAL") {
        console.table("TOTALES :", Totales)
        let total = Totales.Total_Costo + Totales.GASTOS_FAMILIA_IZABAL.Total_Costo || Totales.Total_Costo;

        return <td style={{ background: total > 0 ? "green" : "red" , color: "#FFF", textAlign: "right" }}>
            <Moneda cantidad={total} />
        </td>
    }
    return (<td style={{ background: colorBG, color: colorBG != "#FFF" ? "azure" : "#000", textAlign: "right" }}>
        <ComprobarConcepto
            establecimiento={Totales}
            concepto={concepto}
        />
    </td>);
}

const ComprobarConcepto = ({ establecimiento, concepto}) => {
    let valor = 0;
    if (concepto.attr === "TOTAL") {
        return <p> --</p>
    } else if (concepto.concepto.search("MARGEN") > -1) {
        return <label>{establecimiento[concepto.attr].Total_Costo} %</label>
    } else if (concepto.concepto === "UTILIDAD NETA") {
        valor = establecimiento[concepto.attr];
    } else {
        valor = establecimiento[concepto.attr].Total_Costo;
    }
    return valor != 0 ? <Moneda cantidad={valor} /> : <p> --</p>
}

export default VistaTablaPrincipal;