"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $MI_URL = window.location.protocol + "//" + window.location.hostname;
var $URL_API = $MI_URL + "/api/";
var $URL_API_IZA = $MI_URL + ":180/api/";

var Monitor = (function (_React$Component) {
    _inherits(Monitor, _React$Component);

    function Monitor(props) {
        _classCallCheck(this, Monitor);

        _get(Object.getPrototypeOf(Monitor.prototype), "constructor", this).call(this, props);
        this.state = {
            fecha: fecha_hoy(),
            ventas: [],
            estatus: 0,
            detalle_corte: {},
            Abonos_y_Deudas_Empleado: []
        };

        this.evFecha = this.on_fecha.bind(this);
        this.evCargar = this.Obtener_ventas.bind(this);
        this.evCorteDetalle = this.Obtener_detalle_de_corte.bind(this);
        this.evAbonoDeuda = this.Obtener_Abonos_y_Deudas_Empleado.bind(this);
    }

    //Componentes

    //eventos

    _createClass(Monitor, [{
        key: "on_fecha",
        value: function on_fecha(event) {
            this.setState({ fecha: parseo_fecha(event.target.value) });
        }

        //metodos
    }, {
        key: "llenar_lista_ventas",
        value: function llenar_lista_ventas(respuesta) {
            console.log(respuesta);
            this.setState({ ventas: respuesta });
            this.estatus_carga(0);
        }
    }, {
        key: "mostrar_detalles_corte",
        value: function mostrar_detalles_corte(corte) {
            var _this = this;

            console.log(corte);
            document.querySelector("#detalles_corte").style.display = "flex";
            this.setState({ detalle_corte: corte });
            setTimeout(function () {
                return _this.estatus_carga(0);
            }, 1500);
        }
    }, {
        key: "llenar_Abonos_y_Deudas_Empleado",
        value: function llenar_Abonos_y_Deudas_Empleado(lista) {
            var _this2 = this;

            console.log(lista);
            this.setState({ Abonos_y_Deudas_Empleado: lista });
            setTimeout(function () {
                return _this2.estatus_carga(0);
            }, 500);
            document.querySelector("#detalles_corte_Abonos_y_deudas_a_detalle").style.display = "flex";
        }
    }, {
        key: "estatus_carga",
        value: function estatus_carga(e) {
            console.log(e);
            this.setState({ estatus: e });
        }

        //conexiones
    }, {
        key: "Obtener_ventas",
        value: function Obtener_ventas() {
            var _this3 = this;

            var fecha = this.state.fecha;

            this.estatus_carga(1);
            fetch($URL_API + "monitor_auditoria_ventas?fecha=" + fecha, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (j) {
                return j.json().then(function (e) {
                    return _this3.llenar_lista_ventas(e);
                });
            })["catch"](function (err) {
                return console.log("Error...", err);
            });
        }
    }, {
        key: "Obtener_detalle_de_corte",
        value: function Obtener_detalle_de_corte(folio) {
            var _this4 = this;

            this.estatus_carga(1);
            fetch($URL_API + "Monitor_auditoria__venta_detalle_corte?folio=" + folio, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                return e.json().then(function (res) {
                    return _this4.mostrar_detalles_corte(res);
                });
            })["catch"](function (err) {
                return console.log("Fallo=>", err);
            });
        }
    }, {
        key: "Obtener_Abonos_y_Deudas_Empleado",
        value: function Obtener_Abonos_y_Deudas_Empleado(folio_empleado) {
            var _this5 = this;

            this.estatus_carga(1);
            fetch($URL_API + "Monitor_auditoria__venta_detalle_corte?folio=" + folio_empleado, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                return e.json().then(function (res) {
                    return _this5.llenar_Abonos_y_Deudas_Empleado(res);
                });
            })["catch"](function (err) {
                return console.error(err);
            });
        }

        //render
    }, {
        key: "render",
        value: function render() {
            var _state = this.state;
            var fecha = _state.fecha;
            var ventas = _state.ventas;
            var estatus = _state.estatus;
            var detalle_corte = _state.detalle_corte;
            var Abonos_y_Deudas_Empleado = _state.Abonos_y_Deudas_Empleado;

            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(CaveceraMonitor, {
                    fecha: fecha,
                    evFecha: this.evFecha,
                    evCargar: this.evCargar
                }),
                React.createElement(ContenedorTabla, {
                    ventas: ventas,
                    evCorteDetalle: this.evCorteDetalle
                }),
                React.createElement(DetallesCorte, {
                    detalles: detalle_corte,
                    evAbonoDeuda: this.evAbonoDeuda
                }),
                React.createElement(AbonosDeudasDetalleEmpleado, {
                    lista: Abonos_y_Deudas_Empleado
                }),
                React.createElement(EfectoCargar, {
                    estatus: estatus
                })
            );
        }
    }]);

    return Monitor;
})(React.Component);

var CaveceraMonitor = function CaveceraMonitor(_ref) {
    var fecha = _ref.fecha;
    var evFecha = _ref.evFecha;
    var evCargar = _ref.evCargar;

    return React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
            "div",
            { id: "contenedor_fecha" },
            React.createElement("label", { className: "glyphicon glyphicon-calendar" }),
            React.createElement("input", { className: "btn btn-default", type: "date", onChange: evFecha, value: parseo_fecha(fecha) })
        ),
        React.createElement("i", { className: " btn btn-info fa fa-refresh", id: "btn_cargar", onClick: evCargar })
    );
};

var ContenedorTabla = function ContenedorTabla(_ref2) {
    var ventas = _ref2.ventas;
    var evCorteDetalle = _ref2.evCorteDetalle;

    var Clasificador = function Clasificador(_ref3) {
        var clasificador = _ref3.clasificador;

        return [React.createElement(CaveceraClasificador, null), React.createElement(
            "tr",
            { style: { background: "#0094ff", color: "#FFFFFF" } },
            React.createElement(
                "td",
                { style: { color: "#FFFFFF" }, className: "iconos" },
                React.createElement("i", { className: "glyphicon glyphicon-chevron-right" })
            ),
            React.createElement(
                "td",
                { style: { color: "#FFFFFF" }, colspan: "9" },
                clasificador.Nombre
            ),
            React.createElement(
                "td",
                { style: { color: "#FFFFFF" }, className: "totales" },
                redondeoMoney(clasificador.Total)
            ),
            React.createElement(
                "td",
                { style: { color: "#FFFFFF" }, className: "pagos" },
                redondeoMoney(clasificador.Pagos)
            )
        ), React.createElement(CaveceraEstablecimiento, null), React.createElement(Estableciminetos, {
            clasificador: clasificador.Nombre,
            establecimientos: clasificador.Lista_establecimientos
        })];
    };
    var Estableciminetos = function Estableciminetos(_ref4) {
        var clasificador = _ref4.clasificador;
        var establecimientos = _ref4.establecimientos;

        return establecimientos.map(function (e) {
            return [React.createElement(
                "tr",
                { style: buscarIndocadoresEnEstablecimiento(e.Lista_asignaciones) },
                React.createElement(
                    "td",
                    null,
                    " "
                ),
                React.createElement(
                    "td",
                    { className: "iconos" },
                    React.createElement(BotonTogle, { identificador: crear_identificador(clasificador, e.Nombre) })
                ),
                React.createElement(
                    "td",
                    { className: "iconos" },
                    e.Folio
                ),
                React.createElement(
                    "td",
                    { colspan: "7" },
                    e.Nombre
                ),
                React.createElement(
                    "td",
                    { className: "totales" },
                    redondeoMoney(e.Total)
                ),
                React.createElement(
                    "td",
                    { className: "pagos" },
                    redondeoMoney(e.Pagos)
                )
            ), React.createElement(CaveceraAsignacion, { clase: crear_identificador(clasificador, e.Nombre) }), React.createElement(Asignaciones, {
                clase: crear_identificador(clasificador, e.Nombre),
                asignaciones: e.Lista_asignaciones
            })];
        });
    };
    var Asignaciones = function Asignaciones(_ref5) {
        var asignaciones = _ref5.asignaciones;
        var clase = _ref5.clase;

        return asignaciones.map(function (e) {
            return React.createElement(
                "tr",
                { style: { background: IndicadorEstado(e.Corte, e.Folio_trabajo_de_Corte), display: "none", color: "#000" }, className: clase },
                React.createElement(
                    "td",
                    { colspan: "2" },
                    " "
                ),
                React.createElement(
                    "td",
                    { className: "iconos" },
                    React.createElement("i", { className: "glyphicon glyphicon-arrow-right" })
                ),
                React.createElement(
                    "td",
                    { title: "Asignacion" },
                    e.Asignacion
                ),
                React.createElement(
                    "td",
                    { title: "Fecha_venta" },
                    e.Fecha_venta
                ),
                React.createElement(
                    "td",
                    { title: "Fecha_Inicial" },
                    e.Fecha_Inicial
                ),
                React.createElement(
                    "td",
                    { title: "Fecha_Liquidacion" },
                    e.Fecha_Liquidacion,
                    " "
                ),
                React.createElement(
                    "td",
                    { title: "Corte" },
                    React.createElement(BtnMostrarMas, { valor: e.Corte, evento: evCorteDetalle })
                ),
                React.createElement(
                    "td",
                    { title: "Folio_trabajo_de_Corte" },
                    " ",
                    React.createElement(BtnMostrarMas, { valor: e.Folio_trabajo_de_Corte })
                ),
                React.createElement(
                    "td",
                    { title: "Folio_Banco_Interno" },
                    " ",
                    React.createElement(BtnMostrarMas, { valor: e.Folio_Banco_Interno })
                ),
                React.createElement(
                    "td",
                    { className: "totales" },
                    redondeoMoney(e.Total)
                ),
                React.createElement(
                    "td",
                    { className: "pagos" },
                    redondeoMoney(e.Pagos)
                )
            );
        });
    };
    var CaveceraClasificador = function CaveceraClasificador() {
        return React.createElement(
            "tr",
            { className: "caveceraclasificador" },
            React.createElement("td", null),
            React.createElement(
                "td",
                { colspan: "9" },
                "Clasificador"
            ),
            React.createElement(
                "td",
                null,
                "Venta"
            ),
            React.createElement(
                "td",
                null,
                "Pagos"
            )
        );
    };
    var CaveceraEstablecimiento = function CaveceraEstablecimiento() {
        return React.createElement(
            "tr",
            { className: "cavecera", style: { color: "#000" } },
            React.createElement(
                "td",
                null,
                " "
            ),
            React.createElement("td", { className: "iconos" }),
            React.createElement(
                "td",
                { className: "iconos" },
                "Folio"
            ),
            React.createElement(
                "td",
                { colspan: "7" },
                "Establecimiento"
            ),
            React.createElement(
                "td",
                null,
                "Venta"
            ),
            React.createElement(
                "td",
                null,
                "Pagos"
            )
        );
    };
    var CaveceraAsignacion = function CaveceraAsignacion(_ref6) {
        var clase = _ref6.clase;

        return React.createElement(
            "tr",
            { className: clase, style: { display: "none", background: "#ccff99", color: "#000" } },
            React.createElement(
                "td",
                { colspan: "2" },
                " "
            ),
            React.createElement("td", { className: "iconos" }),
            React.createElement(
                "td",
                { title: "Asignacion" },
                "Asignacion"
            ),
            React.createElement(
                "td",
                { title: "Fecha_venta" },
                "Fecha Venta"
            ),
            React.createElement(
                "td",
                { title: "Fecha_Inicial" },
                "Fecha Inicial"
            ),
            React.createElement(
                "td",
                { title: "Fecha_Liquidacion" },
                "Fecha Liquidacion"
            ),
            React.createElement(
                "td",
                { title: "Corte" },
                "Corte"
            ),
            React.createElement(
                "td",
                { title: "Folio_trabajo_de_Corte" },
                "Folio Trabajo Corte"
            ),
            React.createElement(
                "td",
                { title: "Folio_Banco_Interno" },
                "Folio Banco Interno"
            ),
            React.createElement(
                "td",
                null,
                "Venta"
            ),
            React.createElement(
                "td",
                null,
                "Pagos"
            )
        );
    };
    return React.createElement(
        "div",
        { className: "panel-body", id: "contenedor_tabla" },
        React.createElement(
            "table",
            { className: "table table-bordered" },
            ventas.length > 0 ? ventas.map(function (e) {
                return React.createElement(Clasificador, { clasificador: e });
            }) : React.createElement(
                "p",
                null,
                "Sin Datos."
            )
        )
    );
};
var BtnMostrarMas = function BtnMostrarMas(_ref7) {
    var valor = _ref7.valor;
    var evento = _ref7.evento;

    return React.createElement(
        "span",
        { className: "btn-mas" },
        " ",
        valor,
        " ",
        valor.search('SIN') > -1 || valor == 0 ? '' : React.createElement("i", { title: "ver Detalle.", onClick: function () {
                return evento(valor);
            }, className: "glyphicon glyphicon-share" })
    );
};

var DetallesCorte = function DetallesCorte(_ref8) {
    var detalles = _ref8.detalles;
    var evAbonoDeuda = _ref8.evAbonoDeuda;

    var Cuerpo = function Cuerpo(_ref9) {
        var corte = _ref9.corte;
        var detalle = corte.detalle;
        var empleado = corte.empleado;
        var tickets = corte.tickets;
        var ventas = corte.ventas;

        return React.createElement(
            "div",
            { id: "cuerpo_indicadores_corte" },
            React.createElement(MonitorCorte, {
                detalle: detalle || {},
                ventas: ventas || {}
            }),
            React.createElement(DatosEmpleado, {
                empleado: empleado || {}
            }),
            React.createElement(DatosTickets, {
                tickets: tickets
            })
        );
    };

    var MonitorCorte = function MonitorCorte(_ref10) {
        var detalle = _ref10.detalle;
        var ventas = _ref10.ventas;
        var folio_corte = detalle.folio_corte;
        var asignaciones_en_corte = detalle.asignaciones_en_corte;
        var realizo_corte = detalle.realizo_corte;
        var empleado_reviso_en_auditoria = detalle.empleado_reviso_en_auditoria;
        var comentario_auditoria = detalle.comentario_auditoria;
        var cantidad_autorizaciones_por_supervisor = detalle.cantidad_autorizaciones_por_supervisor;
        var fecha_de_corte = detalle.fecha_de_corte;
        var promedio_de_escaneo_de_productos = detalle.promedio_de_escaneo_de_productos;
        var cheques = ventas.cheques;
        var efectivo = ventas.efectivo;
        var recibo_de_luz = ventas.recibo_de_luz;
        var tiempo_aire = ventas.tiempo_aire;
        var importe_retiros_a_cajero = ventas.importe_retiros_a_cajero;
        var dolares = ventas.dolares;
        var vales = ventas.vales;
        var total_de_vauchers = ventas.total_de_vauchers;
        var importe_fuente_de_sodas = ventas.importe_fuente_de_sodas;
        var total_pagos_dinero_electronico = ventas.total_pagos_dinero_electronico;
        var corte_del_sistema = ventas.corte_del_sistema;
        var apartados = ventas.apartados;
        var diferiencia_de_corte = ventas.diferiencia_de_corte;
        var abonos = ventas.abonos;
        var diferencia_total = ventas.diferencia_total;
        var deposito_en_caja = ventas.deposito_en_caja;
        var total_de_retiros_clientes = ventas.total_de_retiros_clientes;
        var cantidad_de_articulos_diferentes = ventas.cantidad_de_articulos_diferentes;
        var cantidad_de_tickets = ventas.cantidad_de_tickets;

        var CorteInfo = function CorteInfo() {
            return React.createElement(
                "span",
                { id: "container_info_corte" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Folio Corte : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        folio_corte || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Asignacion : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        asignaciones_en_corte || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Fecha : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        fecha_de_corte || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Realizo Corte : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        realizo_corte || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Reviso En Auditoria : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        empleado_reviso_en_auditoria || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Cantidad Autorizaciones: "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        cantidad_autorizaciones_por_supervisor || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Articulos Diferentes : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        cantidad_de_articulos_diferentes || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Cantidad Tickets : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        cantidad_de_tickets || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Promedio De Productos : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        promedio_de_escaneo_de_productos || "NA",
                        " Escan."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Deposito En Caja : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(deposito_en_caja) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    { id: "comentario_auditoria" },
                    React.createElement(
                        "label",
                        null,
                        "Comentario Auditoria : "
                    ),
                    React.createElement(
                        "div",
                        null,
                        comentario_auditoria || "NA",
                        "."
                    )
                )
            );
        };
        var TotalesInfo = function TotalesInfo() {
            return React.createElement(
                "span",
                { id: "container_totales_info" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Importe Retiros Caja : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(importe_retiros_a_cajero) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Efectivo : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(efectivo) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Dolares : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(dolares) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Vales : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(vales) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Cheque : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(cheques) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Vouchers : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(total_de_vauchers) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Fuente Sodas : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(importe_fuente_de_sodas) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Dinero Electronico : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(total_pagos_dinero_electronico) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Corte Sistema : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(corte_del_sistema) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Apartados : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(apartados) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Diferencia Corte : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(diferiencia_de_corte) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Abonos : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(abonos) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    { id: diferencia_total < 20 && diferencia_total > -20 ? "diferencia_total_bien" : "diferencia_total_mal" },
                    React.createElement(
                        "label",
                        null,
                        "Diferencia Total : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(diferencia_total) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Recibo Luz : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(recibo_de_luz) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Tiempo Aire : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(tiempo_aire) || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Retiros Clientes : "
                    ),
                    React.createElement(
                        "strong",
                        null,
                        redondeoMoney(total_de_retiros_clientes) || "NA",
                        "."
                    )
                )
            );
        };
        return React.createElement(
            "div",
            { id: "container_monitor_corte" },
            React.createElement(
                "label",
                { className: "titulo_container" },
                React.createElement("i", { className: "fa fa-money" }),
                " Corte"
            ),
            React.createElement(
                "div",
                null,
                React.createElement(CorteInfo, null),
                React.createElement(TotalesInfo, null)
            )
        );
    };
    var DatosEmpleado = function DatosEmpleado(_ref11) {
        var empleado = _ref11.empleado;
        var departamento = empleado.departamento;
        var folio_establecimiento = empleado.folio_establecimiento;
        var establecimiento = empleado.establecimiento;
        var estatus = empleado.estatus;
        var fecha_ingreso = empleado.fecha_ingreso;
        var foto = empleado.foto;
        var id_scoi = empleado.id_scoi;
        var nombre_completo = empleado.nombre_completo;
        var puesto = empleado.puesto;
        var comentario = empleado.comentario;

        return React.createElement(
            "div",
            { id: "container_datos_empleados" },
            React.createElement(
                "label",
                { className: "titulo_container" },
                React.createElement("i", { className: "fa fa-user" }),
                " Empleado"
            ),
            React.createElement(
                "div",
                null,
                React.createElement("img", { className: "img-thumbnail", src: foto, alt: "Empleado.", height: "130", width: "130" }),
                React.createElement(
                    "div",
                    null,
                    " ",
                    React.createElement(
                        "label",
                        null,
                        "Folio Empleado : "
                    ),
                    " ",
                    React.createElement(
                        "strong",
                        null,
                        id_scoi || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    " ",
                    React.createElement(
                        "label",
                        null,
                        "Empleado : "
                    ),
                    " ",
                    React.createElement(
                        "strong",
                        null,
                        nombre_completo || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    " ",
                    React.createElement(
                        "label",
                        null,
                        "Departamento : "
                    ),
                    " ",
                    React.createElement(
                        "strong",
                        null,
                        departamento || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    " ",
                    React.createElement(
                        "label",
                        null,
                        "Puesto : "
                    ),
                    " ",
                    React.createElement(
                        "strong",
                        null,
                        puesto || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    " ",
                    React.createElement(
                        "label",
                        null,
                        "Folio Establecimiento : "
                    ),
                    " ",
                    React.createElement(
                        "strong",
                        null,
                        folio_establecimiento || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    " ",
                    React.createElement(
                        "label",
                        null,
                        "Establecimiento : "
                    ),
                    " ",
                    React.createElement(
                        "strong",
                        null,
                        establecimiento || "NA",
                        "."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    " ",
                    React.createElement(
                        "label",
                        null,
                        "Fecha Ingreso : "
                    ),
                    " ",
                    React.createElement(
                        "strong",
                        null,
                        fecha_ingreso || "NA",
                        "."
                    ),
                    "  ",
                    React.createElement(
                        "strong",
                        { className: "btn btn-default" },
                        estatus || "NA"
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        { className: "btn btn-info", onClick: function () {
                                return evAbonoDeuda(id_scoi);
                            } },
                        "Abono y Deuda a Detalle."
                    )
                ),
                React.createElement(
                    "div",
                    { id: "container_comentarios" },
                    React.createElement(
                        "h4",
                        null,
                        "Comentarios"
                    ),
                    React.createElement(
                        "div",
                        null,
                        comentario || "NA"
                    )
                )
            )
        );
    };
    var DatosTickets = function DatosTickets(_ref12) {
        var tickets = _ref12.tickets;

        var Lista = function Lista(_ref13) {
            var datos = _ref13.datos;

            return datos.map(function (e) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        e.ticket
                    ),
                    React.createElement(
                        "td",
                        null,
                        e.afiliacion
                    ),
                    React.createElement(
                        "td",
                        { className: "redondeoMoney" },
                        redondeoMoney(e.retiro)
                    ),
                    React.createElement(
                        "td",
                        { className: "redondeoMoney" },
                        redondeoMoney(e.importe)
                    )
                );
            });
        };
        return React.createElement(
            "div",
            { id: "container_lista_tickets" },
            React.createElement(
                "label",
                { className: "titulo_container" },
                React.createElement("i", { className: "fa fa-credit-card" }),
                " Vouchers"
            ),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "table",
                    { className: "table" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Ticket"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Afiliacion"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Retiro"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Importe"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        tickets ? React.createElement(Lista, { datos: tickets }) : React.createElement(
                            "p",
                            null,
                            "Sin Datos A Mostrar..."
                        )
                    )
                )
            )
        );
    };
    return React.createElement(
        "div",
        { className: "container_modal", id: "detalles_corte" },
        React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement("i", { className: "btn btn-danger close fa fa-close", onClick: function () {
                        return document.querySelector("#detalles_corte").style.display = "none";
                    } }),
                React.createElement(
                    "h4",
                    null,
                    " Detalles De Corte."
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                detalles != {} ? React.createElement(Cuerpo, { corte: detalles }) : React.createElement(
                    "h3",
                    null,
                    "No hay Datos"
                )
            )
        )
    );
};

var AbonosDeudasDetalleEmpleado = function AbonosDeudasDetalleEmpleado(_ref14) {
    var lista = _ref14.lista;

    var Cuerpo = function Cuerpo(_ref15) {
        var datos = _ref15.datos;

        var ObtenerPendiente = function ObtenerPendiente(posicion, dif_corte, abono) {
            return posicion == 0 ? dif_corte - abono : datos[posicion - 1]["pendiente"] + dif_corte - abono;
        };
        return React.createElement(
            "div",
            { id: "tabla_detalles_abono_deuda" },
            React.createElement(
                "table",
                { className: "table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "Folio Corte"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Fecha Corte"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Fecha Movimiento"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Diferencia Corte"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Abono"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Pendiente"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Lista De Raya"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    datos.map(function (e, p) {
                        e.pendiente = ObtenerPendiente(p, e.diferencia_corte, e.abono);
                        p == 0 ? console.log("posicion", p) : '';
                        return React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                null,
                                e.folio_corte
                            ),
                            React.createElement(
                                "td",
                                null,
                                e.fecha_corte
                            ),
                            React.createElement(
                                "td",
                                null,
                                e.fecha_movimiento
                            ),
                            React.createElement(
                                "td",
                                null,
                                redondeoMoney(e.diferencia_corte)
                            ),
                            React.createElement(
                                "td",
                                null,
                                redondeoMoney(e.abono)
                            ),
                            React.createElement(
                                "td",
                                null,
                                redondeoMoney(e.pendiente)
                            ),
                            React.createElement(
                                "td",
                                null,
                                e.lista_de_raya_del_abono
                            )
                        );
                    })
                )
            )
        );
    };
    return React.createElement(
        "div",
        { className: "container_modal", id: "detalles_corte_Abonos_y_deudas_a_detalle" },
        React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement("i", { className: "btn btn-danger close fa fa-close", onClick: function () {
                        return document.querySelector("#detalles_corte_Abonos_y_deudas_a_detalle").style.display = "none";
                    } }),
                React.createElement(
                    "h4",
                    null,
                    "Abono y Deuda a Detalle."
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                lista != {} ? React.createElement(Cuerpo, { datos: lista }) : React.createElement(
                    "h3",
                    null,
                    "No hay Datos"
                ),
                React.createElement(GraficaAbonosDeudasDetalle, { lista: lista })
            )
        )
    );
};

var GraficaAbonosDeudasDetalle = (function (_React$Component2) {
    _inherits(GraficaAbonosDeudasDetalle, _React$Component2);

    function GraficaAbonosDeudasDetalle(props) {
        _classCallCheck(this, GraficaAbonosDeudasDetalle);

        _get(Object.getPrototypeOf(GraficaAbonosDeudasDetalle.prototype), "constructor", this).call(this, props);
        this.state = {
            filtro: "S"
        };
        this.barChart = null;
        this.evCamvio = this.cambiofiltro.bind(this);
    }

    //eventos

    _createClass(GraficaAbonosDeudasDetalle, [{
        key: "cambiofiltro",
        value: function cambiofiltro() {
            var f = this.state.filtro;
            var nvo = f != "S" ? 'S' : 'N';
            this.setState({ filtro: nvo });
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            var filtro = this.state.filtro;

            setTimeout(function () {
                return _this6.renderGrafica(filtro);
            }, 200);
            return React.createElement(
                "div",
                { id: "grafica_Detalle_abono_deuda" },
                React.createElement(BtnFiltroGrafica, {
                    tipo: filtro,
                    evento: this.evCamvio
                }),
                React.createElement(
                    "div",
                    null,
                    React.createElement("canvas", { id: "grafica_Detalle_abono_deuda_canvas" })
                )
            );
        }
    }, {
        key: "renderGrafica",
        value: function renderGrafica(filtro) {
            var seleccion = this.props.lista.filter(function (e) {
                return filtro == "N" ? true : e.parametro === "S";
            });

            console.log("Seleccion=>", seleccion);
            graficar_abonos_deudas_detalle_usuario(this.barChart, seleccion);
        }
    }]);

    return GraficaAbonosDeudasDetalle;
})(React.Component);

var BtnFiltroGrafica = function BtnFiltroGrafica(_ref16) {
    var tipo = _ref16.tipo;
    var evento = _ref16.evento;

    var texto = tipo === "S" ? 'Ultimos Dos Meses.' : 'Todos.';
    var clase = tipo === "S" ? 'btn btn-info glyphicon glyphicon-filter' : 'btn btn-success glyphicon glyphicon-search';
    return React.createElement(
        "i",
        { className: clase, onClick: evento },
        " Filtro de Grafica por ",
        texto
    );
};

//metodos Globales
var parseo_fecha = function parseo_fecha(fecha) {
    fecha = fecha.split("-");
    return fecha[2] + "-" + fecha[1] + "-" + fecha[0];
};
var fecha_hoy = function fecha_hoy() {
    var hoy = new Date();
    var mont = hoy.getMonth() > 10 ? hoy.getMonth() + 1 : "0" + (hoy.getMonth() + 1);
    return hoy.getDate() + "-" + mont + "-" + hoy.getFullYear();
};
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

    return "$" + (unidades != 'NaN' ? unidades : 0) + "." + decimal;
};
var IndicadorEstado = function IndicadorEstado(indicadorCorte, indicadorTrabajo) {
    return indicadorCorte == 'SIN CORTE' ? '#ff1a1a' : indicadorTrabajo == 'SIN CONCENTRADO' ? '#ffff00' : '#FFFFFF';
};
var buscarIndocadoresEnEstablecimiento = function buscarIndocadoresEnEstablecimiento(lista) {
    var corte = lista.find(function (e) {
        return e.Corte == 'SIN CORTE' || e.Folio_trabajo_de_Corte == 'SIN CONCENTRADO';
    });
    return {
        background: corte ? IndicadorEstado(corte.Corte, corte.Folio_trabajo_de_Corte) : '#cce6ff',
        color: '#000000'
    };
};
///<-----------------------------------------------------------------
function redondeoMoney(numero) {
    return moneyFormat(Math.round(numero * 100) / 100);
}

var graficar_abonos_deudas_detalle_usuario = function graficar_abonos_deudas_detalle_usuario(barChart, lista) {
    var datos_barras = [{
        label: "Diferencia.",
        data: lista.map(function (e) {
            return e.diferencia_corte;
        }),
        borderColor: "#00b300",
        fill: false
    }, {
        label: "Abono.",
        data: lista.map(function (e) {
            return -e.abono;
        }),
        borderColor: "#0099cc",
        fill: false
    }, {
        label: "Pendiente.",
        data: lista.map(function (e) {
            return e.pendiente;
        }),
        borderColor: "#ffb533",
        fill: false
    }];
    if (barChart != null) {
        barChart.clear();
        barChart.destroy();
    }
    var ctx = document.getElementById("grafica_Detalle_abono_deuda_canvas");
    barChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: lista.map(function (e) {
                return e.fecha_corte ? e.fecha_corte : e.fecha_movimiento;
            }),
            datasets: datos_barras
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function callback(value, index, values) {
                            return "$" + value + " .";
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Detalle Cuenta."
                    }
                }]
            }
        }
    });
    barChart.update();
};

location.protocol != "http:" ? location.protocol = "http:" : ReactDOM.render(React.createElement(Monitor, null), document.querySelector('#root'));

