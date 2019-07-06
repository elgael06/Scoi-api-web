
import React from 'react'

import Moneda from '../../../ComponentesGlobales/Moneda'

function redondeo(numero) {
    return Math.round(numero * 100) / 100;
}

const ModalConceptos = ({ concepto, lista, eventoEstablecimiento }) => {
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
        let $lista = [], $lista_subclasificadores = [];
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
    const CrearMenu = ({ lista_1 }) => {
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
                   <label> {clacific}</label>
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
            <th style={{ background: "#f37021", color: "azure" }}><label> TOTALES : </label></th>
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
                    <label>{sub}</label>
                </th>
            </tr>, <MenuMovimiento movimientos={obtener_movimientos(clasificador, sub)} nombre={ident} />]);
        });
    }
    const MenuMovimiento = ({ movimientos, nombre }) => {
        return movimientos.map(e => {
            return (<tr style={{ background: "#e6ffff", display: "none" }} key={"_" + e.Tipo_movimiento} className={nombre}>
                <th>
                    <span style={{ marginLeft: "50px", marginRight: "10px" }}>
                       <label> {e.Tipo_movimiento}</label>
                    </span>
                </th>
            </tr>)
        });
    }
    ///<-----------------------------------------------------------------
    const CrearMovimientos = ({ clasificador, subclasificador, nombre }) => {
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
                        suma_total += movimientos_total || 0;
                    }
                }
            });

            for (let i in lista) {
                lista_auxiliar[i] = <td
                    style={{ textAlign: "right" }}
                    key={lista_auxiliar[i] + "kjkdfgb"}>
                    <Moneda cantidad={lista_auxiliar[i] || 0} />
                </td>;
            }
            lista_auxiliar.push(<td style={{ textAlign: "right" }}>
                <Moneda cantidad={suma_total || 0} />
            </td>)
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

                !(clasificador == clasificador_.clasificador) || function () {
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
                    <Moneda cantidad={lista_auxiliar[i] || 0} />
                </td>;
            };

            lista_auxiliar.push(<td
                style={{ textAlign: "right" }}
                key={redondeo(total_sub) + "kjbfbbk"}>
                <Moneda cantidad={total_sub || 0} />
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
    const CrearClasificadores = ({ clasificadores }) => {
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
                lista_auxiliar[i] = <th style={{ textAlign: "right", background: "#b3d2ff" }} key={lista_auxiliar[i] + "-" + i}>
                    <Moneda cantidad={lista_auxiliar[i] || 0} />
                  </th>
            };

            lista_auxiliar.push(<th style={{ textAlign: "right", background: "#b3d2ff" }} >
                <Moneda cantidad={total_resultado || 0} />
            </th>);
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
                <th key={elemento.folio_establecimiento} style={{ background: "#3388ff", position: "sticky", top: "0" }}>
                    <i
                        style={{ background: "#3388ff", border: "none" }}
                        className="btn btn-info "
                        onClick={() => eventoEstablecimiento(elemento)}
                    >
                        {elemento.establecimiento}
                        <span className="glyphicon glyphicon-info-sign" style={{ marginLeft: "10px" }}></span>
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
                <th style={{ background: "#f37021", color: "azure", textAlign: "right" }}>
                    <Moneda cantidad={TOTAL || 0} />
                </th>
            );
        });
        totales.push(
            <th style={{ background: "#f37021", color: "azure", textAlign: "right" }}>
                <Moneda cantidad={totales_ || 0} />
            </th>
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
            style={{ height: "95%", width: "90%" }}
        >
            <div className="panel-heading"
                style={{ background: "#006aff", color: "#FFFFFF" }}
            >
                <i className="btn btn-danger fa fa-close"
                    style={{ float: "right" }}
                    onClick={() => document.getElementById("modal_concepto").style.display = "none"}
                ></i>
                <h4>
                    <i className="fa fa-bar-chart"
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                    ></i>
                    {concepto}.
                    </h4>
            </div>
            <div className="panel-body"
                style={{ height: "95%" }}
            >
                <div style={{ height: "96%", overflow: "auto" }} >
                    <span style={{ height: "100%", position: "sticky", left: "0", zIndex: "999", width: "30%", display: "inline-block" }}>
                        <table className="table">
                            <thead>
                                <tr className="info">
                                    <th style={{ background: "#006aff", zIndex: "999", position: "sticky", top: "0" }} >
                                        <label style={{ background: "#006aff", border: "none" }}
                                            className="btn btn-info">
                                            <i className="fa fa-dollar"
                                                style={{ marginLegt: "5px", marginRight: "5px" }}
                                            ></i>
                                            {concepto}
                                        </label>
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
                                <tr style={{ background: "#06d1e0", zIndex: "999" }} className="info">
                                    <Establecimiento />
                                    <th style={{ background: "#006aff", zIndex: "999", position: "sticky", top: "0" }} >
                                        <i style={{ background: "#006aff", border: "none" }}
                                            className="btn btn-info">
                                            <label>TOTAL</label>
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

export default ModalConceptos;

