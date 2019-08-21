//Libreria
import React from 'react';

//componentes
import FilaConcepto from './FilaConcepto';
import Categoria from './Categoria';

const Clases = ({ monitor, consulta }) => <FilaConcepto
    monitor={monitor}
    Children={Categoria}
    subConcepto={"Categorias"}
    left={30}
    consulta={consulta}
    color={{ background: "#fff3e0", color: "#000" }}
/>

export default Clases;