import React, { Component } from 'react';

import Cavecera from './Cavecera';
import VistaTablaPrincipal from './VistaTablaPrincipal';
import ModalConceptos from './ModalConceptos';
import ModalMovimientosPorEstablecimiento from './ModalMivimientosPorEstablecimiento';
import grafica_barras from '../manager/graficaConceptos';

const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = "/api/"

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Totales: {
                COSTO_DE_VENTAS: 0,
                VENTAS_NETAS: 0,
                GASTOS_DE_OPERACION: 0,
                PORCENTAJE_DE_GASTO:0,
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
        setTimeout(() => document.getElementById("modal_de_efecto_carga").style.display = "none", 1000);
    }
    /*eventos*/
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
    /*Conexiones*/
    Obtener_estado_de_resultados(fecha,periodo) {
        if (document.getElementById("modal_de_efecto_carga")) {
            document.getElementById("modal_de_efecto_carga").style.display = "flex";
            this.setState({ lista: [] });
        }
        fetch(`${$URL_API}Estado_de_resultados?fecha=${fecha}&meses=${periodo}`, {
            method: 'get',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res =>res.json().then(respuesta => {
            this.setState({
                lista: respuesta.lista_establecimientos,
                Totales: respuesta
            });
            document.getElementById("modal_de_efecto_carga").style.display = "none";
            if (respuesta.lista_establecimientos.length > 0) {
                grafica_barras(respuesta.lista_establecimientos);
            } else if (confirm("Sin Datos A Mostrar...\n Reintentar?")) {
                this.Obtener_estado_de_resultados();
            };
        }).catch(e => console.error(e)) ).catch(e => alert("error en Conexion api!!!"));
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
        .then( res => res.json().then(respuesta => {
            console.log(respuesta);
            if (respuesta) {
                this.setState({ establecimiento: respuesta });
                document.getElementById("modal_movimientos").style.display = "flex";
                document.getElementById("modal_de_efecto_carga").style.display = "none";
            } else alert("No Hay Respuesta!!!");
        })).catch(e => alert("error en Conexion api!!!\n"+ e.toString()));
    }
    restaurar() {
        let t = {
            COSTO_DE_VENTAS: 0,
            VENTAS_NETAS: 0,
            GASTOS_DE_OPERACION: 0,
            UTILIDAD_EN_OPERACIONES: 0,
            PORCENTAJE_DE_GASTO: 0,
            TRUPUT_DE_OPERACION: 0,
            UTILIDAD_NETA_OPERACIONES: 0,
            TRUPUT_NETA_OPERACIONAL: 0,
            IMPUESTOS_ISR: 0,
            IMPUESTOS_PTU: 0,
            GASTOS_FAMILIA_IZABAL: 0,
            TRUPUT_NETA: 0,
            lista_establecimientos: []
        }
        console.log("Restaurar...")
        this.setState({ Totales:t });
    }
    render() {
        const { concepto, Totales, seleccion } = this.state;
        return (
            <div className="panel panel-default">
                <Cavecera
                    evReload={this.Obtener_estado_de_resultados.bind(this)}
                    lista={Totales.lista_establecimientos}
                    restaurar={() => this.restaurar()}
                />
                <VistaTablaPrincipal
                    lista={Totales.lista_establecimientos}
                    evento={this.on_concepto.bind(this)}
                    eventoEstablecimiento={this.on_Establecimiento_pantalla_0.bind(this)}
                    Totales={Totales}
                />
                <ModalConceptos
                    concepto={concepto}
                    lista={Totales.lista_establecimientos}
                    eventoEstablecimiento={this.on_Establecimiento_pantalla_0.bind(this)}
                />
                <ModalMovimientosPorEstablecimiento
                    establecimiento={seleccion}
                />
            </div>
        );
    }
}
