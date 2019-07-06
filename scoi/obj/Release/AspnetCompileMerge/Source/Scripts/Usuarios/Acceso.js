"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppAcceso = (function (_React$Component) {
    _inherits(AppAcceso, _React$Component);

    function AppAcceso(props) {
        var _this = this;

        _classCallCheck(this, AppAcceso);

        _get(Object.getPrototypeOf(AppAcceso.prototype), "constructor", this).call(this, props);
        this.state = {
            seleccion: {},
            Lista_usuarios: [],
            Accesos_url: [],
            filtro_tabla: "",
            cargando: 1
        };

        setTimeout(function () {
            return _this.cargar(0);
        }, 1000);
        this.obtener_usuarios();
        this.evAccesos = this.on_acceso.bind(this);
        this.evEdicion = this.on_edicion.bind(this);
        this.evActivar = this.on_activar.bind(this);
        this.evGuardar = this.on_guardar_accesos.bind(this);

        //edicion Usuario
        this.evNombreCompleto = this.on_NombreCompleto.bind(this);
        this.on_NombreCorto = this.on_NombreCorto.bind(this);
        this.on_Email_usuario = this.on_Email_usuario.bind(this);
        this.on_Id_usuario = this.on_Id_usuario.bind(this);
    }

    //eventos

    _createClass(AppAcceso, [{
        key: "on_filtro_tabla",
        value: function on_filtro_tabla(event) {
            var filtro = event.target.value;
            this.setState({ filtro_tabla: filtro });
        }
    }, {
        key: "on_acceso",
        value: function on_acceso(seleccion) {
            this.setState({ seleccion: seleccion });
            document.querySelector("#modal_edicion_url").style.display = "flex";

            this.obtener_accesos_usuario(seleccion.id_usuario);
        }
    }, {
        key: "on_edicion",
        value: function on_edicion(seleccion) {
            var Usuario = {
                email_usuario: seleccion.email_usuario,
                foto: seleccion.foto,
                id_scoi: seleccion.id_scoi,
                id_usuario: seleccion.id_usuario,
                nombre_usuario: seleccion.nombre_usuario,
                nombrecompleto_usuario: seleccion.nombrecompleto_usuario
            };
            this.setState({ seleccion: Usuario });
            document.querySelector("#modal_edicion").style.display = "flex";
        }
    }, {
        key: "on_activar",
        value: function on_activar(estatus) {
            var Accesos_url = this.state.Accesos_url;

            var Estatus = estatus.Estatus.search("C") > -1 ? "V" : "C";
            Accesos_url.forEach(function (e) {
                e.Sub_menus.forEach(function (f) {
                    var index = f.Accesos.findIndex(function (g) {
                        return g.Folio_acceso == estatus.Folio_acceso;
                    });
                    if (index > -1) {
                        f.Accesos[index].Estatus = Estatus;
                        console.log(index);
                    }
                });
            });
            this.setState({ Accesos_url: Accesos_url });
        }
    }, {
        key: "on_guardar_accesos",
        value: function on_guardar_accesos() {
            var Accesos_url = this.state.Accesos_url;

            var lista_Accesos = [];

            Accesos_url.forEach(function (e) {
                e.Sub_menus.forEach(function (f) {
                    lista_Accesos = lista_Accesos.concat(f.Accesos);
                });
            });
            console.log("Accesos=>", lista_Accesos);
            this.Actualizar_accesos(lista_Accesos);
        }
    }, {
        key: "on_NombreCompleto",
        value: function on_NombreCompleto(event) {
            var Usuario = this.state.seleccion;
            Usuario.nombrecompleto_usuario = event.target.value;
            this.setState({ seleccion: Usuario });
        }
    }, {
        key: "on_NombreCorto",
        value: function on_NombreCorto(event) {
            var Usuario = this.state.seleccion;
            Usuario.nombre_usuario = event.target.value;
            this.setState({ seleccion: Usuario });
        }
    }, {
        key: "on_Email_usuario",
        value: function on_Email_usuario(event) {
            var Usuario = this.state.seleccion;
            Usuario.email_usuario = event.target.value;
            this.setState({ seleccion: Usuario });
        }
    }, {
        key: "on_Id_usuario",
        value: function on_Id_usuario(event) {
            var Usuario = this.state.seleccion;
            Usuario.id_scoi = event.target.value;
            this.setState({ seleccion: Usuario });
        }
    }, {
        key: "on_guardar_datos_usuario",
        value: function on_guardar_datos_usuario() {
            var seleccion = this.state.seleccion;

            this.guardar(seleccion);
        }

        //metodos
    }, {
        key: "llenar_Lista_usuarios",
        value: function llenar_Lista_usuarios(lista) {
            this.setState({ Lista_usuarios: lista.length > 0 ? lista : [] });
            this.cargar(0);
        }
    }, {
        key: "seleccionar_accesos_usuario",
        value: function seleccionar_accesos_usuario(seleccion) {
            this.setState({ Accesos_url: seleccion.length > 0 ? seleccion : [] });
            this.cargar(0);
        }
    }, {
        key: "accesos_guardados",
        value: function accesos_guardados(res) {
            if (res == "OK") {
                this.setState({ Accesos_url: [], seleccion: {} });
                document.querySelector("#modal_edicion_url").style.display = "none";
                mostrar_mensaje("Guardado..", "alert-success");
            } else {
                alert(res);
                mostrar_mensaje("Error!!!", "alert-warning");
            }
            this.cargar(0);
        }
    }, {
        key: "cargar",
        value: function cargar(estado) {
            this.setState({ cargando: estado });
        }
    }, {
        key: "Usuario_guardado",
        value: function Usuario_guardado() {
            this.obtener_usuarios();
            document.querySelector("#modal_edicion").style.display = "none";
            mostrar_mensaje("Guardado..", "alert-success");
            this.setState({ seleccion: {} });
            this.cargar(0);
        }

        //conexiones
    }, {
        key: "obtener_usuarios",
        value: function obtener_usuarios() {
            var _this2 = this;

            this.cargar(1);
            fetch("/api/Usuarios_web", {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (r) {
                return r.json().then(function (res) {
                    return _this2.llenar_Lista_usuarios(res);
                })["catch"](function (err) {
                    return console.error("error Json=>", err);
                });
            })["catch"]();
        }
    }, {
        key: "obtener_accesos_usuario",
        value: function obtener_accesos_usuario(id) {
            var _this3 = this;

            this.cargar(1);
            fetch("/api/Accesos_url?id=" + id, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (r) {
                return r.json().then(function (res) {
                    return _this3.seleccionar_accesos_usuario(res);
                })["catch"](function (err) {
                    return console.error("error Json=>", err);
                });
            })["catch"](function (err) {
                return console.err("Error=>", err);
            });
        }
    }, {
        key: "Actualizar_accesos",
        value: function Actualizar_accesos(accesos) {
            var _this4 = this;

            var seleccion = this.state.seleccion;

            this.cargar(1);
            fetch("/api/Accesos_url?id_usuario=" + seleccion.id_usuario, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accesos)
            }).then(function (r) {
                return r.json().then(function (res) {
                    return _this4.accesos_guardados(res);
                })["catch"](function (err) {
                    return console.error("error Json=>", err);
                });
            })["catch"](function (err) {
                return console.err("Error=>", err);
            });
        }
    }, {
        key: "guardar",
        value: function guardar(Usuario) {
            var _this5 = this;

            this.cargar(1);
            fetch("/api/Usuarios_web", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Usuario)
            }).then(function (r) {
                return r.json().then(function (res) {
                    return res ? _this5.Usuario_guardado() : mostrar_mensaje("Error Guardado...", "alert-warning");
                })["catch"](function (err) {
                    return console.error("error Json=>", err);
                });
            })["catch"]();
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            var _state = this.state;
            var seleccion = _state.seleccion;
            var Lista_usuarios = _state.Lista_usuarios;
            var Accesos_url = _state.Accesos_url;
            var filtro_tabla = _state.filtro_tabla;
            var cargando = _state.cargando;

            var lista_filtro = Lista_usuarios.filter(function (e) {
                return e.id_scoi.toString().search(filtro_tabla) > -1 || e.nombre_usuario.toString().toUpperCase().search(filtro_tabla.toUpperCase()) > -1 || e.nombrecompleto_usuario.toString().toUpperCase().search(filtro_tabla.toUpperCase()) > -1;
            });
            return React.createElement(
                "div",
                { className: "panel panel-default" },
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "strong",
                            null,
                            "Filtro"
                        ),
                        React.createElement("input", { className: "form-control",
                            type: "text",
                            value: filtro_tabla,
                            placeholder: "Filtro De Usuarios...",
                            onChange: function (e) {
                                return _this6.on_filtro_tabla(e);
                            }
                        })
                    ),
                    React.createElement(ListaUsuarios, {
                        Lista: lista_filtro,
                        evAccesos: this.evAccesos,
                        evEdicion: this.evEdicion
                    }),
                    React.createElement(ModalEdicion, {
                        usuario: seleccion,
                        evNombreCompleto: this.evNombreCompleto,
                        evNombre: this.on_NombreCorto,
                        evEmail: this.on_Email_usuario,
                        evFoilioSCOI: this.on_Id_usuario,
                        guardar: function () {
                            return _this6.on_guardar_datos_usuario();
                        }
                    }),
                    React.createElement(ModalEdicionUrls, {
                        usuario: seleccion,
                        urls: Accesos_url,
                        evActivar: this.evActivar,
                        evGuardar: this.evGuardar
                    }),
                    React.createElement(EfectoCargar, {
                        estatus: cargando
                    })
                )
            );
        }
    }]);

    return AppAcceso;
})(React.Component);

var ListaUsuarios = function ListaUsuarios(_ref) {
    var Lista = _ref.Lista;
    var evAccesos = _ref.evAccesos;
    var evEdicion = _ref.evEdicion;

    var DatosUsuarios = function DatosUsuarios(_ref2) {
        var usuario = _ref2.usuario;
        var id_usuario = usuario.id_usuario;
        var nombre_usuario = usuario.nombre_usuario;
        var nombrecompleto_usuario = usuario.nombrecompleto_usuario;
        var email_usuario = usuario.email_usuario;
        var id_scoi = usuario.id_scoi;
        var foto = usuario.foto;

        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                id_usuario
            ),
            React.createElement(
                "td",
                null,
                nombre_usuario
            ),
            React.createElement(
                "td",
                null,
                nombrecompleto_usuario
            ),
            React.createElement(
                "td",
                null,
                email_usuario
            ),
            React.createElement(
                "td",
                null,
                id_scoi
            ),
            React.createElement(
                "td",
                null,
                React.createElement(
                    "i",
                    { className: "btn btn-primary ", onClick: function () {
                            return evEdicion(usuario);
                        } },
                    "Editar. ",
                    React.createElement("span", { className: "glyphicon glyphicon-edit" })
                )
            ),
            React.createElement(
                "td",
                null,
                React.createElement(
                    "i",
                    { className: "btn btn-success ", onClick: function () {
                            return evAccesos(usuario);
                        } },
                    "Accesos. ",
                    React.createElement("span", { className: "glyphicon glyphicon-lock" })
                )
            )
        );
    };
    return React.createElement(
        "div",
        { id: "contenedor_tabla_usuarios" },
        React.createElement(
            "table",
            { className: "table table-striped" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    { className: "info" },
                    React.createElement(
                        "th",
                        null,
                        "Folio"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Nombre"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Nombre Completo"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Correo"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "SCOI"
                    ),
                    React.createElement(
                        "th",
                        { colSpan: "2" },
                        "Acciones"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                Lista.length > 0 ? Lista.map(function (e) {
                    return React.createElement(DatosUsuarios, { usuario: e });
                }) : React.createElement(
                    "p",
                    null,
                    "Sin Datos A Mostrar..."
                )
            )
        )
    );
};

var ModalEdicion = function ModalEdicion(_ref3) {
    var usuario = _ref3.usuario;
    var evNombreCompleto = _ref3.evNombreCompleto;
    var evNombre = _ref3.evNombre;
    var evEmail = _ref3.evEmail;
    var evFoilioSCOI = _ref3.evFoilioSCOI;
    var guardar = _ref3.guardar;
    var id_usuario = usuario.id_usuario;
    var id_scoi = usuario.id_scoi;
    var nombre_usuario = usuario.nombre_usuario;
    var email_usuario = usuario.email_usuario;

    return React.createElement(
        "div",
        { className: "modal", id: "modal_edicion" },
        React.createElement(
            "div",
            { className: "panel panel-primary animate" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement("i", { className: "close fa fa-close", onClick: function () {
                        return document.querySelector("#modal_edicion").style.display = "none";
                    } }),
                React.createElement(
                    "strong",
                    { className: "glyphicon glyphicon-edit" },
                    " Edicion Usuario."
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement(VistaUsuario, {
                    usuario: usuario,
                    edicion: true,
                    evNombre: evNombreCompleto
                }),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "id_usuario" },
                        React.createElement(
                            "strong",
                            null,
                            "Folio SCOI"
                        ),
                        React.createElement(
                            "label",
                            null,
                            React.createElement("input", { type: "text", onChange: evFoilioSCOI, value: id_scoi })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "nombre_usuario" },
                        React.createElement(
                            "strong",
                            null,
                            "Nombre"
                        ),
                        React.createElement(
                            "label",
                            null,
                            React.createElement("input", { type: "text", onChange: evNombre, value: nombre_usuario })
                        )
                    ),
                    React.createElement(BtnComprobarNombre, {
                        id: id_usuario,
                        nombre: nombre_usuario
                    }),
                    React.createElement(
                        "div",
                        { className: "nombre_usuario" },
                        React.createElement(
                            "strong",
                            null,
                            "Correo"
                        ),
                        React.createElement(
                            "label",
                            null,
                            React.createElement("input", {
                                type: "text",
                                onChange: evEmail,
                                value: email_usuario
                            })
                        )
                    ),
                    React.createElement(
                        "span",
                        { onClick: function () {
                                return restaurar_password(id_scoi);
                            },
                            style: { float: "right", fontSize: "18px", marginTop: "20px" },
                            className: "btn btn-warning fa fa-history" },
                        "Restaurar Contraseña."
                    )
                ),
                React.createElement(PieDeModal, {
                    guardar: guardar,
                    cerrar: "modal_edicion"
                })
            )
        )
    );
};

var ModalEdicionUrls = function ModalEdicionUrls(_ref4) {
    var usuario = _ref4.usuario;
    var urls = _ref4.urls;
    var evActivar = _ref4.evActivar;
    var evGuardar = _ref4.evGuardar;

    var CrearMenus = function CrearMenus(_ref5) {
        var accesos = _ref5.accesos;

        var Menu = function Menu(_ref6) {
            var menu = _ref6.menu;
            var Menu = menu.Menu;
            var Icon_Menu = menu.Icon_Menu;
            var Sub_menus = menu.Sub_menus;

            return [React.createElement(
                "tr",
                { className: "success" },
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "i",
                        { className: Icon_Menu },
                        " "
                    ),
                    " ",
                    React.createElement(
                        "strong",
                        null,
                        " ",
                        Menu,
                        " "
                    )
                ),
                React.createElement("td", null)
            ), Sub_menus.map(function (e) {
                return React.createElement(SubMenu, { sub_menu: e });
            })];
        };
        var SubMenu = function SubMenu(_ref7) {
            var sub_menu = _ref7.sub_menu;
            var Sub_menus = sub_menu.Sub_menus;
            var Icon_Sub_menus = sub_menu.Icon_Sub_menus;
            var Accesos = sub_menu.Accesos;

            return [React.createElement(
                "tr",
                { className: "active" },
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        React.createElement("i", { style: { marginLeft: "10px" }, className: Icon_Sub_menus }),
                        " ",
                        Sub_menus
                    )
                ),
                React.createElement("td", null)
            ), React.createElement(Acceso, { acceso: Accesos })];
        };
        var Acceso = function Acceso(_ref8) {
            var acceso = _ref8.acceso;

            var respuesta = function respuesta(r) {
                return r.search("C") > -1 ? "danger fa fa-toggle-off" : "success fa fa-toggle-on";
            };
            return acceso.map(function (e) {
                return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        " ",
                        React.createElement(
                            "p",
                            { style: { marginLeft: "20px" } },
                            " ",
                            e.Nombre,
                            " "
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement("i", { style: { borderRadius: "20px" }, onClick: function () {
                                return evActivar(e);
                            }, className: "btn btn-" + respuesta(e.Estatus) })
                    )
                );
            });
        };
        return React.createElement(
            "table",
            { className: "table" },
            React.createElement(
                "tbody",
                null,
                accesos.map(function (e) {
                    return React.createElement(Menu, { menu: e });
                })
            )
        );
    };
    return React.createElement(
        "div",
        { className: "modal", id: "modal_edicion_url" },
        React.createElement(
            "div",
            { className: "panel panel-success animate" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement("i", { className: "close fa fa-close", onClick: function () {
                        return document.querySelector("#modal_edicion_url").style.display = "none";
                    } }),
                React.createElement(
                    "strong",
                    { className: "glyphicon glyphicon-lock" },
                    " Edicion Accesos Usuario."
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement(VistaUsuario, {
                    usuario: usuario
                }),
                React.createElement(
                    "h5",
                    null,
                    "Listas Del Urls"
                ),
                React.createElement(
                    "div",
                    { id: "container_accesos_url" },
                    urls.length > 0 ? React.createElement(CrearMenus, { accesos: urls }) : React.createElement(
                        "h4",
                        null,
                        "Sin Accesos A Mostrar..."
                    )
                ),
                React.createElement(PieDeModal, {
                    cerrar: "modal_edicion_url",
                    guardar: evGuardar
                })
            )
        )
    );
};

var VistaUsuario = function VistaUsuario(_ref9) {
    var usuario = _ref9.usuario;
    var edicion = _ref9.edicion;
    var evNombre = _ref9.evNombre;
    var id_usuario = usuario.id_usuario;
    var nombrecompleto_usuario = usuario.nombrecompleto_usuario;
    var foto = usuario.foto;

    return React.createElement(
        "div",
        { className: "view_usuario" },
        React.createElement("img", { src: foto, alt: "Foto", className: "img-thumbnail" }),
        React.createElement(
            "div",
            { className: "id_usuario" },
            React.createElement(
                "strong",
                null,
                "Folio"
            ),
            React.createElement(
                "label",
                null,
                id_usuario
            )
        ),
        React.createElement(
            "div",
            { className: "nombre_usuario" },
            React.createElement(
                "strong",
                null,
                "Nombre"
            ),
            React.createElement(
                "label",
                null,
                edicion ? React.createElement("input", { type: "text", onChange: evNombre, value: nombrecompleto_usuario }) : nombrecompleto_usuario
            )
        )
    );
};
var PieDeModal = function PieDeModal(_ref10) {
    var guardar = _ref10.guardar;
    var cerrar = _ref10.cerrar;

    return React.createElement(
        "div",
        { className: "panel-footer" },
        React.createElement(
            "i",
            { className: "btn btn-success fa fa-save", onClick: guardar },
            " Guardar."
        ),
        React.createElement(
            "i",
            { className: "btn btn-default fa fa-close", onClick: function () {
                    return document.querySelector("#" + cerrar).style.display = "none";
                } },
            " Salir."
        )
    );
};

var restaurar_password = function restaurar_password(id) {
    fetch("RestaurarPassword?id=" + id, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (r) {
        return r.json().then(function (res) {
            return mostrar_mensaje("Nuevo Password : " + res + ".", "alert-success");
        })["catch"](function (err) {
            return console.error("error Json=>", err);
        });
    })["catch"]();
};

var BuscarUsuario = (function (_React$Component2) {
    _inherits(BuscarUsuario, _React$Component2);

    function BuscarUsuario() {
        _classCallCheck(this, BuscarUsuario);

        _get(Object.getPrototypeOf(BuscarUsuario.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(BuscarUsuario, [{
        key: "render",
        value: function render() {
            return React.createElement("div", null);
        }
    }]);

    return BuscarUsuario;
})(React.Component);

var BtnComprobarNombre = (function (_React$Component3) {
    _inherits(BtnComprobarNombre, _React$Component3);

    function BtnComprobarNombre(props) {
        _classCallCheck(this, BtnComprobarNombre);

        _get(Object.getPrototypeOf(BtnComprobarNombre.prototype), "constructor", this).call(this, props);
        this.state = {
            estado: "",
            enviando: 0
        };
        this.conexion = this.conexion.bind(this);
    }

    _createClass(BtnComprobarNombre, [{
        key: "estado",
        value: function estado() {
            var estado = this.state.estado;

            var clase = estado == "V" ? 'success fa fa-check' : estado == "C" ? 'danger fa fa-close' : 'default fa fa-external-link';
            return "btn btn-" + clase;
        }
    }, {
        key: "cambio",
        value: function cambio(res) {
            this.setState({ estado: res, enviando: 0 });
        }
    }, {
        key: "conexion",
        value: function conexion() {
            var _this7 = this;

            var _props = this.props;
            var nombre = _props.nombre;
            var id = _props.id;

            this.setState({ enviando: 1 });
            fetch("VerificarNombre?nombre=" + nombre + "&id=" + id, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nombre)
            }).then(function (e) {
                return e.json().then(function (res) {
                    return _this7.cambio(res);
                });
            })["catch"](function (err) {
                return console.error("Error=>", err);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "i",
                { className: this.estado(),
                    onClick: this.conexion
                },
                React.createElement(
                    "span",
                    null,
                    " Comprobar Nombre"
                )
            );
        }
    }]);

    return BtnComprobarNombre;
})(React.Component);

ReactDOM.render(React.createElement(AppAcceso, null), document.querySelector("#root"));

