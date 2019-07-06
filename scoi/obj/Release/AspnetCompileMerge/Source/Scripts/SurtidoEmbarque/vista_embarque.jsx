
const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API =  "/api/"
const $URL_API_IZA = $MI_URL + ":180/api/"

class SeleccionEmbarque extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            cargando: 1,
            estableciminetos: [],
            pedidos: [],
            establecimiento: "",
            filtro:""
        }

        setTimeout(() => this.mostrarocultarCarga(0), 1000);
        this.evObtenerPedidos = this.on_establecimineto.bind(this);
        this.evPedido = this.on_pedido.bind(this);
        this.recargar = this.on_recargar.bind(this);
        this.filtrar = this.on_filtro.bind(this);
        this.ObtenerEstableciminetos();
    }
    /* Eventos */
    on_pedido(pedido) {
        console.info("pedido=>", pedido);
        document.querySelector(".ventana").style.display = "none";
        localStorage.setItem("Pedido", JSON.stringify(pedido));
        this.ObtenerEnmbarque(pedido.Folio);

    }
    on_establecimineto(e) {
        const est_ = e.target.value;
        this.ObtenerPedidos(est_);
        this.setState({ establecimiento:est_});
    }
    on_recargar() {
        const est = this.state.establecimiento;
        est != "" ? this.ObtenerPedidos(est):alert("Seleccione Establecimiento!!!");
    }
    on_filtro(e) {
        const $filtro = e.target.value;
        this.setState({ filtro:$filtro});
    }
    /* Metodos */
    mostrarocultarCarga(estado) {
        this.setState({ cargando: estado });
    }
    asignarEstablecimientos(lista) {
        const est_ = lista[0].nombre;
        this.setState({ estableciminetos: lista, establecimiento: est_ });
        this.ObtenerPedidos(est_);
        this.mostrarocultarCarga(0);
    }
    mostrarPedidos(lista, establecimiento) {
        this.setState({ pedidos: lista, establecimiento:establecimiento});
        this.mostrarocultarCarga(0);
    }
    LlenarProductosEmbarque(productos) {

        localStorage.setItem("Embarque", JSON.stringify(productos));
        init();
        this.mostrarocultarCarga(0);
        alert(`Pedido ${pedido.Folio} Seleccionado \nLa pagina Se Recargara Para Mostrar Los cambios!!!`);
    }
    /* Conexiones */
    ObtenerEstableciminetos() {
        this.mostrarocultarCarga(1);
        fetch(`${$URL_API}Obtener_establecimientosBMS`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => {
                e.json().then(res => this.asignarEstablecimientos(res))
            })
            .catch(err => console.error(err));
    }
    ObtenerPedidos(establecimiento) {
        this.mostrarocultarCarga(1);
        fetch(`${$URL_API}Obtener_establecimientosBMS`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(establecimiento.toString())
        })
            .then(e => {
                e.json().then(res => this.mostrarPedidos(res,establecimiento))
            })
            .catch(err => console.error(err));
    }
    ObtenerEnmbarque(folio) {
        this.mostrarocultarCarga(1);
        fetch(`${$URL_API}Pedido_productos_embarque?folio=${folio}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(e => {
                e.json().then(res => this.LlenarProductosEmbarque(res))
            })
            .catch(err => console.error(err));
    }
    render() {
        const { cargando,
            estableciminetos,
            pedidos,
            establecimiento } = this.state;

        return (
            <div className="panel panel-default">
                <VistaSeleccionSurte
                    seleccion={establecimiento}
                    estableciminetos={estableciminetos}
                    pedidos={pedidos}
                    evEstablecimineto={this.evObtenerPedidos}
                    evPedido={this.evPedido}
                    recargar={this.recargar}
                />
                <EfectoCargar
                    estatus={cargando}
                />
            </div>
            );
    }
}
const VistaSeleccionSurte = ({ seleccion, estableciminetos, pedidos, evEstablecimineto, evPedido, recargar}) => {

    const TablaEmbarques = () => {
        return (
            <div id="tabla_embarques">        
                <table className="table">
                    <thead>
                        <tr style={{ background:"#2e6f9f",zIndex:"999"}}>
                            <th style={{ color: "azure", background: "#2e6f9f"}}>Folio</th>  
                            <th style={{ color: "azure", background: "#2e6f9f"}}>Usuario_capturo</th>  
                            <th style={{ color: "azure", background: "#2e6f9f" }}>fecha</th>  
                            <th style={{ color: "azure", background: "#2e6f9f" }}>folio BMS</th>  
                            <th style={{ color: "azure", background: "#2e6f9f" }}>Solicita</th>  
                            <th style={{ color: "azure", background: "#2e6f9f" }}>Surte</th>  
                            <th style={{ background: "rgb(46, 111, 159)" }} className="btn_tabla">Accion</th>  
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(e => <tr>
                            <th >{e.Folio}</th>
                            <th >{e.Usuario_capturo}</th>
                            <th >{e.Elaboraccion}</th>
                            <th >{e.Estatus_surtido}</th>
                            <th >{e.Establecimiento}</th>
                            <th >{e.Alterno}</th>
                            <th className="btn_tabla">
                                <i className="btn btn-info fa fa-cogs btn-round btn_selector_pedido"
                                    onClick={() => evPedido(e)}></i>
                            </th>  
                        </tr>)}
                    </tbody>
                </table>
            </div>
            );
    }
    return (
        <div className="ventana">
            <div id="modal_seleccionSurte" className="panel panel-default">
                <div className="selector_establecimiento panel-heading" >
                    <strong style={{ color: "#000000" }}>
                        Establecimiento
                    </strong>
                    <select className="form-control"
                        style={{ width: "80%" }}
                        onChange={evEstablecimineto}>
                        {estableciminetos.map(est_ => <option value={est_.nombre} selected={est_.nombre.search(seleccion) > -1} >{est_.nombre}</option>)}
                    </select>
                    <i className="fa fa-refresh btn btn-default btn-round"
                        onClick={recargar}
                        style={{ float: "right", marginTop: "-40px",marginLeft:"10px", fontSize: "25px" }}
                    ></i>
                </div>
                <div style={{ height: "80%" }} className="panel-body">
                    <TablaEmbarques />
                </div>
            </div>
        </div>
        );
}

class EmbarquePedido extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cargando :0,
            Pedido: JSON.parse(localStorage.getItem("Pedido")),
            Embarque: JSON.parse(localStorage.getItem("Embarque")),
            producto: {
                Codigo: '',
                Descripcion: '',
                decimales:0
            },
            edicion: {
                cantidad: 0,
                surtido: 0,
                total: 0,
                pedido:0,
                punto:false,
                operador:"+"
            },
            activar: false,
            totales: {
                embarque: 0,
                surtido:0
            },
            filtro_embarque:[]
        }

        this.calcular_totales();
        this.pedido = JSON.parse(localStorage.getItem("Pedido"));
        this.buscarPorCodigo = this.on_buscar_producto.bind(this);
        this.cambio_codigo = this.on_codigo_producto.bind(this);
        this.evTecla = this.on_teclado.bind(this);
        this.mostrar_productos = this.on_mostrar_productos.bind(this);
        this.quitarSurtido = this.on_quitarSurtido.bind(this);
    }
    /* Eventos */
    on_mostrar_productos(filtro) {
        console.log("filtro", filtro);
        const $lista = JSON.parse(localStorage.getItem("Embarque"));
       // this.setState({ Embarque: JSON.parse(localStorage.getItem("Embarque")) });

        const Filtrar = (function(){
            var resultado = () => null;
            switch (filtro) {
                case "P"://pendiente
                    resultado = pendiente => pendiente.embarque == 0;
                    break;
                case "S"://surtido
                    resultado = surtido => surtido.embarque > 0;
                    break;
                case "E"://embarque
                    resultado = embarque => embarque
                    break;
            }
            document.getElementById("ventana_filtro").style.display = "flex";
            return $lista.filter(resultado);
        }());
        console.log("Tabla=>", Filtrar);

        this.setState({ filtro_embarque: Filtrar, Embarque: JSON.parse(localStorage.getItem("Embarque"))});
    }
    on_codigo_producto(event) {
        const $producto = this.state.producto;
        $producto.Codigo = event.target.value || "";
        this.setState({ producto: $producto });

        event.preventDefault();
    }
    on_buscar_producto(event) {
        const folio = this.state.producto.Codigo.toString() || "";
        if (folio > 0) {
            this.mostrarocultarCarga(1);
            this.ObtenerEnmbarque();
        } else {
            alert("Coloque Codigo...");
            document.querySelector("#entrada_codigo_producto").select();
        }
        event.preventDefault();
    }
    on_teclado(tecla) {
        const estatus = this.state.activar;
        if (estatus) 
           return (typeof tecla === "number" ? this.TeclaNumero(tecla) : this.TeclaOperadora(tecla));
        alert("Teclado Inhabilitado...");
    }
    on_quitarSurtido(codigo) {
        const $lista = this.state.Embarque;
        const $index = $lista.findIndex(e => parseInt(e.cod_prod) == parseInt(codigo));
        const $producto = $lista[$index];
        console.log("producto=>", $producto);
        $producto.pendiente += $producto.embarque;
        $producto.embarque = 0;
        $lista[$index] = $producto;
        this.setState({Embarque:$lista});
        this.cargarProductonLocalStorange($lista);
        document.getElementById("ventana_filtro").style.display = "none";
        this.calcular_totales();
        this.restarProducto();
    }
    /* Metodos */
    calcular_totales() {
        const $lista = this.state.Embarque;
        const $surtido = $lista.filter(e => e.embarque > 0);

        const $totales = {
            embarque: $lista.length,
            surtido: $surtido.length
        }
        this.setState({ totales: $totales });

    }
    cargarProductonLocalStorange(lista) {
        localStorage.setItem("Embarque", JSON.stringify(lista));
    }
    codigo_producto(producto) {
        const $estatus = this.comprobarEnEmbarque(producto.Codigo);
        if ($estatus) {
            const $producto = {
                Codigo: "",
                Descripcion: producto.Descripcion,
                decimales: producto.Decimales,
                Existencia : producto.Existencia_pz
            }
            console.log("producto=>", producto);
            viewSurtido.obtener_seleccion({
                Codigo: producto.Codigo,
                Descripcion: producto.Descripcion,
                decimales: producto.Decimales,
                Existencia: producto.Existencia_pz
            });
            this.setState({ producto: $producto, activar: $estatus });
            //document.querySelector("#captura_por_teclado").style.display = "flex";
        } else {
            alert(`El Producto\n Folio: ${producto.Codigo || "N/A"}.\n Descripcion: ${producto.Descripcion || "Desconocido"}.\n No Se Encuentra En El Embarque!!!`);
            this.restarProducto();
            document.querySelector("#entrada_codigo_producto").disabled = false;
        }
        this.mostrarocultarCarga(0);
    }
    comprobarEnEmbarque(codigo) {
        const $lista = this.state.Embarque;
        const $index = $lista.findIndex(e => parseInt( e.cod_prod) == parseInt( codigo));

        if ($index > -1) {
            const $filtro = $lista[$index];
            const $edicion = {
                cantidad: $filtro.embarque,
                surtido: 0,
                total: $filtro.embarque,
                pedido:$filtro.pedido,
                punto:false,
                operador: "+"
            }
            this.setState({ edicion:$edicion, });
        }
        return $index > -1;
    }
    mostrarocultarCarga(estado) {
        this.setState({ cargando: estado });
    }
    restarProducto() {
        this.setState({
            producto: {
                Codigo: '',
                Descripcion: '',
                decimales: 0
            },
            activar: false,
            edicion: {
                cantidad: 0,
                surtido: 0,
                total: 0,
                pedido:0,
                punto: false,
                operador: '+'
            }
        });
    }
    TeclaNumero(value) {
        var { cantidad, surtido, total, punto, operador, pedido } = this.state.edicion,
            aux = 0;
        let { Existencia } = this.state.producto;
        aux = surtido == 0 && (surtido.toString().search('0.') === -1) ? value : (surtido + "" + value);

        if (aux < 10000) {
            surtido = aux;
            total = operador == "+" ? parseFloat(cantidad) + parseFloat(surtido) : parseFloat(cantidad) - parseFloat(surtido);
            const cantidad_pedida = (pedido >= total) ? true : confirm(`El Surtido Sobre Pasa Al Pedido por ${(total - pedido)} Pz.`);

            if (cantidad_pedida) {
                const resultados = { cantidad, surtido, total, punto, pedido, operador };
                console.log("Existencia>", Existencia, total);
                (total <= Existencia) ? this.setState({ edicion: resultados }) : alert(`cantidad Vigente el Inventario Superada...\n Existencia:${Existencia} Inventario!`);
            }
        }
    }
    TeclaOperadora(value) {
        var { cantidad, surtido, total, punto, pedido, operador } = this.state.edicion;
        const adiciones = () => {
            operador = value;
        }
        const remover = () => {
            surtido = 0;
            total = cantidad;
            operador = "+";
            punto = false;
        }
        const onPunto = () => {
            const $prod = this.state.producto.decimales > 0;

            if ($prod && !punto) {
                surtido += !punto ? "." : "";
                punto = true;
            }
        }
        const guardar = () => {
            const codigo = parseInt(this.state.producto.Codigo);
            const $seleccion = this.state.Embarque;
            const index = $seleccion.findIndex(e => e.cod_prod == codigo);
            if (index > -1) {
                $seleccion[index].embarque = total;
            }
            cantidad = 0, surtido = 0, total = 0, operador = '+';
            this.restarProducto();
            this.cargarProductonLocalStorange($seleccion);
            this.calcular_totales();
            document.querySelector("#captura_por_teclado").style.display = "none";
            document.querySelector("#entrada_codigo_producto").disabled = false;
            document.querySelector("#entrada_codigo_producto").select();
        }
        switch (value) {
            case "-":
                adiciones();
                break;
            case "+":
                adiciones();
                break;
            case "Del":
                remover();
                break;
            case ".":
                onPunto();
                break;
            default:
                guardar();
                break;
        }

        total = operador == "+" ? parseFloat(cantidad) + parseFloat(surtido) : parseFloat(cantidad) - parseFloat(surtido);

        const $resultados = { cantidad, surtido, total, punto, pedido, operador };

        console.log($resultados);
        this.setState({ edicion: $resultados });

    }
    /* Conexiones */
    ObtenerEnmbarque() {
        const folio = this.state.producto.Codigo.toString() || "";
        const { Alterno } = this.state.Pedido;
        document.querySelector("#entrada_codigo_producto").disabled = true;
        fetch(`${$URL_API}Productos_clasificador_por_folio?folio=${folio}&establecimineto=${Alterno}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Alterno)
        })
            .then(e => {
                e.json().then(res => this.codigo_producto(res))
            })
            .catch(err => console.error("Error=>", err)) 
    }
    render() {
        const { cargando, Pedido, Embarque, producto, edicion, activar, totales, filtro_embarque } = this.state;
        if (Embarque.length > 0 && totales.embarque == 0)
            this.calcular_totales();
        return (
            <div className="container">
                <ViewPedidoEmbarque
                    pedido={Pedido}
                />
                <ViewMovimientos
                    Pedido={Pedido}
                />
                <ViewCantidades
                    totales={totales}
                />
                <ButtonsModal
                    evMostrar={this.mostrar_productos}
                />
                <BuscarPruducto
                    evOn={this.cambio_codigo}
                    evBuscar={this.buscarPorCodigo}
                    Codigo={producto.Codigo}
                />
                <ModalCaptura
                    cantidades={edicion}
                    evTecla={this.evTecla}
                    Descripcion={producto.Descripcion}
                />
                <ModalTabla
                    lista={filtro_embarque}
                    modificar={this.quitarSurtido}
                />
                <EfectoCargar
                    estatus={cargando}
                />
            </div>
            );
    }
}
//new
const ViewPedidoEmbarque = ({ pedido }) => {
    return (
        <div className="caja_contenedora_items">
            <div className="form_vista_texto" style={{ float:"left",marginLeft:"-10px"}}>
                <label>Folio Embarque:</label>
                <div className="caja_entrada_texto">{pedido.Folio}</div>
            </div>
            <i className="btn btn-danger glyphicon glyphicon-trash btn-round" id="btn_cancelar_embarque_pedido" onClick={eliminar_embarque_localStorange}>
            </i>
        </div>
        );
}
const ViewMovimientos = ({ Pedido }) => {
    const { Alterno, Establecimiento} = Pedido;
    return (
        <div className="caja_contenedora_items">
            <div className="form_vista_texto">
                <label>Del:</label>
                <div className="caja_entrada_texto" style={{ textAlign: "left" }}>{Alterno}</div>
            </div>
            <div className="form_vista_texto">
                <label>Al:</label>
                <div className="caja_entrada_texto" style={{ textAlign:"left"}}>{Establecimiento}</div>
            </div>
        </div>
    );
}
const ViewCantidades = ({ totales }) => {
   let embarque_ = JSON.parse(localStorage.getItem("Embarque"));
    const { surtido, embarque } = totales;
    return (
        <div className="caja_contenedora_items">
            <div className="form_vista_texto">
                <label>Surtido:</label>
                <div className="caja_entrada_texto">{embarque_.filter(e => e.surtido > 0).length}</div>
            </div>
            <div className="form_vista_texto">
                <label>Embarque:</label>
                <div className="caja_entrada_texto">{embarque_.length}</div>
            </div>
        </div>
        );
}
const ButtonsModal = ({ evMostrar }) => {

    return (
        <div className="caja_contenedora_items">
            <i className="btn btn_seseccion" onClick={() => evMostrar("P")} id="btn_modal_productos_pendiente">Pendientes</i>
            <i className="btn btn_seseccion" onClick={() => evMostrar("S")} id="btn_modal_productos_embarque">Embarque</i>
            <i className="btn btn_seseccion" onClick={() => evMostrar("E")} id="btn_modal_productos_surtido">Surtido</i>
        </div>
        );
}
const BuscarPruducto = ({ evBuscar, evOn, Codigo}) => {
    const rotar = () => {
        let rotacion = document.querySelector("#main").style.transform;
        let giro = rotacion == "" ? "rotate(180deg)" : "";
        document.querySelector("#main").style.transform = giro;
    }
    return (
        <div className="">
            <form className="form_vista_texto"
                onSubmit={evBuscar}
            >
                <label>Codigo Producto:</label>
                <input type="text"
                    className="caja_entrada_texto"
                    id="entrada_codigo_producto"
                    onChange={evOn}
                    placeolder="Producto..."
                    select="true"
                    active
                    value={Codigo} />
            </form>

            <strong className="btn btn-success btn-round btn_seseccion btn-block"
                style={{ width: "150px", fontSize: "18px",float:"right" }}
                id="btn_guardar_embarque_pedido"
                onClick={guardar_embarque}>
                Guardar  <i className="glyphicon glyphicon-saved"></i>
            </strong>
        </div>
        );
}
const ModalCaptura = ({ cantidades, Descripcion,evTecla }) => {
    return (
        <div className="panel panel-success ventana" id="captura_por_teclado">
            <div>
                <div className="panel-heading">
                    <i className="btn btn-danger fa fa-close" onClick={cerrar} style={{float:"right"}}></i>
                    <label>Descripcion</label>
                </div>
                <div className="panel-body">
                    <span className="" style={{ width: "300px", height: "50px" }}>{Descripcion}</span>
                    <CapturaCantidad
                        cantidades={cantidades}
                    />
                    <TecladoCaptura
                        tecla={evTecla}
                    />
                </div>
            </div>
        </div>
    );
    function cerrar() {
        document.querySelector("#entrada_codigo_producto").disabled = false;
        document.querySelector("#captura_por_teclado").style.display = 'none';
    }
}


//old
//const CaveceraPedido = ({ pedido, totales }) => {
//    const { surtido, embarque } = totales;
//    return (
//        <div className="panel-heading">
//            <span className="vista_datos_embarque" id="contenedor_folio">
//                <div className="vista_numero">
//                    <label>Folio:</label>
//                    <div className="form-control">{pedido.Folio}</div>
//                </div>
//                <i className="btn btn-danger fa fa-close"
//                    onClick={eliminar_embarque_localStorange}
//                    id="btn_recargar"> Cancelar</i>
//            </span>
//                <span className="vista_datos_embarque">
//                    <div>
//                        <label>Del:</label>
//                        <strong style={{ display: "inline-block" }} className="form-control">{pedido.Alterno}</strong>
//                    </div>
//                    <div>
//                        <label>Al:</label>
//                        <div className="form-control">{pedido.Establecimiento}</div>
//                    </div>
//                </span>
//                <span className="vista_datos_embarque">
//                    <div className="vista_numero">
//                        <label>Surtido:</label>
//                        <div className="form-control">{surtido}</div>
//                    </div>
//                    <div className="vista_numero">
//                        <label>Embarque:</label>
//                        <div className="form-control">{embarque}</div>
//                    </div>
//            </span>
//            <i className="btn btn-success fa fa-save"
//                onClick={guardar_embarque}
//                id="btn_guardar"> </i>
//        </div>   
//        );
//}
const BotonesEmbarque = ({ evMostrar })=>{
    return (<div className="contenedor_botones_productos">
        <i className="btn btn-warning" onClick={() => evMostrar("P")}>Pendientes</i>
        <i className="btn btn-info" onClick={() => evMostrar("S")}>Embarque</i>
        <i className="btn btn-primary" onClick={() => evMostrar("E")}>Surtido</i>
    </div>);
} 
const BuscarProductos = ({ producto, evOn, evBuscar}) => {

    return (
        <div>
            <label style={{display:"block"}}>Surtir Producto:</label>
            <form className="vista_numero alinear"
                onSubmit={evBuscar}
            >
                <label> Codigo:</label> 
                <input className="form-control"
                    value={producto.Codigo}
                    onChange={evOn}
                    placeolder="Producto..." />
            </form>
            <div id="vista_descripcion" className="alinear">
                <label>Descripcion:</label>
                <span className="form-control disabled">
                    {producto.Descripcion }
                </span>
            </div>
        </div>
        );
}
const CapturaCantidad = ({ cantidades }) => {
    const { cantidad, surtido, total, operador } = cantidades;
    const signo = operador == "+" ? "glyphicon glyphicon-plus" : "glyphicon glyphicon-minus";
    return (
        <div className="contenedor_botones_productos">

            <i className="vista_numero">
                <label>Cantidad: </label>
                <input className="form-control" disabled value={cantidad } placeolder="Producto..." />
            </i>
            <i className={signo}></i>
            <i className="vista_numero">
                <label>Surtido: </label>
                <input className="form-control" disabled value={surtido } placeolder="Producto..." />
            </i>
            <i className="glyphicon glyphicon-chevron-right"></i>
            <i className="vista_numero">
                <label>Total: </label>
                <input className="form-control" disabled value={total} placeolder="Producto..." />
            </i>
        </div>
        );
}
const TecladoCaptura = ({ tecla }) => {

    const dato = (dat, sig) => ({ valor: dat, signo: sig|| dat}) 
    const numeros = e => (<TeclaNumero valor={e.valor} evValor={() => tecla( e.signo)} />);
    const operadores = e => (<TeclaEspecial valor={e.valor} evValor={() => tecla(e.signo)} />);

    const $lista = [dato(7), dato(8), dato(9), dato("arrow-left", "Del"), dato(4), dato(5), dato(6), dato("minus", "-"), dato(1), dato(2), dato(3), dato("plus", "+"), dato(0),
        dato("record", "."), dato("download-alt btn_salvar", "save")]

    return (
        <div id="contenedor_teclado">
            <div id="teclado">
                {$lista.map(e => typeof e.valor == "number" ? numeros(e) : operadores(e))}
            </div>
        </div>
        );
}
const TeclaNumero = ({ valor, evValor }) => {
    evValor = evValor ? evValor : ()=>console.log(valor);
    return (
        <i className="btn btn-info"
            onClick={evValor} >{valor}</i>
        );
}
const TeclaEspecial = ({ valor, evValor }) => {
    const res = ` btn btn-default glyphicon glyphicon-${valor}`;
    evValor = evValor ? evValor : () => console.log(list[valor]);
    return (
        <strong className={res}
            onClick={evValor} ></strong>
    );

}

const ModalTabla = ({ lista, modificar }) => {
    return (<div className="ventana" id="ventana_filtro">
        <div className="paenl panel-default">
            <div className="panel-heading">
                <i className="btn btn-danger fa fa-close" style={{ float: "right"}} onClick={() => document.getElementById("ventana_filtro").style.display = "none"} ></i>
                <h4>Productos</h4>
            </div>
            <div className="panel-body" style={{ height: "80%" }} >
                <strong>Lista </strong>
                    <i className="badge">{lista.length}</i>
                <div style={{ height: "100%", overflow: "auto" }}>
                    <table className="table">
                        <thead>
                            <tr id="cavecera_tabla_filtro">
                                <th>Codigo</th>
                                <th>Descripcion</th>
                                <th>Pedido</th>
                                <th>Surtido</th>
                                <th>Pendiente</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((e, p) => {
                            return ( <tr className="filtro_productos">
                                <td>{e.cod_prod}</td>
                                <td>{e.descripcion}</td>
                                <td style={{ textAlign: "right" }}>{e.pedido}</td>
                                <td style={{ textAlign: "right" }}>{e.surtido}</td>
                                <td style={{ textAlign: "right" }}>{e.pendiente}</td>
                                <td >
                                    <i className="btn btn-danger glyphicon glyphicon-trash" onClick={() => modificar(e.cod_prod)} ></i>
                                </td>
                            </tr>)})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>);
}

if (location.protocol != "http:")
    location.protocol = "http:";

class Embarque {
    constructor() {
        this.folio_pedido = "";
        this.usuario = parseInt(USUARIO.id_scoi);//ID_SCOI
        this.productos = [];
        this.ContruirPedido();
    }
    ContruirPedido() {
        const $pedido = JSON.parse(localStorage["Pedido"]);
        this.productos = this.filtrarProductosEnCero(); //JSON.parse(localStorage["Embarque"]);

        this.getFolio($pedido.Folio);
    }
    getFolio(folio) {
        this.folio_pedido = folio;
    }
    filtrarProductosEnCero() {
        const $lista = JSON.parse(localStorage["Embarque"]);
        return $lista.filter(surtido => surtido.embarque > 0);
    }
}

function eliminar_embarque_localStorange() {
    let e = prompt("Escriba '1379' Para Confirmar Borrado!!!") || " ";   
    if (e.toUpperCase() === '1379') {
        console.log(e.toUpperCase())
        if (confirm("Esta Seguro De Eliminar los Cambios De Embarque?")) {
            localStorage.removeItem('Embarque');
            localStorage.removeItem('Pedido');
            init();
            return null;
        }
    }
    else
        alert("Eliminacion Cancelada!!!");
}

function ErrorPedido(){
    const pedido = new Embarque();
    console.log(pedido);
    fetch(`${$URL_API}Pedido_productos_embarque`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
        .then(e => {
            e.json().then(res => {
                alert("Folio Error Pedido...\n" + res);
                init();
            })
        })
        .catch(err => console.error("Error=>", err));
}

function guardar_embarque() {
    document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
    const e = prompt("Escriba '1379' Para Confirmar!!!") || " ";
    console.log(e.toUpperCase())
    if (e.toUpperCase() === '1379') {
        if (confirm("Esta Seguro De GUARDAR los Cambios De Embarque?")) {

            const value = new Embarque();
            const conexionBMS = (estatus) => {
                if (estatus) {
                    fetch(`${$URL_API_IZA}PedidoBms/EmbarqueBms`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(value)
                    })
                        .then(e => {
                            e.json().then(res => {
                                localStorage.removeItem('Embarque');
                                localStorage.removeItem('Pedido');
                                alert("Guardado..." + res);
                                document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                                init();
                            })
                        })
                        .catch(err => ErrorPedido());
                } else {
                    Alert("error Al Guardar!!!")
                }
            }
            if (value.productos.length > 0) {
                alert(`Guardar... \n${value.productos.length} Productos.`)
                //CONEXION BMS
                fetch(`${$URL_API_IZA}Pedido/Embarque`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                })
                    .then(e => {
                        e.json().then(res => conexionBMS(res))
                    })
                    .catch(err => ErrorPedido());
                return null;
            }
            else {
                alert("Sin Productos A Guardar...");
                document.querySelector("#modal_de_efecto_carga").style.display = 'none';
            }
        }
    } else {
        document.querySelector("#modal_de_efecto_carga").style.display = 'none';
        alert("GUARDADO CANCELADO!!!");
    }
}
function init() {
    var View = null;
    if (localStorage.getItem("Pedido") != undefined) {
        const $pedido = JSON.parse(localStorage.getItem("Pedido"));
        View = EmbarquePedido;
    } else {
        View = SeleccionEmbarque;
    }
    ReactDOM.render(<View />, document.getElementById('main'));
}
init();
//setTimeout( ()=>console.clear(),1000);