//Librerias
import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';
//conexion
import consultar_detalle_producto_establecimiento from '../conexion/consultar_detalle_producto_establecimiento';
//Componentes
import CaveceraConsulta from './CaveceraConsulta';
import Filtros from './Filtros';
import TablaVentas from './TablaVentas';
import DetalleProductoEstablecimiento from './DetalleProductoEstablecimiento';

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
    const [detalles, setDetalles] = useState(null);

    useEffect(() => {
        document.querySelector("#detall_eproducto").style.display = detalles != null ? "flex" : "none";
    });

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

    const consultarDetalleVenta = async (producto,establecimiento) => {
        let datos = await consultar_detalle_producto_establecimiento(producto, establecimiento);
        if (datos != null) {
            console.log("listo=>", datos);
            setDetalles(datos);
        }
        else {
            let mensaje = "Solo Puede Consultar Productos Que Cuenten Con Venta El Año Actual !!!";
            console.log(mensaje);
            notify.show(mensaje, "warning", 8000, { background: '#54a2eb', text: "#FFFFFF" });
            setDetalles(null);
        }
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
        <TablaVentas monitor={respuesta.respuesta} detalle={consultarDetalleVenta} />
        <DetalleProductoEstablecimiento venta={detalles} />
        <Notifications options={{ zIndex:9999, top: '5px', textAlign: "right" }} />
    </div>);
}

export default App;