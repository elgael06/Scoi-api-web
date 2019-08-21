//libreria
import React, { useState } from 'react';
import Axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

//componentes
import Seleccion from './Seleccion';

//Funcion Principal
const Filtros = ({ datos, restore, AsignarFiltrado }) => {
    //props 
    const { categorias,
        clases,
        colores,
        dia_semana,
        establecimientos,
        familias,
        fechas ,
        lineas ,
        marca ,
        modelos ,
        semanas ,
        tallas ,
        tipo_venta
    } = datos;
    //estados
    const [filtros, setFiltros] = useState({
        categorias: categorias[0],
        clases: clases[0],
        colores: colores[0],
        dia_semana: dia_semana[0],
        establecimientos: establecimientos[0],
        familias: familias[0],
        fechas: fechas[0],
        lineas: lineas[0],
        marca: marca[0],
        modelos: modelos[0],
        semanas: semanas[0],
        tallas: tallas[0],
        tipo_venta: tipo_venta[0]
    });

    const [consulta_activa, setActiva] = useState(false);

    //funciones
    const evento = () => notify.show("Consulta Terminada ...", "success", 1000, { background: '#54a2eb', text: "#FFFFFF" });

    const consultar = () => {
        setActiva(true)
        Axios.post("/api/MonitorVentas", filtros)
            .catch(e => {
                //console.log(e)
                setActiva(false)
            })
            .then(res => {
                //console.log(res)
                if (res.status == 200) {
                    AsignarFiltrado(res.data);
                }
                evento()
                setActiva(false)
            })
    }

    const cambioFiltro = (filtro,value) => {
        let valor = filtros;
        valor[filtro] = value;
        setFiltros(valor);
        consultar();
    }

    return <div>
        <div class="btn btn-link" style={{ float: "right", marginTop: "-38px" }} onClick={restore}>
            <i class="fa fa-arrow-left"> </i>
            {" "}Regresar.
        </div>
        <div class="row">
            <Seleccion title={"Categoria"} values={categorias} eventChange={e => cambioFiltro("categorias", e.target.value)} disable={consulta_activa} />
            <Seleccion title={"Color"} values={colores} eventChange={e => cambioFiltro("colores", e.target.value)} disable={consulta_activa} />
            <Seleccion title={"Clase"} values={clases} eventChange={e => cambioFiltro("clases", e.target.value)} disable={consulta_activa}/>
            <Seleccion title={"Dia"} values={dia_semana} eventChange={e => cambioFiltro("dia_semana", e.target.value)} disable={consulta_activa}/>
            <Seleccion title={"Establecimiento"} values={establecimientos} eventChange={e => cambioFiltro("establecimientos", e.target.value)} disable={consulta_activa}/>
            <Seleccion title={"Familia"} values={familias} eventChange={e => cambioFiltro("familias", e.target.value)} disable={consulta_activa}/>
            <Seleccion title={"Fecha"} values={fechas} eventChange={e => cambioFiltro("fechas", e.target.value)} disable={consulta_activa}/>
            <Seleccion title={"Linea"} values={lineas} eventChange={e => cambioFiltro("lineas", e.target.value)} disable={consulta_activa}/>
            <Seleccion title={"Marca"} values={marca} eventChange={e => cambioFiltro("marca", e.target.value)} disable={consulta_activa}/>
            <Seleccion title={"Modelo"} values={modelos} eventChange={e => cambioFiltro("modelos", e.target.value)} disable={consulta_activa}/>
            <Seleccion title={"Talla"} values={tallas} eventChange={e => cambioFiltro("tallas", e.target.value)} disable={consulta_activa}/>
            <Seleccion title={"Tipo "} values={tipo_venta} eventChange={e => cambioFiltro("tipo_venta", e.target.value)} disable={consulta_activa} />
        </div>
        <Notifications options={{ zIndex: 200, top: '50px', textAlign: "right" }} />
    </div>;
}


export default Filtros;