//libreria
import React from 'react';

//componentes
import FilaTicket from './FilaTicket';

const TablaAsignacion = ({ tickets }) => {
    const cavecera = ["", "Tikcet", "Importe", "Descuento", "Margen", "Piezas", "Utilidad", "Hora", "Fecha"];
    return (<table className="table">
        <thead>
            <tr>
                {cavecera.map(e => <th className="active">{e}</th>)}
            </tr>
        </thead>
        <tbody>
            {tickets.map(e => <FilaTicket ticket={e} />)}
        </tbody>
    </table>);
}


export default TablaAsignacion;