//libreria
import React, { useState } from 'react';

//conexiones
import obtener_foto_empleado from '../../../../../../Globales/obtener_foto_empleado';


const DetallesColaborador = ({ detalles }) => {
    //estados
    const [foto, setFoto] = useState("");
    //props
    const { folio, nombre } = detalles;
    //funciones
    const obtener_foto = async () => {
        if (folio !== "") {
            let f = await obtener_foto_empleado(folio);
            setFoto(f);
        } else {
            console.log("Sin Folio");
        }
    }

    obtener_foto();

    return (<div className="row">
        <div className=" col-sm-2">
            <img src={foto} height="70" width="70" style={{ float: "right" }} class="img-circle" alt={folio} />
        </div>
        <div className=" col-sm-2">
            <label>Folio :</label>
            <i className="form-control" style={{ textAlign: "right" }}>{folio}</i>
        </div>
        <div className=" col-sm-7">
            <label>Nombre :</label>
            <i className="form-control">{nombre}</i>
        </div>

    </div>);
}

export default DetallesColaborador;