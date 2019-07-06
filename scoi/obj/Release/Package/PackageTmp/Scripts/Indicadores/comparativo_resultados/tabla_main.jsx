
const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = "/api/"

class EstadoDeResultados extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fecha: this.fecha_hoy(),
            periodo: 0,
            Totales: {
                COSTO_DE_VENTAS: 0,
                VENTAS_NETAS: 0,
                GASTOS_DE_OPERACION: 0,
                UTILIDAD_EN_OPERACIONES: 0,
                TRUPUT_DE_OPERACION: 0,
                UTILIDAD_NETA_OPERACIONES: 0,
                TRUPUT_NETA_OPERACIONAL: 0,
                IMPUESTOS_ISR: 0,
                IMPUESTOS_PTU: 0,
                GASTOS_FAMILIA_IZABAL: 0,
                TRUPUT_NETA: 0,
                lista_establecimientos:[]
            },
            lista: [],
            concepto: "",
            establecimiento: {
                Folio_Establecimiento:-1,
                Establecimiento: "",
                Lista: [],
                Clasificadores:[]
            },
            seleccion: 0
        }

        this.barChart = null;

        this._fecha = this.on_fecha.bind(this);
        this._periodo = this.on_perido.bind(this);
        this._concepto = this.on_concepto.bind(this);
        this._Establecimiento_pantalla_0 = this.on_Establecimiento_pantalla_0.bind(this);
        //this.Obtener_estado_de_resultados();
        setTimeout(() => document.getElementById("pantalla_carga").style.display = "none", 1000);
        //setTimeout(() => this.grafica_barras(), 1000);
        
    }
    /*eventos*/
    on_fecha(e) {
        const f = e.target.value.split("-");
        this.setState({ fecha: e.target.value })
    }
    on_perido(e) {
        this.setState({ periodo:e.target.value});
    }
    on_concepto(concepto) {
        console.log("concepto", concepto);

        document.getElementById("modal_concepto").style.display = "flex";
        this.setState({ concepto: concepto });
    }
    on_Establecimiento_pantalla_0(establecimiento) {
        console.log("Detalles=>",establecimiento);
        this.setState({ seleccion: establecimiento });

        const $establecimiento = document.getElementById("modal_movimientos_por_establecimiento");
            $establecimiento.style.display = "flex";
    }
    on_eventoEstablecimiento(establecimiento) {
        const lista = [];
        console.log("Establecimiento Seleccion:", establecimiento);
        establecimiento.lista_conceptos.forEach(concepto => {

            if (concepto.concepto==this.state.concepto)
            concepto.Lista_clasificadores.forEach(clasificador => {
                clasificador.Lista_subclasificadores.forEach(subclasificador => {
                    subclasificador.Lista_movimientos.forEach(movimiento => {
                        //movimiento
                        lista.push({
                            Folio_establecimiento: establecimiento.folio_establecimiento,
                            Establecimiento: establecimiento.establecimiento,
                            Concepto: concepto.concepto,
                            Clasificacion: clasificador.clasificador,
                            Subclasificacion: subclasificador.subclacificador,
                            Movimiento: movimiento.Tipo_movimiento,
                            Semana_del_anio: movimiento.Semana,
                            Mes: movimiento.Mes,
                            Anio: movimiento.Anio,
                            Total_Costo: movimiento.Costo,
                            Total_Precio_venta: movimiento.Precio_venta
                        });
                    });
                });
            });
        });
        this.Obtener_movimientos_Ordenados(lista);
    }
    /*Metodos*/
    fecha_hoy_dd_mm_yy() {
        const f = new Date();
        const dia = f.getDate() > 10 ? f.getDate() : "0" + f.getDate();
        const mes = (f.getMonth() + 1) > 10 ? (f.getMonth() + 1) : "0" + (f.getMonth() + 1);
        const anio = f.getFullYear();

        return dia + "/" + mes + "/" + anio;
    }
    fecha_hoy() {
        const f = new Date();
        const dia = f.getDate() > 10 ? f.getDate() : "0" + f.getDate();
        const mes = (f.getMonth() + 1) > 10 ? (f.getMonth() + 1) : "0" + (f.getMonth() + 1);
        const anio = f.getFullYear();

        return `${anio}-${mes}-${dia}`;
    }
    parseo_fecha() {
        const f = this.state.fecha.split("-");
        return f[2] + "-" + f[1] + "-" + f[0];
    }
    grafica_barras($lista_establecimientos) {
        const $lista_conceptos = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD BRUTA", "GASTOS DE OPERACION", "UTILIDAD NETA OPERACIONAL", "IMPUESTOS ISR", "IMPUESTOS PTU 10%", "UTILIDAD NETA","RETIROS UTILIDAD"];
        const $colores = ["#00b300", "#66ccff", "#ff9933", "#ff0000", "#ff00a3", "#0077b3", "#996633", "#999966", "#33cccc"]
        const $indicadores = [];
        const $establecimientos = [];

        $lista_establecimientos.forEach(establecimiento_ => {
            $establecimientos.push(establecimiento_.establecimiento);
        });
        $lista_conceptos.forEach((concepto_, p) => {

            if (concepto_ != "RETIROS UTILIDAD") {
                const $obj = {
                    label: concepto_,
                    data: [],
                    backgroundColor: $colores[p],
                    borderColor: "black",
                    borderWidth: 1,
                    fill: false
                }
                $lista_establecimientos.forEach(establecimiento_ => {
                    switch (concepto_) {
                        case "VENTAS NETAS":
                            $obj.data.push(redondeo(establecimiento_.VENTAS_NETAS.Total_Costo));
                            break;
                        case "COSTO DE VENTAS":
                            $obj.data.push(redondeo(establecimiento_.COSTO_DE_VENTAS.Total_Costo * -1));
                            break;
                        case "UTILIDAD BRUTA":
                            $obj.data.push(redondeo(establecimiento_.UTILIDAD_EN_OPERACIONES.Total_Costo));
                            break;
                        case "GASTOS DE OPERACION":
                            $obj.data.push(redondeo(establecimiento_.GASTOS_DE_OPERACION.Total_Costo * -1));
                            break;
                        case "UTILIDAD NETA OPERACIONAL":
                            $obj.data.push(redondeo(establecimiento_.UTILIDAD_NETA_OPERACIONES.Total_Costo));
                            break;
                        case "IMPUESTOS ISR":
                            $obj.data.push(redondeo(establecimiento_.IMPUESTOS_ISR.Total_Costo));
                            break;
                        case "IMPUESTOS PTU 10%":
                            $obj.data.push(redondeo(establecimiento_.IMPUESTOS_PTU.Total_Costo * -1));
                            break;
                        case "UTILIDAD NETA":
                            $obj.data.push(redondeo(establecimiento_.Total_Costo));
                            break;
                    }
                });
                $indicadores.push($obj);
            }
        });


        var ctx = document.getElementById("dashboard_graficos");

        if (this.barChart != null) {
            this.barChart.clear();
            this.barChart.destroy();
        }
        this.barChart = new Chart(ctx,
            {
                type: 'bar',
                data: {
                    labels: $establecimientos,
                    datasets: $indicadores
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: false,
                                    callback: (value, index, values) => moneyFormat(value)
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: "CONCEPTOS ($)."
                                }
                            }
                        ]
                    },
                    title: {
                        display: true,
                        text: 'Grafica Estado De Resultados De Operaciones.',
                        fontSize:18
                    },
                    tooltips: {
                            labelColor: function (tooltipItem, chart) {
                                return {
                                    borderColor: 'rgb(0, 153, 204)',
                                    backgroundColor: 'rgb(66d9ff)'
                                }
                            },
                            labelTextColor: function (tooltipItem, chart) {
                                return '#543453';
                            }
                    }
                }
            });
        this.barChart.update();
    }
    /*Conexiones*/
    Obtener_estado_de_resultados() {
        if (document.getElementById("pantalla_carga")) {
            document.getElementById("pantalla_carga").style.display = "flex";
            this.setState({lista:[]});
        }
        fetch(`${$URL_API}Estado_de_resultados?fecha=${this.parseo_fecha()}&meses=${this.state.periodo}`, {
            method: 'get',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                res =>
                    res.json().then(
                        respuesta => {
                            this.setState({
                                lista: respuesta.lista_establecimientos,
                                Totales:respuesta
                            });
                            document.getElementById("pantalla_carga").style.display = "none";

                            if (respuesta.lista_establecimientos.length > 0) {
                                this.grafica_barras(respuesta.lista_establecimientos);
                            } else if (confirm("Sin Datos A Mostrar...\n Reintentar?")) {
                                this.Obtener_estado_de_resultados();
                            };
                        }).catch(e => console.error(e))
            ).catch(e => alert("error en Conexion api!!!"));
    }
    Obtener_movimientos_Ordenados(lista) {
        if (document.getElementById("pantalla_carga")) {
            document.getElementById("pantalla_carga").style.display = "flex";
        }
        fetch(`${$URL_API}Estado_de_resultados`, {
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify(lista),
            headers: {
                'Content-Type': 'application/json'
            }
        })
           .then(
            res =>
                res.json().then(
                    respuesta => {
                        console.log(respuesta);
                        if (respuesta) {
                            this.setState({ establecimiento: respuesta });
                            document.getElementById("modal_movimientos").style.display = "flex";
                            document.getElementById("pantalla_carga").style.display = "none";
                        } else alert("No Hay Respuesta!!!");
                    })
                    .catch(e => console.error(e))
        ).catch(e => alert("error en Conexion api!!!"));
    }

    render() {
        const { periodo, fecha, concepto, Totales, seleccion} = this.state;
        return (
            <div className="panel panel-default">
                <Cavecera
                    periodo={periodo}
                    fecha={fecha}
                    evFecha={this._fecha}
                    evPeriodo={this._periodo}
                    evReload={this.Obtener_estado_de_resultados.bind(this)}
                />
                <VistaTablaPrincipal
                    lista={Totales.lista_establecimientos}
                    evento={this._concepto}
                    eventoEstablecimiento={this._Establecimiento_pantalla_0}
                    Totales={Totales}
                />
                <ModalConceptos
                    concepto={concepto}
                    lista={Totales.lista_establecimientos}
                    eventoEstablecimiento={this._Establecimiento_pantalla_0 }
                />
                <ModalMivimientosPorEstablecimiento
                    establecimiento={seleccion}
                />
                <Cargar
                    nombre={"pantalla_carga"}
                />
            </div>
        );
    }
}
/*
 *Componentes estaticos.
 */

const Cargar = ({ nombre }) => {
    return (
        <div id={nombre}
            style={{
                display: "flex",
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(242, 242, 242, 0.79)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                fontSize: "40px"
            }}>
            <label id={nombre + 1}>
                <i className="fa fa-circle-o-notch rotate" ></i>
                <strong style={{ fontSize: "20px" }}> Cargando...</strong><br />
            </label>
        </div>
    )
}
///<-----------------------------------------------------------------
const moneyFormat = (numero_) => {

    const decimal_con_cero = (i) => i > 9 || i.search(0)>-1 ? i : i+"0";
    const mayora_a_mil = (numero) => new Intl.NumberFormat('es-MX').format(numero);

    const numero_string = numero_.toString();
    const decimal       = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    const unidades      = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return `$${unidades}.${decimal}`;
}
///<-----------------------------------------------------------------
function redondeo(numero) {
    return Math.round(numero * 100) / 100;
}

/**
 *  Vistas de la Aplicacion 
 */
/*Componete Cavecera Estados Resultados*/
const Cavecera = ({ periodo, fecha, evPeriodo, evFecha, evReload }) => {
    ///<-----------------------------------------------------------------
    const CompSelect = () => {
        return (<div>
                <span style={{display:"inline-block",width:"150px"}} >
                    <strong> Periodo</strong>
                    <select defaultValue={periodo}
                        className="form-control"
                        onChange={evPeriodo}>
                        <option value="0">
                            ACTUAL
                        </option>
                        <optgroup label="PREVIOS">
                            <option value={1}>
                                1 Mes
                            </option>
                            <option value={2}>
                                2 Meses
                            </option>
                            <option value={3}>
                                3 Meses
                            </option>
                        </optgroup >
                    </select>
                </span>
                <span style={{ display: "inline-block", width: "150px", marginLeft: "15px", marginRight: "35px" }} >
                    <strong>Fecha</strong>
                    <input type="date"
                        className="btn btn-default"
                        onChange={evFecha}
                        value={fecha}
                    />
                </span>
                <i className="btn btn-success"
                    style={{ marginLeft: "15px" }}
                    onClick={evReload}>
                    <strong>Cargar Informacion.</strong>
                    <i className="fa fa-download" style={{marginLeft:"5px"}}></i>   
                </i>
            </div>);
    }
    return (<div className="panel-heading">
        <h3>Estado De Resultados De Operaciones.</h3>
        <CompSelect />
    </div>);
}
/*Componete Tabla Principal Estados Resultados*/
const VistaTablaPrincipal = ({ lista, evento, Totales, eventoEstablecimiento}) => {

    const lista_conceptos = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD BRUTA", "TRUPUT DE OPERACION", "GASTOS DE OPERACION", "UTILIDAD NETA OPERACIONAL", "TRUPUT NETA OPERACIONAL", "IMPUESTOS ISR", "IMPUESTOS PTU 10%", "UTILIDAD NETA", "TRUPUT NETA","RETIROS UTILIDAD","UTILIDAD NETA DESPUES DE RETIRO"];
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
        
                if (concepto.search("UTILIDAD NETA")>-1) {
                    resultados.push(<tr key={p} style={{ width: "300px", background: "#f37021" }}>
                        <th >
                            <strong style={{ color: "azure" }}>
                                {concepto}
                            </strong>
                        </th>
                    </tr>);
                } else {
                    if (concepto.search("UTILIDAD") > -1 && concepto.search("RETIROS")==-1)
                        resultados.push(
                            <tr key={p}>
                                <th style={{ background: "#cceeff" }}>
                                    <i className="glyphicon glyphicon-triangle-right"></i>
                                    <strong >
                                        {concepto}
                                    </strong>
                                </th>
                            </tr>
                        );
                    else if (concepto.search("IMPUESTOS") > -1)
                        resultados.push(
                            <tr key={concepto}>
                                <th style={{ background: "#ccff99" }}>
                                    <i className="glyphicon glyphicon-triangle-right"></i>
                                    <strong >
                                        {concepto}
                                    </strong>
                                </th>
                            </tr>
                        );
                    else if (concepto.search("TRUPUT") > -1)
                        resultados.push(
                            <tr key={concepto}>
                                <th style={{ backgroundColor: "#ffcc99" }}>
                                    <i className="glyphicon glyphicon-triangle-right"></i>
                                    <strong >
                                        {concepto}
                                    </strong>
                                </th>
                            </tr>)
                    else
                        resultados.push(
                            <tr key={concepto}>
                                <th onClick={() => evento(concepto)}>
                                    <i className="glyphicon glyphicon-triangle-right"></i>
                                    <strong >
                                        {concepto}
                                    </strong>
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
    const TotalConceptoPorEstablecimiento = ({ list,lista_est }) => {
        const resultados = [];
        let totales = 0, retiros = 0;

        list.forEach(concepto => {
            const Trconceptos = [];
            ///<-----------------------------------------------------------------
            const total_conceptotos_component = (cons) => {
                resultados.push(<tr key={concepto}>
                    {Trconceptos}
                    <th style={{ textAlign: "right" }}>
                        {moneyFormat(redondeo(cons))}
                    </th>
                </tr>); 
            }
            ///<-----------------------------------------------------------------
            const total_utilidades_component = (utilidad) => {
                resultados.push(<tr key={concepto}>
                    {Trconceptos}
                    <th style={{ textAlign: "right", background: "#cceeff" }}>
                        {moneyFormat(redondeo(utilidad))}
                    </th>
                </tr>);
            }
            ///<-----------------------------------------------------------------
            const total_Truput_component = (utilidad) => {
                resultados.push(<tr key={concepto}>
                    {Trconceptos}
                    <th style={{ textAlign: "right", backgroundColor: "#ffcc99" }}>
                            {redondeo(utilidad)} <i className="fa fa-percent"></i>
                        </th>
                </tr>)
            }
            ///<-----------------------------------------------------------------
            const total_Impuestos_component = (utilidad) => {
                resultados.push(
                    <tr key={concepto}>
                        {Trconceptos}
                        <th
                            style={{ textAlign: "right", background: "#ccff99" }}
                        >{moneyFormat(redondeo(utilidad))}</th>
                    </tr>
                );
            }
            ///<-----------------------------------------------------------------
            const total_total_componet = (Total_Costo) => {
                resultados.push(
                    <tr key={concepto}>
                        {Trconceptos}
                        <th style={{ background: totales > 0 ? "#009933" : "#ff0000", color: "azure", textAlign: "right" }}>{moneyFormat(redondeo(Total_Costo))}</th>
                    </tr>
                );
            }
            const despues_de_retiro = (total) => {
                resultados.push(
                    <tr key={concepto}>
                        {Trconceptos}
                        <th style={{ background: total>0?"green":"red", color: "azure", textAlign: "right" }}>{moneyFormat(redondeo(total))}</th>
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
                            {moneyFormat(a)}
                        </td>;
                    }
                }
                ///<-----------------------------------------------------------------
                const utilidades_component = (utilidad) => {
                    var a = redondeo(utilidad.Total_Costo);
                        Trconceptos[pos] = <td key={concepto + "_" + establecimiento.establecimiento} style={{ textAlign: "right", background:"#cceeff" }}>
                            {moneyFormat(a)}
                        </td>;
                }
                ///<-----------------------------------------------------------------
                const Truput_component = (utilidad) => {
                    var a = redondeo(utilidad.Total_Costo);
                    Trconceptos[pos] = <td key={concepto + "_" + establecimiento.establecimiento} style={{ textAlign: "right", background: "#ffcc99" }}>
                        {a} <i className="fa fa-percent"></i>
                    </td>;
                }
                ///<-----------------------------------------------------------------
                const Impuestos_component = (utilidad) => {
                    var a = redondeo(utilidad.Total_Costo);
                    Trconceptos[pos] = <td key={concepto + "_" + establecimiento.establecimiento} style={{ textAlign: "right", background: "#ccff99" }}>
                        {moneyFormat(a)}
                    </td>;
                }
                ///<-----------------------------------------------------------------
                const total_componet = (Total_Costo) => {
                    totales += Total_Costo;
                    if (Total_Costo>0)
                        Trconceptos[pos] = <th key={concepto + "_" + establecimiento.establecimiento} style={{ background: "#009933", color: "azure", textAlign: "right" }}>
                            {moneyFormat(Total_Costo)}
                        </th>;
                    else Trconceptos[pos] = <th key={concepto + "_" + establecimiento.establecimiento} style={{ background: "#ff0000", color: "azure", textAlign: "right" }}>
                        {moneyFormat(Total_Costo)}
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
                    case "TRUPUT DE OPERACION":
                        Truput_component(establecimiento.TRUPUT_DE_OPERACION);
                        break;
                    case "UTILIDAD BRUTA":
                        utilidades_component(establecimiento.UTILIDAD_EN_OPERACIONES);
                        break;
                    case "GASTOS DE OPERACION":
                        conceptotos_component(establecimiento.GASTOS_DE_OPERACION);
                        break;
                    case "UTILIDAD NETA OPERACIONAL":
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
                    case "UTILIDAD NETA DESPUES DE RETIRO":
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
                case "TRUPUT DE OPERACION":
                    total_Truput_component(Totales.TRUPUT_DE_OPERACION.Total_Costo);
                    break;
                case "UTILIDAD BRUTA":
                    total_utilidades_component(Totales.UTILIDAD_EN_OPERACIONES.Total_Costo);
                    break;
                case "GASTOS DE OPERACION":
                    total_conceptotos_component(Totales.GASTOS_DE_OPERACION.Total_Costo);
                    break;
                case "UTILIDAD NETA OPERACIONAL":
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
                case "UTILIDAD NETA DESPUES DE RETIRO":
                    despues_de_retiro(totales);
                    break;
            }
        });

        return resultados;
    }
    return( <div className="panel-body"> 
            <div style={{ height: "540px", overflowX: "scroll" }} >
                <span style={{ height: "90%", position: "sticky", left: "0", zIndex: "999", background: "azure", width: "20%", minWidth: "260px", display: "inline-block" }}>
                    <table className="table">
                        <thead >
                            <tr className="info">
                                <th style={{ width:"260px",background: "#005ce6", zIndex: "999", position: "sticky", top: "0"}} >
                                    <i style={{ width: "260px",background: "#005ce6",border:"none"}}
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
                        <thead style={{zIndex: "990"}}>
                            <tr  className="">
                                <Establecimiento />
                                <th style={{ background: "#1aa3ff", zIndex: "990", position: "sticky", top: "0"}}>
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
            <canvas id="dashboard_graficos" style={{ height: "320px"}}>

            </canvas>
        </div>);
}
/*Componete Modal Conceptos Estados Resultados*/ //>>======> Funcion A Modifcar.<-- listo 08-04-19.--<<
const ModalConceptos = ({ concepto, lista,eventoEstablecimiento }) => {
    /*
         concepto es el concepto seleccionado con un click
         lista es la lista de estableciomientos con conceptos 
     */
    ///<-----------------------------------------------------------------
    const recorrer_lista = (funcion) => {
        /*
         Recorre la lista de establecimientos filtrando por concepto dentro de ese concepto recorre los clasificados
         resibe como parametro funcion que recibe clasificador, establecimiento, conceptos.
         */
        lista.forEach((establecimiento) => {

            let filtro = concepto == "RETIROS UTILIDAD" ? "GASTOS FAMILIA IZABAL" : concepto;
            const conceptos = establecimiento.lista_conceptos.filter(e => e.concepto == filtro);
             conceptos.forEach(cons => {
                 cons.Lista_clasificadores.forEach(clasificador => {
                    funcion(clasificador, establecimiento, conceptos);
                });
            });

        });
    }
    ///<-----------------------------------------------------------------
    const obtener_subclasificadores = (clasificador) => {
        let $lista = [],$lista_subclasificadores = [];
        recorrer_lista(clasificador_ => !(clasificador_.clasificador == clasificador) || ($lista = $lista.concat(clasificador_.Lista_subclasificadores)));
        $lista.forEach(sub => !($lista_subclasificadores.findIndex(e => e == sub.subclacificador) === -1) || $lista_subclasificadores.push(sub.subclacificador));
    return $lista_subclasificadores;
    }
    const obtener_movimientos = (clasificador, subclacificador) => {//<<----Modificando #########
        let lista = [], movimientos = [], subclasificadores = [];

        recorrer_lista(clasificador_ => {
            if (clasificador_.clasificador == clasificador) {

                subclasificadores = subclasificadores.concat(clasificador_.Lista_subclasificadores.filter(e => e.subclacificador == subclacificador))
            }
        });
        for (let dato of subclasificadores) {
            lista = lista.concat(dato.Lista_movimientos);
        }
        for (var dato of lista) {
            movimientos.findIndex(e => e.Tipo_movimiento === dato.Tipo_movimiento) > -1 || movimientos.push(dato);
        }
        return movimientos;
    }
    ///<-----------------------------------------------------------------
    const menu_conceptos = () => {
        /*
         esta funcion debe de separa los clasificadores del concepto por establecimiento
         */
        const lista_1 = [];
        recorrer_lista(e => {
            if (!lista_1.includes(e.clasificador))
                lista_1.push(e.clasificador);
        });
        
        return lista_1;
    }
    ///<----------------------------------------------------------------- 
    const CrearMenu = ({lista_1}) => {
        //crea la lista de subclasificadores  apartir del recorrido de menu conceptos
        const lista_r = [];
        lista_1.forEach(clacific => {
            let ident = `tb_${remplazar_espacios_por_guion_bajo(clacific)}`;
            lista_r.push(<tr className="info" key={clacific}>
                <th style={{ background: "#99c3ff" }} >
                    <i style={{ marginLeft: "10px", marginRight: "10px" }}>
                        <BotonTogle
                            identificador={ident}
                            poicion={0}
                        />
                    </i>
                    {clacific}
                </th>
            </tr>);
            lista_r.push(
                <MenuSubclasificadores
                    clasificador={clacific}
                    nombre={ident}
                />
            );
        });
        lista_r.push(<tr>
            <th style={{ background: "#f37021", color: "azure" }}>TOTALES :</th>
        </tr>);
        return lista_r;
    }
    ///<-----------------------------------------------------------------
    const MenuSubclasificadores = ({ clasificador, nombre }) => {
        const $lista_subclasificadores = obtener_subclasificadores(clasificador);
        return $lista_subclasificadores.map(sub => {
            let ident = crear_identificador(nombre, sub);
            return ([<tr style={{ background: "#e6f0ff", display: "none" }} key={clasificador + "_" + sub} className={nombre} >
                <th>
                    <i style={{ marginLeft: "30px", marginRight: "10px" }}>
                        <BotonTogle identificador={ident}
                        />
                    </i>
                    {sub}
                </th>
            </tr>, <MenuMovimiento movimientos={obtener_movimientos(clasificador, sub)} nombre={ident} />]);
        });
    }
    const MenuMovimiento = ({ movimientos, nombre }) => {
        return movimientos.map(e => {
            return (<tr style={{ background: "#e6ffff", display: "none" }} key={"_" + e.Tipo_movimiento} className={nombre}>
                <th>
                    <span style={{ marginLeft: "50px", marginRight: "10px" }}>
                        {e.Tipo_movimiento}
                    </span>
                </th>
            </tr>)
        });
    }
    ///<-----------------------------------------------------------------
    const CrearMovimientos = ({ clasificador, subclasificador, nombre}) => {
        let lista_resultados = [], lista_auxiliar = [], movimientos = obtener_movimientos(clasificador, subclasificador).map(e => e.Tipo_movimiento);

        movimientos.forEach(movimiento => {
            let suma_total = 0;
            lista_auxiliar = [];

            recorrer_lista((clasificador_, establecimiento_) => {

                if (clasificador == clasificador_.clasificador) {

                    let pos_establecimiento = lista.findIndex(e => e.establecimiento == establecimiento_.establecimiento),
                        index_sub = clasificador_.Lista_subclasificadores.findIndex(subclasificador_ => subclasificador_.subclacificador == subclasificador);
                    let sub = index_sub > -1 ? clasificador_.Lista_subclasificadores[index_sub] : {};

                    if (index_sub > -1) { 
                        let movimientos_total = 0, index_mov = sub.Lista_movimientos.filter(e => e.Tipo_movimiento == movimiento) || [];

                        lista_auxiliar[pos_establecimiento] = index_mov.length > 0 ? index_mov.map(e => {

                            movimientos_total += e.Costo;

                            return e.Costo;
                        }) : [];
                        lista_auxiliar[pos_establecimiento] = lista_auxiliar[pos_establecimiento].length > 0 ? movimientos_total : 0;
                        suma_total += movimientos_total||0;
                    }
                 }
            });

            for (let i in lista) {
                lista_auxiliar[i] = <td
                    style={{ textAlign: "right"}}
                    key={lista_auxiliar[i] + "kjkdfgb"}>
                    {moneyFormat(redondeo(lista_auxiliar[i]) || 0)}
                </td>;
            }
            lista_auxiliar.push(<td style={{ textAlign: "right" }}>{moneyFormat(redondeo(suma_total || 0))}</td>)
            lista_resultados.push(<tr className={nombre} style={{ display: "none", background: "#e6ffff" }} >{lista_auxiliar}</tr>);
        });
     

        return lista_resultados;
    }
    ///<-----------------------------------------------------------------
    const CrearSubclasificadores = ({ clasificador, nombre }) => {
        let lista_ = [];
        obtener_subclasificadores(clasificador).forEach(sub => {

            let ident = crear_identificador(nombre, sub);
            const lista_auxiliar = [];
            let total_sub = 0;

            recorrer_lista((clasificador_, establecimiento_) => { // recorrido Establecimiento

                !(clasificador == clasificador_.clasificador) || function(){
                    let pos_est = lista.findIndex(e => e.establecimiento == establecimiento_.establecimiento);
                    //
                    lista_auxiliar[pos_est] = clasificador_.Lista_subclasificadores.findIndex(subclasificador_ => subclasificador_.subclacificador == sub) > -1 ? clasificador_.Lista_subclasificadores.find(subclasificador_ => subclasificador_.subclacificador == sub)["Total_Costo"] : 0;
                    total_sub += redondeo(lista_auxiliar[pos_est]);
                }();
            });//fin recorrido Establecimiento
            for (let i in lista) {
                lista_auxiliar[i] = <td
                    style={{ textAlign: "right" }}
                    key={lista_auxiliar[i] + "kjkdfgb"}>
                    {moneyFormat(redondeo(lista_auxiliar[i]) || 0)}
                </td>;
            };

            lista_auxiliar.push(<td
                style={{ textAlign: "right" }}
                key={redondeo(total_sub) + "kjbfbbk"}>
                {moneyFormat(redondeo(total_sub))}
            </td>);

            lista_.push(<tr
                key={clasificador + "_123fsdffgddfgdss"}
                style={{ display: "none", background: "#e6f0ff" }}
                className={nombre} >
                {lista_auxiliar}
            </tr>)

            lista_.push(< CrearMovimientos
                clasificador={clasificador}
                subclasificador={sub}
                nombre={ident}
            />);
        });
        return lista_;
    }
    ///<-----------------------------------------------------------------
    const CrearClasificadores = ({clasificadores }) => {
        /* 
         Llena los resultados de cada establecimiento 
         */
        const lista_res = [];

        clasificadores.forEach(clasificador => {
            const lista_auxiliar = [];
            let ident = `tb_${remplazar_espacios_por_guion_bajo(clasificador)}`,
                total_resultado = 0;
            recorrer_lista((clasificador_, establecimiento_) => {

                if (clasificador == clasificador_.clasificador) {

                    const pos_est = lista.findIndex(e => e.establecimiento == establecimiento_.establecimiento);
                   
                    lista_auxiliar[pos_est] = redondeo(clasificador_.Total_Costo);
                    total_resultado += redondeo(clasificador_.Total_Costo);
                }
            });
            
            for (let i in lista) {
                lista_auxiliar[i] = <th style={{ textAlign: "right", background: "#b3d2ff" }} key={lista_auxiliar[i] + "-" + i}> {moneyFormat(redondeo(lista_auxiliar[i]) || 0)}</th>
            };

            lista_auxiliar.push(<th style={{ textAlign: "right", background: "#b3d2ff" }} > {moneyFormat(redondeo(total_resultado))}</th>);
            lista_res.push(<tr key={clasificador + "_12sg3"} className="info" >{lista_auxiliar}</tr>);
            lista_res.push(<CrearSubclasificadores
                clasificador={clasificador}
                nombre={ident}
            />);
        });        

        return lista_res;
    }
    ///<-----------------------------------------------------------------
    const Establecimiento = () => {
        const res = [];
        lista.forEach((elemento) => {
            res.push(
                <th key={elemento.folio_establecimiento} style={{ background: "#3388ff", position: "sticky", top: "0"}}>
                    <i
                        style={{ background: "#3388ff", border: "none" }}
                        className="btn btn-info "
                        onClick={() => eventoEstablecimiento(elemento)}
                    >
                        {elemento.establecimiento}
                        <span className="glyphicon glyphicon-info-sign" style={{marginLeft:"10px"}}></span>
                    </i>
                </th>);
        });
        return res;
    }
    ///<-----------------------------------------------------------------
    const PieDeTotales = () => {
        const totales = [];
        var totales_ = 0;
        lista.forEach(establec => {
            var TOTAL = "NA";
            switch (concepto) {
                case "VENTAS NETAS":
                    TOTAL = establec.VENTAS_NETAS.Total_Costo;
                    break;
                case "COSTO DE VENTAS":
                    TOTAL = establec.COSTO_DE_VENTAS.Total_Costo;
                    break;
                case "GASTOS DE OPERACION":
                    TOTAL = establec.GASTOS_DE_OPERACION.Total_Costo;
                    break;
                case "RETIROS UTILIDAD":
                    TOTAL = establec.GASTOS_FAMILIA_IZABAL.Total_Costo;
                    break;
            }

            totales_ += TOTAL != "NA" ? TOTAL : 0;
            totales.push(
                <th style={{ background: "#f37021", color: "azure", textAlign: "right" }}>{moneyFormat(redondeo(TOTAL))}</th>
            );
        });
        totales.push(
            <th style={{ background: "#f37021", color: "azure", textAlign: "right" }}>{moneyFormat(redondeo(totales_))}</th>
        );

        return <tr className="success">{totales}</tr>;
    }
    return (<div id="modal_concepto"
            className=""
            style={{
                display: "none",
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(144, 144, 146, 0.29)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999
            }}
        >
            <div className="panel panel-default animate"
                style={{ height:"95%",width:"90%"}}
            >
                <div className="panel-heading"
                    style={{ background:"#006aff",color:"#FFFFFF"}}
                >
                    <i className="btn btn-danger fa fa-close"
                        style={{ float: "right" }}
                        onClick={()=>document.getElementById("modal_concepto").style.display="none"}
                    ></i>
                    <h4>
                        <i className="fa fa-bar-chart"
                            style={{marginLeft:"10px",marginRight:"10px"}}
                        ></i>
                        {concepto}.
                    </h4>
                </div>
                <div className="panel-body"
                    style={{ height:"95%"}}
                >
                    <div style={{ height: "96%", overflow: "auto" }} >
                        <span style={{ height: "100%", position: "sticky", left: "0", zIndex: "999", width: "30%", display: "inline-block"}}>
                            <table className="table">
                                <thead>
                                    <tr className="info">
                                        <th style={{ background: "#006aff", zIndex: "999", position: "sticky", top: "0"}} >
                                            <i style={{ background: "#006aff", border: "none" }}
                                                className="btn btn-info">
                                                <i className="fa fa-dollar"
                                                    style={{marginLegt:"5px",marginRight:"5px"}}
                                                ></i>
                                                {concepto}
                                            </i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <CrearMenu
                                        lista_1={menu_conceptos()}
                                    />
                                </tbody>
                            </table>
                        </span>
                        <span style={{ height: "100%", width: "70%", display: "inline-block", zIndex: "990" }}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr style={{ background: "#06d1e0", zIndex: "999"}}  className="info">
                                        <Establecimiento />
                                        <th style={{ background: "#006aff", zIndex: "999", position: "sticky", top: "0"}} >
                                            <i style={{ background: "#006aff",border:"none"}}
                                                className="btn btn-info">
                                                TOTAL
                                            </i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <CrearClasificadores
                                        clasificadores={menu_conceptos()}
                                    />
                                    <PieDeTotales
                                    />
                                </tbody>
                            </table>
                        </span>
                    </div>
                </div>
            </div>
        </div>);
}

/* Componente Modal Movimientos Estados Resultados*/ //======> Funcion A Modifcar.
const ModalMivimientosPorEstablecimiento = ({ establecimiento }) => {

    //Varibles Globales ##########################################################################################
    const $ORDEN_DATOS_TABLA = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD BRUTA", "GASTOS DE OPERACION"];
    //"TRUPUT DE OPERACION","UTILIDAD NETA OPERACIONAL", "TRUPUT NETA OPERACIONAL", "IMPUESTOS ISR", "IMPUESTOS PTU 10%","TRUPUT NETA"

    //      Funciones Globales De Modal. #########################################################################
    ///<----------------------------------------------------------------- Funcion De Comprobacion.
    const comprobar_movimineto = (lista, tipo) => {
        var $contador = 0;
        for (let elemento of lista) {
            $contador += elemento[tipo] === 0 ? 1 : 0;
        }
        return !($contador === lista.length);
    }
    ///<----------------------------------------------------------------- Funcion De Comprobacion.
    const comprobar_concepto = (concepto) => {
        // ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD BRUTA","GASTOS DE OPERACION"]
        const es_nulo = (dato) => dato ? dato['Total_Costo'] : 0;

        let $total = 0;
        let { VENTAS_NETAS, COSTO_DE_VENTAS, GASTOS_DE_OPERACION, UTILIDAD_EN_OPERACIONES, TRUPUT_DE_OPERACION, TRUPUT_NETA_OPERACIONAL } = establecimiento;
        switch (concepto) {
            case "VENTAS NETAS":
                $total = es_nulo(VENTAS_NETAS);
                break;
            case "COSTO DE VENTAS":
                $total = es_nulo(COSTO_DE_VENTAS);
                break;
            case "GASTOS DE OPERACION":
                $total = es_nulo(GASTOS_DE_OPERACION);
                break;
            case "UTILIDAD BRUTA":
                $total = es_nulo(UTILIDAD_EN_OPERACIONES);
                break;
            case "TRUPUT DE OPERACION":
                $total = es_nulo(TRUPUT_DE_OPERACION);
                break;
            case "TRUPUT NETA OPERACIONAL":
                $total = es_nulo(TRUPUT_NETA_OPERACIONAL);
                break;
            case "IMPUESTOS ISR":
                $total = es_nulo(IMPUESTOS_ISR);
                break;
            case "IMPUESTOS PTU 10%":
                $total = es_nulo(IMPUESTOS_PTU);
                break;
        }
        return $total != 0;
    }

    // Componentes Globales #######################################################################################
    ///<----------------------------------------------------------------- Componente Base De Tabla Menu.
    const CeldasTabla = ({ dato, estilo,icono,margen,columnas,mas,pos }) => {
        dato     = dato ? dato : "NA";
        estilo   = estilo ? estilo : {color:"#000000"}; 
        icono    = icono ? icono : "";
        margen   = margen ? { marginLeft: margen } : { marginRight:"0"};
        columnas = columnas ? columnas : ""; 

        let Icono = mas ? <BotonTogle identificador={mas} poicion={pos} /> : <i className={icono} style={margen}></i>;

        return (<th colSpan={columnas} style={estilo}>
                {Icono}
                <span style={{ marginLeft: "5px" }} title={dato}>
                    {dato}
                </span>
            </th>);
    }
    ///<----------------------------------------------------------------- Componente Base De Tabla resultados Y totales.
    const CeldasTablaResultados = ({ dato, estilo  }) => {
        estilo = estilo ? estilo : { color: "#000000" };
        return (
            <th style={estilo}>
                    {moneyFormat(redondeo(dato||0))}
            </th>
        );
    }

    //Componesntes Principales #####################################################################################
    ///<----------------------------------------------------------------- Componente Menus De Tabla.
    const TablaMenus = () => {
        /* Componente Cavecera */
        const CaveceraTabla = () => {
            return (<thead>
                <tr>
                    <th rowSpan="3" style={{ fontSize: "20px", textAlign: "center", backgroundColor: "#0077b3", color: "azure" }}>
                        {establecimiento.establecimiento || ""}
                    </th>
                    <th style={{ backgroundColor: "#0077b3", color: "azure", top: "0" }}>AÑO</th>
                </tr>
                <tr>
                    <th style={{ backgroundColor: "#0077b3", color: "azure", top: "30px"}}>MES</th>
                </tr>
                <tr>
                    <th style={{ backgroundColor: "#0077b3", color: "azure", top: "60px" }}>SEMANA</th>
                </tr>
            </thead>);
        }
        /* Componente Cuerpo  */
        const CuerpoTabla = () => {
            ///<----------------------------------------------------------------- Funcion obtiene lista de Conceptos.
            const Conceptos = () => {
                const $lista = [];
                for (let concepto of $ORDEN_DATOS_TABLA){
                    comprobar_concepto(concepto) ? $lista.push( < Concepto concepto={concepto} />) : '';
                }
                return $lista;
            }
            ///<----------------------------------------------------------------- Componente Concepto
            const Concepto = ({ concepto }) => {
                const $lista = []
                const { lista_conceptos } = establecimiento;
                let $datos = lista_conceptos ? lista_conceptos.filter(e => e.concepto == concepto) : [];

                $datos.length > 0 ?  $datos.forEach(concepto_ => {
                        let ident = `tb_${remplazar_espacios_por_guion_bajo(concepto_.concepto)}`;
                    $lista.push(<tr>
                    <CeldasTabla
                        dato={concepto_.concepto}
                        estilo={{ forntSize: "18px", color: "azure", background: "#0e58b7" }}
                        icono={"fa fa-chevron-right"}
                        margen={"5px"}
                        columnas={"2"}
                        mas={ident}
                    />
                    </tr>,
                    <Clasifidador
                        ListaClasificadores={concepto_.Lista_clasificadores}
                        nombre={ident}
                    />);
                }) : $lista.push(<tr >
                    <CeldasTabla
                        dato={concepto}
                        estilo={{ forntSize: "18px", color: "azure", background: "#737373" }}
                        icono={"fa fa-chevron-circle-right"}
                        margen={"5px"}
                        columnas={"2"}
                     />
                 </tr>);
                return $lista;
            }
            ///<-----------------------------------------------------------------
            const Clasifidador = ({ ListaClasificadores, nombre }) => {
                const $lista = [];
                
                ListaClasificadores.forEach(clasifidador_ => {
                    if (comprobar_movimineto(clasifidador_.Lista_SemanaAnios, "Total_Costo")) {
                        let ident = crear_identificador(nombre, clasifidador_.clasificador);
                        $lista.push(
                            <tr className={nombre} style={{ display: "none" }}>
                                <CeldasTabla
                                    dato={clasifidador_.clasificador}
                                    estilo={{ forntSize: "18px", color: "azure", background: "#729fcf" }}
                                    icono={"fa fa-angle-right"}
                                    margen={"15px"}
                                    columnas={"2"}
                                    mas={ident}
                                    pos={1}
                                />
                            </tr>);
                        $lista.push(<SubClasificadores
                            subClasificadores={clasifidador_.Lista_subclasificadores}
                            nombre={ident}
                        />);
                    }
                    });
                
                return $lista;
            }
            ///<-----------------------------------------------------------------
            const SubClasificadores = ({ subClasificadores, nombre }) => {
                const $lista = [];
               
                subClasificadores.forEach(subClasificador_ => {
                    if (comprobar_movimineto(subClasificador_.Lista_SemanaAnios, "Total_Costo")) {
                        let ident = crear_identificador(nombre, subClasificador_.subclacificador);
                        $lista.push(
                            <tr className={nombre} style={{ display: "none" }} >
                                <CeldasTabla
                                    dato={subClasificador_.subclacificador}
                                    estilo={{ forntSize: "18px", background: "#b4c7dc" }}
                                    icono={"fa fa-angle-double-right"}
                                    margen={"25px"}
                                    columnas={"2"}
                                    mas={ident}
                                    pos={2}
                                />
                            </tr>);
                        $lista.push(<Movimientos
                            movimientos={subClasificador_.Lista_movimientos}
                            nombre={ident}
                        />);
                    }
                    });
                
                return $lista;
            }
            ///<-----------------------------------------------------------------
            const Movimientos = ({ movimientos, nombre }) => {
                const $lista = [];
                const $movimientos = [];
                movimientos.forEach(movimiento_ => {
                    const $index = $movimientos.findIndex(e => e.Tipo_movimiento == movimiento_.Tipo_movimiento);
                    if ($index == -1)
                        $movimientos.push(movimiento_);
                });
                if (comprobar_movimineto($movimientos, "Costo")) {
                    $movimientos.forEach(movimiento_ => {
                        //Tipo_movimiento
                        $lista.push(
                            <tr className={nombre} style={{display:"none"}}>
                                <CeldasTabla
                                    dato={movimiento_.Tipo_movimiento}
                                    estilo={{ forntSize: "18px", background: "#FFFFF0" }}
                                    icono={"fa fa-caret-right"}
                                    margen={"35px"}
                                    columnas={"2"}
                                />
                            </tr>
                        );
                    });
                }
                return $lista;
            }
            return ( <tbody>
                    <Conceptos
                    />
                    <tr>
                        <th colSpan="2" style={{ background: "#ff6600", color: "azure", textAlign: "left" }}>
                            <strong>UTILIDAD NETA OPERACIONAL POR SEMANA</strong>
                        </th>
                    </tr>
                </tbody>);
        }
        return ( <table className="table table-condensed">
                <CaveceraTabla />
                <CuerpoTabla />
            </table> );
    }
    ///<----------------------------------------------------------------- Componentes Con resultados Y totales.
    const TablaDatos = () => {
        let $SemanasTotales = typeof establecimiento === 'object' ? establecimiento.Lista_SemanaAnios : []; 
        let $Semanas = typeof establecimiento === 'object' ? establecimiento.Ordern.Semanas : []; 
        ///<-----------------------------------------------------------------Semana Mes Año.
        const CaveceraTabla = () => {
            let datos = typeof establecimiento === 'object' ? establecimiento.Ordern.Lista : []; 
            ///<----------------------------------------------------------------- Obtiene Tamaño Semanas.
            const tamanio_semanas_por_mes = meses => {
                let tamanio = 0;
                for (let mes of meses) { tamanio += mes.Semanas.length }
                return tamanio;
            }
            ///<----------------------------------------------------------------- Componente Años.
            const Anios = () => {
                return (<tr> {datos.map(e => <th colSpan={tamanio_semanas_por_mes(e.Meses)}
                            style={{ textAlign: "center", backgroundColor: "#0077b3", color: "azure",top:"0" }}>
                            {e.Anio}
                        </th>)}
                    <th rowSpan="3" style={{ fontSize: "20px", width: "140px", textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "0" }}>
                        TOTAL
                    </th>
                </tr>);
            };
            ///<----------------------------------------------------------------- Componente Meses.
            const Meses = () => {
                return ( <tr>{datos.map(anio =>anio.Meses.map(e =>
                    <th colSpan={tamanio_semanas_por_mes([e])} style={{ textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "30px" }}>
                        {e.Mes}
                    </th>))}
                </tr>);
            };
            ///<----------------------------------------------------------------- Componente Semanas.
            const Semanas = () => {
                return (<tr>{datos.map(anio =>anio.Meses.map(e => e.Semanas.map(semama =>
                    <th style={{ textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "60px" }}>
                        {semama.Semana}
                    </th>)))}
                </tr>);
            }

            return (<thead className="info">
                    <Anios />
                    <Meses />
                    <Semanas />
                </thead>);
        }
        ///<--------------------------------------------------------------------- Componentes De Resultados y Estructura De Datos.
        const StructuraTabla = () => {
            ///<----------------------------------------------------------------- Cuerpo De Datos Conceptos.
            const Conceptos = () => {
                const $lista = [];
                $ORDEN_DATOS_TABLA.forEach(concepto => comprobar_concepto(concepto)?$lista.push(< Concepto concepto={concepto} />):"");
                return $lista;
            }
            ///<----------------------------------------------------------------- Componente Concepto.
            const Concepto = ({ concepto }) => {
                let { lista_conceptos, Lista_SemanaAnios, UTILIDAD_EN_OPERACIONES } = establecimiento;
                let $lista = [];
                const $datos = lista_conceptos ? lista_conceptos.filter(e => e.concepto == concepto) : [];
                establecimiento ?
                    $datos.length > 0 ? $datos.forEach(concepto_ => {
                    let { concepto, Lista_SemanaAnios, Lista_clasificadores, Total_Costo } = concepto_;
                    let ident = `tb_${remplazar_espacios_por_guion_bajo(concepto)}`;
                        $lista.push(<tr>{
                            $Semanas.map(Semana_ => {
                        let $index = Lista_SemanaAnios.findIndex(e => e.Semana == Semana_),
                        $resultado = $index > -1 ? Lista_SemanaAnios[$index].Total_Costo : 0;
                        return (<CeldasTablaResultados
                            dato={$resultado}
                            estilo={{ forntSize: "14px", color: "azure", background: "#0e58b7", textAlign: "right" }}
                        />);
                     })}
                     <CeldasTablaResultados
                        dato={Total_Costo}
                        estilo={{ forntSize: "14px", color: "azure", background: "#0e58b7", textAlign: "right" }}
                        />
                        </tr>);
                        $lista.push(<Clasifidador
                            ListaClasificadores={Lista_clasificadores}
                            nombre={ident}
                        />);
                    })
                        : $lista.push(<tr>{$Semanas.map(Semana_ => {
                                let $index = Lista_SemanaAnios.findIndex(e => e.Semana == Semana_);

                                let $resultado = $index > -1 ? Lista_SemanaAnios[$index].UTILIDAD_EN_OPERACION.Total_Costo : 0;
                                return (
                                    <CeldasTablaResultados
                                        dato={$resultado}
                                        estilo={{ forntSize: "14px", color: "azure", background: "#737373", textAlign: "right" }}
                                    />
                                );
                            })}
                            <CeldasTablaResultados
                                dato={UTILIDAD_EN_OPERACIONES.Total_Costo}
                                estilo={{ forntSize: "14px", color: "azure", background: "#737373", textAlign: "right" }}
                            />
                        </tr>) : '';
                return $lista;
            }
            ///<----------------------------------------------------------------- Componente Clasificador.
            const Clasifidador = ({ ListaClasificadores, nombre }) => {
                let $lista = [];
                ListaClasificadores.forEach(clasifidador_ => {
                    let { clasificador, Lista_SemanaAnios, Total_Costo, Lista_subclasificadores } = clasifidador_,
                        ident = crear_identificador(nombre, clasificador);
                    if (comprobar_movimineto(Lista_SemanaAnios, "Total_Costo")) {
                        $lista.push(<tr className={nombre} style={{ display: "none" }}>
                            {$Semanas.map(Semana_ => {
                                let $index = Lista_SemanaAnios.findIndex(e => e.Semana == Semana_),
                                    $resultado = $index > -1 ? Lista_SemanaAnios[$index].Total_Costo : 0;
                                return (<CeldasTablaResultados
                                    dato={$resultado}
                                    estilo={{ forntSize: "14px", color: "azure", background: "#729fcf", textAlign: "right" }}
                                />);
                            })}
                            <CeldasTablaResultados
                                dato={Total_Costo}
                                estilo={{ forntSize: "14px", color: "azure", background: "#729fcf", textAlign: "right" }}
                            />
                        </tr>);
                        $lista.push(<SubClasificadores
                            subClasificadores={Lista_subclasificadores}
                            nombre={ident}
                        />)
                    }
                });
                return $lista;
            }
            ///<----------------------------------------------------------------- Componente SubClasificador.
            const SubClasificadores = ({ subClasificadores, nombre }) => {
                let $lista = [];
                subClasificadores.forEach(subClasificador_ => {
                    let { subclacificador, Lista_SemanaAnios, Total_Costo, Lista_movimientos } = subClasificador_,
                        ident = crear_identificador(nombre, subclacificador);
                    if (comprobar_movimineto(Lista_SemanaAnios, "Total_Costo")) {
                        $lista.push( <tr className={nombre} style={{ display: "none" }}>
                            {$Semanas.map(Semana_ => {
                            let $index = Lista_SemanaAnios.findIndex(e => e.Semana == Semana_),
                                $resultado = $index > -1 ? Lista_SemanaAnios[$index].Total_Costo : 0;
                                return ( <CeldasTablaResultados
                                    dato={$resultado}
                                    estilo={{ forntSize: "14px", background: "#b4c7dc", textAlign: "right" }}
                                />);
                            })}
                            <CeldasTablaResultados
                                dato={Total_Costo}
                                estilo={{ forntSize: "14px", background: "#b4c7dc", textAlign: "right" }}
                            />
                        </tr>);
                        $lista.push(<Movimientos
                            movimientos={Lista_movimientos}
                            nombre={ident}
                        />);
                    }
                });
                return $lista;
            }
            ///<----------------------------------------------------------------- Componente Movimiento.
            const Movimientos = ({ movimientos, nombre }) => {
                const $lista = [];
                const $movimientos = [];
                ///<-----------------------------------------------------------------
                const obtenerTotal = (movimiento) => {
                    let $total = 0;
                    for (let movimiento_ of movimientos.filter(e => e.Tipo_movimiento == movimiento)){$total += movimiento_.Costo}
                    return $total;
                }
                for (let movimiento_ of movimientos)
                    { $movimientos.findIndex(e => e.Tipo_movimiento == movimiento_.Tipo_movimiento) == -1 ? $movimientos.push(movimiento_) : '' }
                comprobar_movimineto($movimientos, "Costo") ?
                    $movimientos.forEach(movimiento_ => {
                        let { Tipo_movimiento } = movimiento_;
                        //Tipo_movimiento
                        $lista.push(<tr className={nombre} style={{ display: "none" }} >
                            {$Semanas.map(Semana_ => {
                                let $index = movimientos.findIndex(e => e.Semana == Semana_ && e.Tipo_movimiento == Tipo_movimiento),
                                    $resultado = $index > -1 ? movimientos[$index].Costo : 0;
                                return (<CeldasTablaResultados
                                    dato={$resultado}
                                    estilo={{ forntSize: "14px", color: "#000000", textAlign: "right" }}
                                />);
                            })}
                            <CeldasTablaResultados
                                dato={obtenerTotal(Tipo_movimiento)}
                                estilo={{ forntSize: "14px", color: "#000000", textAlign: "right" }}
                            />
                        </tr>);
                    }): '';
                return $lista;
            }
            ///<----------------------------------------------------------------- Componente Totales.
            const Totales = () => {
                let $total = 0;
                return ( <tr>{$SemanasTotales.map(semana_ => {
                        $total += semana_.Total_Costo;
                        return (<th style={{ background: "#ff6600", color: "azure", textAlign: "right"}}>{moneyFormat(redondeo(semana_.Total_Costo))}</th>)})
                    }
                    <th style={{ background: "#ff6600", color: "azure",textAlign:"right" }}>{moneyFormat(redondeo($total))}</th>
                 </tr>);
            }
            return (
                <tbody>
                    <Conceptos />
                    <Totales />
                </tbody>
                );
        }
        return (  <table className="table table-condensed">
                <CaveceraTabla />
                <StructuraTabla />
            </table>  );
    }

    return (<div id="modal_movimientos_por_establecimiento"
                style={{
                    display: "none",
                    position: "fixed",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(144, 144, 146, 0.29)",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 999
                }}>
            <div className="panel panel-default animate"
                style={{ height: "95%", width: "90%" }}>
                <div className="panel-heading" style={{ background: "#006699", color: "#FFFFFF" }}>
                    <i
                        className="btn btn-danger fa fa-close"
                        style={{ float: "right" }}
                        onClick={() => document.getElementById("modal_movimientos_por_establecimiento").style.display = "none"}>
                    </i>
                    <h4> <i className="fa fa-calendar"></i> MOVIMIENTOS A DETALLE {establecimiento.establecimiento || ""}.</h4>
                </div>
                <div className="panel-body" style={{ height: "90%" }} >
                    <strong style={{ color: "#666666", display: "block", fontSize: "20px" }}>
                        MOVIMIENTOS OPERACIONAL POR SEMANA DEL AÑO.
                        </strong>
                    <div style={{ height: "90%", border: "solid 1px #444", overflow: "auto", marginTop: "30px" }} >
                        <div style={{ width: "46%", float: "left", marginTop: "1px", marginLeft: "0" }}>
                            <TablaMenus />
                        </div>
                        <div style={{ width: "14%", float: "left", marginTop: "1px" }}>
                            <TablaDatos />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

/*Efectos De Toggle */
/*****************************************************************/
class BotonTogle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clase:"glyphicon glyphicon-plus"
        }
        this.change = this.cambio.bind(this);
    }
    cambio() {
        let { clase } = this.state;
        let { identificador, poicion } = this.props;
        const dato = clase == "glyphicon glyphicon-minus" ?
            "glyphicon glyphicon-plus" :
            "glyphicon glyphicon-minus";
        this.setState({ clase: dato});
        ocultarMostrar(identificador, poicion);
    }
    render() {
        let { clase } = this.state;
        return (<i className={clase}
            onClick={this.change}>
        </i>);
    }
}
/*****************************************************************/
/*efecto ocultar/mostrar operaciones a detalle establecimiento*/
/**/    const ocultarMostrar = (dato,poicion)=>{
    let array = dato.split(" ");

    const ocultar_hijos = () => {
        let todos = document.querySelectorAll(`.${array[0]}_1`);
        todos.forEach(e => {
            e.style.display = "none";
        });
        return "none";
    }
    let clase_ = document.querySelectorAll(`.${array[array.length - 1]}`);
    clase_.forEach(op => {
        let vista = op.style.display;
        op.style.display = vista ? '': ocultar_hijos();
    })
}   /**/
/**/    const remplazar_espacios_por_guion_bajo=(e)=>{
    let r = "";
    for (let x of e) { r+=x!=" "?x:"_" }
    return r;
}   /**/
/**/    const crear_identificador = (clase, sub) => {
    const clase_ = remplazar_espacios_por_guion_bajo(clase);
    const sub_   = remplazar_espacios_por_guion_bajo(sub);
    return `${clase}_1 ${clase_}_${sub_}`;
}   /**/

location.protocol != "http:" ? location.protocol = "http:": ReactDOM.render(<EstadoDeResultados />, document.getElementById("root"));