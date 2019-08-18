import React, { useState } from 'react';
import axios from 'axios';

import {
    fecha_hoy_yyyy_mm_dd,
    parseo_fecha
} from '../../../../Globales/fechas';

const mesesArray = [{ value: 0, text: "Mes Fecha" }, { value: 1, text: "Fecha Menos 1 mes" }, { value: 2, text: "Fecha Menos 2 meses" }, { value: 3, text: "Fecha Menos 3 meses" }];

const Cavecera = ({ setMonitores }) => {
    //estados
    const [fecha, setFeha] = useState(fecha_hoy_yyyy_mm_dd());
    const [meses, setMeses] = useState(0);
    const [conexion, setConexion] = useState(false);

    //eventos
    const consultar = () => {
        setConexion(true);
        setMonitores([]);
        axios.get(`/api/MonitorFlujoInventario`,
            {
                params: {
                    fecha: parseo_fecha(fecha),
                    meses: meses
                }
            }).then(res => {
                const data = res.data.sort((a, b) => a.nombre > b.nombre?1:-1);
                console.log("Datos:", data);
                res.status == 200 ? setMonitores(data) : alert(res.statusText);
                setConexion(false);
            }).catch(err => {
                console.log(err);
                setConexion(false);
            });
    }
    //componentes
    const Meses = () => <div class="col-sm-3 col-lg-2 col-md-6 col-xs-5">
        <label>Meses</label>
        <select class="form-control" disabled={conexion} defaultValue={meses} onChange={setMeses} >
            {
                mesesArray.map(e => <option value={e.value}>{e.text}</option>)
            }
        </select>
    </div>;

    const Fechas = () => <div class="col-sm-3 col-lg-2 col-md-6 col-xs-5">
        <label>Fecha</label>
        <input type="date" disabled={conexion} class="form-control" value={fecha} onChange={e => setFeha(e.target.value)} />
    </div>;

    const BtnConsulta = () => <div class="col-sm-3 col-lg-2 col-md-6 col-xs-5" style={{ marginTop: "22px" }}>
        {
            !conexion ? <span class="btn btn-success btn-block " onClick={consultar}> Consultar <i class="fa fa-send"></i></span> :
                <span class="btn btn-warning btn-block "><i class="fa fa-spinner rotate"></i> Espere ... </span>
        }
    </div>

    //return
    return (<div class="panel-heading" style={{padding:"10px",marginTop:"15px"}}>
        <h4>Flujo De Inventario.</h4>
        <div class="row">
            <Meses />
            <Fechas />
            <BtnConsulta />
        </div>
    </div>);
}

export default Cavecera;