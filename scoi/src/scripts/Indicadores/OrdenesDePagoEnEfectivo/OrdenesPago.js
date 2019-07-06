/**
* 
* En Este Script Se Renderiza La Tabla Para Mostrar Las Ordenes de Pago.
* Ordenandolas Por Clasificador, Establecimiento y  Concepto de Pago.
* Mostrando Los Datos En Años, Meses y Semanas.
* 
* */

/* Clases */

/* Metodos */
"use strict";

var obtener_concepto_compra_gasto = function obtener_concepto_compra_gasto(lista) {
    var lista_conceptos = [];

    lista.forEach(function (c_g) {
        if (lista_conceptos.findIndex(function (e) {
            return e.concepto_compra_gasto === c_g.concepto_compra_gasto;
        }) === -1) {
            lista_conceptos.push({
                concepto_compra_gasto: c_g.concepto_compra_gasto,
                establecimientos: lista.filter(function (e) {
                    return e.concepto_compra_gasto === c_g.concepto_compra_gasto;
                }),
                total: obtener_suma_total_lista(lista.filter(function (e) {
                    return e.concepto_compra_gasto === c_g.concepto_compra_gasto;
                }))
            });
        }
    });
    return lista_conceptos;
};
var obtener_establecimientos = function obtener_establecimientos(lista) {
    var lista_establecimientos = [];
    lista.forEach(function (esta) {
        if (lista_establecimientos.findIndex(function (e) {
            return e.cod_estab === esta.cod_estab;
        }) === -1) {
            lista_establecimientos.push({
                cod_estab: esta.cod_estab,
                establecimimiento: esta.establecimimiento,
                conceptos: lista.filter(function (e) {
                    return e.cod_estab === esta.cod_estab;
                }),
                total: obtener_suma_total_lista(lista.filter(function (e) {
                    return e.cod_estab === esta.cod_estab;
                }))
            });
        }
    });

    return lista_establecimientos;
};
var obtener_conceptos = function obtener_conceptos(lista) {
    var lista_res = [];
    lista.forEach(function (concep) {
        if (lista_res.findIndex(function (e) {
            return e.concepto_orden_de_pago === concep.concepto_orden_de_pago;
        }) === -1) {
            lista_res.push({
                concepto_orden_de_pago: concep.concepto_orden_de_pago,
                detalles: lista.filter(function (e) {
                    return e.concepto_orden_de_pago === concep.concepto_orden_de_pago;
                }),
                total: obtener_suma_total_lista(lista.filter(function (e) {
                    return e.concepto_orden_de_pago === concep.concepto_orden_de_pago;
                }))
            });
        }
    });

    return lista_res;
};
var obtener_suma_total_lista = function obtener_suma_total_lista(lista) {
    return moneyFormat(lista.map(function (e) {
        return e.cantidad;
    }).reduce(function (a, b) {
        return a + b;
    }));
};
var moneyFormat = function moneyFormat(numero_) {

    var decimal_con_cero = function decimal_con_cero(i) {
        return i > 9 || i.search(0) > -1 ? i : i + "0";
    };
    var mayora_a_mil = function mayora_a_mil(numero) {
        return new Intl.NumberFormat('es-MX').format(numero);
    };

    var numero_string = (function () {
        return Math.round(numero_ * 100) / 100;
    })().toString();
    var decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    var unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return "$" + (unidades || 0) + "." + (decimal || 0);
};
var obtener_semanas_ocupadas_por_anio = function obtener_semanas_ocupadas_por_anio(lista) {
    var lista_meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    lista.sort(function (a, b) {
        return a.anio_pago > b.anio_pago ? 1 : -1;
    });

    var lista_anios = [];
    lista.forEach(function (anio) {
        if (lista_anios.findIndex(function (e) {
            return e.anio === anio.anio_pago;
        }) === -1) {
            var num_semana = semanas_obtenidas(lista.filter(function (e) {
                return e.anio_pago === anio.anio_pago;
            }));
            num_semana.sort(function (a, b) {
                return lista_meses.findIndex(function (e) {
                    return e == a.mes_pago;
                }) > lista_meses.findIndex(function (e) {
                    return e == b.mes_pago;
                }) ? 1 : -1;
            });
            lista_anios.push({
                anio: anio.anio_pago,
                meses: obtener_semanas_por_mes(num_semana),
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_anios;
};
var obtener_semanas_por_mes = function obtener_semanas_por_mes(lista) {
    var lista_meses = [];
    lista.forEach(function (mes) {
        if (lista_meses.findIndex(function (e) {
            return e.mes === mes.mes_pago;
        }) === -1) {
            var num_semana = semanas_obtenidas(lista.filter(function (e) {
                return e.mes_pago === mes.mes_pago;
            }));
            num_semana.sort(function (a, b) {
                return a.semana_del_anio_pago > b.semana_del_anio_pago ? 1 : -1;
            });
            lista_meses.push({
                mes: mes.mes_pago,
                semanas: num_semana.map(function (e) {
                    return e.semana_del_anio_pago;
                }),
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_meses;
};
var semanas_obtenidas = function semanas_obtenidas(semanas) {
    var num_semana = [];
    semanas.forEach(function (sem) {
        if (num_semana.findIndex(function (e) {
            return e.semana_del_anio_pago === sem.semana_del_anio_pago && e.mes_pago === sem.mes_pago;
        }) === -1) {
            num_semana.push(sem); //semana_del_anio_pago
        }
    });
    return num_semana;
};
var total_de_semanas_anio = function total_de_semanas_anio(anios) {
    var meses = [],
        semanas = [];

    //meses en años
    anios.forEach(function (e) {
        //agrega los meses
        meses = meses.concat(e.meses.map(function (m) {
            return m.semanas.map(function (s) {
                return { semana: s, mes: m.mes };
            });
        })) || meses;
    });

    //fila senamas en meses
    meses.forEach(function (m) {
        //agrega las semanas
        semanas = semanas.concat(m);
    });

    return semanas;
};
var mostrar_detalles_concepto = function mostrar_detalles_concepto(concepto_pago, detalles) {
    console.log("detalles=>", detalles);
    vista_pagos_por_semana.vista_pagos_por_semana(concepto_pago, detalles);
};
/* Componentes */
var CeldaTotal = function CeldaTotal(_ref) {
    var total = _ref.total;

    return React.createElement(
        "td",
        { style: { textAlign: "right" } },
        " ",
        React.createElement(
            "label",
            null,
            total
        )
    );
};
var CaveceraTabla = function CaveceraTabla(_ref2) {
    var anios = _ref2.anios;

    var lista = [],
        meses = [],
        semanas = [];

    var estado_color_mes = true;
    var color_fondo = function color_fondo() {
        estado_color_mes = !estado_color_mes;
        return estado_color_mes ? "22, 131, 186" : "0, 119, 179";
    };
    //fila años
    lista.push(React.createElement(
        "tr",
        { className: "cavecera_tabla" },
        React.createElement(
            "th",
            { rowSpan: "3", className: "cavecera titulo", id: "titulo" },
            " ",
            React.createElement(
                "label",
                null,
                "CONCEPTOS"
            )
        ),
        anios.map(function (e) {
            //agrega los meses
            meses = meses.concat(e.meses.map(function (m) {
                return m;
            })) || meses;
            return React.createElement(
                "th",
                { colSpan: e.cantidad_semanas },
                e.anio
            );
        }),
        React.createElement(
            "th",
            { rowSpan: "3" },
            React.createElement(
                "label",
                null,
                "TOTAL"
            )
        )
    ));

    //fila meses
    lista.push(React.createElement(
        "tr",
        { className: "cavecera_tabla" },
        meses.map(function (m) {
            var color_mes = color_fondo();
            //agrega las semanas
            semanas = semanas.concat(m.semanas.map(function (s) {
                return {
                    semana: s,
                    mes: color_mes
                };
            }));
            return React.createElement(
                "th",
                { style: { top: "35px", background: "rgb(" + color_mes + ")" }, colSpan: m.cantidad_semanas },
                m.mes
            );
        })
    ));

    //fila semanas
    lista.push(React.createElement(
        "tr",
        { className: "cavecera_tabla" },
        semanas.map(function (s) {
            return React.createElement(
                "th",
                { style: { top: "68px", background: s.mes } },
                s.semana
            );
        })
    ));

    return lista;
};
var SemanasResultadosConceptos = function SemanasResultadosConceptos(_ref3) {
    var Lista = _ref3.Lista;
    var anios = _ref3.anios;
    ///----------------->Pendiente
    var total_semanas_anio = total_de_semanas_anio(anios);

    return total_semanas_anio.map(function (dato) {
        // && e.mes_pago == dato.mes
        //console.log("lista Semanas =>", Lista.filter(e => e.semana_del_anio_pago == dato));
        var semanas = Lista.filter(function (e) {
            return e.semana_del_anio_pago == dato.semana && e.mes_pago == dato.mes;
        });
        var filtro = semanas.map(function (w) {
            return w.cantidad;
        }) || [];
        var valor = filtro.length > 0 ? filtro.reduce(function (ant, nvo) {
            return nvo + ant;
        }) : 0;

        return React.createElement(
            "td",
            { style: { textAlign: "right" } },
            valor != 0 ? moneyFormat(valor) : " "
        );
    });
};
var TablaMonitor = function TablaMonitor(_ref4) {
    var datos = _ref4.datos;

    datos.sort(function (a, b) {
        return a.establecimimiento > b.establecimimiento ? 1 : -1;
    });
    var conceptos = obtener_concepto_compra_gasto(datos || []),
        anios = obtener_semanas_ocupadas_por_anio(datos);

    return React.createElement(
        "div",
        { style: { height: "700px", overflow: "auto" } },
        React.createElement(
            "table",
            { className: "table" },
            React.createElement(
                "thead",
                null,
                React.createElement(CaveceraTabla, {
                    anios: anios
                })
            ),
            React.createElement(
                "tbody",
                null,
                conceptos.map(function (e) {
                    var ident = "tb_" + remplazar_espacios_por_guion_bajo(e.concepto_compra_gasto);
                    return [React.createElement(
                        "tr",
                        { name: "conceptos" },
                        React.createElement(
                            "td",
                            { className: "cavecera clasificador" },
                            React.createElement(BotonTogle, {
                                identificador: ident
                            }),
                            React.createElement(
                                "strong",
                                null,
                                " ",
                                e.concepto_compra_gasto
                            )
                        ),
                        React.createElement(SemanasResultadosConceptos, {
                            Lista: e.establecimientos,
                            anios: anios
                        }),
                        React.createElement(CeldaTotal, {
                            total: e.total
                        })
                    ), React.createElement(VistaEstablecimiento, {
                        lista: e.establecimientos,
                        anios: anios,
                        nombre: ident
                    })];
                })
            )
        )
    );
};
var VistaEstablecimiento = function VistaEstablecimiento(_ref5) {
    var lista = _ref5.lista;
    var anios = _ref5.anios;
    var nombre = _ref5.nombre;

    var establecimientos = obtener_establecimientos(lista || []);
    return establecimientos.map(function (e) {
        var ident = crear_identificador(nombre, e.establecimimiento);
        return [React.createElement(
            "tr",
            { name: "estalbelcimientos",
                style: { display: "none" },
                className: nombre },
            React.createElement(
                "td",
                { className: "cavecera establecimimiento" },
                React.createElement(BotonTogle, {
                    identificador: ident
                }),
                React.createElement(
                    "strong",
                    null,
                    e.establecimimiento
                )
            ),
            React.createElement(SemanasResultadosConceptos, {
                Lista: e.conceptos,
                anios: anios
            }),
            React.createElement(CeldaTotal, { total: e.total })
        ), React.createElement(VistaConceptos, {
            lista: e.conceptos,
            anios: anios,
            nombre: ident
        })];
    });
};
var VistaConceptos = function VistaConceptos(_ref6) {
    var lista = _ref6.lista;
    var anios = _ref6.anios;
    var nombre = _ref6.nombre;

    var conceptos = obtener_conceptos(lista);
    return conceptos.map(function (e) {
        return React.createElement(
            "tr",
            { name: "ordenes",
                style: { display: "none" },
                className: nombre },
            React.createElement(
                "td",
                { className: "cavecera concepto_orden_de_pago" },
                React.createElement(
                    "label",
                    null,
                    e.concepto_orden_de_pago,
                    " "
                ),
                React.createElement("i", { className: "btn btn-default fa fa-info", style: { float: "right" }, onClick: function () {
                        return mostrar_detalles_concepto(e.concepto_orden_de_pago, e.detalles);
                    } })
            ),
            React.createElement(SemanasResultadosConceptos, {
                Lista: e.detalles,
                anios: anios
            }),
            React.createElement(CeldaTotal, { total: e.total })
        );
    });
};
var MostrarProveedores = function MostrarProveedores(_ref7) {
    var lista = _ref7.lista;

    //handle_filter(event) {

    //}
    //handle_beneficiary(select) {

    //}
    if (lista.length > 0) return React.createElement(
        "div",
        { className: "panel panel-info", style: { height: "750px" } },
        React.createElement(
            "p",
            null,
            "Cantidad De Registros = ",
            React.createElement(
                "strong",
                null,
                lista.length || 0
            )
        ),
        React.createElement(TablaMonitor, {
            datos: lista
        })
    );else return React.createElement(
        "div",
        null,
        React.createElement(
            "h3",
            null,
            "Sin Registros a Mostrar!!!"
        )
    );
};

var llenar_tabla_pagos = function llenar_tabla_pagos(lista) {
    ReactDOM.render(React.createElement(MostrarProveedores, { lista: lista }), document.querySelector("#resultados_tabla"));
};

