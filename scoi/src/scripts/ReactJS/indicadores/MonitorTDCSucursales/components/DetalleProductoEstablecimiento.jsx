//libreria
import React, { useState} from 'react';
import Axios from 'axios';

const DetalleProductoEstablecimiento = ({ venta }) => {
    const { establecimiento, codigo_producto, descripcion_producto,cajeros } = venta || {};
    //funciones
    const cerrar = () => document.querySelector("#detall_eproducto").style.display = "none";

    return (<div className="modal" id="detall_eproducto">
        <div className="panel panel-default" style={{maxWidth:"970px",width:"90%"}}>
            <div className="panel-heading">
                <u className="close" style={{ fontSize: 14 }} onClick={cerrar}> cerrar</u>
                <br/>
                <Detalle venta={{ establecimiento, codigo_producto, descripcion_producto }} />
            </div>
            <div className="panel-group">
                <div style={{overflow:"auto",maxHeight:"600px"}}>
                    {cajeros === undefined || cajeros.map(e => <Colaborador colaborador={e} />)}
                </div>
            </div>
            <div className="panel-footer">
            </div>
        </div>
    </div>);
}

const Colaborador = ({ colaborador }) => {
    const [foto, setFoto] = useState("");
    let url = `/api/Lista_usuarios/?foto=${colaborador.folio}`;
    const consultar_foto = async () => {
        const resultado = await Axios.get(url);
        if (resultado.status === 200) {
            setFoto(resultado.data)
        }
    }

    foto != "" || consultar_foto();

    return <div className="panel panel-info">
        <div className="panel-heading">
            <div className="row">
                <img src={foto} className="img-rounded col-sm-2" />
                <div className="col-sm-2">
                    <label>Folio :</label>
                    <i className="form-control">{colaborador.folio}</i>
                </div>
                <div className="col-sm-8">
                    <labe>Nombre :</labe>
                    <i className="form-control">{colaborador.descripcion}</i>
                </div>
             </div>
        </div>
    </div>;
}

const Detalle = ({ venta }) => <div className="row">
    <label className="col-sm-3">
        Establecimiento :
        <u> {venta.establecimiento}</u>
    </label>
    <label className="col-sm-2">
        Codigo :
        <u> {venta.codigo_producto}</u>
    </label>
    <label className="col-sm-7">
        Descripcion :
       <u> {venta.descripcion_producto}</u>
    </label>
</div>;

export default DetalleProductoEstablecimiento;