import React, { useState } from 'react';
import accesos_url from '../conexiones/obtenerMenus';
import AppMenu from '../conexiones/AppMenu';

const App = () => {
    //estado
    const [accesos, setAccesos] = useState([]);
    const [conexion, setConexion] = useState(false);
    //funciones
    const asignar_accesos = lista => {
        setAccesos(lista);
        setConexion(true);
        lista.length > 0 || sin_accesos()
    }
    const sin_accesos = () => {
        console.log("Sin Accesos");
    }
    //comprobamos accesos
    conexion || accesos_url(asignar_accesos);

    return (<div>
        {accesos.map(e => <AppMenu menu={e} key={e.Menu} />)}
    </div>);
}

export default App;