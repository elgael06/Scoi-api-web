import React, { useState } from 'react';
import { redondeo, moneyFormat } from '../../../../Globales/moneda';
import ExportToExcel from '../../../../Globales/ExportarExcel';
import estiloModal from '../../../models/mEstiloModal';

const ModalConceptos = ({ concepto, lista, eventoEstablecimiento }) => {
    const clasificadores = (function () {
        let filtro =[]
        let clasific = lista.filter(est => {
            return est.lista_conceptos.findIndex(e => {
               return e.concepto === concepto
            }) > -1;
        }).flatMap(est => {
            return est.lista_conceptos.filter(e => {
                e["Establecimiento"] = est.folio_establecimiento;
                return e.concepto === concepto;
            });
        }).flatMap(e => {
            e.Lista_clasificadores.map(r => {
                r["Establecimiento"] = e["Establecimiento"];
                return e;
            })
            return e.Lista_clasificadores
        });
        for (let dato of clasific) {
            if (filtro.findIndex(e => e == dato.clasificador) === -1) {
                filtro.push(dato.clasificador)
            }
        }
        return {
            lista: filtro.sort((a,b)=>a>b?1:-1),
            clasificadores: clasific
        }
    }());
    const cerrar = () => document.getElementById("modal_concepto").style.display = "none";
    return (<div id="modal_concepto"
        className=""
        style={estiloModal}>
        <div className="panel panel-default animate" style={{ width: "90%" }}>
            <div className="panel-heading" style={{ background: "#006aff", color: "#FFFFFF" }}>
                <i className="btn btn-danger fa fa-close"
                    style={{ float: "right" }}
                    onClick={cerrar}></i>
                <h4>
                    <i className="fa fa-bar-chart" style={{ marginLeft: "10px", marginRight:"10px" }}></i>
                    {concepto}.
                </h4>
            </div>
            <div className="panel-body">
                <div style={{ maxHeight: "650px", overflow: "auto" }} >
                    <table class="table table-bordered" id="tabla_segundo_nivel_estado_resultados">
                        <Cabecera titulo={concepto} establecimientos={lista} evento={eventoEstablecimiento} />
                        <Clasificadores lista={clasificadores} establecimientos={lista} />
                    </table>
                </div>
            </div>
            <div class="panel-footer">
                <i class="fa fa-file-excel-o btn btn-success" onClick={() => ExportToExcel("tabla_segundo_nivel_estado_resultados", `tabla_detalle_${concepto}`)}> Guardar A Excel</i>
                <i style={{ float: "right" }} class="fa fa-close btn btn-danger" onClick={cerrar}> Cerrar</i>
            </div>
        </div>
    </div>);
}

const Cabecera = ({ titulo, establecimientos, evento }) => {

    return (<thead>
        <tr class="info" style={{color:"#FFF"}}>
            <th style={{ background: "#006aff", zIndex: "999", position: "sticky", top: "0", left: 0 }}>
                <span style={{ background: "#006aff", border: "none" }} className="btn btn-primary ">
                    <i class="fa fa-dollar" style={{ marginLeft: "10px", marginRight: "10px" }}></i>
                    {" " + titulo}
                </span>
            </th>
            <th style={{ background: "#006aff", zIndex: "999", position: "sticky", top: "0" }} >
                <i style={{ background: "#006aff", border: "none" }} className="btn btn-info">
                    <label>TOTAL</label>
                </i>
            </th>
            <CavEstablecimientos establecimientos={establecimientos} evento={evento} />
        </tr>
    </thead>)
}

const CavEstablecimientos = ({ establecimientos, evento}) => {
    return establecimientos.map(elemento => <th style={{ background: "#3388ff", position: "sticky", top: "0" }}>
        <i style={{ background: "#3388ff", border: "none" }} className="btn btn-info " onClick={() => evento(elemento)}>
            {elemento.establecimiento}
            <span className="glyphicon glyphicon-info-sign" style={{ marginLeft: "10px" }}></span>
        </i>
    </th>);
}

const Clasificadores = ({ lista, establecimientos }) => {
    return (<tbody>
        {lista.lista.map(e => (<FilaClasificador
            clasificador={e}
            Clasificadores={lista.clasificadores.filter(c => c.clasificador === e)}
            establecimientos={establecimientos} />))}
    </tbody>);
}

const FilaClasificador = ({ clasificador, Clasificadores, establecimientos }) => {
    let [subclases, setSubclases] = useState(false);
    let lista = [];
    let subClasificadores = (function () {
        let filtro = [];
        let subclasificadores = Clasificadores.flatMap(clas => {
            clas.Lista_subclasificadores.map(e => {
                e["Establecimiento"] = clas.Establecimiento;
                return e;
            })
            return clas.Lista_subclasificadores;
        }).map(e => {
            if (filtro.findIndex(f => f === e.subclacificador) === -1) {
                filtro.push(e.subclacificador)
            }
            return e;
        });
        return {
            lista: filtro.sort((a, b) => a > b ? 1 : -1),
            subclasificadores: subclasificadores
        }
    }());
    lista.push(<tr>
        <td style={{ background: "#c0d7fc", color: "#000", position: "sticky", top: "0", left: 0, minWidth: "350px" }}>
            <i class={subclases ? "btn fa fa-minus" : "btn fa fa-plus"} onClick={() => setSubclases(!subclases)}></i>
            <strong>{clasificador}</strong>
        </td>
        <ClasificadorEstablecimientos Clasificadores={Clasificadores} establecimientos={establecimientos} />
    </tr>);
    if (subclases) {
        lista.push(<SubClasificadores subClasificadores={subClasificadores} establecimientos={establecimientos}/>);
    }
    return lista;
}

const ClasificadorEstablecimientos = ({Clasificadores, establecimientos }) => {
    let total = 0;
    let resultados = [];
    resultados.push( establecimientos.map(elemento => {
        let filtro = Clasificadores.findIndex(clasificador => clasificador.Establecimiento === elemento.folio_establecimiento)
        let resultado = filtro > -1 ? redondeo(Clasificadores[filtro].Total_Costo) : 0;
        total += resultado ;
        return (<td style={{ textAlign: "right", background: "#c0d7fc", color: "#000"}}>
            <strong>{resultado != 0 ? moneyFormat(resultado) : ""}</strong>
        </td>);
    }));
    resultados.unshift(<td style={{ textAlign: "right", background: "#c0d7fc", color: "#000" }}>
        <strong>{moneyFormat(redondeo(total))}</strong>
    </td>);
    return resultados;
}

const SubClasificadores = ({ subClasificadores, establecimientos }) => {
    return subClasificadores.lista.map(sub => {
        return (<FilaSubClasificador
            subClasificador={sub}
            subClasificadores={subClasificadores.subclasificadores.filter(e => e.subclacificador === sub)}
            establecimientos={establecimientos} />);
    });
}

const FilaSubClasificador = ({ subClasificador, subClasificadores, establecimientos }) => {
    let [movimiento, setMovimiento] = useState(false);
    let lista = [];
    let movimientos = (function () {
        let filtro = [];
        let movimientos = subClasificadores.flatMap(sub => {
            sub.Lista_movimientos.map(mov => {
                mov["Establecimiento"] = sub.Establecimiento;
                return mov;
            })
            return sub.Lista_movimientos;
        }).map(e => {
            if (filtro.findIndex(f => f === e.Tipo_movimiento) === -1) {
                filtro.push(e.Tipo_movimiento);
            }
            return e;
        });
        return {
            lista: filtro.sort((a, b) => a > b ? 1 : -1),
            movimientos: movimientos
        }
    }());
    lista.push(<tr>
        <td style={{ background: "#f6fcbd", color: "#000", position: "sticky", top: "0", left: 0, minWidth: "350px" }}>
            <i class={movimiento ? "btn fa fa-minus" : "btn fa fa-plus"} onClick={() => setMovimiento(!movimiento)}></i>
            <strong>{subClasificador}</strong>
        </td>
        <SubEstablecimientos
            subClasificadores={subClasificadores.filter(e => e.subclacificador === subClasificador)}
            establecimientos={establecimientos} />
    </tr>);
    if (movimiento)
    lista.push(<Movimientos
        movimientos={movimientos}
        establecimientos={establecimientos}
    />);

    return lista;
}

const SubEstablecimientos = ({ subClasificadores,establecimientos }) => {
    let total = 0;
    let resultados = establecimientos.map(elemento => {
        let filtro = subClasificadores.findIndex(sub => sub.Establecimiento === elemento.folio_establecimiento)
        let resultado = filtro > -1 ? redondeo(subClasificadores[filtro].Total_Costo) : 0;
        total += resultado;
        return (<td style={{ textAlign: "right", background: "#f6fcbd", color: "#000" }}>
            <strong>{resultado != 0 ? moneyFormat(resultado) : ""}</strong>
        </td>);
    });
    resultados.unshift(<td style={{ textAlign: "right", background: "#f6fcbd", color: "#000" }}>
        <strong>{moneyFormat(redondeo(total))}</strong>
    </td>);
    return resultados;
}

const Movimientos = ({ movimientos, establecimientos }) => {
    return movimientos.lista.map(mov=><tr >
        <td style={{ background: "#FFF", color: "#000", position: "sticky", top: "0", left: 0, minWidth: "350px" }}>
            <strong style={{marginLeft:"20px"}}>{mov}</strong>
        </td>
        <MovimientoEstablecimientos movimientos={movimientos.movimientos.filter(e => e.Tipo_movimiento === mov)} establecimientos={establecimientos} />
    </tr>);
}

const MovimientoEstablecimientos = ({ movimientos, establecimientos }) => {
    let total = 0;
    let resultados = establecimientos.map(elemento => {
        let resultado = filtroMovimientos(movimientos.filter(sub => sub.Establecimiento === elemento.folio_establecimiento));
        total += resultado;
        return (<td style={{ textAlign: "right", background: "#FFF", color: "#000" }}>
            <strong>{resultado != 0 ? moneyFormat(resultado) : ""}</strong>
        </td>);
    });
    resultados.unshift(<td style={{ textAlign: "right", background: "#FFF", color: "#000" }}>
        <strong>{moneyFormat(redondeo(total))}</strong>
    </td>);
    return resultados;
}

const filtroMovimientos = filtro => {
    let total = 0;
    for (let dato of filtro) {total += dato.Costo;}
    return redondeo(total);
}

export default ModalConceptos;