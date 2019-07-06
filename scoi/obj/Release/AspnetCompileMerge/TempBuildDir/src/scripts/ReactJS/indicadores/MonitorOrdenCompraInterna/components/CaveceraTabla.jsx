import React from "react";
import { obtener_semanas_ocupadas_por_anio } from '../metodos/manejoSemanas';

const CaveceraTabla = ({ lista }) => {
    let resultados = [],
        meses = [],
        semanas = [],
        anios = obtener_semanas_ocupadas_por_anio(lista);

    resultados.push(
        <tr>
            <th class="bg-primary" rowSpan="3" colSpan="2" style={{ textAlign: "center" }}>
                <label>ORDENES</label>
            </th>
            {anios.map(e => {
                meses = meses.concat(e.meses) || meses;
                return (
                    <th
                        class="bg-primary"
                        colSpan={e.cantidad_semanas}
                        style={{ textAlign: "center" }}
                    >
                        {e.anio}
                    </th>
                );
            })}
            <th class="bg-primary" rowSpan="3" style={{ textAlign: "center" }}>
                <label>TOTAL</label>
            </th>
        </tr>
    );
    resultados.push(
        <tr>
            {meses.map(e => {
                semanas = semanas.concat(e.semanas) || semanas;
                return (
                    <th
                        class="bg-primary"
                        colSpan={e.cantidad_semanas}
                        style={{ textAlign: "center", top:"28px" }}
                    >
                        {e.mes}
                    </th>
                );
            })}
        </tr>
    );
    //semanas.sort((a, b) => (a.Semana_anio > b.Semana_anio ? 1 : -1));
    resultados.push(
        <tr>
            {semanas.map(e => {
                return (
                    <th class="bg-primary" style={{ textAlign: "center", top: "55px" }}>
                        {e.Semana_anio}
                    </th>
                );
            })}
        </tr>
    );

    return <thead style={{ textAlign: "center" }}>{resultados}</thead>;
};


export default CaveceraTabla;