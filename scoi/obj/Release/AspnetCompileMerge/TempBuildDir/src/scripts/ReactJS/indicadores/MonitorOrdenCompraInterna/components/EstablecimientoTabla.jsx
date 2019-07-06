import React, { useState } from "react";

import Moneda from '../../../ComponentesGlobales/Moneda'

import {
    obtener_semanas_ocupadas_por_anio
} from '../metodos/manejoSemanas';

const Ordenes = ({ lista, optenerDetale }) => {
    let resultados = [];
    let ordenes = [];
    let total = 0;
    let anios = obtener_semanas_ocupadas_por_anio(lista);

    for (let tipo of lista) {
        if (
            ordenes.findIndex(
                e => tipo.Establecimiento_surte == e.Establecimiento_surte
            ) === -1
        ) {
            let filtro = lista.filter(
                e => e.Establecimiento_surte == tipo.Establecimiento_surte
            ).map(e => {
                for (let i of e.Productos) {
                    total += i.Total
                }

                return e
            });
            ordenes.push({
                Establecimiento_surte: tipo.Establecimiento_surte,
                filtro: obtener_semanas_ocupadas_por_anio(filtro),
                Total: total
            });
        }
    }
    ordenes.sort((e1, e2) => e1.Establecimiento_surte > e2.Establecimiento_surte ? 1 : -1)
    console.log("ordenes=>", ordenes);
    console.log("anios=>", anios);

    resultados = ordenes.map(e => <Establecimiento e={e} anios={anios} lista={lista} optenerDetale={optenerDetale} />)


    return (<tbody>{resultados}
        <TotalConsulta lista={lista} anios={anios} />
    </tbody>);
};

const Establecimiento = ({ e, anios, lista, optenerDetale }) => {
    const [mostrar, setMostrar] = useState(false);
    const listaOrdenes = [];
    const filtroEst = lista.filter(f => e.Establecimiento_surte == f.Establecimiento_surte);
    const comprobarEstado = () => setMostrar(!mostrar);

    const claseBoton = () => mostrar ? "btn btn-sm fa fa-minus" : "btn btn-sm fa fa-plus";

    listaOrdenes.push(<tr class="bg-warning">
        <td style={{width:"35px"}}><i class={claseBoton()} onClick={comprobarEstado}></i></td>
        <td style={{color: "#000" }}>{e.Establecimiento_surte}</td>
        <SemanaEstablecimiento anios={anios} filtro={filtroEst} />
        <ItemTabla item={obtenerTotalSemanas(anios, filtroEst).reduce((b, c) => b + c)} />
    </tr>)
    if (mostrar) {
        listaOrdenes.push(<OrdenPorEstablecimiento lista={filtroEst} anios={anios} optenerDetale={optenerDetale} />)
    }

    return (listaOrdenes);
}

const OrdenPorEstablecimiento = ({ lista, anios, optenerDetale }) => {



    return lista.map(e => {

        return (<tr>
            <td>
                <i class="btn btn-sm fa fa-list" onClick={() => optenerDetale(e)}></i>
            </td>
            <td style={{ color: "#000" }}>{e.Folio}</td>
            <SemanaEstablecimiento anios={anios} filtro={[e]} />
            <ItemTabla item={obtenerTotalSemanas(anios, [e]).reduce((b, c) => b + c)} />
        </tr>)
    })
}

const TotalConsulta = ({ lista, anios }) => {

    return (
        <tr class="bg-info" style={{ fontSize: "16px"}}>
            <td><i class="fa fa-row-left"></i></td>
            <td style={{ color: "#000" }}><label>Total</label></td>
            <SemanaEstablecimiento anios={anios} filtro={lista} />
            <ItemTabla item={obtenerTotalSemanas(anios, lista).reduce((b, c) => b + c)} />
        </tr>
        );
}

const SemanaEstablecimiento = ({ anios, filtro }) => {
    return obtenerTotalSemanas(anios, filtro).map(e => <ItemTabla item={e} />)
}

const obtenerTotalSemanas = (anios, filtro) => {
    let listaTotalSemana = [];
    let aux = anios.map(e => {
        return e.meses.map(f => {
            return f.semanas.map(g => {
                let total = 0;
                let lista = filtro.filter(h => {
                    return h.Anio == e.anio && h.Mes == f.mes && h.Semana_anio == g.Semana_anio
                })
                for (let l of lista) {
                    for (let t of l.Productos) {
                        total += t.Total;
                    }
                }
                listaTotalSemana.push(total)
                return total;
            })
        })
    })
    return listaTotalSemana;
}

const ItemTabla = ({ item }) =>(<td style={{ textAlign: "right", color: "#000" }}>
    {item != 0  ? <Moneda cantidad={item} /> :" "}
</td>);


export default Ordenes;