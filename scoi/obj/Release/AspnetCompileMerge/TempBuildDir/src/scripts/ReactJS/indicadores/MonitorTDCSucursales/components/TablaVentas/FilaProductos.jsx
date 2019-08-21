//Libreria
import React from 'react';

//componentes
import Fila from './Fila';

//Fila Final
const FilaProductos = ({ monitor, consulta }) => <tr onClick={() => consulta(monitor.codigo_producto)} style={{ background: "#FFF", color: "#000", marginLeft: 65 }} title={monitor.codigo_producto}> <Fila datos={monitor} >
    <label class="btn-default fa fa-arrow-right" style={{ background: "#FFF", color: "#000", marginLeft: 65 }}>{monitor.clasificador}</label>
</Fila></tr>;

export default FilaProductos;