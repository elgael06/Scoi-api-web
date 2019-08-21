
import React, { useState, Component } from 'react';

const Header = ({ titulo, fecha, evento, recargar }) => {
    return (
        <div className="panel-heading" style={{ "display": "flex", "top": "-10px" }}>
            <span>
                <h3>{titulo}</h3>
            </span>
            <Fecha />
            <i className="btn btn-default fa fa-download"
                onClick={recargar}
                style={{ "marginTop": "20px", "marginLeft": "20px", "fontSize": "20px" }}>
                <strong style={{ marginLegt: "5px", fontSize: "15px" }}> Cargar Informacion. </strong>
            </i>
        </div>
    );
    function Fecha() {
        return (
            <div className="group-control" style={{ "width": "170px", "display": "inline-block", "marginLeft": "15px" }}>
                <strong>Fecha</strong>
                <input type="date" className="form-control" value={fecha} onChange={evento} />
            </div>);
    }
}

export default Header;