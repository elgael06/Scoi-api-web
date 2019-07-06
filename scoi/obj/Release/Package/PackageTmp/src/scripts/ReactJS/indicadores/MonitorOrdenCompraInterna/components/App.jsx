import React, { useState } from 'react';
import Cavecera from './Cavecera'
import TablaOrdenes from './TablaOrdenes'

export default function App() {
    const [ordenes, setOrdenes] = useState([]);
    const [ordeneSeleccion, setOrdeneSeleccion] = useState({});

    const asignarOrdenes = (lista) => {
        console.log("Respuesta Compras =>", lista);
        setOrdenes(lista)
    }

    return (
        <div class="panel panel-default">
            <Cavecera
                asignarOrdenes={asignarOrdenes}
            />
            <TablaOrdenes
                liata={ordenes}
                optenerDetale={optenerDetale}
            />
        </div>
        );
}

const optenerDetale = (orden) => {
    console.log(orden)
}