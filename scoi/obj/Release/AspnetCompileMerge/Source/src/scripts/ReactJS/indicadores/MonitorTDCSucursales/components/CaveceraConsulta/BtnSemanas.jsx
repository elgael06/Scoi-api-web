import React from 'react';

const BtnSemanas = ({ semanasMes, agrgar_semana }) => <div class="col-sm-4 col-lg-3 col-xl-2 dropdown">
    <button class={cumple_semanas} data-toggle="dropdown">
        <label >Semanas Mes <span class="caret"></span></label>
    </button>
    <ul class="dropdown-menu col-sm-12">
        {
            semanasMes.map(e => <li onClick={() => agrgar_semana(e)} style={{ padding: "10px", fontSize: "15px", textAlign: "center" }} class="btn btn-default btn-block" key={e.value}>
                <i class={check_seleccion(e)} style={{ float: "right", fontSize: "17px" }}></i>
                <label>{" " + e.text} </label>
            </li>)
        }
    </ul>
</div>;

export default BtnSemanas;