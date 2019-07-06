import React, { useState, useEffect } from 'react';

export default function SeleccionRecibe({ tipo, lista, evSeleccion, evNombre}){
    const [filtro, setFiltro] = useState("")

    const cerrar = () => {
        document.querySelector("#seleccion_recibe").style.display = "none";
    }
    const listaResultado = () => {

        return lista.filter(e => e.Nombre.toUpperCase().search(filtro.toUpperCase()) >-1)
    }
    const seleccionar = ({Folio,Nombre }) => {
        evSeleccion(Folio, "recibe")
        evNombre(Nombre)
        document.querySelector("#seleccion_recibe").style.display = "none";
    }

    return (
        <div class="modal" id="seleccion_recibe">
            <div class="panel panel-default" >
                <div class="panel-heading">
                    <i class="fa fa-close close" onClick={cerrar}></i>
                    <label>
                        Seleccionar {tipo} De Lista.
                    </label>
                </div>
                <div class="panel-body">
                    <label>{lista.length} {tipo} A Mostrar </label>
                    <div class="row">
                        <div class="form-inline col-sm-12">
                            <i class="fa fa-filter"></i>
                            <input type="text"
                                value={filtro}
                                placeholder="Filtro Nombre..."
                                class="form-control form-sm"
                                onChange={e => setFiltro(e.target.value)}
                            />
                        </div>
                    </div>
                    <div style={{ height: "460px",overflow:"auto" }} >
                        <table class="table table-stripe">
                            <thead>
                                <tr>
                                    <th class="bg-primary">Folio</th>
                                    <th class="bg-primary">Nombre</th>
                                    <th class="bg-primary">Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaResultado().map(e => <tr>
                                        <td>{e.Folio}</td>
                                        <td>{e.Nombre}</td>
                                        <td>
                                            <i class="btn btn-primary fa fa-list" onClick={() => seleccionar(e)}></i>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="panel-footer" style={{height:"40px"}}>
                    <i class="btn btn-danger fa fa-close" style={{ float: "right" }} onClick={cerrar} >Cerrar</i>
                </div>
            </div>
        </div>
        );
}