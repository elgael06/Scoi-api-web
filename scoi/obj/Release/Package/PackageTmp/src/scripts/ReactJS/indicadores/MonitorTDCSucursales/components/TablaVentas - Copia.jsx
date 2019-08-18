//Libreria
import React, { useState } from 'react';
//Variables
const componentesTabla = [" Venta 2019", "Venta Anterior", "Venta 2018", " % Crec 18 vs 19", "Deficit o Crec", "pz 2019", "pz Anterior", "pz 2018", "Margen 18", "Margen Ant", "Margen 19", "Def o Crec Margen"];

const TablaVentas = ({ monitor }) => {
    console.log("Monitor=>", monitor);

    return <div class="panel panel-body" >
        <div style={{ overflow: "auto", maxHeight: "500px" }}>
            <table class="table">
                <thead>
                    <tr style={{ background: "#1e88e5", color:"#FFF"}}>
                        <th style={{ background: "#1e88e5", color: "#FFF" }}>Concepto</th>
                        {componentesTabla.map(e => <th style={{ background: "#1e88e5", color: "#FFF" }}>{e}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {monitor.map(e => <FilaEstablecimiento monitor={e} />)}
                </tbody>
            </table>
        </div>
    </div>
}

const Fila = ({ children, datos }) => {   
    return (<tr>
        <td>     
            {children}
        </td>
        <td>{datos.venta_actual}</td>
        <td>{datos.venta_semana_pasado}</td>
        <td>{datos.venta_anterior}</td>
        <td>{datos.crecimiento_actual_anterior}</td>
        <td>{datos.diferencia_actual}</td>
        <td>{datos.piezas_actual}</td>
        <td>{datos.piezas_anterior}</td>
        <td>{datos.margen_semana_pasado}</td>
        <td>{datos.margen_anterior}</td>
        <td>{datos.margen_semana_pasado}</td>
        <td>{datos.margen_actual}</td>
    </tr>);
}

const FilaEstablecimiento = ({ monitor }) => {
    //estados
    const [toggle, setToggle] = useState(true);
    //eventos
    const icono = toggle ? "btn-default fa fa-plus" : "btn-default fa fa-minus" ;
    //variables
    let lista = [(<Fila datos={monitor} >
        <i class={icono} onClick={() => setToggle(!toggle)}>
            {" " + monitor.clasificador}
        </i>
    </Fila>)];
    //this condition check status toggle bottom children
    toggle || lista.push(monitor.Dias.map(e => <FilaDia monitor={e} key={e.clasificador} />));

    return lista;
}

const FilaDia = ({ monitor }) => {
    //estados
    const [toggle, setToggle] = useState(true);
    //eventos
    const icono = toggle ? "btn-default fa fa-plus" : "btn-default fa fa-minus";
    //variables
    let lista = [(<Fila datos={monitor} >
        <i class={icono} onClick={() => setToggle(!toggle)}>
            {" " + monitor.clasificador}
        </i>
    </Fila>)];
    //this condition check status toggle bottom children
    toggle || lista.push(monitor.Dias.map(e => <FilaClase monitor={e} key={e.clasificador} />));

    return lista;
}

const FilaClase = ({ monitor }) => {
    //estados
    const [toggle, setToggle] = useState(true);
    //eventos
    const icono = toggle ? "btn-default fa fa-plus" : "btn-default fa fa-minus";
    //variables
    let lista = [(<Fila datos={monitor} >
        <i class={icono} onClick={() => setToggle(!toggle)}>
            {" " + monitor.clasificador}
        </i>
    </Fila>)];
    //this condition check status toggle bottom children
    toggle || lista.push(monitor.Dias.map(e => <FilaCategoria monitor={e} key={e.clasificador} />));

    return lista;
}

const FilaCategoria = ({ monitor }) => {
    //estados
    const [toggle, setToggle] = useState(true);
    //eventos
    const icono = toggle ? "btn-default fa fa-plus" : "btn-default fa fa-minus";
    //variables
    let lista = [(<Fila datos={monitor} >
        <i class={icono} onClick={() => setToggle(!toggle)}>
            {" " + monitor.clasificador}
        </i>
    </Fila>)];
    //this condition check status toggle bottom children
    toggle || lista.push(monitor.Dias.map(e => <FilaFamilia monitor={e} key={e.clasificador} />));

    return lista;
}

const FilaFamilia = ({ monitor }) => {
    //estados
    const [toggle, setToggle] = useState(true);
    //eventos
    const icono = toggle ? "btn-default fa fa-plus" : "btn-default fa fa-minus";
    //variables
    let lista = [(<Fila datos={monitor} >
        <i class={icono} onClick={() => setToggle(!toggle)}>
            {" " + monitor.clasificador}
        </i>
    </Fila>)];
    //this condition check status toggle bottom children
    toggle || lista.push(monitor.Dias.map(e => <FilaProductos monitor={e} key={e.clasificador} />));

    return lista;
}

const FilaProductos = ({ monitor }) => <Fila datos={monitor} >
    <i>{" " + monitor.clasificador}</i>
</Fila>;

export default TablaVentas;