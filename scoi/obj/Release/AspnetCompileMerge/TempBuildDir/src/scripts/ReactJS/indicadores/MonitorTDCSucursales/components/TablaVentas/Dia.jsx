//Libreria
import React from 'react';

//componentes
import FilaConcepto from './FilaConcepto';
import Clases from './Clases';


const Dia = ({ monitor, consulta }) => <FilaConcepto
    monitor={monitor}
    Children={Clases}
    subConcepto={"Clases"}
    left={15}
    consulta={consulta}
    color={{ background: "#fff9c4", color: "#000" }}
/>

export default Dia;