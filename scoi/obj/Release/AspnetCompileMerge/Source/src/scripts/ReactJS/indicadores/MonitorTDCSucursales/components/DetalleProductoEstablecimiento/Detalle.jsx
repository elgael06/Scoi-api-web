//libreria
import React from 'react';


const Detalle = ({ detalle }) => <div className="row">
    <label className="col-sm-3">Establecimiento :</label>
    <label className="col-sm-8">
        <div className="form-control"> {detalle.establecimiento}</div>
    </label>
    <label className="col-sm-2">Producto :</label>
    <label className="col-sm-2">
        Codigo :
        <div className="form-control" style={{ textAlign: "right" }}> {detalle.codigo_producto}</div>
    </label>
    <label className="col-sm-8">
        Descripcion :
        <div className="form-control"> {detalle.descripcion_producto}</div>
    </label>
</div>;

export default Detalle;