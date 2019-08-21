//Libreria
import React, { useState } from 'react';

//componentes
import Fila from './Fila';

//Filas Conceptos
const FilaConcepto = ({ monitor, Children, subConcepto, color, left, consulta }) => {
    //estados
    const [toggle, setToggle] = useState(true);
    //eventos
    const icono = toggle ? "btn-default fa fa-plus" : "btn-default fa fa-minus";
    //variables
    let color_ = color ? color : { background: "#FFF", color: "#000" };
    let lista = [(<tr style={color_}><Fila datos={monitor}>
        <label class={icono} style={{ background: color_.background, color: color_.color, marginLeft: left || 0 }} onClick={() => setToggle(!toggle)}>{" " + monitor.clasificador}</label>
    </Fila></tr>)];
    //this condition check status toggle bottom children
    toggle || lista.push(monitor[subConcepto].map(e => <Children consulta={consulta} monitor={e} />));

    return lista;
}

export default FilaConcepto;