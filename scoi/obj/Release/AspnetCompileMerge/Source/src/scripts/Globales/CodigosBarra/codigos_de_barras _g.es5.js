"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $MI_URL = window.location.protocol + "//" + window.location.hostname;
var $URL_API = $MI_URL + ":90/api/";
var $URL_API_IZA = $MI_URL + ":180/api/";

var SeleccionEmbarque = (function (_React$Component) {
    _inherits(SeleccionEmbarque, _React$Component);

    function SeleccionEmbarque(props) {
        var _this = this;

        _classCallCheck(this, SeleccionEmbarque);

        _get(Object.getPrototypeOf(SeleccionEmbarque.prototype), "constructor", this).call(this, props);
        this.state = {
            cargando: 1,
            estableciminetos: [],
            pedidos: [],
            establecimiento: "",
            filtro: ""
        };

        setTimeout(function () {
            return _this.mostrarocultarCarga(0);
        }, 1000);
        this.evObtenerPedidos = this.on_establecimineto.bind(this);
        this.evPedido = this.on_pedido.bind(this);
        this.recargar = this.on_recargar.bind(this);
        this.filtrar = this.on_filtro.bind(this);
        this.ObtenerEstableciminetos();
    }

    /* Eventos */

    _createClass(SeleccionEmbarque, [{
        key: "on_pedido",
        value: function on_pedido(pedido) {
            console.info("pedido=>", pedido);
            document.querySelector(".ventana").style.display = "none";
            localStorage.setItem("Pedido", JSON.stringify(pedido));
            this.ObtenerEnmbarque(pedido.Folio);
        }
    }, {
        key: "on_establecimineto",
        value: function on_establecimineto(e) {
            var est_ = e.target.value;
            this.ObtenerPedidos(est_);
            this.setState({ establecimiento: est_ });
        }
    }, {
        key: "on_recargar",
        value: function on_recargar() {
            var est = this.state.establecimiento;
            est != "" ? this.ObtenerPedidos(est) : alert("Seleccione Establecimiento!!!");
        }
    }, {
        key: "on_filtro",
        value: function on_filtro(e) {
            var $filtro = e.target.value;
            this.setState({ filtro: $filtro });
        }

        /* Metodos */
    }, {
        key: "mostrarocultarCarga",
        value: function mostrarocultarCarga(estado) {
            this.setState({ cargando: estado });
        }
    }, {
        key: "asignarEstablecimientos",
        value: function asignarEstablecimientos(lista) {
            var est_ = lista[0].nombre;
            this.setState({ estableciminetos: lista, establecimiento: est_ });
            this.ObtenerPedidos(est_);
            this.mostrarocultarCarga(0);
        }
    }, {
        key: "mostrarPedidos",
        value: function mostrarPedidos(lista, establecimiento) {
            this.setState({ pedidos: lista, establecimiento: establecimiento });
            this.mostrarocultarCarga(0);
        }
    }, {
        key: "LlenarProductosEmbarque",
        value: function LlenarProductosEmbarque(productos) {

            localStorage.setItem("Embarque", JSON.stringify(productos));
            init();
            this.mostrarocultarCarga(0);
            alert("Pedido " + pedido.Folio + " Seleccionado \nLa pagina Se Recargara Para Mostrar Los cambios!!!");
        }

        /* Conexiones */
    }, {
        key: "ObtenerEstableciminetos",
        value: function ObtenerEstableciminetos() {
            var _this2 = this;

            this.mostrarocultarCarga(1);
            fetch($URL_API + "Obtener_establecimientosBMS", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                e.json().then(function (res) {
                    return _this2.asignarEstablecimientos(res);
                });
            })["catch"](function (err) {
                return console.error(err);
            });
        }
    }, {
        key: "ObtenerPedidos",
        value: function ObtenerPedidos(establecimiento) {
            var _this3 = this;

            this.mostrarocultarCarga(1);
            fetch($URL_API + "Obtener_establecimientosBMS", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(establecimiento.toString())
            }).then(function (e) {
                e.json().then(function (res) {
                    return _this3.mostrarPedidos(res, establecimiento);
                });
            })["catch"](function (err) {
                return console.error(err);
            });
        }
    }, {
        key: "ObtenerEnmbarque",
        value: function ObtenerEnmbarque(folio) {
            var _this4 = this;

            this.mostrarocultarCarga(1);
            fetch($URL_API + "Pedido_productos_embarque?folio=" + folio, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (e) {
                e.json().then(function (res) {
                    return _this4.LlenarProductosEmbarque(res);
                });
            })["catch"](function (err) {
                return console.error(err);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state;
            var cargando = _state.cargando;
            var estableciminetos = _state.estableciminetos;
            var pedidos = _state.pedidos;
            var establecimiento = _state.establecimiento;
            var filtro = _state.filtro;

            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(VistaSeleccionSurte, {
                    seleccion: establecimiento,
                    estableciminetos: estableciminetos,
                    pedidos: pedidos,
                    evEstablecimineto: this.evObtenerPedidos,
                    evPedido: this.evPedido,
                    recargar: this.recargar,
                    filtro: filtro,
                    evFiltrar: this.filtrar
                }),
                React.createElement(EfectoCargar, {
                    estatus: cargando
                })
            );
        }
    }]);

    return SeleccionEmbarque;
})(React.Component);

var VistaSeleccionSurte = function VistaSeleccionSurte(_ref) {
    var seleccion = _ref.seleccion;
    var estableciminetos = _ref.estableciminetos;
    var pedidos = _ref.pedidos;
    var evEstablecimineto = _ref.evEstablecimineto;
    var evPedido = _ref.evPedido;
    var recargar = _ref.recargar;
    var filtro = _ref.filtro;
    var evFiltrar = _ref.evFiltrar;

    var lista_pedidos = (function () {
        return pedidos.filter(function (e) {
            return e.Folio.toString().search(filtro) > -1;
        });
    })();

    var TablaEmbarques = function TablaEmbarques() {
        return React.createElement(
            "div",
            { id: "tabla_embarques" },
            React.createElement(
                "table",
                { className: "table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        { style: { background: "#2e6f9f", zIndex: "999" } },
                        React.createElement(
                            "th",
                            { style: { color: "azure", background: "#2e6f9f" } },
                            "Folio"
                        ),
                        React.createElement(
                            "th",
                            { style: { color: "azure", background: "#2e6f9f" } },
                            "Usuario_capturo"
                        ),
                        React.createElement(
                            "th",
                            { style: { color: "azure", background: "#2e6f9f" } },
                            "fecha"
                        ),
                        React.createElement(
                            "th",
                            { style: { color: "azure", background: "#2e6f9f" } },
                            "folio BMS"
                        ),
                        React.createElement(
                            "th",
                            { style: { color: "azure", background: "#2e6f9f" } },
                            "Solicita"
                        ),
                        React.createElement(
                            "th",
                            { style: { color: "azure", background: "#2e6f9f" } },
                            "Surte"
                        ),
                        React.createElement(
                            "th",
                            { style: { background: "rgb(46, 111, 159)" }, className: "btn_tabla" },
                            "Accion"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    lista_pedidos.map(function (e) {
                        return React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                e.Folio
                            ),
                            React.createElement(
                                "th",
                                null,
                                e.Usuario_capturo
                            ),
                            React.createElement(
                                "th",
                                null,
                                e.Elaboraccion
                            ),
                            React.createElement(
                                "th",
                                null,
                                e.Estatus_surtido
                            ),
                            React.createElement(
                                "th",
                                null,
                                e.Establecimiento
                            ),
                            React.createElement(
                                "th",
                                null,
                                e.Alterno
                            ),
                            React.createElement(
                                "th",
                                { className: "btn_tabla" },
                                React.createElement("i", { className: "btn btn-info fa fa-cogs btn-round btn_selector_pedido",
                                    onClick: function () {
                                        return evPedido(e);
                                    } })
                            )
                        );
                    })
                )
            )
        );
    };
    return React.createElement(
        "div",
        { className: "ventana" },
        React.createElement(
            "div",
            { id: "modal_seleccionSurte", className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "selector_establecimiento panel-heading" },
                React.createElement(
                    "strong",
                    { style: { color: "#000000" } },
                    "Establecimiento"
                ),
                React.createElement(
                    "select",
                    { className: "form-control",
                        style: { width: "80%" },
                        onChange: evEstablecimineto },
                    estableciminetos.map(function (est_) {
                        return React.createElement(
                            "option",
                            { value: est_.nombre, selected: est_.nombre.search(seleccion) > -1 },
                            est_.nombre
                        );
                    })
                ),
                React.createElement("i", { className: "fa fa-refresh btn btn-default btn-round",
                    onClick: recargar,
                    style: { float: "right", marginTop: "-40px", marginLeft: "10px", fontSize: "25px" }
                }),
                React.createElement("input", { type: "text", className: "form-control", value: filtro, onChange: evFiltrar, placeolder: "filtro", style: { pading: "2px" }, focus: true })
            ),
            React.createElement(
                "div",
                { style: { height: "80%" }, className: "panel-body" },
                React.createElement(TablaEmbarques, null)
            )
        )
    );
};

var EmbarquePedido = (function (_React$Component2) {
    _inherits(EmbarquePedido, _React$Component2);

    function EmbarquePedido(props) {
        _classCallCheck(this, EmbarquePedido);

        _get(Object.getPrototypeOf(EmbarquePedido.prototype), "constructor", this).call(this, props);
        this.state = {
            cargando: 0,
            Pedido: JSON.parse(localStorage.getItem("Pedido")),
            Embarque: JSON.parse(localStorage.getItem("Embarque")),
            producto: {
                Codigo: '',
                Descripcion: '',
                decimales: 0
            },
            edicion: {
                cantidad: 0,
                surtido: 0,
                total: 0,
                pedido: 0,
                punto: false,
                operador: "+"
            },
            activar: false,
            totales: {
                embarque: 0,
                surtido: 0
            },
            filtro_embarque: []
        };

        this.calcular_totales();
        this.pedido = JSON.parse(localStorage.getItem("Pedido"));
        this.buscarPorCodigo = this.on_buscar_producto.bind(this);
        this.cambio_codigo = this.on_codigo_producto.bind(this);
        this.evTecla = this.on_teclado.bind(this);
        this.mostrar_productos = this.on_mostrar_productos.bind(this);
        this.quitarSurtido = this.on_quitarSurtido.bind(this);
    }

    //new

    /* Eventos */

    _createClass(EmbarquePedido, [{
        key: "on_mostrar_productos",
        value: function on_mostrar_productos(filtro) {
            console.log("filtro", filtro);
            var $lista = this.state.Embarque;

            var Filtrar = (function () {
                var resultado = function resultado() {
                    return null;
                };
                switch (filtro) {
                    case "P":
                        //pendiente
                        resultado = function (pendiente) {
                            return pendiente.embarque == 0;
                        };
                        break;
                    case "S":
                        //surtido
                        resultado = function (surtido) {
                            return surtido.embarque > 0;
                        };
                        break;
                    case "E":
                        //embarque
                        resultado = function (embarque) {
                            return embarque;
                        };
                        break;
                }
                document.getElementById("ventana_filtro").style.display = "flex";
                return $lista.filter(resultado);
            })();
            console.log("Tabla=>", Filtrar);

            this.setState({ filtro_embarque: Filtrar });
        }
    }, {
        key: "on_codigo_producto",
        value: function on_codigo_producto(event) {
            var $producto = this.state.producto;
            $producto.Codigo = event.target.value || "";
            this.setState({ producto: $producto });

            event.preventDefault();
        }
    }, {
        key: "on_buscar_producto",
        value: function on_buscar_producto(event) {
            this.mostrarocultarCarga(1);
            this.ObtenerEnmbarque();
            event.preventDefault();
        }
    }, {
        key: "on_teclado",
        value: function on_teclado(tecla) {
            var estatus = this.state.activar;
            if (estatus) return typeof tecla === "number" ? this.TeclaNumero(tecla) : this.TeclaOperadora(tecla);
            alert("Teclado Inhabilitado...");
        }
    }, {
        key: "on_quitarSurtido",
        value: function on_quitarSurtido(codigo) {
            var $lista = this.state.Embarque;
            var $index = $lista.findIndex(function (e) {
                return parseInt(e.cod_prod) == parseInt(codigo);
            });
            var $producto = $lista[$index];
            console.log("producto=>", $producto);
            $producto.pendiente += $producto.embarque;
            $producto.embarque = 0;
            $lista[$index] = $producto;
            this.setState({ Embarque: $lista });
            this.cargarProductonLocalStorange($lista);
            document.getElementById("ventana_filtro").style.display = "none";
            this.calcular_totales();
            this.restarProducto();
        }

        /* Metodos */
    }, {
        key: "calcular_totales",
        value: function calcular_totales() {
            var $lista = this.state.Embarque;
            var $surtido = $lista.filter(function (e) {
                return e.embarque > 0;
            });

            var $totales = {
                embarque: $lista.length,
                surtido: $surtido.length
            };
            this.setState({ totales: $totales });
        }
    }, {
        key: "cargarProductonLocalStorange",
        value: function cargarProductonLocalStorange(lista) {
            localStorage.setItem("Embarque", JSON.stringify(lista));
        }
    }, {
        key: "codigo_producto",
        value: function codigo_producto(producto) {
            var $estatus = this.comprobarEnEmbarque(producto.Codigo);
            if ($estatus) {
                var $producto = {
                    Codigo: parseInt(producto.Codigo),
                    Descripcion: producto.Descripcion,
                    decimales: producto.Decimales,
                    Existencia: producto.Existencia_pz
                };
                this.setState({ producto: $producto, activar: $estatus });
                document.querySelector("#captura_por_teclado").style.display = "flex";
            } else {
                alert("El Producto " + producto.Descripcion + " No Se Encuentra En El Embarque!!!");
                this.restarProducto();
            }
            this.mostrarocultarCarga(0);
        }
    }, {
        key: "comprobarEnEmbarque",
        value: function comprobarEnEmbarque(codigo) {
            var $lista = this.state.Embarque;
            var $index = $lista.findIndex(function (e) {
                return parseInt(e.cod_prod) == parseInt(codigo);
            });

            if ($index > -1) {
                var $filtro = $lista[$index];
                var $edicion = {
                    cantidad: $filtro.embarque,
                    surtido: 0,
                    total: $filtro.embarque,
                    pedido: $filtro.pedido,
                    punto: false,
                    operador: "+"
                };
                this.setState({ edicion: $edicion });
            }
            return $index > -1;
        }
    }, {
        key: "mostrarocultarCarga",
        value: function mostrarocultarCarga(estado) {
            this.setState({ cargando: estado });
        }
    }, {
        key: "restarProducto",
        value: function restarProducto() {
            this.setState({
                producto: {
                    Codigo: '',
                    Descripcion: '',
                    decimales: 0
                },
                activar: false,
                edicion: {
                    cantidad: 0,
                    surtido: 0,
                    total: 0,
                    pedido: 0,
                    punto: false,
                    operador: '+'
                }
            });
        }
    }, {
        key: "TeclaNumero",
        value: function TeclaNumero(value) {
            var _state$edicion = this.state.edicion;
            var cantidad = _state$edicion.cantidad;
            var surtido = _state$edicion.surtido;
            var total = _state$edicion.total;
            var punto = _state$edicion.punto;
            var operador = _state$edicion.operador;
            var pedido = _state$edicion.pedido;
            var aux = 0;var Existencia = this.state.producto.Existencia;

            aux = surtido == 0 && surtido.toString().search('0.') === -1 ? value : surtido + "" + value;

            if (aux < 10000) {
                surtido = aux;
                total = operador == "+" ? parseFloat(cantidad) + parseFloat(surtido) : parseFloat(cantidad) - parseFloat(surtido);
                var cantidad_pedida = pedido >= total ? true : confirm("El Surtido Sobre Pasa Al Pedido por " + (total - pedido) + " Pz.");

                if (cantidad_pedida) {
                    var resultados = { cantidad: cantidad, surtido: surtido, total: total, punto: punto, pedido: pedido, operador: operador };
                    console.log("Existencia>", Existencia, total);
                    total <= Existencia ? this.setState({ edicion: resultados }) : alert("cantidad Vigente el Inventario Superada...\n Existencia:" + Existencia + " Inventario!");
                }
            }
        }
    }, {
        key: "TeclaOperadora",
        value: function TeclaOperadora(value) {
            var _this5 = this;

            var _state$edicion2 = this.state.edicion;
            var cantidad = _state$edicion2.cantidad;
            var surtido = _state$edicion2.surtido;
            var total = _state$edicion2.total;
            var punto = _state$edicion2.punto;
            var pedido = _state$edicion2.pedido;
            var operador = _state$edicion2.operador;

            var adiciones = function adiciones() {
                operador = value;
            };
            var remover = function remover() {
                surtido = 0;
                total = cantidad;
                operador = "+";
                punto = false;
            };
            var onPunto = function onPunto() {
                var $prod = _this5.state.producto.decimales > 0;

                if ($prod && !punto) {
                    surtido += !punto ? "." : "";
                    punto = true;
                }
            };
            var guardar = function guardar() {
                var codigo = parseInt(_this5.state.producto.Codigo);
                var $seleccion = _this5.state.Embarque;
                var index = $seleccion.findIndex(function (e) {
                    return e.cod_prod == codigo;
                });
                if (index > -1) {
                    $seleccion[index].embarque = total;
                }
                cantidad = 0, surtido = 0, total = 0, operador = '+';
                _this5.restarProducto();
                _this5.cargarProductonLocalStorange($seleccion);
                _this5.calcular_totales();
                document.querySelector("#captura_por_teclado").style.display = "none";
                document.querySelector("#entrada_codigo_producto").disabled = false;
                document.querySelector("#entrada_codigo_producto").select();
            };
            switch (value) {
                case "-":
                    adiciones();
                    break;
                case "+":
                    adiciones();
                    break;
                case "Del":
                    remover();
                    break;
                case ".":
                    onPunto();
                    break;
                default:
                    guardar();
                    break;
            }

            total = operador == "+" ? parseFloat(cantidad) + parseFloat(surtido) : parseFloat(cantidad) - parseFloat(surtido);

            var $resultados = { cantidad: cantidad, surtido: surtido, total: total, punto: punto, pedido: pedido, operador: operador };

            console.log($resultados);
            this.setState({ edicion: $resultados });
        }

        /* Conexiones */
    }, {
        key: "ObtenerEnmbarque",
        value: function ObtenerEnmbarque() {
            var _this6 = this;

            var folio = this.state.producto.Codigo.toString() || "10201";
            var Alterno = this.state.Pedido.Alterno;

            document.querySelector("#entrada_codigo_producto").disabled = true;

            fetch($URL_API + "Productos_clasificador_por_folio?folio=" + folio + "&establecimineto=" + Alterno, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Alterno)
            }).then(function (e) {
                e.json().then(function (res) {
                    return _this6.codigo_producto(res);
                });
            })["catch"](function (err) {
                return console.error("Error=>", err);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state2 = this.state;
            var cargando = _state2.cargando;
            var Pedido = _state2.Pedido;
            var Embarque = _state2.Embarque;
            var producto = _state2.producto;
            var edicion = _state2.edicion;
            var activar = _state2.activar;
            var totales = _state2.totales;
            var filtro_embarque = _state2.filtro_embarque;

            if (Embarque.length > 0 && totales.embarque == 0) this.calcular_totales();
            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(ViewPedidoEmbarque, {
                    pedido: Pedido
                }),
                React.createElement(ViewMovimientos, {
                    Pedido: Pedido
                }),
                React.createElement(ViewCantidades, {
                    totales: totales
                }),
                React.createElement(ButtonsModal, {
                    evMostrar: this.mostrar_productos
                }),
                React.createElement(BuscarPruducto, {
                    evOn: this.cambio_codigo,
                    evBuscar: this.buscarPorCodigo,
                    Codigo: producto.Codigo
                }),
                React.createElement(ModalCaptura, {
                    cantidades: edicion,
                    evTecla: this.evTecla,
                    Descripcion: producto.Descripcion
                }),
                React.createElement(ModalTabla, {
                    lista: filtro_embarque,
                    modificar: this.quitarSurtido
                }),
                React.createElement(EfectoCargar, {
                    estatus: cargando
                })
            );
        }
    }]);

    return EmbarquePedido;
})(React.Component);

var ViewPedidoEmbarque = function ViewPedidoEmbarque(_ref2) {
    var pedido = _ref2.pedido;

    return React.createElement(
        "div",
        { className: "caja_contenedora_items" },
        React.createElement(
            "div",
            { className: "form_vista_texto", style: { float: "left", marginLeft: "-10px" } },
            React.createElement(
                "label",
                null,
                "Folio Embarque:"
            ),
            React.createElement(
                "div",
                { className: "caja_entrada_texto" },
                pedido.Folio
            )
        ),
        React.createElement("i", { className: "btn btn-danger glyphicon glyphicon-trash btn-round", id: "btn_cancelar_embarque_pedido", onClick: eliminar_embarque_localStorange })
    );
};
var ViewMovimientos = function ViewMovimientos(_ref3) {
    var Pedido = _ref3.Pedido;
    var Alterno = Pedido.Alterno;
    var Establecimiento = Pedido.Establecimiento;

    return React.createElement(
        "div",
        { className: "caja_contenedora_items" },
        React.createElement(
            "div",
            { className: "form_vista_texto" },
            React.createElement(
                "label",
                null,
                "Del:"
            ),
            React.createElement(
                "div",
                { className: "caja_entrada_texto", style: { textAlign: "left" } },
                Alterno
            )
        ),
        React.createElement(
            "div",
            { className: "form_vista_texto" },
            React.createElement(
                "label",
                null,
                "Al:"
            ),
            React.createElement(
                "div",
                { className: "caja_entrada_texto", style: { textAlign: "left" } },
                Establecimiento
            )
        )
    );
};
var ViewCantidades = function ViewCantidades(_ref4) {
    var totales = _ref4.totales;
    var surtido = totales.surtido;
    var embarque = totales.embarque;

    return React.createElement(
        "div",
        { className: "caja_contenedora_items" },
        React.createElement(
            "div",
            { className: "form_vista_texto" },
            React.createElement(
                "label",
                null,
                "Surtido:"
            ),
            React.createElement(
                "div",
                { className: "caja_entrada_texto" },
                surtido
            )
        ),
        React.createElement(
            "div",
            { className: "form_vista_texto" },
            React.createElement(
                "label",
                null,
                "Embarque:"
            ),
            React.createElement(
                "div",
                { className: "caja_entrada_texto" },
                embarque
            )
        )
    );
};
var ButtonsModal = function ButtonsModal(_ref5) {
    var evMostrar = _ref5.evMostrar;

    return React.createElement(
        "div",
        { className: "caja_contenedora_items" },
        React.createElement(
            "i",
            { className: "btn btn_seseccion", onClick: function () {
                    return evMostrar("P");
                }, id: "btn_modal_productos_pendiente" },
            "Pendientes"
        ),
        React.createElement(
            "i",
            { className: "btn btn_seseccion", onClick: function () {
                    return evMostrar("S");
                }, id: "btn_modal_productos_embarque" },
            "Embarque"
        ),
        React.createElement(
            "i",
            { className: "btn btn_seseccion", onClick: function () {
                    return evMostrar("E");
                }, id: "btn_modal_productos_surtido" },
            "Surtido"
        )
    );
};
var BuscarPruducto = function BuscarPruducto(_ref6) {
    var evBuscar = _ref6.evBuscar;
    var evOn = _ref6.evOn;
    var Codigo = _ref6.Codigo;

    var rotar = function rotar() {
        var rotacion = document.querySelector("#main").style.transform;
        var giro = rotacion == "" ? "rotate(180deg)" : "";
        document.querySelector("#main").style.transform = giro;
    };
    return React.createElement(
        "div",
        { className: "" },
        React.createElement(
            "form",
            { className: "form_vista_texto",
                onSubmit: evBuscar
            },
            React.createElement(
                "label",
                null,
                "Codigo Producto:"
            ),
            React.createElement("input", { type: "text",
                className: "caja_entrada_texto",
                id: "entrada_codigo_producto",
                onChange: evOn,
                placeolder: "Producto...",
                select: "true",
                active: true,
                value: Codigo })
        ),
        React.createElement("hr", null),
        React.createElement(
            "i",
            { className: "btn btn-success btn-round btn_seseccion btn-block", style: { width: "150px", fontSize: "18px" }, id: "btn_guardar_embarque_pedido", onClick: guardar_embarque },
            " Guardar ",
            React.createElement("i", { className: "fa fa-cloud-upload" })
        ),
        React.createElement("i", { className: "btn btn-default fa fa-refresh", onClick: rotar })
    );
};
var ModalCaptura = function ModalCaptura(_ref7) {
    var cantidades = _ref7.cantidades;
    var Descripcion = _ref7.Descripcion;
    var evTecla = _ref7.evTecla;

    return React.createElement(
        "div",
        { className: "panel panel-success ventana", id: "captura_por_teclado" },
        React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement("i", { className: "btn btn-danger fa fa-close", onClick: cerrar, style: { float: "right" } }),
                React.createElement(
                    "label",
                    null,
                    "Descripcion"
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement(
                    "span",
                    { className: "", style: { width: "300px", height: "50px" } },
                    Descripcion
                ),
                React.createElement(CapturaCantidad, {
                    cantidades: cantidades
                }),
                React.createElement(TecladoCaptura, {
                    tecla: evTecla
                })
            )
        )
    );
    function cerrar() {
        document.querySelector("#entrada_codigo_producto").disabled = false;
        document.querySelector("#captura_por_teclado").style.display = 'none';
    }
};

//old
var CaveceraPedido = function CaveceraPedido(_ref8) {
    var pedido = _ref8.pedido;
    var totales = _ref8.totales;
    var surtido = totales.surtido;
    var embarque = totales.embarque;

    return React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
            "span",
            { className: "vista_datos_embarque", id: "contenedor_folio" },
            React.createElement(
                "div",
                { className: "vista_numero" },
                React.createElement(
                    "label",
                    null,
                    "Folio:"
                ),
                React.createElement(
                    "div",
                    { className: "form-control" },
                    pedido.Folio
                )
            ),
            React.createElement(
                "i",
                { className: "btn btn-danger fa fa-close",
                    onClick: eliminar_embarque_localStorange,
                    id: "btn_recargar" },
                " Cancelar"
            )
        ),
        React.createElement(
            "span",
            { className: "vista_datos_embarque" },
            React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    "Del:"
                ),
                React.createElement(
                    "strong",
                    { style: { display: "inline-block" }, className: "form-control" },
                    pedido.Alterno
                )
            ),
            React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    "Al:"
                ),
                React.createElement(
                    "div",
                    { className: "form-control" },
                    pedido.Establecimiento
                )
            )
        ),
        React.createElement(
            "span",
            { className: "vista_datos_embarque" },
            React.createElement(
                "div",
                { className: "vista_numero" },
                React.createElement(
                    "label",
                    null,
                    "Surtido:"
                ),
                React.createElement(
                    "div",
                    { className: "form-control" },
                    surtido
                )
            ),
            React.createElement(
                "div",
                { className: "vista_numero" },
                React.createElement(
                    "label",
                    null,
                    "Embarque:"
                ),
                React.createElement(
                    "div",
                    { className: "form-control" },
                    embarque
                )
            )
        ),
        React.createElement(
            "i",
            { className: "btn btn-success fa fa-save",
                onClick: guardar_embarque,
                id: "btn_guardar" },
            " "
        )
    );
};
var BotonesEmbarque = function BotonesEmbarque(_ref9) {
    var evMostrar = _ref9.evMostrar;

    return React.createElement(
        "div",
        { className: "contenedor_botones_productos" },
        React.createElement(
            "i",
            { className: "btn btn-warning", onClick: function () {
                    return evMostrar("P");
                } },
            "Pendientes"
        ),
        React.createElement(
            "i",
            { className: "btn btn-info", onClick: function () {
                    return evMostrar("S");
                } },
            "Embarque"
        ),
        React.createElement(
            "i",
            { className: "btn btn-primary", onClick: function () {
                    return evMostrar("E");
                } },
            "Surtido"
        )
    );
};
var BuscarProductos = function BuscarProductos(_ref10) {
    var producto = _ref10.producto;
    var evOn = _ref10.evOn;
    var evBuscar = _ref10.evBuscar;

    return React.createElement(
        "div",
        null,
        React.createElement(
            "label",
            { style: { display: "block" } },
            "Surtir Producto:"
        ),
        React.createElement(
            "form",
            { className: "vista_numero alinear",
                onSubmit: evBuscar
            },
            React.createElement(
                "label",
                null,
                " Codigo:"
            ),
            React.createElement("input", { className: "form-control",
                value: producto.Codigo,
                onChange: evOn,
                placeolder: "Producto..." })
        ),
        React.createElement(
            "div",
            { id: "vista_descripcion", className: "alinear" },
            React.createElement(
                "label",
                null,
                "Descripcion:"
            ),
            React.createElement(
                "span",
                { className: "form-control disabled" },
                producto.Descripcion
            )
        )
    );
};
var CapturaCantidad = function CapturaCantidad(_ref11) {
    var cantidades = _ref11.cantidades;
    var cantidad = cantidades.cantidad;
    var surtido = cantidades.surtido;
    var total = cantidades.total;
    var operador = cantidades.operador;

    var signo = operador == "+" ? "glyphicon glyphicon-plus" : "glyphicon glyphicon-minus";
    return React.createElement(
        "div",
        { className: "contenedor_botones_productos" },
        React.createElement(
            "i",
            { className: "vista_numero" },
            React.createElement(
                "label",
                null,
                "Cantidad: "
            ),
            React.createElement("input", { className: "form-control", disabled: true, value: cantidad, placeolder: "Producto..." })
        ),
        React.createElement("i", { className: signo }),
        React.createElement(
            "i",
            { className: "vista_numero" },
            React.createElement(
                "label",
                null,
                "Surtido: "
            ),
            React.createElement("input", { className: "form-control", disabled: true, value: surtido, placeolder: "Producto..." })
        ),
        React.createElement("i", { className: "glyphicon glyphicon-chevron-right" }),
        React.createElement(
            "i",
            { className: "vista_numero" },
            React.createElement(
                "label",
                null,
                "Total: "
            ),
            React.createElement("input", { className: "form-control", disabled: true, value: total, placeolder: "Producto..." })
        )
    );
};
var TecladoCaptura = function TecladoCaptura(_ref12) {
    var tecla = _ref12.tecla;

    var dato = function dato(dat, sig) {
        return { valor: dat, signo: sig || dat };
    };
    var numeros = function numeros(e) {
        return React.createElement(TeclaNumero, { valor: e.valor, evValor: function () {
                return tecla(e.signo);
            } });
    };
    var operadores = function operadores(e) {
        return React.createElement(TeclaEspecial, { valor: e.valor, evValor: function () {
                return tecla(e.signo);
            } });
    };

    var $lista = [dato(7), dato(8), dato(9), dato("arrow-left", "Del"), dato(4), dato(5), dato(6), dato("minus", "-"), dato(1), dato(2), dato(3), dato("plus", "+"), dato(0), dato("record", "."), dato("download-alt btn_salvar", "save")];

    return React.createElement(
        "div",
        { id: "contenedor_teclado" },
        React.createElement(
            "div",
            { id: "teclado" },
            $lista.map(function (e) {
                return typeof e.valor == "number" ? numeros(e) : operadores(e);
            })
        )
    );
};
var TeclaNumero = function TeclaNumero(_ref13) {
    var valor = _ref13.valor;
    var evValor = _ref13.evValor;

    evValor = evValor ? evValor : function () {
        return console.log(valor);
    };
    return React.createElement(
        "i",
        { className: "btn btn-info",
            onClick: evValor },
        valor
    );
};
var TeclaEspecial = function TeclaEspecial(_ref14) {
    var valor = _ref14.valor;
    var evValor = _ref14.evValor;

    var res = " btn btn-default glyphicon glyphicon-" + valor;
    evValor = evValor ? evValor : function () {
        return console.log(list[valor]);
    };
    return React.createElement("strong", { className: res,
        onClick: evValor });
};

var ModalTabla = function ModalTabla(_ref15) {
    var lista = _ref15.lista;
    var modificar = _ref15.modificar;

    return React.createElement(
        "div",
        { className: "ventana", id: "ventana_filtro" },
        React.createElement(
            "div",
            { className: "paenl panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement("i", { className: "btn btn-danger fa fa-close", style: { float: "right" }, onClick: function () {
                        return document.getElementById("ventana_filtro").style.display = "none";
                    } }),
                React.createElement(
                    "h4",
                    null,
                    "Productos"
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body", style: { height: "80%" } },
                React.createElement(
                    "strong",
                    null,
                    "Lista "
                ),
                React.createElement(
                    "i",
                    { className: "badge" },
                    lista.length
                ),
                React.createElement(
                    "div",
                    { style: { height: "100%", overflow: "auto" } },
                    React.createElement(
                        "table",
                        { className: "table" },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                { id: "cavecera_tabla_filtro" },
                                React.createElement(
                                    "th",
                                    null,
                                    "Codigo"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Descripcion"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Pedido"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Surtido"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Pendiente"
                                ),
                                React.createElement("th", null)
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            lista.map(function (e, p) {
                                return React.createElement(
                                    "tr",
                                    { className: "filtro_productos" },
                                    React.createElement(
                                        "td",
                                        null,
                                        e.cod_prod
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        e.descripcion
                                    ),
                                    React.createElement(
                                        "td",
                                        { style: { textAlign: "right" } },
                                        e.pedido
                                    ),
                                    React.createElement(
                                        "td",
                                        { style: { textAlign: "right" } },
                                        e.surtido
                                    ),
                                    React.createElement(
                                        "td",
                                        { style: { textAlign: "right" } },
                                        e.pendiente
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        React.createElement("i", { className: "btn btn-danger glyphicon glyphicon-trash", onClick: function () {
                                                return modificar(e.cod_prod);
                                            } })
                                    )
                                );
                            })
                        )
                    )
                )
            )
        )
    );
};

if (location.protocol != "http:") location.protocol = "http:";

var Embarque = (function () {
    function Embarque() {
        _classCallCheck(this, Embarque);

        this.folio_pedido = "";
        this.usuario = parseInt(ID_SCOI); //USUARIO.id_scoi
        this.productos = [];
        this.ContruirPedido();
    }

    _createClass(Embarque, [{
        key: "ContruirPedido",
        value: function ContruirPedido() {
            var $pedido = JSON.parse(localStorage["Pedido"]);
            this.productos = this.filtrarProductosEnCero(); //JSON.parse(localStorage["Embarque"]);

            this.getFolio($pedido.Folio);
        }
    }, {
        key: "getFolio",
        value: function getFolio(folio) {
            this.folio_pedido = folio;
        }
    }, {
        key: "filtrarProductosEnCero",
        value: function filtrarProductosEnCero() {
            var $lista = JSON.parse(localStorage["Embarque"]);
            return $lista.filter(function (surtido) {
                return surtido.embarque > 0;
            });
        }
    }]);

    return Embarque;
})();

function eliminar_embarque_localStorange() {
    var e = prompt("Escriba 'IZAGAR' Para Confirmar Borrado!!!");
    console.log(e.toUpperCase());
    if (confirm("Esta Seguro De Eliminar los Cambios De Embarque?") && e.toUpperCase() === 'IZAGAR') {
        localStorage.removeItem('Embarque');
        localStorage.removeItem('Pedido');
        init();
        return null;
    }
    alert("Eliminacion Cancelada!!!");
}

function ErrorPedido() {
    var pedido = new Embarque();
    console.log(pedido);
    fetch($URL_API + "Pedido_productos_embarque", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    }).then(function (e) {
        e.json().then(function (res) {
            alert("Folio Error Pedido...\n" + res);
            init();
        });
    })["catch"](function (err) {
        return console.error("Error=>", err);
    });
}

function guardar_embarque() {
    var e = prompt("Escriba 'IZAGAR' Para Confirmar!!!");
    console.log(e.toUpperCase());
    if (confirm("Esta Seguro De GUARDAR los Cambios De Embarque?") && e.toUpperCase() === 'IZAGAR') {
        var _ret = (function () {

            var value = new Embarque();
            var conexionBMS = function conexionBMS(estatus) {
                if (estatus) {
                    fetch($URL_API_IZA + "PedidoBms/EmbarqueBms", {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(value)
                    }).then(function (e) {
                        e.json().then(function (res) {
                            localStorage.removeItem('Embarque');
                            localStorage.removeItem('Pedido');
                            alert("Guardado..." + res);
                            init();
                        });
                    })["catch"](function (err) {
                        return ErrorPedido();
                    });
                } else {
                    Alert("error Al Guardar!!!");
                }
            };
            if (value.productos.length > 0) {
                alert("Guardar... \n" + value.productos.length + " Productos.");
                //CONEXION BMS
                fetch($URL_API_IZA + "Pedido/Embarque", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                }).then(function (e) {
                    e.json().then(function (res) {
                        return conexionBMS(res);
                    });
                })["catch"](function (err) {
                    return ErrorPedido();
                });
                return {
                    v: null
                };
            } else alert("Sin Productos A Guardar...");
        })();

        if (typeof _ret === "object") return _ret.v;
    }
    alert("GUARDADO CANCELADO!!!");
}
function init() {
    var View = null;
    if (localStorage.getItem("Pedido") != undefined) {
        var $pedido = JSON.parse(localStorage.getItem("Pedido"));
        View = EmbarquePedido;
    } else {
        View = SeleccionEmbarque;
    }
    ReactDOM.render(React.createElement(View, null), document.getElementById('main'));
}
init();
//setTimeout( ()=>console.clear(),1000);

