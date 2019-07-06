"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $MI_URL = window.location.protocol + "//" + window.location.hostname;
var $URL_API = "/api/";

var EstadoDeResultados = (function (_React$Component) {
    _inherits(EstadoDeResultados, _React$Component);

    function EstadoDeResultados(props) {
        _classCallCheck(this, EstadoDeResultados);

        _get(Object.getPrototypeOf(EstadoDeResultados.prototype), "constructor", this).call(this, props);
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
        };

        this.barChart = null;

        this._fecha = this.on_fecha.bind(this);
        this._periodo = this.on_perido.bind(this);
        this._concepto = this.on_concepto.bind(this);
        this._Establecimiento_pantalla_0 = this.on_Establecimiento_pantalla_0.bind(this);
        //this.Obtener_estado_de_resultados();
        setTimeout(function () {
            return document.getElementById("pantalla_carga").style.display = "none";
        }, 1000);
        //setTimeout(() => this.grafica_barras(), 1000);
    }

    /*
     *Componentes estaticos.
     */

    /*eventos*/

    _createClass(EstadoDeResultados, [{
        key: "on_fecha",
        value: function on_fecha(e) {
            var f = e.target.value.split("-");
            this.setState({ fecha: e.target.value });
        }
    }, {
        key: "on_perido",
        value: function on_perido(e) {
            this.setState({ periodo: e.target.value });
        }
    }, {
        key: "on_concepto",
        value: function on_concepto(concepto) {
            console.log("concepto", concepto);

            document.getElementById("modal_concepto").style.display = "flex";
            this.setState({ concepto: concepto });
        }
    }, {
        key: "on_Establecimiento_pantalla_0",
        value: function on_Establecimiento_pantalla_0(establecimiento) {
            console.log("Detalles=>", establecimiento);
            this.setState({ seleccion: establecimiento });

            var $establecimiento = document.getElementById("modal_movimientos_por_establecimiento");
            $establecimiento.style.display = "flex";
        }
    }, {
        key: "on_eventoEstablecimiento",
        value: function on_eventoEstablecimiento(establecimiento) {
            var _this = this;

            var lista = [];
            console.log("Establecimiento Seleccion:", establecimiento);
            establecimiento.lista_conceptos.forEach(function (concepto) {

                if (concepto.concepto == _this.state.concepto) concepto.Lista_clasificadores.forEach(function (clasificador) {
                    clasificador.Lista_subclasificadores.forEach(function (subclasificador) {
                        subclasificador.Lista_movimientos.forEach(function (movimiento) {
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
    }, {
        key: "fecha_hoy_dd_mm_yy",
        value: function fecha_hoy_dd_mm_yy() {
            var f = new Date();
            var dia = f.getDate() > 10 ? f.getDate() : "0" + f.getDate();
            var mes = f.getMonth() + 1 > 10 ? f.getMonth() + 1 : "0" + (f.getMonth() + 1);
            var anio = f.getFullYear();

            return dia + "/" + mes + "/" + anio;
        }
    }, {
        key: "fecha_hoy",
        value: function fecha_hoy() {
            var f = new Date();
            var dia = f.getDate() > 10 ? f.getDate() : "0" + f.getDate();
            var mes = f.getMonth() + 1 > 10 ? f.getMonth() + 1 : "0" + (f.getMonth() + 1);
            var anio = f.getFullYear();

            return anio + "-" + mes + "-" + dia;
        }
    }, {
        key: "parseo_fecha",
        value: function parseo_fecha() {
            var f = this.state.fecha.split("-");
            return f[2] + "-" + f[1] + "-" + f[0];
        }
    }, {
        key: "grafica_barras",
        value: function grafica_barras($lista_establecimientos) {
            var $lista_conceptos = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD EN OPERACION", "GASTOS DE OPERACION", "UTILIDAD NETA OPERACIONAL", "IMPUESTOS ISR", "IMPUESTOS PTU 10%", "UTILIDAD NETA", "RETIROS UTILIDAD"];
            var $colores = ["#00b300", "#66ccff", "#ff9933", "#ff0000", "#ff00a3", "#0077b3", "#996633", "#999966", "#33cccc"];
            var $indicadores = [];
            var $establecimientos = [];

            $lista_establecimientos.forEach(function (establecimiento_) {
                $establecimientos.push(establecimiento_.establecimiento);
            });
            $lista_conceptos.forEach(function (concepto_, p) {

                if (concepto_ != "RETIROS UTILIDAD") {
                    (function () {
                        var $obj = {
                            label: concepto_,
                            data: [],
                            backgroundColor: $colores[p],
                            borderColor: "black",
                            borderWidth: 1,
                            fill: false
                        };
                        $lista_establecimientos.forEach(function (establecimiento_) {
                            switch (concepto_) {
                                case "VENTAS NETAS":
                                    $obj.data.push(redondeo(establecimiento_.VENTAS_NETAS.Total_Costo));
                                    break;
                                case "COSTO DE VENTAS":
                                    $obj.data.push(redondeo(establecimiento_.COSTO_DE_VENTAS.Total_Costo * -1));
                                    break;
                                case "UTILIDAD EN OPERACION":
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
                    })();
                }
            });

            var ctx = document.getElementById("dashboard_graficos");

            if (this.barChart != null) {
                this.barChart.clear();
                this.barChart.destroy();
            }
            this.barChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: $establecimientos,
                    datasets: $indicadores
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                                callback: function callback(value, index, values) {
                                    return moneyFormat(value);
                                }
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "CONCEPTOS ($)."
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Grafica Estado De Resultados De Operaciones.',
                        fontSize: 18
                    },
                    tooltips: {
                        labelColor: function labelColor(tooltipItem, chart) {
                            return {
                                borderColor: 'rgb(0, 153, 204)',
                                backgroundColor: 'rgb(66d9ff)'
                            };
                        },
                        labelTextColor: function labelTextColor(tooltipItem, chart) {
                            return '#543453';
                        }
                    }
                }
            });
            this.barChart.update();
        }

        /*Conexiones*/
    }, {
        key: "Obtener_estado_de_resultados",
        value: function Obtener_estado_de_resultados() {
            var _this2 = this;

            if (document.getElementById("pantalla_carga")) {
                document.getElementById("pantalla_carga").style.display = "flex";
                this.setState({ lista: [] });
            }
            fetch($URL_API + "Estado_de_resultados?fecha=" + this.parseo_fecha() + "&meses=" + this.state.periodo, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json().then(function (respuesta) {
                    _this2.setState({
                        lista: respuesta.lista_establecimientos,
                        Totales: respuesta
                    });
                    document.getElementById("pantalla_carga").style.display = "none";

                    if (respuesta.lista_establecimientos.length > 0) {
                        _this2.grafica_barras(respuesta.lista_establecimientos);
                    } else if (confirm("Sin Datos A Mostrar...\n Reintentar?")) {
                        _this2.Obtener_estado_de_resultados();
                    };
                })["catch"](function (e) {
                    return console.error(e);
                });
            })["catch"](function (e) {
                return alert("error en Conexion api!!!");
            });
        }
    }, {
        key: "Obtener_movimientos_Ordenados",
        value: function Obtener_movimientos_Ordenados(lista) {
            var _this3 = this;

            if (document.getElementById("pantalla_carga")) {
                document.getElementById("pantalla_carga").style.display = "flex";
            }
            fetch($URL_API + "Estado_de_resultados", {
                method: 'post',
                credentials: 'same-origin',
                body: JSON.stringify(lista),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json().then(function (respuesta) {
                    console.log(respuesta);
                    if (respuesta) {
                        _this3.setState({ establecimiento: respuesta });
                        document.getElementById("modal_movimientos").style.display = "flex";
                        document.getElementById("pantalla_carga").style.display = "none";
                    } else alert("No Hay Respuesta!!!");
                })["catch"](function (e) {
                    return console.error(e);
                });
            })["catch"](function (e) {
                return alert("error en Conexion api!!!");
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state;
            var periodo = _state.periodo;
            var fecha = _state.fecha;
            var concepto = _state.concepto;
            var Totales = _state.Totales;
            var seleccion = _state.seleccion;

            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(Cavecera, {
                    periodo: periodo,
                    fecha: fecha,
                    evFecha: this._fecha,
                    evPeriodo: this._periodo,
                    evReload: this.Obtener_estado_de_resultados.bind(this)
                }),
                React.createElement(VistaTablaPrincipal, {
                    lista: Totales.lista_establecimientos,
                    evento: this._concepto,
                    eventoEstablecimiento: this._Establecimiento_pantalla_0,
                    Totales: Totales
                }),
                React.createElement(ModalConceptos, {
                    concepto: concepto,
                    lista: Totales.lista_establecimientos,
                    eventoEstablecimiento: this._Establecimiento_pantalla_0
                }),
                React.createElement(ModalMivimientosPorEstablecimiento, {
                    establecimiento: seleccion
                }),
                React.createElement(Cargar, {
                    nombre: "pantalla_carga"
                })
            );
        }
    }]);

    return EstadoDeResultados;
})(React.Component);

var Cargar = function Cargar(_ref) {
    var nombre = _ref.nombre;

    return React.createElement(
        "div",
        { id: nombre,
            style: {
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
            } },
        React.createElement(
            "label",
            { id: nombre + 1 },
            React.createElement("i", { className: "fa fa-circle-o-notch rotate" }),
            React.createElement(
                "strong",
                { style: { fontSize: "20px" } },
                " Cargando..."
            ),
            React.createElement("br", null)
        )
    );
};
///<-----------------------------------------------------------------
var moneyFormat = function moneyFormat(numero_) {

    var decimal_con_cero = function decimal_con_cero(i) {
        return i > 9 || i.search(0) > -1 ? i : i + "0";
    };
    var mayora_a_mil = function mayora_a_mil(numero) {
        return new Intl.NumberFormat('es-MX').format(numero);
    };

    var numero_string = numero_.toString();
    var decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    var unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return "$" + unidades + "." + decimal;
};
///<-----------------------------------------------------------------
function redondeo(numero) {
    return Math.round(numero * 100) / 100;
}

/**
 *  Vistas de la Aplicacion 
 */
/*Componete Cavecera Estados Resultados*/
var Cavecera = function Cavecera(_ref2) {
    var periodo = _ref2.periodo;
    var fecha = _ref2.fecha;
    var evPeriodo = _ref2.evPeriodo;
    var evFecha = _ref2.evFecha;
    var evReload = _ref2.evReload;

    ///<-----------------------------------------------------------------
    var CompSelect = function CompSelect() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "span",
                { style: { display: "inline-block", width: "150px" } },
                React.createElement(
                    "strong",
                    null,
                    " Periodo"
                ),
                React.createElement(
                    "select",
                    { defaultValue: periodo,
                        className: "form-control",
                        onChange: evPeriodo },
                    React.createElement(
                        "option",
                        { value: "0" },
                        "ACTUAL"
                    ),
                    React.createElement(
                        "optgroup",
                        { label: "PREVIOS" },
                        React.createElement(
                            "option",
                            { value: 1 },
                            "1 Mes"
                        ),
                        React.createElement(
                            "option",
                            { value: 2 },
                            "2 Meses"
                        ),
                        React.createElement(
                            "option",
                            { value: 3 },
                            "3 Meses"
                        )
                    )
                )
            ),
            React.createElement(
                "span",
                { style: { display: "inline-block", width: "150px", marginLeft: "15px", marginRight: "35px" } },
                React.createElement(
                    "strong",
                    null,
                    "Fecha"
                ),
                React.createElement("input", { type: "date",
                    className: "btn btn-default",
                    onChange: evFecha,
                    value: fecha
                })
            ),
            React.createElement(
                "i",
                { className: "btn btn-success",
                    style: { marginLeft: "15px" },
                    onClick: evReload },
                React.createElement(
                    "strong",
                    null,
                    "Cargar Informacion."
                ),
                React.createElement("i", { className: "fa fa-download", style: { marginLeft: "5px" } })
            )
        );
    };
    return React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
            "h3",
            null,
            "Estado De Resultados De Operaciones."
        ),
        React.createElement(CompSelect, null)
    );
};
/*Componete Tabla Principal Estados Resultados*/
var VistaTablaPrincipal = function VistaTablaPrincipal(_ref3) {
    var lista = _ref3.lista;
    var evento = _ref3.evento;
    var Totales = _ref3.Totales;
    var eventoEstablecimiento = _ref3.eventoEstablecimiento;

    var lista_conceptos = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD EN OPERACION", "TRUPUT DE OPERACION", "GASTOS DE OPERACION", "UTILIDAD NETA OPERACIONAL", "TRUPUT NETA OPERACIONAL", "IMPUESTOS ISR", "IMPUESTOS PTU 10%", "UTILIDAD NETA", "TRUPUT NETA", "RETIROS UTILIDAD", "UTILIDAD NETA DESPUES DE RETIRO"];
    var lista_establecimientos = [];
    ///<-----------------------------------------------------------------
    var Establecimiento = function Establecimiento() {
        var res = [];
        lista.forEach(function (elemento) {
            if (elemento.establecimiento != "GASTOS ESPECIALES") {
                res.push(React.createElement(
                    "th",
                    { key: elemento.folio_establecimiento, style: { background: "#0066ff", position: "sticky", top: "0" } },
                    React.createElement(
                        "i",
                        { style: { background: "#0066ff", border: "none" }, onClick: function () {
                                return eventoEstablecimiento(elemento);
                            }, className: "btn btn-info " },
                        elemento.establecimiento
                    )
                ));
                lista_establecimientos.push(elemento.establecimiento);
            }
        });
        return res;
    };
    ///<-----------------------------------------------------------------
    var Conceptos = function Conceptos() {
        var resultados = [];
        lista_conceptos.forEach(function (concepto, p) {

            if (concepto.search("UTILIDAD NETA") > -1) {
                resultados.push(React.createElement(
                    "tr",
                    { key: p, style: { width: "300px", background: "#f37021" } },
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "strong",
                            { style: { color: "azure" } },
                            concepto
                        )
                    )
                ));
            } else {
                if (concepto.search("UTILIDAD") > -1 && concepto.search("RETIROS") == -1) resultados.push(React.createElement(
                    "tr",
                    { key: p },
                    React.createElement(
                        "th",
                        { style: { background: "#cceeff" } },
                        React.createElement("i", { className: "glyphicon glyphicon-triangle-right" }),
                        React.createElement(
                            "strong",
                            null,
                            concepto
                        )
                    )
                ));else if (concepto.search("IMPUESTOS") > -1) resultados.push(React.createElement(
                    "tr",
                    { key: concepto },
                    React.createElement(
                        "th",
                        { style: { background: "#ccff99" } },
                        React.createElement("i", { className: "glyphicon glyphicon-triangle-right" }),
                        React.createElement(
                            "strong",
                            null,
                            concepto
                        )
                    )
                ));else if (concepto.search("TRUPUT") > -1) resultados.push(React.createElement(
                    "tr",
                    { key: concepto },
                    React.createElement(
                        "th",
                        { style: { backgroundColor: "#ffcc99" } },
                        React.createElement("i", { className: "glyphicon glyphicon-triangle-right" }),
                        React.createElement(
                            "strong",
                            null,
                            concepto
                        )
                    )
                ));else resultados.push(React.createElement(
                    "tr",
                    { key: concepto },
                    React.createElement(
                        "th",
                        { onClick: function () {
                                return evento(concepto);
                            } },
                        React.createElement("i", { className: "glyphicon glyphicon-triangle-right" }),
                        React.createElement(
                            "strong",
                            null,
                            concepto
                        ),
                        React.createElement("i", { className: "glyphicon glyphicon-info-sign",
                            style: { float: "right", fontSize: "18px", color: "#8c8c8c" }
                        })
                    )
                ));
            }
        });
        return resultados;
    };
    ///<-----------------------------------------------------------------
    var TotalConceptoPorEstablecimiento = function TotalConceptoPorEstablecimiento(_ref4) {
        var list = _ref4.list;
        var lista_est = _ref4.lista_est;

        var resultados = [];
        var totales = 0,
            retiros = 0;

        list.forEach(function (concepto) {
            var Trconceptos = [];
            ///<-----------------------------------------------------------------
            var total_conceptotos_component = function total_conceptotos_component(cons) {
                resultados.push(React.createElement(
                    "tr",
                    { key: concepto },
                    Trconceptos,
                    React.createElement(
                        "th",
                        { style: { textAlign: "right" } },
                        moneyFormat(redondeo(cons))
                    )
                ));
            };
            ///<-----------------------------------------------------------------
            var total_utilidades_component = function total_utilidades_component(utilidad) {
                resultados.push(React.createElement(
                    "tr",
                    { key: concepto },
                    Trconceptos,
                    React.createElement(
                        "th",
                        { style: { textAlign: "right", background: "#cceeff" } },
                        moneyFormat(redondeo(utilidad))
                    )
                ));
            };
            ///<-----------------------------------------------------------------
            var total_Truput_component = function total_Truput_component(utilidad) {
                resultados.push(React.createElement(
                    "tr",
                    { key: concepto },
                    Trconceptos,
                    React.createElement(
                        "th",
                        { style: { textAlign: "right", backgroundColor: "#ffcc99" } },
                        redondeo(utilidad),
                        " ",
                        React.createElement("i", { className: "fa fa-percent" })
                    )
                ));
            };
            ///<-----------------------------------------------------------------
            var total_Impuestos_component = function total_Impuestos_component(utilidad) {
                resultados.push(React.createElement(
                    "tr",
                    { key: concepto },
                    Trconceptos,
                    React.createElement(
                        "th",
                        {
                            style: { textAlign: "right", background: "#ccff99" }
                        },
                        moneyFormat(redondeo(utilidad))
                    )
                ));
            };
            ///<-----------------------------------------------------------------
            var total_total_componet = function total_total_componet(Total_Costo) {
                resultados.push(React.createElement(
                    "tr",
                    { key: concepto },
                    Trconceptos,
                    React.createElement(
                        "th",
                        { style: { background: totales > 0 ? "#009933" : "#ff0000", color: "azure", textAlign: "right" } },
                        moneyFormat(redondeo(Total_Costo))
                    )
                ));
            };
            var despues_de_retiro = function despues_de_retiro(total) {
                resultados.push(React.createElement(
                    "tr",
                    { key: concepto },
                    Trconceptos,
                    React.createElement(
                        "th",
                        { style: { background: total > 0 ? "green" : "red", color: "azure", textAlign: "right" } },
                        moneyFormat(redondeo(total))
                    )
                ));
            };

            lista.forEach(function (establecimiento) {
                var pos = lista_est.indexOf(establecimiento.establecimiento);
                //establecimiemto
                ///<-----------------------------------------------------------------
                var conceptotos_component = function conceptotos_component(cons) {
                    var a = redondeo(cons.Total_Costo);

                    if (establecimiento.establecimiento != "GASTOS ESPECIALES") {
                        Trconceptos[pos] = React.createElement(
                            "td",
                            { key: concepto + "_" + establecimiento.establecimiento, style: { textAlign: "right" } },
                            moneyFormat(a)
                        );
                    }
                };
                ///<-----------------------------------------------------------------
                var utilidades_component = function utilidades_component(utilidad) {
                    var a = redondeo(utilidad.Total_Costo);
                    Trconceptos[pos] = React.createElement(
                        "td",
                        { key: concepto + "_" + establecimiento.establecimiento, style: { textAlign: "right", background: "#cceeff" } },
                        moneyFormat(a)
                    );
                };
                ///<-----------------------------------------------------------------
                var Truput_component = function Truput_component(utilidad) {
                    var a = redondeo(utilidad.Total_Costo);
                    Trconceptos[pos] = React.createElement(
                        "td",
                        { key: concepto + "_" + establecimiento.establecimiento, style: { textAlign: "right", background: "#ffcc99" } },
                        a,
                        " ",
                        React.createElement("i", { className: "fa fa-percent" })
                    );
                };
                ///<-----------------------------------------------------------------
                var Impuestos_component = function Impuestos_component(utilidad) {
                    var a = redondeo(utilidad.Total_Costo);
                    Trconceptos[pos] = React.createElement(
                        "td",
                        { key: concepto + "_" + establecimiento.establecimiento, style: { textAlign: "right", background: "#ccff99" } },
                        moneyFormat(a)
                    );
                };
                ///<-----------------------------------------------------------------
                var total_componet = function total_componet(Total_Costo) {
                    totales += Total_Costo;
                    if (Total_Costo > 0) Trconceptos[pos] = React.createElement(
                        "th",
                        { key: concepto + "_" + establecimiento.establecimiento, style: { background: "#009933", color: "azure", textAlign: "right" } },
                        moneyFormat(Total_Costo)
                    );else Trconceptos[pos] = React.createElement(
                        "th",
                        { key: concepto + "_" + establecimiento.establecimiento, style: { background: "#ff0000", color: "azure", textAlign: "right" } },
                        moneyFormat(Total_Costo)
                    );
                };
                var despues_de_retiro = function despues_de_retiro(total) {
                    Trconceptos[pos] = React.createElement(
                        "th",
                        { key: concepto + "_" + establecimiento.establecimiento, style: { background: "gray", color: "azure", textAlign: "center" } },
                        total
                    );
                };

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
                    case "UTILIDAD EN OPERACION":
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
                case "UTILIDAD EN OPERACION":
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
    };
    return React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement(
            "div",
            { style: { height: "540px", overflowX: "scroll" } },
            React.createElement(
                "span",
                { style: { height: "90%", position: "sticky", left: "0", zIndex: "999", background: "azure", width: "20%", minWidth: "260px", display: "inline-block" } },
                React.createElement(
                    "table",
                    { className: "table" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            { className: "info" },
                            React.createElement(
                                "th",
                                { style: { width: "260px", background: "#005ce6", zIndex: "999", position: "sticky", top: "0" } },
                                React.createElement(
                                    "i",
                                    { style: { width: "260px", background: "#005ce6", border: "none" },
                                        className: "btn btn-info" },
                                    React.createElement("i", { className: "glyphicon glyphicon-usd" }),
                                    " CONCEPTOS"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(Conceptos, null)
                    )
                )
            ),
            React.createElement(
                "span",
                { style: { height: "90%", width: "80%", display: "inline-block", zIndex: "990" } },
                React.createElement(
                    "table",
                    { className: "table table-bordered" },
                    React.createElement(
                        "thead",
                        { style: { zIndex: "990" } },
                        React.createElement(
                            "tr",
                            { className: "" },
                            React.createElement(Establecimiento, null),
                            React.createElement(
                                "th",
                                { style: { background: "#1aa3ff", zIndex: "990", position: "sticky", top: "0" } },
                                React.createElement(
                                    "i",
                                    { style: { background: "#1aa3ff", border: "none" },
                                        className: "btn btn-info" },
                                    "TOTAL"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(TotalConceptoPorEstablecimiento, {
                            list: lista_conceptos,
                            lista_est: lista_establecimientos
                        })
                    )
                )
            )
        ),
        React.createElement("canvas", { id: "dashboard_graficos", style: { height: "320px" } })
    );
};
/*Componete Modal Conceptos Estados Resultados*/ //>>======> Funcion A Modifcar.<-- listo 08-04-19.--<<
var ModalConceptos = function ModalConceptos(_ref5) {
    var concepto = _ref5.concepto;
    var lista = _ref5.lista;
    var eventoEstablecimiento = _ref5.eventoEstablecimiento;

    /*
         concepto es el concepto seleccionado con un click
         lista es la lista de estableciomientos con conceptos 
     */
    ///<-----------------------------------------------------------------
    var recorrer_lista = function recorrer_lista(funcion) {
        /*
         Recorre la lista de establecimientos filtrando por concepto dentro de ese concepto recorre los clasificados
         resibe como parametro funcion que recibe clasificador, establecimiento, conceptos.
         */
        lista.forEach(function (establecimiento) {

            var filtro = concepto == "RETIROS UTILIDAD" ? "GASTOS FAMILIA IZABAL" : concepto;
            var conceptos = establecimiento.lista_conceptos.filter(function (e) {
                return e.concepto == filtro;
            });
            conceptos.forEach(function (cons) {
                cons.Lista_clasificadores.forEach(function (clasificador) {
                    funcion(clasificador, establecimiento, conceptos);
                });
            });
        });
    };
    ///<-----------------------------------------------------------------
    var obtener_subclasificadores = function obtener_subclasificadores(clasificador) {
        var $lista = [],
            $lista_subclasificadores = [];
        recorrer_lista(function (clasificador_) {
            return !(clasificador_.clasificador == clasificador) || ($lista = $lista.concat(clasificador_.Lista_subclasificadores));
        });
        $lista.forEach(function (sub) {
            return !($lista_subclasificadores.findIndex(function (e) {
                return e == sub.subclacificador;
            }) === -1) || $lista_subclasificadores.push(sub.subclacificador);
        });
        return $lista_subclasificadores;
    };
    var obtener_movimientos = function obtener_movimientos(clasificador, subclacificador) {
        //<<----Modificando #########
        var lista = [],
            movimientos = [],
            subclasificadores = [];

        recorrer_lista(function (clasificador_) {
            if (clasificador_.clasificador == clasificador) {

                subclasificadores = subclasificadores.concat(clasificador_.Lista_subclasificadores.filter(function (e) {
                    return e.subclacificador == subclacificador;
                }));
            }
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = subclasificadores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _dato = _step.value;

                lista = lista.concat(_dato.Lista_movimientos);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = lista[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var dato = _step2.value;

                movimientos.findIndex(function (e) {
                    return e.Tipo_movimiento === dato.Tipo_movimiento;
                }) > -1 || movimientos.push(dato);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                    _iterator2["return"]();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return movimientos;
    };
    ///<-----------------------------------------------------------------
    var menu_conceptos = function menu_conceptos() {
        /*
         esta funcion debe de separa los clasificadores del concepto por establecimiento
         */
        var lista_1 = [];
        recorrer_lista(function (e) {
            if (!lista_1.includes(e.clasificador)) lista_1.push(e.clasificador);
        });

        return lista_1;
    };
    ///<-----------------------------------------------------------------
    var CrearMenu = function CrearMenu(_ref6) {
        var lista_1 = _ref6.lista_1;

        //crea la lista de subclasificadores  apartir del recorrido de menu conceptos
        var lista_r = [];
        lista_1.forEach(function (clacific) {
            var ident = "tb_" + remplazar_espacios_por_guion_bajo(clacific);
            lista_r.push(React.createElement(
                "tr",
                { className: "info", key: clacific },
                React.createElement(
                    "th",
                    { style: { background: "#99c3ff" } },
                    React.createElement(
                        "i",
                        { style: { marginLeft: "10px", marginRight: "10px" } },
                        React.createElement(BotonTogle, {
                            identificador: ident,
                            poicion: 0
                        })
                    ),
                    clacific
                )
            ));
            lista_r.push(React.createElement(MenuSubclasificadores, {
                clasificador: clacific,
                nombre: ident
            }));
        });
        lista_r.push(React.createElement(
            "tr",
            null,
            React.createElement(
                "th",
                { style: { background: "#f37021", color: "azure" } },
                "TOTALES :"
            )
        ));
        return lista_r;
    };
    ///<-----------------------------------------------------------------
    var MenuSubclasificadores = function MenuSubclasificadores(_ref7) {
        var clasificador = _ref7.clasificador;
        var nombre = _ref7.nombre;

        var $lista_subclasificadores = obtener_subclasificadores(clasificador);
        return $lista_subclasificadores.map(function (sub) {
            var ident = crear_identificador(nombre, sub);
            return [React.createElement(
                "tr",
                { style: { background: "#e6f0ff", display: "none" }, key: clasificador + "_" + sub, className: nombre },
                React.createElement(
                    "th",
                    null,
                    React.createElement(
                        "i",
                        { style: { marginLeft: "30px", marginRight: "10px" } },
                        React.createElement(BotonTogle, { identificador: ident
                        })
                    ),
                    sub
                )
            ), React.createElement(MenuMovimiento, { movimientos: obtener_movimientos(clasificador, sub), nombre: ident })];
        });
    };
    var MenuMovimiento = function MenuMovimiento(_ref8) {
        var movimientos = _ref8.movimientos;
        var nombre = _ref8.nombre;

        return movimientos.map(function (e) {
            return React.createElement(
                "tr",
                { style: { background: "#e6ffff", display: "none" }, key: "_" + e.Tipo_movimiento, className: nombre },
                React.createElement(
                    "th",
                    null,
                    React.createElement(
                        "span",
                        { style: { marginLeft: "50px", marginRight: "10px" } },
                        e.Tipo_movimiento
                    )
                )
            );
        });
    };
    ///<-----------------------------------------------------------------
    var CrearMovimientos = function CrearMovimientos(_ref9) {
        var clasificador = _ref9.clasificador;
        var subclasificador = _ref9.subclasificador;
        var nombre = _ref9.nombre;

        var lista_resultados = [],
            lista_auxiliar = [],
            movimientos = obtener_movimientos(clasificador, subclasificador).map(function (e) {
            return e.Tipo_movimiento;
        });

        movimientos.forEach(function (movimiento) {
            var suma_total = 0;
            lista_auxiliar = [];

            recorrer_lista(function (clasificador_, establecimiento_) {

                if (clasificador == clasificador_.clasificador) {

                    var pos_establecimiento = lista.findIndex(function (e) {
                        return e.establecimiento == establecimiento_.establecimiento;
                    }),
                        index_sub = clasificador_.Lista_subclasificadores.findIndex(function (subclasificador_) {
                        return subclasificador_.subclacificador == subclasificador;
                    });
                    var sub = index_sub > -1 ? clasificador_.Lista_subclasificadores[index_sub] : {};

                    if (index_sub > -1) {
                        var movimientos_total = 0,
                            index_mov = sub.Lista_movimientos.filter(function (e) {
                            return e.Tipo_movimiento == movimiento;
                        }) || [];

                        lista_auxiliar[pos_establecimiento] = index_mov.length > 0 ? index_mov.map(function (e) {

                            movimientos_total += e.Costo;

                            return e.Costo;
                        }) : [];
                        lista_auxiliar[pos_establecimiento] = lista_auxiliar[pos_establecimiento].length > 0 ? movimientos_total : 0;
                        suma_total += movimientos_total || 0;
                    }
                }
            });

            for (var i in lista) {
                lista_auxiliar[i] = React.createElement(
                    "td",
                    {
                        style: { textAlign: "right" },
                        key: lista_auxiliar[i] + "kjkdfgb" },
                    moneyFormat(redondeo(lista_auxiliar[i]) || 0)
                );
            }
            lista_auxiliar.push(React.createElement(
                "td",
                { style: { textAlign: "right" } },
                moneyFormat(redondeo(suma_total || 0))
            ));
            lista_resultados.push(React.createElement(
                "tr",
                { className: nombre, style: { display: "none", background: "#e6ffff" } },
                lista_auxiliar
            ));
        });

        return lista_resultados;
    };
    ///<-----------------------------------------------------------------
    var CrearSubclasificadores = function CrearSubclasificadores(_ref10) {
        var clasificador = _ref10.clasificador;
        var nombre = _ref10.nombre;

        var lista_ = [];
        obtener_subclasificadores(clasificador).forEach(function (sub) {

            var ident = crear_identificador(nombre, sub);
            var lista_auxiliar = [];
            var total_sub = 0;

            recorrer_lista(function (clasificador_, establecimiento_) {
                // recorrido Establecimiento

                !(clasificador == clasificador_.clasificador) || (function () {
                    var pos_est = lista.findIndex(function (e) {
                        return e.establecimiento == establecimiento_.establecimiento;
                    });
                    //
                    lista_auxiliar[pos_est] = clasificador_.Lista_subclasificadores.findIndex(function (subclasificador_) {
                        return subclasificador_.subclacificador == sub;
                    }) > -1 ? clasificador_.Lista_subclasificadores.find(function (subclasificador_) {
                        return subclasificador_.subclacificador == sub;
                    })["Total_Costo"] : 0;
                    total_sub += redondeo(lista_auxiliar[pos_est]);
                })();
            }); //fin recorrido Establecimiento
            for (var i in lista) {
                lista_auxiliar[i] = React.createElement(
                    "td",
                    {
                        style: { textAlign: "right" },
                        key: lista_auxiliar[i] + "kjkdfgb" },
                    moneyFormat(redondeo(lista_auxiliar[i]) || 0)
                );
            };

            lista_auxiliar.push(React.createElement(
                "td",
                {
                    style: { textAlign: "right" },
                    key: redondeo(total_sub) + "kjbfbbk" },
                moneyFormat(redondeo(total_sub))
            ));

            lista_.push(React.createElement(
                "tr",
                {
                    key: clasificador + "_123fsdffgddfgdss",
                    style: { display: "none", background: "#e6f0ff" },
                    className: nombre },
                lista_auxiliar
            ));

            lista_.push(React.createElement(CrearMovimientos, {
                clasificador: clasificador,
                subclasificador: sub,
                nombre: ident
            }));
        });
        return lista_;
    };
    ///<-----------------------------------------------------------------
    var CrearClasificadores = function CrearClasificadores(_ref11) {
        var clasificadores = _ref11.clasificadores;

        /* 
         Llena los resultados de cada establecimiento 
         */
        var lista_res = [];

        clasificadores.forEach(function (clasificador) {
            var lista_auxiliar = [];
            var ident = "tb_" + remplazar_espacios_por_guion_bajo(clasificador),
                total_resultado = 0;
            recorrer_lista(function (clasificador_, establecimiento_) {

                if (clasificador == clasificador_.clasificador) {

                    var pos_est = lista.findIndex(function (e) {
                        return e.establecimiento == establecimiento_.establecimiento;
                    });

                    lista_auxiliar[pos_est] = redondeo(clasificador_.Total_Costo);
                    total_resultado += redondeo(clasificador_.Total_Costo);
                }
            });

            for (var i in lista) {
                lista_auxiliar[i] = React.createElement(
                    "th",
                    { style: { textAlign: "right", background: "#b3d2ff" }, key: lista_auxiliar[i] + "-" + i },
                    " ",
                    moneyFormat(redondeo(lista_auxiliar[i]) || 0)
                );
            };

            lista_auxiliar.push(React.createElement(
                "th",
                { style: { textAlign: "right", background: "#b3d2ff" } },
                " ",
                moneyFormat(redondeo(total_resultado))
            ));
            lista_res.push(React.createElement(
                "tr",
                { key: clasificador + "_12sg3", className: "info" },
                lista_auxiliar
            ));
            lista_res.push(React.createElement(CrearSubclasificadores, {
                clasificador: clasificador,
                nombre: ident
            }));
        });

        return lista_res;
    };
    ///<-----------------------------------------------------------------
    var Establecimiento = function Establecimiento() {
        var res = [];
        lista.forEach(function (elemento) {
            res.push(React.createElement(
                "th",
                { key: elemento.folio_establecimiento, style: { background: "#3388ff", position: "sticky", top: "0" } },
                React.createElement(
                    "i",
                    {
                        style: { background: "#3388ff", border: "none" },
                        className: "btn btn-info ",
                        onClick: function () {
                            return eventoEstablecimiento(elemento);
                        }
                    },
                    elemento.establecimiento,
                    React.createElement("span", { className: "glyphicon glyphicon-info-sign", style: { marginLeft: "10px" } })
                )
            ));
        });
        return res;
    };
    ///<-----------------------------------------------------------------
    var PieDeTotales = function PieDeTotales() {
        var totales = [];
        var totales_ = 0;
        lista.forEach(function (establec) {
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
            totales.push(React.createElement(
                "th",
                { style: { background: "#f37021", color: "azure", textAlign: "right" } },
                moneyFormat(redondeo(TOTAL))
            ));
        });
        totales.push(React.createElement(
            "th",
            { style: { background: "#f37021", color: "azure", textAlign: "right" } },
            moneyFormat(redondeo(totales_))
        ));

        return React.createElement(
            "tr",
            { className: "success" },
            totales
        );
    };
    return React.createElement(
        "div",
        { id: "modal_concepto",
            className: "",
            style: {
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
            }
        },
        React.createElement(
            "div",
            { className: "panel panel-default animate",
                style: { height: "95%", width: "90%" }
            },
            React.createElement(
                "div",
                { className: "panel-heading",
                    style: { background: "#006aff", color: "#FFFFFF" }
                },
                React.createElement("i", { className: "btn btn-danger fa fa-close",
                    style: { float: "right" },
                    onClick: function () {
                        return document.getElementById("modal_concepto").style.display = "none";
                    }
                }),
                React.createElement(
                    "h4",
                    null,
                    React.createElement("i", { className: "fa fa-bar-chart",
                        style: { marginLeft: "10px", marginRight: "10px" }
                    }),
                    concepto,
                    "."
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body",
                    style: { height: "95%" }
                },
                React.createElement(
                    "div",
                    { style: { height: "96%", overflow: "auto" } },
                    React.createElement(
                        "span",
                        { style: { height: "100%", position: "sticky", left: "0", zIndex: "999", width: "30%", display: "inline-block" } },
                        React.createElement(
                            "table",
                            { className: "table" },
                            React.createElement(
                                "thead",
                                null,
                                React.createElement(
                                    "tr",
                                    { className: "info" },
                                    React.createElement(
                                        "th",
                                        { style: { background: "#006aff", zIndex: "999", position: "sticky", top: "0" } },
                                        React.createElement(
                                            "i",
                                            { style: { background: "#006aff", border: "none" },
                                                className: "btn btn-info" },
                                            React.createElement("i", { className: "fa fa-dollar",
                                                style: { marginLegt: "5px", marginRight: "5px" }
                                            }),
                                            concepto
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "tbody",
                                null,
                                React.createElement(CrearMenu, {
                                    lista_1: menu_conceptos()
                                })
                            )
                        )
                    ),
                    React.createElement(
                        "span",
                        { style: { height: "100%", width: "70%", display: "inline-block", zIndex: "990" } },
                        React.createElement(
                            "table",
                            { className: "table table-bordered" },
                            React.createElement(
                                "thead",
                                null,
                                React.createElement(
                                    "tr",
                                    { style: { background: "#06d1e0", zIndex: "999" }, className: "info" },
                                    React.createElement(Establecimiento, null),
                                    React.createElement(
                                        "th",
                                        { style: { background: "#006aff", zIndex: "999", position: "sticky", top: "0" } },
                                        React.createElement(
                                            "i",
                                            { style: { background: "#006aff", border: "none" },
                                                className: "btn btn-info" },
                                            "TOTAL"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "tbody",
                                null,
                                React.createElement(CrearClasificadores, {
                                    clasificadores: menu_conceptos()
                                }),
                                React.createElement(PieDeTotales, null)
                            )
                        )
                    )
                )
            )
        )
    );
};

/* Componente Modal Movimientos Estados Resultados*/ //======> Funcion A Modifcar.
var ModalMivimientosPorEstablecimiento = function ModalMivimientosPorEstablecimiento(_ref12) {
    var establecimiento = _ref12.establecimiento;

    //Varibles Globales ##########################################################################################
    var $ORDEN_DATOS_TABLA = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD EN OPERACION", "GASTOS DE OPERACION"];
    //"TRUPUT DE OPERACION","UTILIDAD NETA OPERACIONAL", "TRUPUT NETA OPERACIONAL", "IMPUESTOS ISR", "IMPUESTOS PTU 10%","TRUPUT NETA"

    //      Funciones Globales De Modal. #########################################################################
    ///<----------------------------------------------------------------- Funcion De Comprobacion.
    var comprobar_movimineto = function comprobar_movimineto(lista, tipo) {
        var $contador = 0;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = lista[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var elemento = _step3.value;

                $contador += elemento[tipo] === 0 ? 1 : 0;
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                    _iterator3["return"]();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return !($contador === lista.length);
    };
    ///<----------------------------------------------------------------- Funcion De Comprobacion.
    var comprobar_concepto = function comprobar_concepto(concepto) {
        // ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD EN OPERACION","GASTOS DE OPERACION"]
        var es_nulo = function es_nulo(dato) {
            return dato ? dato['Total_Costo'] : 0;
        };

        var $total = 0;
        var VENTAS_NETAS = establecimiento.VENTAS_NETAS;
        var COSTO_DE_VENTAS = establecimiento.COSTO_DE_VENTAS;
        var GASTOS_DE_OPERACION = establecimiento.GASTOS_DE_OPERACION;
        var UTILIDAD_EN_OPERACIONES = establecimiento.UTILIDAD_EN_OPERACIONES;
        var TRUPUT_DE_OPERACION = establecimiento.TRUPUT_DE_OPERACION;
        var TRUPUT_NETA_OPERACIONAL = establecimiento.TRUPUT_NETA_OPERACIONAL;

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
            case "UTILIDAD EN OPERACION":
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
    };

    // Componentes Globales #######################################################################################
    ///<----------------------------------------------------------------- Componente Base De Tabla Menu.
    var CeldasTabla = function CeldasTabla(_ref13) {
        var dato = _ref13.dato;
        var estilo = _ref13.estilo;
        var icono = _ref13.icono;
        var margen = _ref13.margen;
        var columnas = _ref13.columnas;
        var mas = _ref13.mas;
        var pos = _ref13.pos;

        dato = dato ? dato : "NA";
        estilo = estilo ? estilo : { color: "#000000" };
        icono = icono ? icono : "";
        margen = margen ? { marginLeft: margen } : { marginRight: "0" };
        columnas = columnas ? columnas : "";

        var Icono = mas ? React.createElement(BotonTogle, { identificador: mas, poicion: pos }) : React.createElement("i", { className: icono, style: margen });

        return React.createElement(
            "th",
            { colSpan: columnas, style: estilo },
            Icono,
            React.createElement(
                "span",
                { style: { marginLeft: "5px" }, title: dato },
                dato
            )
        );
    };
    ///<----------------------------------------------------------------- Componente Base De Tabla resultados Y totales.
    var CeldasTablaResultados = function CeldasTablaResultados(_ref14) {
        var dato = _ref14.dato;
        var estilo = _ref14.estilo;

        estilo = estilo ? estilo : { color: "#000000" };
        return React.createElement(
            "th",
            { style: estilo },
            moneyFormat(redondeo(dato || 0))
        );
    };

    //Componesntes Principales #####################################################################################
    ///<----------------------------------------------------------------- Componente Menus De Tabla.
    var TablaMenus = function TablaMenus() {
        /* Componente Cavecera */
        var CaveceraTabla = function CaveceraTabla() {
            return React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        { rowSpan: "3", style: { fontSize: "20px", textAlign: "center", backgroundColor: "#0077b3", color: "azure" } },
                        establecimiento.establecimiento || ""
                    ),
                    React.createElement(
                        "th",
                        { style: { backgroundColor: "#0077b3", color: "azure", top: "0" } },
                        "AÑO"
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        { style: { backgroundColor: "#0077b3", color: "azure", top: "30px" } },
                        "MES"
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        { style: { backgroundColor: "#0077b3", color: "azure", top: "60px" } },
                        "SEMANA"
                    )
                )
            );
        };
        /* Componente Cuerpo  */
        var CuerpoTabla = function CuerpoTabla() {
            ///<----------------------------------------------------------------- Funcion obtiene lista de Conceptos.
            var Conceptos = function Conceptos() {
                var $lista = [];
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = $ORDEN_DATOS_TABLA[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var concepto = _step4.value;

                        comprobar_concepto(concepto) ? $lista.push(React.createElement(Concepto, { concepto: concepto })) : '';
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                            _iterator4["return"]();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                return $lista;
            };
            ///<----------------------------------------------------------------- Componente Concepto
            var Concepto = function Concepto(_ref15) {
                var concepto = _ref15.concepto;

                var $lista = [];
                var lista_conceptos = establecimiento.lista_conceptos;

                var $datos = lista_conceptos ? lista_conceptos.filter(function (e) {
                    return e.concepto == concepto;
                }) : [];

                $datos.length > 0 ? $datos.forEach(function (concepto_) {
                    var ident = "tb_" + remplazar_espacios_por_guion_bajo(concepto_.concepto);
                    $lista.push(React.createElement(
                        "tr",
                        null,
                        React.createElement(CeldasTabla, {
                            dato: concepto_.concepto,
                            estilo: { forntSize: "18px", color: "azure", background: "#0e58b7" },
                            icono: "fa fa-chevron-right",
                            margen: "5px",
                            columnas: "2",
                            mas: ident
                        })
                    ), React.createElement(Clasifidador, {
                        ListaClasificadores: concepto_.Lista_clasificadores,
                        nombre: ident
                    }));
                }) : $lista.push(React.createElement(
                    "tr",
                    null,
                    React.createElement(CeldasTabla, {
                        dato: concepto,
                        estilo: { forntSize: "18px", color: "azure", background: "#737373" },
                        icono: "fa fa-chevron-circle-right",
                        margen: "5px",
                        columnas: "2"
                    })
                ));
                return $lista;
            };
            ///<-----------------------------------------------------------------
            var Clasifidador = function Clasifidador(_ref16) {
                var ListaClasificadores = _ref16.ListaClasificadores;
                var nombre = _ref16.nombre;

                var $lista = [];

                ListaClasificadores.forEach(function (clasifidador_) {
                    if (comprobar_movimineto(clasifidador_.Lista_SemanaAnios, "Total_Costo")) {
                        var ident = crear_identificador(nombre, clasifidador_.clasificador);
                        $lista.push(React.createElement(
                            "tr",
                            { className: nombre, style: { display: "none" } },
                            React.createElement(CeldasTabla, {
                                dato: clasifidador_.clasificador,
                                estilo: { forntSize: "18px", color: "azure", background: "#729fcf" },
                                icono: "fa fa-angle-right",
                                margen: "15px",
                                columnas: "2",
                                mas: ident,
                                pos: 1
                            })
                        ));
                        $lista.push(React.createElement(SubClasificadores, {
                            subClasificadores: clasifidador_.Lista_subclasificadores,
                            nombre: ident
                        }));
                    }
                });

                return $lista;
            };
            ///<-----------------------------------------------------------------
            var SubClasificadores = function SubClasificadores(_ref17) {
                var subClasificadores = _ref17.subClasificadores;
                var nombre = _ref17.nombre;

                var $lista = [];

                subClasificadores.forEach(function (subClasificador_) {
                    if (comprobar_movimineto(subClasificador_.Lista_SemanaAnios, "Total_Costo")) {
                        var ident = crear_identificador(nombre, subClasificador_.subclacificador);
                        $lista.push(React.createElement(
                            "tr",
                            { className: nombre, style: { display: "none" } },
                            React.createElement(CeldasTabla, {
                                dato: subClasificador_.subclacificador,
                                estilo: { forntSize: "18px", background: "#b4c7dc" },
                                icono: "fa fa-angle-double-right",
                                margen: "25px",
                                columnas: "2",
                                mas: ident,
                                pos: 2
                            })
                        ));
                        $lista.push(React.createElement(Movimientos, {
                            movimientos: subClasificador_.Lista_movimientos,
                            nombre: ident
                        }));
                    }
                });

                return $lista;
            };
            ///<-----------------------------------------------------------------
            var Movimientos = function Movimientos(_ref18) {
                var movimientos = _ref18.movimientos;
                var nombre = _ref18.nombre;

                var $lista = [];
                var $movimientos = [];
                movimientos.forEach(function (movimiento_) {
                    var $index = $movimientos.findIndex(function (e) {
                        return e.Tipo_movimiento == movimiento_.Tipo_movimiento;
                    });
                    if ($index == -1) $movimientos.push(movimiento_);
                });
                if (comprobar_movimineto($movimientos, "Costo")) {
                    $movimientos.forEach(function (movimiento_) {
                        //Tipo_movimiento
                        $lista.push(React.createElement(
                            "tr",
                            { className: nombre, style: { display: "none" } },
                            React.createElement(CeldasTabla, {
                                dato: movimiento_.Tipo_movimiento,
                                estilo: { forntSize: "18px", background: "#FFFFF0" },
                                icono: "fa fa-caret-right",
                                margen: "35px",
                                columnas: "2"
                            })
                        ));
                    });
                }
                return $lista;
            };
            return React.createElement(
                "tbody",
                null,
                React.createElement(Conceptos, null),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        { colSpan: "2", style: { background: "#ff6600", color: "azure", textAlign: "left" } },
                        React.createElement(
                            "strong",
                            null,
                            "UTILIDAD NETA OPERACIONAL POR SEMANA"
                        )
                    )
                )
            );
        };
        return React.createElement(
            "table",
            { className: "table table-condensed" },
            React.createElement(CaveceraTabla, null),
            React.createElement(CuerpoTabla, null)
        );
    };
    ///<----------------------------------------------------------------- Componentes Con resultados Y totales.
    var TablaDatos = function TablaDatos() {
        var $SemanasTotales = typeof establecimiento === 'object' ? establecimiento.Lista_SemanaAnios : [];
        var $Semanas = typeof establecimiento === 'object' ? establecimiento.Ordern.Semanas : [];
        ///<-----------------------------------------------------------------Semana Mes Año.
        var CaveceraTabla = function CaveceraTabla() {
            var datos = typeof establecimiento === 'object' ? establecimiento.Ordern.Lista : [];
            ///<----------------------------------------------------------------- Obtiene Tamaño Semanas.
            var tamanio_semanas_por_mes = function tamanio_semanas_por_mes(meses) {
                var tamanio = 0;
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = meses[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var mes = _step5.value;
                        tamanio += mes.Semanas.length;
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
                            _iterator5["return"]();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                return tamanio;
            };
            ///<----------------------------------------------------------------- Componente Años.
            var Anios = function Anios() {
                return React.createElement(
                    "tr",
                    null,
                    " ",
                    datos.map(function (e) {
                        return React.createElement(
                            "th",
                            { colSpan: tamanio_semanas_por_mes(e.Meses),
                                style: { textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "0" } },
                            e.Anio
                        );
                    }),
                    React.createElement(
                        "th",
                        { rowSpan: "3", style: { fontSize: "20px", width: "140px", textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "0" } },
                        "TOTAL"
                    )
                );
            };
            ///<----------------------------------------------------------------- Componente Meses.
            var Meses = function Meses() {
                return React.createElement(
                    "tr",
                    null,
                    datos.map(function (anio) {
                        return anio.Meses.map(function (e) {
                            return React.createElement(
                                "th",
                                { colSpan: tamanio_semanas_por_mes([e]), style: { textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "30px" } },
                                e.Mes
                            );
                        });
                    })
                );
            };
            ///<----------------------------------------------------------------- Componente Semanas.
            var Semanas = function Semanas() {
                return React.createElement(
                    "tr",
                    null,
                    datos.map(function (anio) {
                        return anio.Meses.map(function (e) {
                            return e.Semanas.map(function (semama) {
                                return React.createElement(
                                    "th",
                                    { style: { textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "60px" } },
                                    semama.Semana
                                );
                            });
                        });
                    })
                );
            };

            return React.createElement(
                "thead",
                { className: "info" },
                React.createElement(Anios, null),
                React.createElement(Meses, null),
                React.createElement(Semanas, null)
            );
        };
        ///<--------------------------------------------------------------------- Componentes De Resultados y Estructura De Datos.
        var StructuraTabla = function StructuraTabla() {
            ///<----------------------------------------------------------------- Cuerpo De Datos Conceptos.
            var Conceptos = function Conceptos() {
                var $lista = [];
                $ORDEN_DATOS_TABLA.forEach(function (concepto) {
                    return comprobar_concepto(concepto) ? $lista.push(React.createElement(Concepto, { concepto: concepto })) : "";
                });
                return $lista;
            };
            ///<----------------------------------------------------------------- Componente Concepto.
            var Concepto = function Concepto(_ref19) {
                var concepto = _ref19.concepto;
                var lista_conceptos = establecimiento.lista_conceptos;
                var Lista_SemanaAnios = establecimiento.Lista_SemanaAnios;
                var UTILIDAD_EN_OPERACIONES = establecimiento.UTILIDAD_EN_OPERACIONES;

                var $lista = [];
                var $datos = lista_conceptos ? lista_conceptos.filter(function (e) {
                    return e.concepto == concepto;
                }) : [];
                establecimiento ? $datos.length > 0 ? $datos.forEach(function (concepto_) {
                    var concepto = concepto_.concepto;
                    var Lista_SemanaAnios = concepto_.Lista_SemanaAnios;
                    var Lista_clasificadores = concepto_.Lista_clasificadores;
                    var Total_Costo = concepto_.Total_Costo;

                    var ident = "tb_" + remplazar_espacios_por_guion_bajo(concepto);
                    $lista.push(React.createElement(
                        "tr",
                        null,
                        $Semanas.map(function (Semana_) {
                            var $index = Lista_SemanaAnios.findIndex(function (e) {
                                return e.Semana == Semana_;
                            }),
                                $resultado = $index > -1 ? Lista_SemanaAnios[$index].Total_Costo : 0;
                            return React.createElement(CeldasTablaResultados, {
                                dato: $resultado,
                                estilo: { forntSize: "14px", color: "azure", background: "#0e58b7", textAlign: "right" }
                            });
                        }),
                        React.createElement(CeldasTablaResultados, {
                            dato: Total_Costo,
                            estilo: { forntSize: "14px", color: "azure", background: "#0e58b7", textAlign: "right" }
                        })
                    ));
                    $lista.push(React.createElement(Clasifidador, {
                        ListaClasificadores: Lista_clasificadores,
                        nombre: ident
                    }));
                }) : $lista.push(React.createElement(
                    "tr",
                    null,
                    $Semanas.map(function (Semana_) {
                        var $index = Lista_SemanaAnios.findIndex(function (e) {
                            return e.Semana == Semana_;
                        });

                        var $resultado = $index > -1 ? Lista_SemanaAnios[$index].UTILIDAD_EN_OPERACION.Total_Costo : 0;
                        return React.createElement(CeldasTablaResultados, {
                            dato: $resultado,
                            estilo: { forntSize: "14px", color: "azure", background: "#737373", textAlign: "right" }
                        });
                    }),
                    React.createElement(CeldasTablaResultados, {
                        dato: UTILIDAD_EN_OPERACIONES.Total_Costo,
                        estilo: { forntSize: "14px", color: "azure", background: "#737373", textAlign: "right" }
                    })
                )) : '';
                return $lista;
            };
            ///<----------------------------------------------------------------- Componente Clasificador.
            var Clasifidador = function Clasifidador(_ref20) {
                var ListaClasificadores = _ref20.ListaClasificadores;
                var nombre = _ref20.nombre;

                var $lista = [];
                ListaClasificadores.forEach(function (clasifidador_) {
                    var clasificador = clasifidador_.clasificador;
                    var Lista_SemanaAnios = clasifidador_.Lista_SemanaAnios;
                    var Total_Costo = clasifidador_.Total_Costo;
                    var Lista_subclasificadores = clasifidador_.Lista_subclasificadores;
                    var ident = crear_identificador(nombre, clasificador);
                    if (comprobar_movimineto(Lista_SemanaAnios, "Total_Costo")) {
                        $lista.push(React.createElement(
                            "tr",
                            { className: nombre, style: { display: "none" } },
                            $Semanas.map(function (Semana_) {
                                var $index = Lista_SemanaAnios.findIndex(function (e) {
                                    return e.Semana == Semana_;
                                }),
                                    $resultado = $index > -1 ? Lista_SemanaAnios[$index].Total_Costo : 0;
                                return React.createElement(CeldasTablaResultados, {
                                    dato: $resultado,
                                    estilo: { forntSize: "14px", color: "azure", background: "#729fcf", textAlign: "right" }
                                });
                            }),
                            React.createElement(CeldasTablaResultados, {
                                dato: Total_Costo,
                                estilo: { forntSize: "14px", color: "azure", background: "#729fcf", textAlign: "right" }
                            })
                        ));
                        $lista.push(React.createElement(SubClasificadores, {
                            subClasificadores: Lista_subclasificadores,
                            nombre: ident
                        }));
                    }
                });
                return $lista;
            };
            ///<----------------------------------------------------------------- Componente SubClasificador.
            var SubClasificadores = function SubClasificadores(_ref21) {
                var subClasificadores = _ref21.subClasificadores;
                var nombre = _ref21.nombre;

                var $lista = [];
                subClasificadores.forEach(function (subClasificador_) {
                    var subclacificador = subClasificador_.subclacificador;
                    var Lista_SemanaAnios = subClasificador_.Lista_SemanaAnios;
                    var Total_Costo = subClasificador_.Total_Costo;
                    var Lista_movimientos = subClasificador_.Lista_movimientos;
                    var ident = crear_identificador(nombre, subclacificador);
                    if (comprobar_movimineto(Lista_SemanaAnios, "Total_Costo")) {
                        $lista.push(React.createElement(
                            "tr",
                            { className: nombre, style: { display: "none" } },
                            $Semanas.map(function (Semana_) {
                                var $index = Lista_SemanaAnios.findIndex(function (e) {
                                    return e.Semana == Semana_;
                                }),
                                    $resultado = $index > -1 ? Lista_SemanaAnios[$index].Total_Costo : 0;
                                return React.createElement(CeldasTablaResultados, {
                                    dato: $resultado,
                                    estilo: { forntSize: "14px", background: "#b4c7dc", textAlign: "right" }
                                });
                            }),
                            React.createElement(CeldasTablaResultados, {
                                dato: Total_Costo,
                                estilo: { forntSize: "14px", background: "#b4c7dc", textAlign: "right" }
                            })
                        ));
                        $lista.push(React.createElement(Movimientos, {
                            movimientos: Lista_movimientos,
                            nombre: ident
                        }));
                    }
                });
                return $lista;
            };
            ///<----------------------------------------------------------------- Componente Movimiento.
            var Movimientos = function Movimientos(_ref22) {
                var movimientos = _ref22.movimientos;
                var nombre = _ref22.nombre;

                var $lista = [];
                var $movimientos = [];
                ///<-----------------------------------------------------------------
                var obtenerTotal = function obtenerTotal(movimiento) {
                    var $total = 0;
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = movimientos.filter(function (e) {
                            return e.Tipo_movimiento == movimiento;
                        })[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var movimiento_ = _step6.value;
                            $total += movimiento_.Costo;
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
                                _iterator6["return"]();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }

                    return $total;
                };
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    var _loop = function () {
                        var movimiento_ = _step7.value;
                        $movimientos.findIndex(function (e) {
                            return e.Tipo_movimiento == movimiento_.Tipo_movimiento;
                        }) == -1 ? $movimientos.push(movimiento_) : '';
                    };

                    for (var _iterator7 = movimientos[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        _loop();
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
                            _iterator7["return"]();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }

                comprobar_movimineto($movimientos, "Costo") ? $movimientos.forEach(function (movimiento_) {
                    var Tipo_movimiento = movimiento_.Tipo_movimiento;

                    //Tipo_movimiento
                    $lista.push(React.createElement(
                        "tr",
                        { className: nombre, style: { display: "none" } },
                        $Semanas.map(function (Semana_) {
                            var $index = movimientos.findIndex(function (e) {
                                return e.Semana == Semana_ && e.Tipo_movimiento == Tipo_movimiento;
                            }),
                                $resultado = $index > -1 ? movimientos[$index].Costo : 0;
                            return React.createElement(CeldasTablaResultados, {
                                dato: $resultado,
                                estilo: { forntSize: "14px", color: "#000000", textAlign: "right" }
                            });
                        }),
                        React.createElement(CeldasTablaResultados, {
                            dato: obtenerTotal(Tipo_movimiento),
                            estilo: { forntSize: "14px", color: "#000000", textAlign: "right" }
                        })
                    ));
                }) : '';
                return $lista;
            };
            ///<----------------------------------------------------------------- Componente Totales.
            var Totales = function Totales() {
                var $total = 0;
                return React.createElement(
                    "tr",
                    null,
                    $SemanasTotales.map(function (semana_) {
                        $total += semana_.Total_Costo;
                        return React.createElement(
                            "th",
                            { style: { background: "#ff6600", color: "azure", textAlign: "right" } },
                            moneyFormat(redondeo(semana_.Total_Costo))
                        );
                    }),
                    React.createElement(
                        "th",
                        { style: { background: "#ff6600", color: "azure", textAlign: "right" } },
                        moneyFormat(redondeo($total))
                    )
                );
            };
            return React.createElement(
                "tbody",
                null,
                React.createElement(Conceptos, null),
                React.createElement(Totales, null)
            );
        };
        return React.createElement(
            "table",
            { className: "table table-condensed" },
            React.createElement(CaveceraTabla, null),
            React.createElement(StructuraTabla, null)
        );
    };

    return React.createElement(
        "div",
        { id: "modal_movimientos_por_establecimiento",
            style: {
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
            } },
        React.createElement(
            "div",
            { className: "panel panel-default animate",
                style: { height: "95%", width: "90%" } },
            React.createElement(
                "div",
                { className: "panel-heading", style: { background: "#006699", color: "#FFFFFF" } },
                React.createElement("i", {
                    className: "btn btn-danger fa fa-close",
                    style: { float: "right" },
                    onClick: function () {
                        return document.getElementById("modal_movimientos_por_establecimiento").style.display = "none";
                    } }),
                React.createElement(
                    "h4",
                    null,
                    " ",
                    React.createElement("i", { className: "fa fa-calendar" }),
                    " MOVIMIENTOS A DETALLE ",
                    establecimiento.establecimiento || "",
                    "."
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body", style: { height: "90%" } },
                React.createElement(
                    "strong",
                    { style: { color: "#666666", display: "block", fontSize: "20px" } },
                    "MOVIMIENTOS OPERACIONAL POR SEMANA DEL AÑO."
                ),
                React.createElement(
                    "div",
                    { style: { height: "90%", border: "solid 1px #444", overflow: "auto", marginTop: "30px" } },
                    React.createElement(
                        "div",
                        { style: { width: "46%", float: "left", marginTop: "1px", marginLeft: "0" } },
                        React.createElement(TablaMenus, null)
                    ),
                    React.createElement(
                        "div",
                        { style: { width: "14%", float: "left", marginTop: "1px" } },
                        React.createElement(TablaDatos, null)
                    )
                )
            )
        )
    );
};

/*Efectos De Toggle */
/*****************************************************************/

var BotonTogle = (function (_React$Component2) {
    _inherits(BotonTogle, _React$Component2);

    function BotonTogle(props) {
        _classCallCheck(this, BotonTogle);

        _get(Object.getPrototypeOf(BotonTogle.prototype), "constructor", this).call(this, props);
        this.state = {
            clase: "glyphicon glyphicon-plus"
        };
        this.change = this.cambio.bind(this);
    }

    /*****************************************************************/
    /*efecto ocultar/mostrar operaciones a detalle establecimiento*/
    /**/
    _createClass(BotonTogle, [{
        key: "cambio",
        value: function cambio() {
            var clase = this.state.clase;
            var _props = this.props;
            var identificador = _props.identificador;
            var poicion = _props.poicion;

            var dato = clase == "glyphicon glyphicon-minus" ? "glyphicon glyphicon-plus" : "glyphicon glyphicon-minus";
            this.setState({ clase: dato });
            ocultarMostrar(identificador, poicion);
        }
    }, {
        key: "render",
        value: function render() {
            var clase = this.state.clase;

            return React.createElement("i", { className: clase,
                onClick: this.change });
        }
    }]);

    return BotonTogle;
})(React.Component);

var ocultarMostrar = function ocultarMostrar(dato, poicion) {
    var array = dato.split(" ");

    var ocultar_hijos = function ocultar_hijos() {
        var todos = document.querySelectorAll("." + array[0] + "_1");
        todos.forEach(function (e) {
            e.style.display = "none";
        });
        return "none";
    };
    var clase_ = document.querySelectorAll("." + array[array.length - 1]);
    clase_.forEach(function (op) {
        var vista = op.style.display;
        op.style.display = vista ? '' : ocultar_hijos();
    });
}; /**/
/**/var remplazar_espacios_por_guion_bajo = function remplazar_espacios_por_guion_bajo(e) {
    var r = "";
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = e[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var x = _step8.value;
            r += x != " " ? x : "_";
        }
    } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
                _iterator8["return"]();
            }
        } finally {
            if (_didIteratorError8) {
                throw _iteratorError8;
            }
        }
    }

    return r;
}; /**/
/**/var crear_identificador = function crear_identificador(clase, sub) {
    var clase_ = remplazar_espacios_por_guion_bajo(clase);
    var sub_ = remplazar_espacios_por_guion_bajo(sub);
    return clase + "_1 " + clase_ + "_" + sub_;
}; /**/

location.protocol != "http:" ? location.protocol = "http:" : ReactDOM.render(React.createElement(EstadoDeResultados, null), document.getElementById("root"));

