
import React, { Component } from 'react';

import Cavecera from './Cavecera';
import VistaTablaPrincipal from './VistaTablaPrincipal';
import ModalConceptos from './ModalConceptos';
import ModalMivimientosPorEstablecimiento from './ModalMivimientosPorEstablecimiento';

function redondeo(numero) {
    return Math.round(numero * 100) / 100;
}

const moneyFormat = (numero_) => {

    const decimal_con_cero = (i) => i > 9 || i.search(0) > -1 ? i : i + "0";
    const mayora_a_mil = (numero) => new Intl.NumberFormat('es-MX').format(numero);

    const numero_string = numero_.toString();
    const decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    const unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return `$${unidades}.${decimal}`;
}

const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = "/api/"

export default class App extends Component {

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
                lista_establecimientos: []
            },
            lista: [],
            concepto: "",
            establecimiento: {
                Folio_Establecimiento: -1,
                Establecimiento: "",
                Lista: [],
                Clasificadores: []
            },
            seleccion: 0
        }

        this.barChart = null;

        this._fecha = this.on_fecha.bind(this);
        this._periodo = this.on_perido.bind(this);
        this._concepto = this.on_concepto.bind(this);
        this._Establecimiento_pantalla_0 = this.on_Establecimiento_pantalla_0.bind(this);
        //this.Obtener_estado_de_resultados();
        setTimeout(() => document.getElementById("modal_de_efecto_carga").style.display = "none", 1000);
        //setTimeout(() => this.grafica_barras(), 1000);

    }
    /*eventos*/
    on_fecha(e) {
        const f = e.target.value.split("-");
        this.setState({ fecha: e.target.value })
    }
    on_perido(e) {
        this.setState({ periodo: e.target.value });
    }
    on_concepto(concepto) {
        console.log("concepto", concepto);

        document.getElementById("modal_concepto").style.display = "flex";
        this.setState({ concepto: concepto });
    }
    on_Establecimiento_pantalla_0(establecimiento) {
        console.log("Detalles=>", establecimiento);
        this.setState({ seleccion: establecimiento });

        const $establecimiento = document.getElementById("modal_movimientos_por_establecimiento");
        $establecimiento.style.display = "flex";
    }
    on_eventoEstablecimiento(establecimiento) {
        const lista = [];
        console.log("Establecimiento Seleccion:", establecimiento);
        establecimiento.lista_conceptos.forEach(concepto => {

            if (concepto.concepto == this.state.concepto)
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
        const $lista_conceptos = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD BRUTA", "MARGEN BRUTO", "UTILIDAD OPERACIONAL", "IMPUESTOS PTU 10%", "UTILIDAD NETA", "MARGEN NETO"];
        /*const $lista_conceptos = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD BRUTA", "GASTOS DE OPERACION", "UTILIDAD NETA OPERACIONAL", "IMPUESTOS ISR", "IMPUESTOS PTU 10%", "UTILIDAD NETA", "RETIROS UTILIDAD"];*/
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
                        case "MARGEN BRUTO":
                            $obj.data.push(redondeo(establecimiento_.GASTOS_DE_OPERACION.Total_Costo * -1));
                            break;
                        case "UTILIDAD OPERACIONAL":
                            $obj.data.push(redondeo(establecimiento_.UTILIDAD_NETA_OPERACIONES.Total_Costo));
                            break;
                        case "IMPUESTOS PTU 10%":
                            $obj.data.push(redondeo(establecimiento_.IMPUESTOS_PTU.Total_Costo * -1));
                            break;
                        case "MARGEN NETO":
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
                        fontSize: 18
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
        if (document.getElementById("modal_de_efecto_carga")) {
            document.getElementById("modal_de_efecto_carga").style.display = "flex";
            this.setState({ lista: [] });
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
                                Totales: respuesta
                            });
                            document.getElementById("modal_de_efecto_carga").style.display = "none";

                            if (respuesta.lista_establecimientos.length > 0) {
                                this.grafica_barras(respuesta.lista_establecimientos);
                            } else if (confirm("Sin Datos A Mostrar...\n Reintentar?")) {
                                this.Obtener_estado_de_resultados();
                            };
                        }).catch(e => console.error(e))
            ).catch(e => alert("error en Conexion api!!!"));
    }
    Obtener_movimientos_Ordenados(lista) {
        if (document.getElementById("modal_de_efecto_carga")) {
            document.getElementById("modal_de_efecto_carga").style.display = "flex";
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
                                document.getElementById("modal_de_efecto_carga").style.display = "none";
                            } else alert("No Hay Respuesta!!!");
                        })
                        .catch(e => console.error(e))
            ).catch(e => alert("error en Conexion api!!!"));
    }

    render() {
        const { periodo, fecha, concepto, Totales, seleccion } = this.state;
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
                    eventoEstablecimiento={this._Establecimiento_pantalla_0}
                />
                <ModalMivimientosPorEstablecimiento
                    establecimiento={seleccion}
                />
            </div>
        );
    }
}



