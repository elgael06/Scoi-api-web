//Libreria
import React from 'react';
import dia_semana from '../../../../../Globales/Ordenamiento/dia_semana';

//componentes
import FilaConcepto from './FilaConcepto';
import Dia from './Dia';

//Componentes Por Concepto
const Establecimiento = ({ monitor, consulta }) => {
    monitor.Dias = dia_semana(monitor.Dias);
    return <FilaConcepto
        monitor={monitor}
        Children={Dia}
        subConcepto={"Dias"}
        consulta={producto => consulta(producto, monitor.codigo_establecimiento)}
        color={{ background: "#ffff8d", color: "#000" }}
    />
}

export default Establecimiento;