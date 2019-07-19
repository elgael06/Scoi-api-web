import React, { useState } from 'react';
import Cavecera from './Cavecera'
import TablaOrdenes from './TablaOrdenes'
import VistaDetalleOrden from './VistaDetalleOrden';

const base_orden = { Folio: "", Detalle: {}, Tipo: "", Fecha_mod: "", Productos: [] }

export default function App() {
    const [ordenes, setOrdenes] = useState([]);
    const [ordeneSeleccion, setOrdeneSeleccion] = useState(base_orden);

    setTimeout(console.clear, 500);

    return (
        <div class="panel panel-default">
            <Cavecera
                asignarOrdenes={setOrdenes}
                ordenes={ordenes}
            />
            <TablaOrdenes
                liata={ordenes}
                optenerDetale={setOrdeneSeleccion}
            />
            {!ordeneSeleccion.Folio || <VistaDetalleOrden orden={ordeneSeleccion} cerrar={() => setOrdeneSeleccion(base_orden)} />}
        </div>
        );
}
