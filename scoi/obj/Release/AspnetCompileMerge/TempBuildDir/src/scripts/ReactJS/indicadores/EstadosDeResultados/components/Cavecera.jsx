
import React, { useState } from 'react';
import ExportToExcel from '../../../../Globales/ExportarExcel';

const Cavecera = ({ periodo, fecha, evPeriodo, evFecha, evReload }) => {
    ///<-----------------------------------------------------------------
    const [existe, setExiste] = useState(false);
    const CompSelect = () => {
        return (<div>
            <span style={{ display: "inline-block", width: "150px" }} >
                <strong> Periodo</strong>
                <select defaultValue={periodo}
                    className="form-control"
                    onChange={evPeriodo}>
                    <option value="0">
                        ACTUAL
                        </option>
                    <optgroup label="PREVIOS">
                        <option value={1}>
                            1 Mes
                            </option>
                        <option value={2}>
                            2 Meses
                            </option>
                        <option value={3}>
                            3 Meses
                            </option>
                    </optgroup >
                </select>
            </span>
            <span style={{ display: "inline-block", width: "150px", marginLeft: "15px", marginRight: "35px" }} >
                <strong>Fecha</strong>
                <input type="date"
                    className="btn btn-default"
                    onChange={evFecha}
                    value={fecha}
                />
            </span>
            <i className="btn btn-success"
                style={{ marginLeft: "15px" }}
                onClick={() => {
                    evReload();
                    setExiste(true)
                }}>
                <strong>Cargar Informacion.</strong>
                <i className="fa fa-download" style={{ marginLeft: "5px" }}></i>
            </i>
            {
                !existe ||   
                <i class="btn btn-primary fa fa-file-excel-o" onClick={() => { ExportToExcel("estado_de_resultados", "estado_de_resultados-" + fecha) }} > <label>Guardar A Excel.</label></i>
            }
        </div>);
    }
    return (<div className="panel-heading">
        <h3>Estado De Resultados De Operaciones.</h3>
        <CompSelect />
    </div>);
}


export default Cavecera;