
import React from 'react';


import Moneda from '../../../ComponentesGlobales/Moneda';

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
    const CeldasTabla = ({ dato, estilo, icono, margen, columnas, mas, pos }) => {
        dato = dato ? dato : "NA";
        estilo = estilo ? estilo : { color: "#000000" };
        icono = icono ? icono : "";
        margen = margen ? { marginLeft: margen } : { marginRight: "0" };
        columnas = columnas ? columnas : "";

        let Icono = mas ? <BotonTogle identificador={mas} poicion={pos} /> : <i className={icono} style={margen}></i>;

        return (<th colSpan={columnas} style={estilo}>
            {Icono}
            <label style={{ marginLeft: "5px" }} title={dato}>
                {dato}
            </label>
        </th>);
    }
    ///<----------------------------------------------------------------- Componente Base De Tabla resultados Y totales.
    const CeldasTablaResultados = ({ dato, estilo }) => {
        estilo = estilo ? estilo : { color: "#000000" };
        return (
            <th style={estilo}>
                <Moneda cantidad={dato || 0} />
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
                    <th style={{ backgroundColor: "#0077b3", color: "azure", top: "30px" }}>MES</th>
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
                for (let concepto of $ORDEN_DATOS_TABLA) {
                    comprobar_concepto(concepto) ? $lista.push(< Concepto concepto={concepto} />) : '';
                }
                return $lista;
            }
            ///<----------------------------------------------------------------- Componente Concepto
            const Concepto = ({ concepto }) => {
                const $lista = []
                const { lista_conceptos } = establecimiento;
                let $datos = lista_conceptos ? lista_conceptos.filter(e => e.concepto == concepto) : [];

                $datos.length > 0 ? $datos.forEach(concepto_ => {
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
                            <tr className={nombre} style={{ display: "none" }}>
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
            return (<tbody>
                <Conceptos
                />
                <tr>
                    <th colSpan="2" style={{ background: "#ff6600", color: "azure", textAlign: "left" }}>
                        <label>UTILIDAD NETA OPERACIONAL POR SEMANA</label>
                    </th>
                </tr>
            </tbody>);
        }
        return (<table className="table table-condensed">
            <CaveceraTabla />
            <CuerpoTabla />
        </table>);
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
                    style={{ textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "0" }}>
                    {e.Anio}
                </th>)}
                    <th rowSpan="3" style={{ fontSize: "20px", width: "140px", textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "0" }}>
                        TOTAL
                    </th>
                </tr>);
            };
            ///<----------------------------------------------------------------- Componente Meses.
            const Meses = () => {
                return (<tr>{datos.map(anio => anio.Meses.map(e =>
                    <th colSpan={tamanio_semanas_por_mes([e])} style={{ textAlign: "center", backgroundColor: "#0077b3", color: "azure", top: "30px" }}>
                        {e.Mes}
                    </th>))}
                </tr>);
            };
            ///<----------------------------------------------------------------- Componente Semanas.
            const Semanas = () => {
                return (<tr>{datos.map(anio => anio.Meses.map(e => e.Semanas.map(semama =>
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
                $ORDEN_DATOS_TABLA.forEach(concepto => comprobar_concepto(concepto) ? $lista.push(< Concepto concepto={concepto} />) : "");
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
                        $lista.push(<tr className={nombre} style={{ display: "none" }}>
                            {$Semanas.map(Semana_ => {
                                let $index = Lista_SemanaAnios.findIndex(e => e.Semana == Semana_),
                                    $resultado = $index > -1 ? Lista_SemanaAnios[$index].Total_Costo : 0;
                                return (<CeldasTablaResultados
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
                    for (let movimiento_ of movimientos.filter(e => e.Tipo_movimiento == movimiento)) { $total += movimiento_.Costo }
                    return $total;
                }
                for (let movimiento_ of movimientos) { $movimientos.findIndex(e => e.Tipo_movimiento == movimiento_.Tipo_movimiento) == -1 ? $movimientos.push(movimiento_) : '' }
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
                    }) : '';
                return $lista;
            }
            ///<----------------------------------------------------------------- Componente Totales.
            const Totales = () => {
                let $total = 0;
                return (<tr>{$SemanasTotales.map(semana_ => {
                    $total += semana_.Total_Costo;
                    return (<th style={{ background: "#ff6600", color: "azure", textAlign: "right" }}>
                        <Moneda cantidad={semana_.Total_Costo || 0} />
                    </th>)
                })
                }
                    <th style={{ background: "#ff6600", color: "azure", textAlign: "right" }}>
                        <Moneda cantidad={$total || 0} />
                    </th>
                </tr>);
            }
            return (
                <tbody>
                    <Conceptos />
                    <Totales />
                </tbody>
            );
        }
        return (<table className="table table-condensed">
            <CaveceraTabla />
            <StructuraTabla />
        </table>);
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
                <label style={{ color: "#666666", display: "block", fontSize: "20px" }}>
                    MOVIMIENTOS OPERACIONAL POR SEMANA DEL AÑO.
                        </label>
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

export default ModalMivimientosPorEstablecimiento;
