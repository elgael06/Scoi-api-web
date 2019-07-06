
import React, { useState } from 'react';
import ExportToExcel from '../../../../Globales/ExportarExcel';
import {fecha_hoy_yyyy_mm_dd, parseo_fecha} from '../../../../Globales/fechas';

const PeriodosFecha = [
    { value: 0, text: "Mes Fecha" },
    { value: 1, text: "Fecha Menos 1 Mes" },
    { value: 2, text: "Fecha Menos 2 Mes" },
    { value: 3, text: "Fecha Menos 3 Mes" },
    { value: 4, text: "Fecha Menos 4 Mes" },
    { value: 5, text: "Fecha Menos 5 Mes" }
];

const Cavecera = ({ evReload }) => {
    const [existe, setExiste] = useState(false);
    const [date, setDate] = useState(fecha_hoy_yyyy_mm_dd());
    const [periodo, setPeriodo] = useState(0);

    const consultar = () => {
        let fecha = parseo_fecha(date);
        console.log("fecha => ", fecha,periodo);
        evReload(fecha, periodo);
        setExiste(true);
    }
    const onExcel = () => ExportToExcel("estado_de_resultados", "estado_de_resultados-" + date);

    return (<div className="panel-heading">
        <h3>Estado De Resultados De Operaciones.</h3>
        <div>
            <span style={{ display: "inline-block", width: "150px" }} >
                <strong> Rango Fecha</strong>
                <select
                    defaultValue={periodo}
                    className="form-control"
                    onChange={e => setPeriodo(e.target.value)}>
                    {PeriodosFecha.map(e => <option value={e.value} key={e.value}>
                        {e.text}
                    </option>)}
                </select>
            </span>
            <span style={{ display: "inline-block", width: "150px", marginLeft: "15px", marginRight: "35px" }} >
                <strong>Fecha</strong>
                <input type="date"
                    className="btn btn-default"
                    onChange={e => setDate(e.target.value)}
                    value={date}
                />
            </span>
            <i className="btn btn-success"
                style={{ marginLeft: "15px" }}
                onClick={consultar}>
                <strong>Cargar Informacion.</strong>
                <i className="fa fa-download" style={{ marginLeft: "5px" }}></i>
            </i>
            { !existe || <i class="btn btn-primary fa fa-file-excel-o" onClick={onExcel} > <label>Guardar A Excel.</label></i> }
        </div>
    </div>);
}

export default Cavecera;