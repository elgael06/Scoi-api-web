//Libreria
import React from 'react';

export default function Porcentaje({ valor }){
    let dato = Math.round(valor * 100) / 100 || 0;
    return (<label>{dato}%</label>);
}