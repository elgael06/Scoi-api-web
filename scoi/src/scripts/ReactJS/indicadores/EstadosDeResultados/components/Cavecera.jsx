
import React, { useState } from 'react';
import ExportToExcel from '../../../../Globales/ExportarExcel';
import {fecha_hoy_yyyy_mm_dd, parseo_fecha} from '../../../../Globales/fechas';
import PeriodosFecha from '../manager/PeriodosFecha';

const Cavecera = ({ evReload, lista, restaurar}) => {
    const [date, setDate] = useState(fecha_hoy_yyyy_mm_dd());
    const [periodo, setPeriodo] = useState(0);

    const consultar = () => {
        let fecha = parseo_fecha(date);
        evReload(fecha, periodo);
    }
    console.log("date:", date)
    return (<div className="panel-heading">
        <h3>Estado De Resultados De Operaciones.</h3>
        {lista.length == 0 ?
         <div>
             <span style={{ display: "inline-block", width: "150px" }} >
                <strong> Rango Fecha</strong>
                <select
                    defaultValue={periodo}
                    className="form-control"
                    onChange={e => setPeriodo(e.target.value)}>
                    {PeriodosFecha.map(e => <option value={e.value} key={e.value}>{e.text}</option>)}
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
        </div> :
        <Regregar restaurar={restaurar} Periodo={periodo} Fecha={date} />}
    </div>);
}

const Regregar = ({ restaurar, Periodo, Fecha }) => {
    const onExcel = () => ExportToExcel("estado_de_resultados", "estado_de_resultados-" + Fecha);

    return (<div className="panel-heading">
        <h5>
            <strong>Rango  :</strong>
            Periodo {PeriodosFecha.find(e => e.value == Periodo).text}, <label>{parseo_fecha(Fecha)}.</label>
        </h5>
        <i class="btn btn-warning fa fa-close" onClick={restaurar}> Regresar</i>
        <i class="btn btn-primary fa fa-file-excel-o" style={{ float: "right" }} onClick={onExcel} > <label>Guardar A Excel.</label></i>
    </div>);
}

export default Cavecera;