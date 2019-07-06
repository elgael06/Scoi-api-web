'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = (function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);
        this.state = {
            filtro: '',
            leyenda: '',
            establecimiento: {
                folio_establecimiento: -1,
                establecimiento: '',
                seleccion: {
                    cancelacion: 0,
                    diferencia: 0,
                    venta: 0
                }
            },
            colaborador: {
                folio: -1,
                nombre: '',
                foto: '',
                antiguedad: '',
                puesto: '',
                fecha: '',
                departamento: '',
                actual: {
                    venta: 0,
                    cancelacion: 0,
                    diferencia: 0
                },
                pasado: {
                    venta: 0,
                    cancelacion: 0,
                    diferencia: 0
                }
            },
            fecha: this.fecha_hoy(),
            lista: [],
            indicadores_monitor: [{ Indicador: "Cajeros Ventas", Valor_optimo_indicador: 0, Operador: '' }, { Indicador: "Cancelaciones", Valor_optimo_indicador: 0, Operador: '' }, { Indicador: "Diferencia Corte", Valor_optimo_indicador: 0, Operador: '' }]
        };
        this.meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        this.barChart = null;
        this.indicadores_monitor = this.MonitoreoDeIndicadoresContraCaptura.bind(this);
        this.Obtener_indicadores();
        this.Obtener_indicadores_monitor();
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'panel panel-default' },
                React.createElement(Header, { titulo: ' Indicadores Establecimientos De Eldorado Del Mes De "' + this.fecha_mes() + '".',
                    evento: this.on_fecha.bind(this),
                    recargar: this.on_recargar.bind(this),
                    fecha: this.parseo_fecha() }),
                React.createElement(TableBodyEstablecimientos, { list: this.state.lista,
                    IndicadorMonitor: this.indicadores_monitor,
                    mes: this.fecha_mes(),
                    seleccion: this.on_seleccion_est.bind(this)
                }),
                React.createElement(ModalEmpleados, { seleccion: this.state.establecimiento,
                    IndicadorMonitor: this.indicadores_monitor,
                    datos: this.state.lista,
                    mes: this.fecha_mes(),
                    evento: this.on_colaborador.bind(this),
                    fecha: this.state.fecha
                }),
                React.createElement(ModalDetalleEmpleado, { colaborador: this.state.colaborador,
                    IndicadorMonitor: this.indicadores_monitor,
                    actual: this.fecha_mes(),
                    anterior: this.fecha_mes_anterior(),
                    establecimiento: this.state.establecimiento.establecimiento,
                    evento: this.on_detalle_colaborador.bind(this),
                    mes: this.fecha_mes()
                }),
                React.createElement(ModalSemanasColaborador, { lista: this.state.lista,
                    IndicadorMonitor: this.indicadores_monitor,
                    establecimiento: this.state.establecimiento.folio_establecimiento,
                    actual: this.fecha_mes(),
                    anterior: this.fecha_mes_anterior(),
                    colaborador: this.state.colaborador,
                    filtro: this.state.filtro,
                    leyenda: this.state.leyenda,
                    grafica: this.graficar.bind(this)
                })
            );
        }

        /*eventos*/
    }, {
        key: 'on_fecha',
        value: function on_fecha(e) {
            var f = e.target.value.split("-");
            this.setState({ fecha: f[2] + "/" + f[1] + "/" + f[0], lista: [] });
        }
    }, {
        key: 'on_seleccion_est',
        value: function on_seleccion_est(seleccion, indicadores) {
            var objeto = {
                folio_establecimiento: seleccion.folio_establecimiento_venta,
                establecimiento: seleccion.establecimiento_venta,
                seleccion: indicadores
            };
            this.setState({ establecimiento: objeto });
            document.getElementById("modal_establecimiento").style.display = "flex";
        }
    }, {
        key: 'on_recargar',
        value: function on_recargar() {
            this.setState({ lista: [] });
            document.getElementById("carga_Establecimientos").style.display = "flex";
            this.Obtener_indicadores();
        }
    }, {
        key: 'on_colaborador',
        value: function on_colaborador(seleccion) {
            var indicadores = this.Obtener_indicadores_por_mes(seleccion);
            var objeto = {
                folio: seleccion.folio_empleado,
                nombre: seleccion.nombre_empleado,
                foto: '',
                antiguedad: seleccion.antiguedad,
                puesto: seleccion.puesto,
                fecha: seleccion.fecha_ingreso,
                departamento: seleccion.departamento,
                actual: indicadores.actual,
                pasado: indicadores.anterior
            };
            this.setState({ colaborador: objeto });
            this.Obtener_foto_empleado(seleccion.folio_empleado);
            document.getElementById("modal_detalle_empleados").style.display = "flex";
        }
    }, {
        key: 'on_detalle_colaborador',
        value: function on_detalle_colaborador(seleccion) {

            var venta = this.state.indicadores_monitor.find(function (f) {
                return f.Indicador == "Cajeros Ventas";
            });
            var cancelacion = this.state.indicadores_monitor.find(function (f) {
                return f.Indicador == "Cancelaciones";
            });
            var diferencia = this.state.indicadores_monitor.find(function (f) {
                return f.Indicador == "Diferencia Corte";
            });

            var leyenda_ = "";
            if (seleccion == "Venta X 100.") {
                leyenda_ = 'Total De Venta Por Cada Cien. ( Venta X 100 ' + venta.Operador + ' ' + venta.Valor_optimo_indicador + ' )';
            } else if (seleccion == "Cancelacion X 100.") {
                leyenda_ = 'Un Producto Por Cada Cien. ( Cancelaciones X 100 ' + cancelacion.Operador + ' ' + cancelacion.Valor_optimo_indicador + ' )';
            } else {
                leyenda_ = 'Un Peso por Cada Diez Mil. ( Diferencia X 10,000 ' + diferencia.Operador + ' ' + diferencia.Valor_optimo_indicador + ' )';
            }
            this.setState({ filtro: seleccion, leyenda: leyenda_ });
            document.getElementById("modal_vista_semana").style.display = "flex";
        }

        /*Metodos*/
    }, {
        key: 'fecha_hoy',
        value: function fecha_hoy() {
            var f = new Date();
            var dia = f.getDate() > 10 ? f.getDate() : "0" + f.getDate();
            var mes = f.getMonth() + 1 > 10 ? f.getMonth() + 1 : "0" + (f.getMonth() + 1);
            var anio = f.getFullYear();

            return dia + "/" + mes + "/" + anio;
        }
    }, {
        key: 'parseo_fecha',
        value: function parseo_fecha() {
            var f = this.state.fecha.split("/");
            return f[2] + "-" + f[1] + "-" + f[0];
        }
    }, {
        key: 'fecha_mes',
        value: function fecha_mes() {
            var f = this.state.fecha.split("/");
            return this.meses[parseInt(f[1])];
        }
    }, {
        key: 'fecha_mes_anterior',
        value: function fecha_mes_anterior() {
            var f = this.state.fecha.split("/");
            if (f[1] > 1) return this.meses[parseInt(f[1]) - 1];else return this.meses[parseInt(f[1]) + 11];
        }
    }, {
        key: 'Obtener_indicadores_por_mes',
        value: function Obtener_indicadores_por_mes(seleccion) {
            var _this = this;

            //inicializa variables
            var venta = 0,
                cancelacion = 0,
                diferencia = 0,
                corte = 0,
                total = 0;
            var p_venta = 0,
                p_cancelacion = 0,
                p_diferencia = 0,
                p_corte = 0,
                p_total = 0;
            //lista de resultados
            var actual = this.state.lista.filter(function (d) {
                return d.folio_establecimiento_venta == seleccion.folio_establecimiento_venta && d.folio_empleado == seleccion.folio_empleado && d.mes == _this.fecha_mes();
            });
            var anterior = this.state.lista.filter(function (d) {
                return d.folio_establecimiento_venta == seleccion.folio_establecimiento_venta && d.folio_empleado == seleccion.folio_empleado && d.mes != _this.fecha_mes();
            });

            //recorre el filtro para sumar los valores
            actual.forEach(function (r) {
                venta += r.indicado_venta_x_100;
                cancelacion += r.indicador_cancelacion_x_100;
                diferencia += r.indicacor_diferencia_x_1000;
                corte += r.total_diferencia_de_corte;
                total += r.venta_por_semana_empleado;
            });
            //recorre el filtro para sumar los valores
            anterior.forEach(function (r) {
                p_venta += r.indicado_venta_x_100;
                p_cancelacion += r.indicador_cancelacion_x_100;
                p_diferencia += r.indicacor_diferencia_x_1000;
                p_corte += r.total_diferencia_de_corte;
                p_total += r.venta_por_semana_empleado;
            });
            //ajusta a dos decimales
            venta = Math.round(venta / actual.length * 100) / 100;
            cancelacion = Math.round(cancelacion / actual.length * 100) / 100;
            diferencia = Math.round(diferencia / actual.length * 100) / 100;
            corte = Math.round(corte / actual.length * 100) / 100;
            total = Math.round(total / actual.length * 100) / 100;
            //ajusta a dos decimales
            p_venta = Math.round(p_venta / anterior.length * 100) / 100;
            p_cancelacion = Math.round(p_cancelacion / anterior.length * 100) / 100;
            p_diferencia = Math.round(p_diferencia / anterior.length * 100) / 100;
            p_corte = Math.round(p_corte / anterior.length * 100) / 100;
            p_total = Math.round(p_total / anterior.length * 100) / 100;

            return {
                actual: {
                    venta: venta,
                    cancelacion: cancelacion,
                    diferencia: diferencia,
                    corte: corte,
                    total: total
                },
                anterior: {
                    venta: p_venta,
                    cancelacion: p_cancelacion,
                    diferencia: p_diferencia,
                    corte: p_corte,
                    total: p_total
                }
            };
        }
    }, {
        key: 'graficar',
        value: function graficar(lista_seleccion, titulo, labs) {
            var _this2 = this;

            var venta = lista_seleccion.map(function (e) {
                return _this2.state.indicadores_monitor.find(function (f) {
                    return f.Indicador == "Cajeros Ventas";
                }).Valor_optimo_indicador;
            }),
                cancelacion = lista_seleccion.map(function (e) {
                return _this2.state.indicadores_monitor.find(function (f) {
                    return f.Indicador == "Cancelaciones";
                }).Valor_optimo_indicador;
            }),
                diferencia = lista_seleccion.map(function (e) {
                return _this2.state.indicadores_monitor.find(function (f) {
                    return f.Indicador == "Diferencia Corte";
                }).Valor_optimo_indicador;
            });

            var datos_barras = [{
                label: "inidcador.",
                data: lista_seleccion,
                borderColor: "#00b300",
                fill: false
            }];
            switch (titulo) {
                case "Venta X 100. Semanas Del Año.":
                    datos_barras.push({
                        label: "Venta.",
                        data: venta,
                        borderColor: "#6a2172",
                        fill: false
                    });
                    break;
                case "Cancelacion X 100. Semanas Del Año.":
                    datos_barras.push({
                        label: "Cancelacion.",
                        data: cancelacion,
                        borderColor: "#cd6543",
                        fill: false
                    });
                    break;
                case "Diferencia X 10,000. Semanas Del Año.":
                    datos_barras.push({
                        label: "Diferencia.",
                        data: diferencia,
                        borderColor: "#136dbc",
                        fill: false
                    });
                    break;

            }

            var ctx = document.getElementById("barras_char");

            if (this.barChart != null) {
                this.barChart.clear();
                this.barChart.destroy();
            }

            this.barChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labs,
                    datasets: datos_barras
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function callback(value, index, values) {
                                    return value + ' .';
                                }
                            },
                            scaleLabel: {
                                display: true,
                                labelString: titulo
                            }
                        }]
                    }
                }
            });
            this.barChart.update();
        }
    }, {
        key: 'MonitoreoDeIndicadoresContraCaptura',
        value: function MonitoreoDeIndicadoresContraCaptura(valor, tipo_indicador) {
            //objetos
            var venta = this.state.indicadores_monitor.find(function (f) {
                return f.Indicador == "Cajeros Ventas";
            });
            var cancelacion = this.state.indicadores_monitor.find(function (f) {
                return f.Indicador == "Cancelaciones";
            });
            var diferencia = this.state.indicadores_monitor.find(function (f) {
                return f.Indicador == "Diferencia Corte";
            });
            var indicador_respuesta = { indicador: '', estatus: false };

            //funciones estatus
            var indicadorMayor = function indicadorMayor(selection) {
                return valor > selection;
            };
            var indicadorMenor = function indicadorMenor(selection) {
                return valor < selection;
            };
            var indicadorIgual = function indicadorIgual(selection) {
                return valor == selection;
            };
            var Indicador_mayo_i = function Indicador_mayo_i(selection) {
                return valor >= selection;
            };
            var Indicador_menor_i = function Indicador_menor_i(selection) {
                return valor >= selection;
            };

            //funciones operador
            var operador = function operador(_ref) {
                var Operador = _ref.Operador;
                var Indicador = _ref.Indicador;
                var Valor_optimo_indicador = _ref.Valor_optimo_indicador;

                var parametro = "";

                switch (Operador) {
                    case ">":
                        indicador_respuesta.estatus = indicadorMayor(Valor_optimo_indicador);
                        parametro = ">";
                        break;
                    case "<":
                        indicador_respuesta.estatus = indicadorMenor(Valor_optimo_indicador);
                        parametro = "<";
                        break;
                    case "=":
                        indicador_respuesta.estatus = indicadorIgual(Valor_optimo_indicador);
                        parametro = "=";
                        break;
                    case ">=":
                        indicador_respuesta.estatus = Indicador_mayo_i(Valor_optimo_indicador);
                        parametro = ">=";
                        break;
                    case "<=":
                        indicador_respuesta.estatus = Indicador_menor_i(Valor_optimo_indicador);
                        parametro = "<=";
                        break;

                }
                indicador_respuesta.indicador = Valor_optimo_indicador + '  ' + parametro;
            };

            switch (tipo_indicador) {
                case "venta":
                    operador(venta);
                    break;
                case "cancelacion":
                    operador(cancelacion);
                    break;
                case "diferencia":
                    operador(diferencia);
                    break;
            }
            return indicador_respuesta;
        }

        /*coneciones*/
    }, {
        key: 'Obtener_indicadores',
        value: function Obtener_indicadores() {
            var _this3 = this;

            fetch("servicios/indicadores/indicadores_cajas_conexion.asmx/lista_indicadores", {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fecha: this.state.fecha
                })
            }).then(function (respuesta) {
                if (respuesta.status == "200") respuesta.text().then(function (r) {
                    r = JSON.parse(r);
                    if (r.d.length > 0) _this3.setState({ lista: r.d });else alert("Sin Datos A Mostrar!!!");
                    document.getElementById("carga_Establecimientos").style.display = "none";
                })['catch'](function (err) {
                    return alert("Error en ", err);
                });else {
                    document.getElementById("carga_Establecimientos").style.display = "none";
                    alert("Error De Conexion!!!");
                }
            })['catch'](function (error) {
                console.log(error);
                alert('Error:', error);
            });
        }
    }, {
        key: 'Obtener_foto_empleado',
        value: function Obtener_foto_empleado(folio) {
            var _this4 = this;

            fetch("servicios/ususrios_scoiServ.asmx/obtener_usuario_imagen", {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tipo: "id_scoi",
                    filtro: folio
                })
            }).then(function (respuesta) {
                if (respuesta.status == "200") respuesta.text().then(function (r) {
                    var objeto = _this4.state.colaborador;
                    r = JSON.parse(r);
                    if (r.d.foto) {
                        objeto.foto = r.d.foto;
                        //console.log(objeto);
                    } else {
                            objeto.foto = "../../../Data/usr.jpg";
                            //console.log("Sin Foto A Mostrar!!!");
                        }
                    _this4.setState({ colaborador: objeto });
                })['catch'](function (err) {
                    _this4.Obtener_foto_empleado(folio);
                });else {
                    alert("Error De Conexion!!!");
                    _this4.Obtener_foto_empleado(folio);
                }
            })['catch'](function (error) {
                console.log(error);
                alert('Error:', error);
            });
        }
    }, {
        key: 'Obtener_indicadores_monitor',
        value: function Obtener_indicadores_monitor() {
            var _this5 = this;

            fetch("servicios/indicadores/indicadores_cajas_conexion.asmx/Indicadores_monitor", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                return res.json().then(function (respuesta) {
                    //console.table(respuesta.d);
                    _this5.setState({ indicadores_monitor: respuesta.d });
                });
            })['catch']();
        }
    }]);

    return App;
})(React.Component);

var Cargar = function Cargar(_ref2) {
    var nombre = _ref2.nombre;

    return React.createElement(
        'div',
        { id: nombre,
            style: {
                display: "flex",
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(144, 144, 146, 0.29)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                fontSize: "40px"
            } },
        React.createElement(
            'label',
            { id: nombre + 1 },
            React.createElement('i', { className: 'fa fa-circle-o-notch rotate' }),
            React.createElement(
                'strong',
                { style: { fontSize: "20px" } },
                ' Cargando...'
            ),
            React.createElement('br', null)
        )
    );
};

var Checar = function Checar(dato) {
    return dato ? "green" : "red";
};

var Header = function Header(_ref3) {
    var titulo = _ref3.titulo;
    var fecha = _ref3.fecha;
    var evento = _ref3.evento;
    var recargar = _ref3.recargar;

    return React.createElement(
        'div',
        { className: 'panel-heading', style: { "display": "flex", "top": "-10px" } },
        React.createElement(
            'span',
            null,
            React.createElement(
                'h3',
                null,
                titulo
            )
        ),
        React.createElement(Fecha, null),
        React.createElement(
            'i',
            { className: 'btn btn-default fa fa-download',
                onClick: recargar,
                style: { "marginTop": "20px", "marginLeft": "20px", "fontSize": "20px" } },
            React.createElement(
                'strong',
                { style: { marginLegt: "5px", fontSize: "15px" } },
                ' Cargar Informacion. '
            )
        )
    );
    function Fecha() {
        return React.createElement(
            'div',
            { className: 'group-control', style: { "width": "170px", "display": "inline-block", "marginLeft": "15px" } },
            React.createElement(
                'strong',
                null,
                'Fecha'
            ),
            React.createElement('input', { type: 'date', className: 'form-control', value: fecha, onChange: evento })
        );
    }
};

var TableBodyEstablecimientos = function TableBodyEstablecimientos(_ref4) {
    var list = _ref4.list;
    var seleccion = _ref4.seleccion;
    var mes = _ref4.mes;
    var IndicadorMonitor = _ref4.IndicadorMonitor;

    var Lista = function Lista() {
        //componente privado que genera y calcula las filas
        var Dato = function Dato(_ref5) {
            var e = _ref5.e;

            //inicializa variables
            var venta = 0,
                cancelacion = 0,
                diferencia = 0,
                corte = 0,
                total = 0;
            //lista de resultados
            var res = list.filter(function (d) {
                return d.folio_establecimiento_venta == e.folio_establecimiento_venta && d.mes == mes;
            });
            //recorre el filtro para sumar los valores
            res.forEach(function (r) {
                venta += r.indicado_venta_x_100;
                cancelacion += r.indicador_cancelacion_x_100;
                diferencia += r.indicacor_diferencia_x_1000;
                corte += r.total_diferencia_de_corte;
                total += r.venta_por_semana_empleado;
            });
            //ajusta a dos decimales
            venta = Math.round(venta / res.length * 100) / 100;
            cancelacion = Math.round(cancelacion / res.length * 100) / 100;
            diferencia = Math.round(diferencia / res.length * 100) / 100;
            corte = Math.round(corte / res.length * 100) / 100;
            total = Math.round(total / res.length * 100) / 100;
            //indicador monitor base
            var indicador_venta = IndicadorMonitor(venta, "venta");
            var indicador_cancelacion = IndicadorMonitor(cancelacion, "cancelacion");
            var indicador_diferencia = IndicadorMonitor(diferencia, "diferencia");
            //returna la fila
            return React.createElement(
                'tr',
                { key: e.folio_establecimiento_venta },
                React.createElement(
                    'td',
                    null,
                    e.folio_establecimiento_venta
                ),
                React.createElement(
                    'td',
                    null,
                    e.establecimiento_venta
                ),
                React.createElement(
                    'td',
                    { style: { textAlign: "right" }, className: Checar(indicador_venta.estatus) },
                    React.createElement(
                        'label',
                        null,
                        indicador_venta.indicador
                    ),
                    React.createElement(
                        'strong',
                        null,
                        ' ',
                        venta
                    )
                ),
                React.createElement(
                    'td',
                    { style: { textAlign: "right" }, className: Checar(indicador_cancelacion.estatus) },
                    React.createElement(
                        'label',
                        null,
                        indicador_cancelacion.indicador
                    ),
                    React.createElement(
                        'strong',
                        { style: { marginLeft: "5px" } },
                        cancelacion
                    )
                ),
                React.createElement(
                    'td',
                    { style: { textAlign: "right" }, className: Checar(indicador_diferencia.estatus) },
                    React.createElement(
                        'label',
                        null,
                        indicador_diferencia.indicador
                    ),
                    React.createElement(
                        'strong',
                        { style: { marginLeft: "5px" } },
                        diferencia
                    )
                ),
                React.createElement(
                    'td',
                    { style: { textAlign: "right" } },
                    '$',
                    React.createElement(
                        'strong',
                        { style: { marginLeft: "5px" } },
                        corte
                    )
                ),
                React.createElement(
                    'td',
                    null,
                    '$',
                    React.createElement(
                        'strong',
                        null,
                        total
                    )
                ),
                React.createElement(
                    'td',
                    null,
                    React.createElement(
                        'i',
                        { className: 'btn btn-info glyphicon glyphicon-list-alt',
                            onClick: function () {
                                return seleccion(e, { venta: venta, cancelacion: cancelacion, diferencia: diferencia });
                            } },
                        ' Indicadores'
                    )
                )
            );
        };

        var lista = []; //listas que contendra todas las filas
        var folio = 0; //folio para filtrar

        list.sort(function (a, b) {
            return a.folio_establecimiento_venta > b.folio_establecimiento_venta ? 1 : -1;
        }); //ordenamiento de establecimientos

        list.forEach(function (e) {
            if (folio != e.folio_establecimiento_venta) {
                folio = e.folio_establecimiento_venta;
                lista.push(React.createElement(Dato, { e: e, key: e.folio_establecimiento_venta }));
            }
        });

        return lista;
    };

    return React.createElement(
        'div',
        { className: 'panel-body', style: { height: "560px" } },
        React.createElement(
            'div',
            { style: { height: "540px", overflow: "auto" } },
            React.createElement(
                'table',
                { className: 'table' },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        { style: { background: "#0194ae" } },
                        React.createElement(
                            'th',
                            { style: { width: "40px", color: "azure", fontSize: "18px" } },
                            'Folio'
                        ),
                        React.createElement(
                            'th',
                            { style: { color: "azure", fontSize: "18px" } },
                            'Establecimiento'
                        ),
                        React.createElement(
                            'th',
                            { style: { width: "130px", color: "azure" } },
                            'Venta x 100'
                        ),
                        React.createElement(
                            'th',
                            { style: { width: "130px", color: "azure" } },
                            'Cancelaciones x 100'
                        ),
                        React.createElement(
                            'th',
                            { style: { width: "130px", color: "azure" } },
                            'Diferencia x 10,000'
                        ),
                        React.createElement(
                            'th',
                            { style: { width: "90px", color: "azure" } },
                            'Diferencia Cortes'
                        ),
                        React.createElement(
                            'th',
                            { style: { width: "70px", color: "azure" } },
                            'Venta Total'
                        ),
                        React.createElement('th', { style: { width: "70px", color: "azure" } })
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(Lista, null)
                )
            )
        ),
        React.createElement(Cargar, { nombre: "carga_Establecimientos" })
    );
};

var ModalEmpleados = function ModalEmpleados(_ref6) {
    var seleccion = _ref6.seleccion;
    var datos = _ref6.datos;
    var evento = _ref6.evento;
    var mes = _ref6.mes;
    var IndicadorMonitor = _ref6.IndicadorMonitor;

    var Indicadores = function Indicadores(_ref7) {
        var titulo = _ref7.titulo;
        var valor = _ref7.valor;
        var r = _ref7.r;

        return React.createElement(
            'div',
            { className: 'form-group', style: { width: "125px", display: "inline-block", marginLeft: "25px" } },
            React.createElement(
                'strong',
                { style: { fontSize: "12px" } },
                titulo
            ),
            React.createElement(
                'label',
                { className: "form-control " + r, style: { textAlign: "right" } },
                valor
            )
        );
    };

    var filtro = function filtro() {
        return datos.filter(function (e) {
            return e.folio_establecimiento_venta == seleccion.folio_establecimiento && e.mes == mes;
        });
    };

    //indicador monitor base
    var indicador_venta = IndicadorMonitor(seleccion.seleccion.venta, "venta");
    var indicador_cancelacion = IndicadorMonitor(seleccion.seleccion.cancelacion, "cancelacion");
    var indicador_diferencia = IndicadorMonitor(seleccion.seleccion.diferencia, "diferencia");

    return React.createElement(
        'div',
        { id: 'modal_establecimiento',
            style: {
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(144, 144, 146, 0.29)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9991,
                display: "none"
            }
        },
        React.createElement(
            'div',
            { className: 'panel panel-default animate', style: { height: "90%", minHeight: "600px", width: "95%", maxWidth: "1100px", minWidth: "500px" } },
            React.createElement(
                'div',
                { className: 'panel-heading', style: { height: "8%", background: "#0194ae", color: "azure", fontSize: "18px" } },
                React.createElement('i', { className: 'close fa fa-close',
                    onClick: function () {
                        return cerrar();
                    } }),
                React.createElement(
                    'strong',
                    null,
                    'INDICADORES ',
                    seleccion.establecimiento,
                    '.'
                )
            ),
            React.createElement(
                'div',
                { className: 'panel-default', style: { height: "85%" } },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'span',
                        null,
                        React.createElement(
                            'label',
                            { style: { fontSize: "25px" } },
                            'Total Indicadores Del Mes "',
                            mes,
                            '".'
                        )
                    ),
                    React.createElement(
                        'span',
                        { style: { display: "inline-block" } },
                        React.createElement(Indicadores, { titulo: "Venta X 100",
                            valor: seleccion.seleccion.venta,
                            r: Checar(indicador_venta.estatus) }),
                        React.createElement(Indicadores, { titulo: "Cancelacion X 100",
                            valor: seleccion.seleccion.cancelacion,
                            r: Checar(indicador_cancelacion.estatus) }),
                        React.createElement(Indicadores, { titulo: "diferencia X 10,000",
                            valor: seleccion.seleccion.diferencia,
                            r: Checar(indicador_diferencia.estatus) })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body', style: { height: "90%" } },
                    React.createElement(
                        'div',
                        { style: { height: "90%", overflow: "auto", marginTop: "1px" } },
                        React.createElement(TablaEmpleados, {
                            lista: filtro(),
                            evento: evento,
                            IndicadorMonitor: IndicadorMonitor
                        })
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'panel-footer' },
                React.createElement(
                    'i',
                    { className: 'btn btn-danger close',
                        onClick: function () {
                            return cerrar();
                        },
                        style: { marginLeft: "88%", fontSize: "14px", background: "red", color: "azure" } },
                    'Cerrar'
                )
            )
        )
    );
    function cerrar() {
        document.getElementById("modal_establecimiento").style.display = "none";
    }
};
var TablaEmpleados = function TablaEmpleados(_ref8) {
    var lista = _ref8.lista;
    var evento = _ref8.evento;
    var IndicadorMonitor = _ref8.IndicadorMonitor;

    var Datos = function Datos(_ref9) {
        var e = _ref9.e;

        //inicializa variables
        var venta = 0,
            cancelacion = 0,
            diferencia = 0,
            corte = 0,
            total = 0;
        //lista de resultados
        var res = lista.filter(function (d) {
            return d.folio_establecimiento_venta == e.folio_establecimiento_venta && d.folio_empleado == e.folio_empleado;
        });
        //recorre el filtro para sumar los valores
        res.forEach(function (r) {
            venta += r.indicado_venta_x_100;
            cancelacion += r.indicador_cancelacion_x_100;
            diferencia += r.indicacor_diferencia_x_1000;
            corte += r.total_diferencia_de_corte;
            total += r.venta_por_semana_empleado;
        });
        //ajusta a dos decimales
        venta = Math.round(venta / res.length * 100) / 100;
        cancelacion = Math.round(cancelacion / res.length * 100) / 100;
        diferencia = Math.round(diferencia / res.length * 100) / 100;
        corte = Math.round(corte / res.length * 100) / 100;
        total = Math.round(total / res.length * 100) / 100;

        //indicador monitor base
        var indicador_venta = IndicadorMonitor(venta, "venta");
        var indicador_cancelacion = IndicadorMonitor(cancelacion, "cancelacion");
        var indicador_diferencia = IndicadorMonitor(diferencia, "diferencia");

        return React.createElement(
            'tr',
            { style: { fontSize: "14px" } },
            React.createElement(
                'td',
                null,
                e.folio_empleado
            ),
            React.createElement(
                'td',
                null,
                e.nombre_empleado
            ),
            React.createElement(
                'td',
                { style: { textAlign: "center" } },
                ' ',
                indicador_venta.indicador
            ),
            React.createElement(
                'td',
                { style: { textAlign: "center" }, className: Checar(indicador_venta.estatus) },
                venta
            ),
            React.createElement(
                'td',
                { style: { textAlign: "center" } },
                ' ',
                indicador_cancelacion.indicador,
                ' '
            ),
            React.createElement(
                'td',
                { style: { textAlign: "center" }, className: Checar(indicador_cancelacion.estatus) },
                cancelacion
            ),
            React.createElement(
                'td',
                { style: { textAlign: "center" } },
                indicador_diferencia.indicador
            ),
            React.createElement(
                'td',
                { style: { textAlign: "center" }, className: Checar(indicador_diferencia.estatus) },
                diferencia
            ),
            React.createElement(
                'td',
                null,
                React.createElement(
                    'i',
                    { className: 'btn btn-primary fa fa-calendar',
                        onClick: function () {
                            return evento(e);
                        },
                        title: 'Indicadores Por Semana.' },
                    ' Colaborador'
                )
            )
        );
    };
    var Lista = function Lista() {
        var lista_f = []; //listas que contendra todas las filas
        var folio = 0; //folio para filtrar

        lista.forEach(function (e) {
            if (folio != e.folio_empleado) {
                folio = e.folio_empleado;
                lista_f.push(React.createElement(Datos, { e: e, key: e.folio_empleado }));
            }
        });
        return lista_f;
    };
    return React.createElement(
        'table',
        { className: 'table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                { style: { background: "#087fe4", heigth: "20px" } },
                React.createElement(
                    'th',
                    { rowSpan: '2', style: { width: "40px", color: "azure", fontSize: "18px" } },
                    'Folio'
                ),
                React.createElement(
                    'th',
                    { rowSpan: '2', style: { color: "azure", fontSize: "18px" } },
                    'Colaborador'
                ),
                React.createElement(
                    'th',
                    { colSpan: '2', style: { width: "90px", color: "azure", fontSize: "12px", textAlign: "center" } },
                    'Venta'
                ),
                React.createElement(
                    'th',
                    { colSpan: '2', style: { width: "90px", color: "azure", fontSize: "12px", textAlign: "center" } },
                    'Cancelacion'
                ),
                React.createElement(
                    'th',
                    { colSpan: '2', style: { width: "90px", color: "azure", fontSize: "12px", textAlign: "center" } },
                    'Diferencia'
                ),
                React.createElement('th', { rowSpan: '2', style: { width: "40px" } })
            ),
            React.createElement(
                'tr',
                { style: { background: "#087fe4" } },
                React.createElement(
                    'th',
                    { style: { color: "azure", textAlign: "center" } },
                    'Objetivo'
                ),
                React.createElement(
                    'th',
                    { style: { color: "azure", textAlign: "center" } },
                    'Real'
                ),
                React.createElement(
                    'th',
                    { style: { color: "azure", textAlign: "center" } },
                    'Objetivo'
                ),
                React.createElement(
                    'th',
                    { style: { color: "azure", textAlign: "center" } },
                    'Real'
                ),
                React.createElement(
                    'th',
                    { style: { color: "azure", textAlign: "center" } },
                    'Objetivo'
                ),
                React.createElement(
                    'th',
                    { style: { color: "azure", textAlign: "center" } },
                    'Real'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            React.createElement(Lista, null)
        )
    );
};

var ModalDetalleEmpleado = function ModalDetalleEmpleado(_ref10) {
    var colaborador = _ref10.colaborador;
    var establecimiento = _ref10.establecimiento;
    var actual = _ref10.actual;
    var anterior = _ref10.anterior;
    var evento = _ref10.evento;
    var IndicadorMonitor = _ref10.IndicadorMonitor;

    return React.createElement(
        'div',
        { id: 'modal_detalle_empleados',
            style: {
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(144, 144, 146, 0.29)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9991,
                display: "none"
            }
        },
        React.createElement(
            'div',
            { className: 'panel panel-default animate', style: { height: "80%", minHeight: "550px", width: "90%", maxWidth: "1050px", minWidth: "500px" } },
            React.createElement(
                'div',
                { className: 'panel-heading', style: { height: "8%", background: "#087fe4", color: "azure", fontSize: "18px" } },
                React.createElement('i', { className: 'close fa fa-close',
                    onClick: function () {
                        return cerrar();
                    } }),
                React.createElement(
                    'strong',
                    null,
                    'INDICADORES COLABORADOR ',
                    establecimiento,
                    '. '
                )
            ),
            React.createElement(ViewUsuario, { usuario: colaborador }),
            React.createElement(
                'div',
                { className: 'panel-body', style: { height: "55%" } },
                React.createElement(
                    'div',
                    { style: { height: "95%", overflow: "auto", marginTop: "1px", background: "#e0ebeb" } },
                    React.createElement(ListaIndicadores, {
                        indicadoresAnt: colaborador.pasado,
                        actual: actual,
                        anterior: anterior,
                        indicadoresAct: colaborador.actual,
                        IndicadorMonitor: IndicadorMonitor,
                        evento: evento
                    })
                )
            ),
            React.createElement(
                'div',
                { className: 'panel-footer' },
                React.createElement(
                    'i',
                    { className: 'btn btn-danger',
                        onClick: function () {
                            return cerrar();
                        },
                        style: { marginLeft: "88%", fontSize: "14px", background: "red", color: "azure" } },
                    'Cerrar'
                )
            )
        )
    );
    function cerrar() {
        document.getElementById("modal_detalle_empleados").style.display = "none";
    }
};
var ViewUsuario = function ViewUsuario(_ref11) {
    var usuario = _ref11.usuario;

    return React.createElement(
        'div',
        { className: 'panel panel-default', style: { 'display': 'inline-block', 'marginTop': '2px' } },
        React.createElement(
            'div',
            { className: 'panel panel-heading' },
            React.createElement(
                'div',
                { style: { 'display': 'inline-block', 'marginTop': '-1px', 'height': '110px' } },
                React.createElement('img', { src: usuario.foto, width: '110', alt: 'Usuario', className: 'img-rounded' })
            ),
            React.createElement(Formularios, {
                nombre: usuario.nombre,
                puesto: usuario.puesto,
                fecha: usuario.fecha,
                antigurdad: usuario.antiguedad,
                departamento: usuario.departamento
            })
        )
    );
};
var Formularios = function Formularios(_ref12) {
    var nombre = _ref12.nombre;
    var puesto = _ref12.puesto;
    var fecha = _ref12.fecha;
    var antigurdad = _ref12.antigurdad;
    var departamento = _ref12.departamento;

    var ComponenteGrande = function ComponenteGrande(_ref13) {
        var titulo = _ref13.titulo;
        var valor = _ref13.valor;
        return React.createElement(
            'div',
            { className: 'form-group', style: { 'width': '450px', 'display': 'inline-block', 'marginLeft': '20px' } },
            React.createElement(
                'strong',
                null,
                titulo
            ),
            React.createElement(
                'label',
                { className: 'form-control' },
                valor
            )
        );
    };
    var ComponenteMediano = function ComponenteMediano(_ref14) {
        var titulo = _ref14.titulo;
        var valor = _ref14.valor;
        return React.createElement(
            'div',
            { style: { 'width': '330px', 'display': 'inline-block', 'marginLeft': '20px' } },
            React.createElement(
                'strong',
                null,
                titulo
            ),
            React.createElement(
                'label',
                { className: 'form-control' },
                valor.substr(0, 41) + "."
            )
        );
    };
    var ComponenteCorto = function ComponenteCorto(_ref15) {
        var titulo = _ref15.titulo;
        var valor = _ref15.valor;
        return React.createElement(
            'div',
            { style: { 'width': '180px', 'display': 'inline-block', 'marginLeft': '20px' } },
            React.createElement(
                'strong',
                null,
                titulo
            ),
            React.createElement(
                'label',
                { className: 'form-control' },
                valor.substr(0, 31) + "."
            )
        );
    };
    return React.createElement(
        'div',
        { style: { 'width': '860px', 'display': 'inline-block', 'marginLeft': '100px', 'marginTop': '-180px', 'fontFamily': 'consolas' } },
        React.createElement(ComponenteGrande, { titulo: 'Nombre',
            valor: nombre }),
        React.createElement(ComponenteMediano, { titulo: 'Puesto',
            valor: puesto }),
        React.createElement(ComponenteMediano, { titulo: 'Departamento',
            valor: departamento }),
        React.createElement(ComponenteCorto, { titulo: 'Antiguedad en puesto',
            valor: antigurdad }),
        React.createElement(ComponenteCorto, { titulo: 'Fecha Ingreso',
            valor: fecha })
    );
};
var ListaIndicadores = function ListaIndicadores(_ref16) {
    var indicadoresAct = _ref16.indicadoresAct;
    var indicadoresAnt = _ref16.indicadoresAnt;
    var actual = _ref16.actual;
    var anterior = _ref16.anterior;
    var evento = _ref16.evento;
    var IndicadorMonitor = _ref16.IndicadorMonitor;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'table',
            { className: 'table' },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    { className: 'info' },
                    React.createElement(
                        'th',
                        null,
                        React.createElement(
                            'strong',
                            null,
                            'Indicadores Por Mes'
                        )
                    ),
                    React.createElement(
                        'th',
                        { style: { width: "150px" } },
                        'Objetivo Mensual'
                    ),
                    React.createElement(
                        'th',
                        { style: styles.cuerpo.tabla.cavecera_indicador_ch },
                        ' ',
                        actual
                    ),
                    React.createElement(
                        'th',
                        { style: styles.cuerpo.tabla.cavecera_indicador_ch },
                        ' ',
                        anterior
                    ),
                    React.createElement('th', { style: styles.cuerpo.tabla.cavecera_indicador_ch })
                )
            ),
            React.createElement(DatosIndicador, {
                indicadoresAct: indicadoresAct,
                indicadoresAnt: indicadoresAnt,
                evento: evento,
                IndicadorMonitor: IndicadorMonitor
            })
        )
    );
};
var DatosIndicador = function DatosIndicador(_ref17) {
    var indicadoresAct = _ref17.indicadoresAct;
    var indicadoresAnt = _ref17.indicadoresAnt;
    var evento = _ref17.evento;
    var IndicadorMonitor = _ref17.IndicadorMonitor;

    //indicador monitor base actual
    var indicador_venta = IndicadorMonitor(indicadoresAct.venta, "venta");
    var indicador_cancelacion = IndicadorMonitor(indicadoresAct.cancelacion, "cancelacion");
    var indicador_diferencia = IndicadorMonitor(indicadoresAct.diferencia, "diferencia");
    //indicador monitor base anterior
    var indicador_venta_anterior = IndicadorMonitor(indicadoresAnt.venta, "venta");
    var indicador_cancelacion_anterior = IndicadorMonitor(indicadoresAnt.cancelacion, "cancelacion");
    var indicador_diferencia_anterior = IndicadorMonitor(indicadoresAnt.diferencia, "diferencia");

    var Fila = function Fila(_ref18) {
        var descripcion = _ref18.descripcion;
        var objetivo = _ref18.objetivo;
        var actual = _ref18.actual;
        var condicionAct = _ref18.condicionAct;
        var anterior = _ref18.anterior;
        var condicionAnt = _ref18.condicionAnt;

        //console.log("Datos:empleado:", { descripcion, objetivo, actual, condicionAct, anterior, condicionAnt });
        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                descripcion
            ),
            React.createElement(
                'td',
                null,
                React.createElement(
                    'i',
                    { style: styles.cuerpo.tabla.cavecera_indicador_ch, className: 'btn btn-default' },
                    objetivo
                )
            ),
            React.createElement(
                'td',
                null,
                ' ',
                React.createElement(Cumple, { valor: actual, condicion: condicionAct })
            ),
            React.createElement(
                'td',
                null,
                ' ',
                React.createElement(Cumple, { valor: anterior, condicion: condicionAnt })
            ),
            React.createElement(
                'td',
                { style: styles.cuerpo.tabla.cavecera_indicador_ch },
                React.createElement(
                    'i',
                    { className: 'btn btn-info glyphicon glyphicon-list-alt', onClick: function () {
                            return evento(descripcion);
                        } },
                    React.createElement(
                        'label',
                        { style: { marginLeft: "5px" } },
                        'Indicadores Por Semanas'
                    )
                )
            )
        );
    };
    return React.createElement(
        'tbody',
        null,
        React.createElement(Fila, { descripcion: "Venta X 100.",
            objetivo: indicador_venta.indicador,
            actual: indicadoresAct.venta,
            condicionAct: indicador_venta.estatus,
            anterior: indicadoresAnt.venta,
            condicionAnt: indicador_venta_anterior.estatus
        }),
        React.createElement(Fila, { descripcion: "Cancelacion X 100.",
            objetivo: indicador_cancelacion.indicador,
            actual: indicadoresAct.cancelacion,
            condicionAct: indicador_cancelacion.estatus,
            anterior: indicadoresAnt.cancelacion,
            condicionAnt: indicador_cancelacion_anterior.estatus
        }),
        React.createElement(Fila, { descripcion: "Diferencia X 10,000.",
            objetivo: indicador_diferencia.indicador,
            actual: indicadoresAct.diferencia,
            condicionAct: indicador_diferencia.estatus,
            anterior: indicadoresAnt.diferencia,
            condicionAnt: indicador_diferencia_anterior.estatus
        })
    );

    function Cumple(_ref19) {
        var valor = _ref19.valor;
        var condicion = _ref19.condicion;

        var cumple = condicion ? "btn btn-success glyphicon glyphicon-ok" : "btn btn-danger glyphicon glyphicon-remove";

        return React.createElement(
            'i',
            { style: styles.cuerpo.tabla.cavecera_indicador_ch, className: cumple },
            React.createElement(
                'label',
                { style: { marginLeft: "5px" } },
                valor
            )
        );
    }
};

var ModalSemanasColaborador = function ModalSemanasColaborador(_ref20) {
    var lista = _ref20.lista;
    var establecimiento = _ref20.establecimiento;
    var colaborador = _ref20.colaborador;
    var actual = _ref20.actual;
    var anterior = _ref20.anterior;
    var filtro = _ref20.filtro;
    var grafica = _ref20.grafica;
    var leyenda = _ref20.leyenda;
    var IndicadorMonitor = _ref20.IndicadorMonitor;

    var listaSemanas = lista.filter(function (e) {
        return e.folio_establecimiento_venta == establecimiento && e.folio_empleado == colaborador.folio;
    });

    var condicion = [];

    //console.info("semanas", listaSemanas);

    var IndicadoresSemama = function IndicadoresSemama() {
        var labels = [];
        listaSemanas.forEach(function (e) {
            labels.push("Semana " + e.semana_anio + " .");
        });
        if (filtro == "Venta X 100.") {
            var listaVenta = listaSemanas.map(function (e) {
                return e.indicado_venta_x_100;
            }) || [];
            listaVenta.forEach(function (e) {
                var indicador_venta = IndicadorMonitor(e, "venta");
                condicion.push(indicador_venta.estatus);
            });

            if (listaVenta.length > 0) grafica(listaVenta, filtro + " Semanas Del Año.", labels);

            return React.createElement(TablaSemana, {
                condicion: condicion,
                lista: listaVenta,
                labels: labels
            });
        } else if (filtro == "Cancelacion X 100.") {
            var listaCancelacion = listaSemanas.map(function (e) {
                return e.indicador_cancelacion_x_100;
            }) || [];

            listaCancelacion.forEach(function (e) {
                var indicador_cancelacion = IndicadorMonitor(e, "cancelacion");
                condicion.push(indicador_cancelacion.estatus);
            });

            if (listaCancelacion.length > 0) grafica(listaCancelacion, filtro + " Semanas Del Año.", labels);

            return React.createElement(TablaSemana, {
                condicion: condicion,
                lista: listaCancelacion,
                labels: labels
            });
        } else {
            var listaDiferencia = listaSemanas.map(function (e) {
                return e.indicacor_diferencia_x_1000;
            }) || [];

            listaDiferencia.forEach(function (e) {
                var indicador_diferencia = IndicadorMonitor(e, "diferencia");
                condicion.push(indicador_diferencia.estatus);
            });

            if (listaDiferencia.length > 0) grafica(listaDiferencia, filtro + " Semanas Del Año.", labels);

            return React.createElement(TablaSemana, {
                condicion: condicion,
                lista: listaDiferencia,
                labels: labels
            });
        }
    };
    function cerrar() {
        document.getElementById("modal_vista_semana").style.display = "none";
    }
    return React.createElement(
        'div',
        { style: styles.modal_base, id: 'modal_vista_semana' },
        React.createElement(
            'div',
            { className: 'panel panel-default animate', style: styles2.vista },
            React.createElement(
                'div',
                { className: 'panel-heading', style: styles2.cavecera },
                React.createElement('i', { className: 'close fa fa-close', onClick: function () {
                        return cerrar();
                    } }),
                React.createElement(
                    'label',
                    null,
                    'Indicadores Por semanas.'
                )
            ),
            React.createElement(
                'div',
                { className: 'panel-heading', style: styles2.tabla },
                React.createElement(
                    'h4',
                    null,
                    'Colaborador: ',
                    colaborador.nombre,
                    '.'
                ),
                React.createElement(
                    'strong',
                    null,
                    'Resultados Semanales ',
                    filtro,
                    ' ',
                    anterior,
                    ' Y ',
                    actual,
                    '.'
                ),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    leyenda
                ),
                React.createElement(IndicadoresSemama, null)
            ),
            React.createElement(
                'div',
                { className: 'panel-body', id: 'constenedorCanvas', style: styles2.cuerpo },
                React.createElement('canvas', { id: 'barras_char' })
            )
        )
    );
};
var TablaSemana = function TablaSemana(_ref21) {
    var lista = _ref21.lista;
    var labels = _ref21.labels;
    var condicion = _ref21.condicion;

    return React.createElement(
        'table',
        { className: 'table' },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                labels.map(function (e, p) {
                    return React.createElement(
                        'th',
                        { key: e + "_" + p },
                        e
                    );
                })
            )
        ),
        React.createElement(
            'tbody',
            null,
            React.createElement(Datos, null)
        )
    );
    function Datos() {
        return React.createElement(
            'tr',
            null,
            lista.map(function (e, p) {
                return React.createElement(
                    'td',
                    { key: e + "_" + p },
                    React.createElement(Comparar, { actual: e,
                        anterior: lista[p - 1],
                        condicion: condicion[p] })
                );
            })
        );
    }
    function Comparar(_ref22) {
        var actual = _ref22.actual;
        var anterior = _ref22.anterior;
        var condicion = _ref22.condicion;

        var res;
        var a = condicion ? "btn btn-success" : "btn btn-danger";

        if (actual != anterior && anterior != null) {
            res = anterior > actual ? " glyphicon glyphicon-download" : " glyphicon glyphicon-upload";
        } else {
            res = anterior == actual ? "" : " glyphicon glyphicon-play-circle";
        }

        return React.createElement(
            'i',
            { className: a + res },
            React.createElement(
                'label',
                { style: { marginLeft: "5px", width: "18px", fontSize: "12px" } },
                actual
            )
        );
    }
};

var styles = {
    modal_base: {
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(144, 144, 146, 0.29)",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9991,
        display: "none"
    },
    vista: {
        height: "700px",
        width: "800px"
    },
    cavecera: {
        height: "40px",
        backgroundColor: "#349CEB",
        color: "#FFFFFF",
        foto: {
            height: "50px",
            display: "inline-block",
            width: "60px"
        },
        contenedor_nombre: {
            display: "inline-block",
            width: "480px",
            marginTop: "-60px",
            marginLeft: "68px"
        },
        contenedor_puesto: {
            marginLeft: "10px",
            display: "inline-block",
            marginTop: "-70px",
            width: "210px"
        },
        nombre: {
            borderBottom: "solid 1px #000000"
        },
        puesto: {
            borderBottom: "solid 1px #000000"
        }
    },
    cuerpo: {
        height: "550px",
        tabla: {
            cavecera_indicador_ch: {
                width: "80px",
                textAlign: "center"
            }
        }
    },
    pie: {
        height: "50px",
        cerrar: {
            marginLeft: "690px",
            marginTop: "-6px"
        }
    }

};
var styles2 = {
    vista: {
        height: "750px",
        width: "1000px"
    },
    cavecera: {
        height: "40px",
        backgroundColor: "#2EAB64",
        color: "#FFFFFF"
    },
    tabla: {
        height: "210px"
    },
    cuerpo: {
        position: "relative",
        height: "450px",
        width: "100%",
        tabla: {
            cavecera_indicador_ch: {
                width: "80px",
                textAlign: "center"
            }
        }
    },
    pie: {
        height: "50px",
        cerrar: {
            marginLeft: "590px",
            marginTop: "-6px"
        }
    }
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));

