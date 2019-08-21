//Libreria
import React from 'react';

//componentes
import FilaConcepto from './FilaConcepto';
import Familia from './Familia';

const Categoria = ({ monitor, consulta }) => <FilaConcepto
    monitor={monitor}
    Children={Familia}
    subConcepto={"Familias"}
    left={45}
    consulta={consulta}
    color={{ background: "#f5f5f5", color: "#000" }}
/>

export default Categoria;