//libreria
import React from 'react';


const Seleccion = ({ title, values, eventChange, disable }) => <div class="col-sm-3 col-lg-2 col-xl-1">
    <label>{title}</label>
    <select class="form-control" onChange={eventChange} disabled={disable}>
        {
            values.map(e => <option value={e} key={e}>{e}</option>)
        }
    </select>
</div>;

export default Seleccion;