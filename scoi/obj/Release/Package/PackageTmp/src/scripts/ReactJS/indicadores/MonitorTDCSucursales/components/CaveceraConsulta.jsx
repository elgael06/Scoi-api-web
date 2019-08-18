import React, { useState } from 'react';
import Axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

const CaveceraConsulta = ({ mes, semanasMes,setData }) => {
    //estados
    const [consulta, setConsulta] = useState(false);
    const [semanas, setSemanas] = useState([]); 

    //funciones
    const consultar = () => {
        setConsulta(true);
        console.log("Semanas : ", semanas.filter(e => e.value !== "Todos"));

        Axios.get("/api/MonitorVentas")
            .catch(e => {
                console.error(e);
                notify.show("Error !!!" + e, "error", 4000);
                setConsulta(false);
            })
            .then(res => {
                //console.log(res)
                if (res.status == 200) {
                    setTimeout(() => setConsulta(false), 1000);
                    notify.show("Listo, La Consulta A Finalizado Con Exito !!!", "success", 5000, { background: '#54a2eb', text: "#FFFFFF" });
                    setData(res.data);
                }
        })
    }
    const BtnConsulta =()=> !consulta ? <span class="btn btn-success btn-block" onClick={consultar}>
        <label> Consultar</label>
        <i class="fa fa-send"></i>
    </span>
        : <span class="btn btn-warning btn-block "><i class="fa fa-spinner rotate"></i> Espere ... </span>;

    const check_seleccion = semana => semanas.findIndex(e => e.value == semana.value) > -1 ? "fa fa-check-circle-o " :"fa fa-circle-o";

    const agrgar_semana = semana => {
        
        let indice = semanas.findIndex(s => s.value === semana.value);
        let filtro = semanas.map(e => e);

        if (indice === -1 && semana.value !== "Todos") {
            filtro.push(semana);
            filtro = filtro.length === semanasMes.filter(e => e.value !== "Todos").length ? semanasMes : filtro;
        } else if (indice > -1 && semana.value === "Todos") 
            filtro = [];
        else if (indice === -1 && semana.value === "Todos")
            filtro = semanasMes.map(e => e);
        else 
            filtro = filtro.filter(e => e.value !== semana.value && e.value !== "Todos");

        setSemanas(filtro);
    }
    const semanas_seleccionadas = semanas.filter(e => e.value !== "Todos").length;
    const total_semanas = semanasMes.filter(e => e.value !== "Todos").length;
    const cumple_semanas = (semanas_seleccionadas === total_semanas) ? "btn btn-primary  btn-block  dropdown-toggle" : semanas_seleccionadas == 0 ?"btn btn-danger  btn-block  dropdown-toggle" : "btn btn-warning  btn-block  dropdown-toggle";

    return (<div class="row">
        <div class="col-sm-4 col-lg-3 col-xl-2">
            <span class="form-control">{mes}</span>
        </div>
      
        <div class="col-sm-4 col-lg-3 col-xl-2">
            <BtnConsulta />
        </div>
        <Notifications options={{ zIndex: 200, top: '50px', textAlign: "right" }} />
    </div>);
}

const ProgressBar = ({ value }) => {
    let progreso = `${(parseFloat(value) * 100) | 0}%`;
    return (<div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow={(parseFloat(value) * 1000) | 0}
            aria-valuemin="0" aria-valuemax="100" style={{ width: progreso }}>
            <span class="sr-only"> {progreso} Semanas</span>
        </div>
    </div>);
}

const BtnSemanas = ({ semanasMes, agrgar_semana }) => <div class="col-sm-4 col-lg-3 col-xl-2 dropdown">
    <button class={cumple_semanas} data-toggle="dropdown">
        <label >Semanas Mes <span class="caret"></span></label>
    </button>
    <ul class="dropdown-menu col-sm-12">
        {
            semanasMes.map(e => <li onClick={() => agrgar_semana(e)} style={{ padding: "10px", fontSize: "15px", textAlign: "center" }} class="btn btn-default btn-block" key={e.value}>
                <i class={check_seleccion(e)} style={{ float: "right", fontSize: "17px" }}></i>
                <label>{" " + e.text} </label>
            </li>)
        }
    </ul>
</div>

export default CaveceraConsulta;