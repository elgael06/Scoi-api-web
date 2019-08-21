//Libreria
import React from 'react';

//componentes
import FilaConcepto from './FilaConcepto';
import FilaProductos from './FilaProductos';


const Familia = ({ monitor, consulta }) => <FilaConcepto
    monitor={monitor}
    Children={FilaProductos}
    subConcepto={"Productos"}
    left={60}
    consulta={consulta}
    color={{ background: "#fafafa", color: "#000" }}
/>

export default Familia;