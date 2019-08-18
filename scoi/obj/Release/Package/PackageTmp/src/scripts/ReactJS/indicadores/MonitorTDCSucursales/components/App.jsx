//Librerias
import React, { useState } from 'react';
import Axios from 'axios';

//Componentes
import CaveceraConsulta from './CaveceraConsulta';
import Filtros from './Filtros';
import TablaVentas from './TablaVentas';

//Variables Globales
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    parametrosRespuesta = {
        categorias: [],
        clases: [],
        colores: [],
        dia_semana: [],
        establecimientos: [],
        familias: [],
        fechas: [],
        lineas: [],
        marca: [],
        modelos: [],
        respuesta: [],
        semanas: [],
        tallas: [],
        tipo_venta: []
    };

const App = () => {
    //estados
    const [mes, setMes] = useState(meses[new Date().getMonth()]);
    const [semanasMes, setSemanasMes] = useState([]);
    const [respuesta, setRespuesta] = useState(parametrosRespuesta);

    //metodos
    semanasMes.length > 0 || Axios.get("/api/SemanasMesFecha")
        .then(res => {
            console.log(res);
            if (res.status==200) {
                setMes(res.data.nombre);
                setSemanasMes(res.data.semanas);
            }
        })
        .catch(err => console.log("Errror..."));

    const AsignarFiltrado = datos_filtrados => {
        setRespuesta( {
            categorias: respuesta.categorias,
            clases: respuesta.clases,
            colores: respuesta.colores,
            dia_semana: respuesta.dia_semana,
            establecimientos: respuesta.establecimientos,
            familias: respuesta.familias,
            fechas: respuesta.fechas,
            lineas: respuesta.lineas,
            marca: respuesta.marca,
            modelos:respuesta.modelos,
            respuesta: datos_filtrados,
            semanas: respuesta.semanas,
            tallas: respuesta.tallas,
            tipo_venta: respuesta.tipo_venta
        });


    }

    return (<div class="panel panel-default">
        <div class="panel panel-heading">
            <label>Monitor De Ventas</label>
           
            {
                respuesta.respuesta.length == 0
                    ? <CaveceraConsulta mes={mes} semanasMes={semanasMes} setData={setRespuesta} />
                    : <Filtros datos={respuesta} restore={() => setRespuesta(parametrosRespuesta)} AsignarFiltrado={AsignarFiltrado} />
            }
        </div>
        <TablaVentas monitor={respuesta.respuesta} />
    </div>);
}

export default App;