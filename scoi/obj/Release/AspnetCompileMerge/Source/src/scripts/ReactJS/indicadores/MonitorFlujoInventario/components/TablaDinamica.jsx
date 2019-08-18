
import React, { useState,Fragment } from 'react';
import Moneda from '../../../ComponentesGlobales/Moneda';

const TablaDinamica = ({ monitores }) => {  
    return monitores.length > 0 ? (<div class="panel-body">
        <div style={{ overflow: "auto", maxHeight: "550px" }}>
            <table class="table">
                <thead>
                    <tr class="bg-blue" style={{ background: "#0d47a1" }}>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Conceptos</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Inventario Inicial</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Compras</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Ventas</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Disminuciones</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Loteos</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Transferencias</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Recepcion De Transferencia</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Aumentos de Inventarios</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Inventario Calculado</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Inventario Final</th>
                        <th class="bg-blue" style={{ background: "#0d47a1 " }}>Diferencia</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        monitores.map(e => <FilaEstablecimiento establecimiento={e} />)
                    }
                </tbody>
            </table>
        </div>
    </div>) : <div class="panel-body bg-warning" style={{justifyContent:"center",alignContent:"center",textAlign:"left",alignItems:"center"}}>
            <h4>Sin Datos A Mostrar ...</h4>
        </div>;
}

const Celda = ({ valor }) => <td>
    <Moneda cantidad={valor} />
</td>

const TotalConceptos = ({ parametro }) => <Fragment>
    <Celda valor={parametro.inventario_inicial} />
    <Celda valor={parametro.compras} />
    <Celda valor={parametro.ventas_netas} />
    <Celda valor={parametro.movimientos_internos} />
    <Celda valor={parametro.loteos_y_mermas} />
    <Celda valor={parametro.transferencias} />
    <Celda valor={parametro.recepciones} />
    <Celda valor={parametro.aumento_inventario} />
    <Celda valor={parametro.inventario_final_real} />
    <Celda valor={parametro.inventario_final} />
    <Celda valor={parametro.inventario_diferencia} />
</Fragment>;

const FilaEstablecimiento = ({ establecimiento }) => {
    //variables
    const lista = [];
    //estados
    const [toggle, setToggle] = useState(false);

    //eventos
    const btn_toggle = !toggle ? "btn fa fa-plus" : "btn fa fa-minus";
    //cfd8dc
    lista.push(<tr style={{ color: "#000", textAlign: "right", background: "#fff9c4" }}>
        <td style={{ textAlign: "left" }}>
            <label class={btn_toggle} onClick={() => setToggle(!toggle)}>{" " + establecimiento.nombre}</label>
        </td>
        <TotalConceptos parametro={establecimiento} />
    </tr>);

    !toggle || lista.push(establecimiento.clases.map(e => <FilaCLases clases={e} />));

    return lista;
}

const FilaCLases = ({ clases }) => {
    //variables
    const lista = [];
    //estados
    const [toggle, setToggle] = useState(false);

    //eventos
    const btn_toggle = !toggle ? "btn fa fa-plus" : "btn fa fa-minus";

    lista.push(<tr style={{ color: "#000", textAlign: "right", background:"#e1f5fe" }}>
        <td style={{ textAlign: "left" }}>
            <label class={btn_toggle} onClick={() => setToggle(!toggle)} style={{marginLeft:"10px"}}>{" " + clases.nombre}</label>
        </td>
        <TotalConceptos parametro={clases} />
    </tr>);

    !toggle || lista.push(clases.categorias.map(e => <FilaCategoria categoria={e} />));

    return lista; 
}

const FilaCategoria = ({ categoria }) => {
    //variables
    const lista = [];
    //estados
    const [toggle, setToggle] = useState(false);

    //eventos
    const btn_toggle = !toggle ? "btn fa fa-plus" : "btn fa fa-minus";

    lista.push(<tr style={{ color: "#000", textAlign: "right", background:"#f5f5f5" }}>
        <td style={{ textAlign: "left" }}>
            <label class={btn_toggle} onClick={() => setToggle(!toggle)} style={{ marginLeft: "20px" }}>{" " + categoria.nombre}</label>
        </td>
        <TotalConceptos parametro={categoria} />
    </tr>);

    !toggle || lista.push(categoria.familias.map(e => <FilaFamilia familia={e} />));

    return lista;
}

const FilaFamilia = ({ familia }) => {
    const mostrar_productos = () => {
        console.log("Productos =>",familia.productos)
    }

    return (<tr style={{ color: "#000", textAlign: "right" }}>
        <td style={{ textAlign: "left" }}>
            <label style={{ marginLeft: "30px" }} class="btn fa fa-list" onClick={mostrar_productos}>{" " + familia.nombre}</label>
        </td>
        <TotalConceptos parametro={familia} />
    </tr>);
}

export default TablaDinamica;