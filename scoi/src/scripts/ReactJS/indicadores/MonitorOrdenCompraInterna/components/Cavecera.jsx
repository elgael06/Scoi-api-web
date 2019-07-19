import React, { useState, useEffect  } from 'react';
import SeleccionRecibe from './SeleccionRecibe';
import { fecha_hoy_yyyy_mm_dd, parseo_fecha} from '../../../../Globales/fechas';
import { list } from 'postcss';
let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "/api/";


setTimeout(() => document.querySelector("#contenedor_recibe").style.display = "none", 500)

export default function Cavecera({ asignarOrdenes, ordenes }) {

    let [comprobar, setComprobar] = useState(false);
    let [folio_producto, setFolioProducto] = useState(0);
    let [tipoSeleccion, setTipoSeleccion] = useState("Todos");
    let [nombreRecibe, setNombreRecibe] = useState("");
    let [ListaVeneficiarios, setListaVeneficiarios] = useState([]);

    let [parametros,setParametros] = useState({
        inicio: fecha_hoy_yyyy_mm_dd(),
        fin: fecha_hoy_yyyy_mm_dd(),
        tipo_orden: '',
        estatus: 'SURTIDO',
        establecimiento: 0,
        tipo_recibe: 'Todos',
        recibe: 0,
        folio_producto:0
    });

    const cambio = (dato,parametro) => {
        let datos = parametros;
        datos[parametro] = dato
        if (parametro == "tipo_recibe") {
            datos.recibe = 0;
            setNombreRecibe('')
            document.querySelector("#contenedor_recibe").style.display = (dato == "Todos") ? "none" : "";
        }

        setParametros(datos)

        setComprobar(comprobarEstado(datos.inicio, datos.fin, datos.tipo_recibe, datos.recibe))
    }

    const verificar = () => {
        comprobar ? consultar() :  alert("Faltan Parametros...");
    }
    const consultar = () => {
        const { inicio, fin, tipo_orden, estatus, establecimiento, tipo_recibe, recibe } = parametros;
        let url = `ObtenerMonitorOrdenCompraInterna?f1=${parseo_fecha(inicio)}&f2=${parseo_fecha(fin)}&tipo_orden=${tipo_orden}&estatus=${estatus}&tipo_recibe=${tipo_recibe}&recibe=${recibe}&establecimiento=${establecimiento}&cod_prod=${folio_producto}`;
        document.querySelector("#modal_de_efecto_carga").style.display = "flex";
        fetch(url, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(err => {
                console.error("Error=>", err)
                document.querySelector("#modal_de_efecto_carga").style.display = "none";
            })
            .then(res => res.json()
                .then(lista => {
                    asignarOrdenes(lista)
                    document.querySelector("#modal_de_efecto_carga").style.display = "none";
                }).
                catch(err => {
                    document.querySelector("#modal_de_efecto_carga").style.display = "none";
                    console.log(err)
                    alert("Error !!! \n"+err.toString())
                })
        )
    }

    const comprobarEstado = (inicio, fin, tipo_recibe, recibe) => (inicio != "" && fin != "") && (tipo_recibe == "Todos" ? true : recibe > 0);

    const descripcionBoton = () => {
        return comprobar ? "Consultar orden." : "Falta Colocar Parametros.";
    }
    const estadoBoton = () => {
        return comprobar ? "btn btn-success btn-round" : "btn btn-danger btn-round";
    }
    const iconoBoton = () => {
        return comprobar ? "fa fa-download" : "fa fa-close";
    }

    const abirirModal = () => {
        setTipoSeleccion(parametros.tipo_recibe)

        document.querySelector("#modal_de_efecto_carga").style.display = "flex";
        fetch(`${$URL_API}Obtener_beneficiarios?tipo=${parametros.tipo_recibe}`, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(err => console.error("Error=>", err))
            .then(res => res.json().then(lista => {
                if (lista.length > 0) {
                    setListaVeneficiarios(lista);
                    document.querySelector("#seleccion_recibe").style.display = "flex";
                } else alert(`Sin ${parametros.tipo_recibe} A Mostrar !!!`)
                document.querySelector("#modal_de_efecto_carga").style.display = "none";
            }))
    }

    return ordenes.length==0 ? (<div class="panel-heading">
            <div class="row">
                <h3 class="col-sm-12">Monitor Ordenes De Compra Interna.</h3>
                <Fechas
                    evFecha={cambio}
                />
                <Orden
                    evOrden={cambio}
                />
                <Recibo
                    evRecibo={cambio}
                />
                <div class="form-group col-lg-5 contenedor_parametros">
                    <h4>Parametros Adicionales</h4>
                    <div id="contenedor_recibe" style={{display:"none"}} class="form-group form-inline form-group-sm" >
                        <label> Recibe : </label>
                        <i class="form-control" style={{ width: "270px" }} >{nombreRecibe}</i>
                        <i class="btn btn-default fa fa-search btn-round" style={{ fontSize: "18px" }} onClick={abirirModal} > </i>
                    </div>
                    <div class="form-inline">
                        <label>Folio Activo : </label>
                        <input
                            type="number"
                            min="0"
                            class="form-control"
                            value={folio_producto}
                            onChange={e => setFolioProducto(e.target.value || 0)}
                        />
                    </div>
                </div>
                <div id="btn_cavecera" class="form-group col-lg-12">
                    <span class={estadoBoton()} onClick={verificar}>
                        <label> {descripcionBoton() || "Listo"} </label>
                        <i class={iconoBoton()}></i>
                    </span >
                </div >
            </div>
            <SeleccionRecibe
                tipo={tipoSeleccion}
                lista={ListaVeneficiarios}
                evSeleccion={cambio}
                evNombre={setNombreRecibe}
            />
    </div>) :
        <div class="panel-heading">
            <i class="fa fa-close" style={{ float: "right" }} onClick={() => asignarOrdenes([])}> [ Regresar ]</i>
            <h3 style={{color:"#000"}}> Ordenes De Compra Interna.</h3>
            <div class="row">
                <div class="col-sm-2">
                    <label>Inicio</label>
                    <i class="form-control">{parseo_fecha(parametros.inicio)}</i>
                </div>
                <div class="col-sm-2">
                    <label>Fin</label>
                    <i class="form-control">{parseo_fecha(parametros.fin)}</i>
                </div>
                <div class="col-sm-2">
                    <label>Tipo</label>
                    <i class="form-control">{parametros.tipo_orden}</i>
                </div>
                <div class="col-sm-2">
                    <label>Estatus</label>
                    <i class="form-control">{parametros.estatus}</i>
                </div>
                <div class="col-sm-2">
                    <label>Tipo Recibe</label>
                    <i class="form-control">{parametros.tipo_recibe}</i>
                </div>
            </div>
        </div>;
}

const Fechas = ({evFecha}) => {
    let [inicio, setInicio] = useState(fecha_hoy_yyyy_mm_dd()), [fin, setFin] = useState(fecha_hoy_yyyy_mm_dd())

    const cambioInicio = (seleccion) => {
        setInicio(seleccion),evFecha(seleccion, "inicio")
    }
    const cambioFin = (seleccion) => {
        setFin(seleccion),evFecha(seleccion, "fin")
    }
    return (<div class="form-group col-lg-2 contenedor_parametros">
        <h4>Fechas</h4>
        <div class="form-group">
            <label>Inicio: </label>
            <input type="date" class="form-control" value={inicio} onChange={e => cambioInicio(e.target.value)} />
        </div>
        <div class="form-group">
            <label>Termino: </label>
            <input type="date" class="form-control" value={fin} onChange={e => cambioFin(e.target.value)} />
        </div>
    </div>);
}

const Orden = ({ evOrden }) => {
    let [tipo, setTipo] = useState(""), [estatus, setEstatus] = useState(""), [TipoOrdenes,setTipoOedenes] = useState([])

    TipoOrdenes.length>0 || fetch(`${$URL_MVC}Tipo_orden_compra_interna`, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .catch(err => console.error("Error=>", err))
    .then(res => res.json().then(lista => {
        setTipoOedenes(lista);
        cambioTipo(lista[0]);
    }))

    useEffect(() => {
        document.querySelector("#rotacionTipoOrden").style.display = TipoOrdenes.length > 0 ? "none" : "";

    })
    const cambioTipo = (seleccion) => {
        setTipo(seleccion), evOrden(seleccion,"tipo_orden")
    }
    const cambioEstatus = (seleccion) => {
        setEstatus(seleccion), evOrden(seleccion, "estatus")
    }

    return (<div class="form-group col-lg-2 contenedor_parametros">
        <h4>Orden</h4>
        <div class="form-group">
            <i class="fa fa-spinner rotate" id="rotacionTipoOrden" name="tipo" > </i>
            <label> Tipo:</label>
            <select class="form-control" value={tipo} onChange={e => cambioTipo(e.target.value)} >
                {
                    TipoOrdenes.map(e => {
                      return  <option> {e} </option>
                    })
                }
            </select>
        </div>
        <div class="form-group">
            <label>Estatus:</label>
            <select class="form-control" onChange={e => cambioEstatus(e.target.value)} value={estatus} >
                <option>SURTIDO</option>
                <option>AUTORIZADO</option>
                <option>CANCELADO</option>
                <option>EN VALIDACION</option>
            </select>
        </div>
    </div>);
}

const Recibo = ({ evRecibo}) => {
    const [estableciminto, setEstablecimiento] = useState(0), [tipo, setTipo] = useState("Todos"), [ListaEstablecimientos, setLista] = useState([])

    ListaEstablecimientos.length > 0 || fetch(`${$URL_API}Obtener_establecimientos_BMS`, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .catch(err => console.error("Error=>", err))
        .then(res => res.json().then(setLista))

    useEffect(() => {
        document.querySelector("#rotacionEstablecimientos").style.display = ListaEstablecimientos.length > 0 ? "none" : "";

    })

    const cambioEstablecimiento = seleccion => {
        let index = ListaEstablecimientos.findIndex(e => e.folio == seleccion);
        setEstablecimiento(seleccion), evRecibo(index > -1 ? ListaEstablecimientos[index].folio : 0, "establecimiento")
    }
    const cambioTipo = seleccion => {
        setTipo(seleccion), evRecibo(seleccion, "tipo_recibe")
    }

    return ( <div class="form-group col-lg-2 contenedor_parametros">
        <h4>Recibe</h4>
        <div class="form-group">
            <i class="fa fa-spinner rotate" id="rotacionEstablecimientos" name="tipo"> </i>
            <label> Establecimiento:</label>
            <select class="form-control" value={estableciminto} onChange={e => cambioEstablecimiento(e.target.value)} >
                <option value="0">Todos</option>
                {
                    ListaEstablecimientos.map(e => {
                        return <option value={e.folio}>{e.nombre}</option>
                    })
                }
            </select>
        </div>
        <div class="form-group">
            <label>Tipo:</label>
            <select class="form-control" value={tipo} onChange={e => cambioTipo(e.target.value)} >
                <option>Todos</option>
                <option>Empleado</option>
                <option>Proveedor</option>
            </select>
        </div >
    </div >);
}
