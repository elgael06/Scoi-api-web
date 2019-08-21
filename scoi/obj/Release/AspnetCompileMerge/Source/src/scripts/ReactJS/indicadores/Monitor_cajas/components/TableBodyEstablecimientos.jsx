
import React from 'react';

const Checar = (dato) => dato ? "green" : "red";

const TableBodyEstablecimientos = ({ list, seleccion, mes, IndicadorMonitor }) => {
    const Lista = () => {
        //componente privado que genera y calcula las filas
        const Dato = ({ e }) => {
            //inicializa variables
            var venta = 0, cancelacion = 0, diferencia = 0, corte = 0, total = 0;
            //lista de resultados
            const res = list.filter(d => d.cod_estab_venta == e.cod_estab_venta && d.mes == mes);
            //recorre el filtro para sumar los valores
            res.forEach(r => {
                venta += r.indicador_venta_x100;
                cancelacion += r.indicador_diferencias_x1000;
                diferencia += r.indicador_de_cancelaciones_x100;
                corte += r.total_diferiencia_de_corte;
                total += r.venta_por_semana_cajero;
            });
            //ajusta a dos decimales
            venta = Math.round(((venta / res.length) * 100)) / 100;
            cancelacion = Math.round(((cancelacion / res.length) * 100)) / 100;
            diferencia = Math.round(((diferencia / res.length) * 100)) / 100;
            corte = Math.round(((corte / res.length) * 100)) / 100;
            total = Math.round(((total / res.length) * 100)) / 100;
            //indicador monitor base
            var indicador_venta = IndicadorMonitor(venta, "venta");
            var indicador_cancelacion = IndicadorMonitor(cancelacion, "cancelacion");
            var indicador_diferencia = IndicadorMonitor(diferencia, "diferencia");
            //returna la fila
            return (
                <tr key={e.cod_estab_venta}>
                    <td>{e.cod_estab_venta}</td>
                    <td>{e.establecimiento}</td>
                    <td style={{ textAlign: "right" }} className={Checar(indicador_venta.estatus)}>
                        <label>{indicador_venta.indicador}</label>
                        <strong> {venta}</strong>
                    </td>
                    <td style={{ textAlign: "right" }} className={Checar(indicador_cancelacion.estatus)}>
                        <label>{indicador_cancelacion.indicador}</label>
                        <strong style={{ marginLeft: "5px" }}>{cancelacion}</strong>
                    </td>
                    <td style={{ textAlign: "right" }} className={Checar(indicador_diferencia.estatus)} >
                        <label>{indicador_diferencia.indicador}</label>
                        <strong style={{ marginLeft: "5px" }}>{diferencia}</strong>
                    </td>
                    <td style={{ textAlign: "right" }}>
                        $
                        <strong style={{ marginLeft: "5px" }}>{corte}</strong>
                    </td>
                    <td>
                        $
                        <strong>{total}</strong>
                    </td>
                    <td>
                        <i className="btn btn-info glyphicon glyphicon-list-alt"
                            onClick={() => seleccion(e, { venta, cancelacion, diferencia })}> Indicadores</i>
                    </td>
                </tr>
            );
        }

        const lista = [];//listas que contendra todas las filas
        var folio = 0;//folio para filtrar

        list.sort((a, b) => a.cod_estab_venta > b.cod_estab_venta ? 1 : -1);//ordenamiento de establecimientos

        list.forEach(e => {
            if (folio != e.cod_estab_venta) {
                folio = e.cod_estab_venta;
                lista.push(<Dato e={e} key={e.cod_estab_venta} />);
            }
        });

        return lista;
    }

    return (
        <div className="panel-body" style={{ height: "560px" }}>
            <div style={{ height: "540px", overflow: "auto" }}>
                <table className="table">
                    <thead>
                        <tr style={{ background: "#0194ae" }} >
                            <th style={{ width: "40px", color: "azure", fontSize: "18px", background: "#0194ae" }}>Folio</th>
                            <th style={{ color: "azure", fontSize: "18px", background: "#0194ae" }}>Establecimiento</th>
                            <th style={{ width: "130px", color: "azure", background: "#0194ae" }}>Venta x 100</th>
                            <th style={{ width: "130px", color: "azure", background: "#0194ae" }}>Cancelaciones x 100</th>
                            <th style={{ width: "130px", color: "azure", background: "#0194ae" }}>Diferencia x 10,000</th>
                            <th style={{ width: "90px", color: "azure", background: "#0194ae" }}>Diferencia Cortes</th>
                            <th style={{ width: "70px", color: "azure", background: "#0194ae"}}>Venta Total</th>
                            <th style={{ width: "70px", color: "azure", background: "#0194ae" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Lista />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableBodyEstablecimientos;