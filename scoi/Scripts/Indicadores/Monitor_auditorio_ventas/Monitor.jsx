
const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = $MI_URL + "/api/"
const $URL_API_IZA = $MI_URL + ":180/api/"

class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fecha: fecha_hoy(),
            ventas: [],
            estatus: 0,
            detalle_corte: {},
            Abonos_y_Deudas_Empleado:[]
        }

        this.evFecha = this.on_fecha.bind(this);
        this.evCargar = this.Obtener_ventas.bind(this);
        this.evCorteDetalle = this.Obtener_detalle_de_corte.bind(this);
        this.evAbonoDeuda = this.Obtener_Abonos_y_Deudas_Empleado.bind(this);
    }
    //eventos
    on_fecha(event) {
        this.setState({ fecha: parseo_fecha(event.target.value)});
    }
    //metodos
    llenar_lista_ventas(respuesta) {
        console.log(respuesta);
        this.setState({ ventas: respuesta });
        this.estatus_carga(0);
    }
    mostrar_detalles_corte(corte) {
        console.log(corte);
        document.querySelector("#detalles_corte").style.display="flex";
        this.setState({ detalle_corte: corte });
        setTimeout(()=>this.estatus_carga(0),1500);
    }
    llenar_Abonos_y_Deudas_Empleado(lista) {
        console.log(lista);
        this.setState({ Abonos_y_Deudas_Empleado: lista });
        setTimeout(() => this.estatus_carga(0), 500);
        document.querySelector("#detalles_corte_Abonos_y_deudas_a_detalle").style.display = "flex";
    }
    estatus_carga(e) {
        console.log(e);
        this.setState({ estatus: e });
    }
    //conexiones
    Obtener_ventas() {
        const { fecha } = this.state;
        this.estatus_carga(1);
        fetch(`${$URL_API}monitor_auditoria_ventas?fecha=${fecha}`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(j => j.json().then(e => this.llenar_lista_ventas(e)))
            .catch(err => console.log("Error...", err));
    }
    Obtener_detalle_de_corte(folio) {
        this.estatus_carga(1);
        fetch(`${$URL_API}Monitor_auditoria__venta_detalle_corte?folio=${folio}`,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(e => e.json().then(res => this.mostrar_detalles_corte(res)))
            .catch(err=>console.log("Fallo=>",err))
    }
    Obtener_Abonos_y_Deudas_Empleado(folio_empleado) {
        this.estatus_carga(1);
        fetch(`${$URL_API}Monitor_auditoria__venta_detalle_corte?folio=${folio_empleado}`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(e => e.json().then(res => this.llenar_Abonos_y_Deudas_Empleado(res)))
            .catch(err=>console.error(err));
    }
    //render
    render() {
        const { fecha, ventas, estatus, detalle_corte, Abonos_y_Deudas_Empleado } = this.state;
        return (<div className="panel panel-default">
            <CaveceraMonitor
                fecha={fecha}
                evFecha={this.evFecha}
                evCargar={this.evCargar}
            />
            <ContenedorTabla
                ventas={ventas}
                evCorteDetalle={this.evCorteDetalle}
            />
            <DetallesCorte
                detalles={detalle_corte}
                evAbonoDeuda={this.evAbonoDeuda}
            />
            <AbonosDeudasDetalleEmpleado
                lista={Abonos_y_Deudas_Empleado}
            />
            <EfectoCargar
                estatus={estatus}
            />
         </div>);
    }
}
//Componentes

const CaveceraMonitor = ({ fecha, evFecha, evCargar }) => {

    return (<div className="panel-heading">
        <div id="contenedor_fecha">
            <label className="glyphicon glyphicon-calendar" ></label>
            <input className="btn btn-default" type="date" onChange={evFecha} value={parseo_fecha(fecha)} />
        </div>
        <i className=" btn btn-info fa fa-refresh" id="btn_cargar" onClick={evCargar}></i>
    </div>);
}

const ContenedorTabla = ({ ventas, evCorteDetalle }) => {
    const Clasificador = ({ clasificador }) => {
        return [<CaveceraClasificador />,
            <tr style={{ background: "#0094ff", color: "#FFFFFF" }}>
            <td style={{ color: "#FFFFFF" }} className="iconos"><i className="glyphicon glyphicon-chevron-right"></i></td>
                <td style={{ color: "#FFFFFF" }} colspan="9">{clasificador.Nombre}</td>
                <td style={{ color: "#FFFFFF" }} className="totales">{redondeoMoney(clasificador.Total)}</td>
            <td style={{ color: "#FFFFFF" }} className="pagos">{redondeoMoney(clasificador.Pagos)}</td>
        </tr>,
            <CaveceraEstablecimiento />,
        <Estableciminetos 
            clasificador={clasificador.Nombre}
            establecimientos={clasificador.Lista_establecimientos}
         />];
    }
    const Estableciminetos = ({ clasificador, establecimientos }) => {
        return establecimientos.map(e => [<tr style={buscarIndocadoresEnEstablecimiento(e.Lista_asignaciones)}>
            <td> </td>
            <td className="iconos"><BotonTogle identificador={crear_identificador(clasificador,e.Nombre)} /></td>
            <td className="iconos">{e.Folio}</td>
            <td colspan="7">{e.Nombre}</td>
            <td className="totales">{redondeoMoney(e.Total)}</td>
            <td className="pagos">{redondeoMoney(e.Pagos)}</td>
        </tr>,
        <CaveceraAsignacion clase={crear_identificador(clasificador, e.Nombre)} />,
        <Asignaciones 
            clase={crear_identificador(clasificador, e.Nombre)}
            asignaciones={e.Lista_asignaciones}
         />]);
    }
    const Asignaciones = ({ asignaciones, clase }) => {
        return asignaciones.map(e => <tr style={{ background: IndicadorEstado(e.Corte, e.Folio_trabajo_de_Corte), display: "none",color:"#000" }} className={clase}>
            <td colspan="2"> </td>
            <td className="iconos"><i className="glyphicon glyphicon-arrow-right"></i></td>
            <td title="Asignacion">{e.Asignacion}</td>
            <td title="Fecha_venta">{e.Fecha_venta}</td>
            <td title="Fecha_Inicial">{e.Fecha_Inicial}</td>
            <td title="Fecha_Liquidacion">{e.Fecha_Liquidacion} </td>
            <td title="Corte"><BtnMostrarMas valor={e.Corte} evento={evCorteDetalle} /></td>
            <td title="Folio_trabajo_de_Corte"> <BtnMostrarMas valor={e.Folio_trabajo_de_Corte} /></td>
            <td title="Folio_Banco_Interno"> <BtnMostrarMas valor={e.Folio_Banco_Interno} /></td>
            <td className="totales">{redondeoMoney(e.Total)}</td>
            <td className="pagos">{redondeoMoney(e.Pagos)}</td>
        </tr>);
    }
    const CaveceraClasificador = () => {
        return (<tr className="caveceraclasificador">
            <td ></td>
            <td colspan="9">Clasificador</td>
            <td >Venta</td>
            <td >Pagos</td>
        </tr>);
    }
    const CaveceraEstablecimiento = () => {
        return (<tr className="cavecera" style={{ color: "#000"}}>
            <td> </td>
            <td className="iconos"></td>
            <td className="iconos">Folio</td>
            <td colspan="7">Establecimiento</td>
            <td >Venta</td>
            <td >Pagos</td>
        </tr>);
    }
    const CaveceraAsignacion = ({ clase }) => {
        return (<tr className={clase} style={{ display: "none", background:"#ccff99",color:"#000"}}>
            <td colspan="2"> </td>
            <td className="iconos"></td>
            <td title="Asignacion">Asignacion</td>
            <td title="Fecha_venta">Fecha Venta</td>
            <td title="Fecha_Inicial">Fecha Inicial</td>
            <td title="Fecha_Liquidacion">Fecha Liquidacion</td>
            <td title="Corte">Corte</td>
            <td title="Folio_trabajo_de_Corte">Folio Trabajo Corte</td>
            <td title="Folio_Banco_Interno">Folio Banco Interno</td>
            <td >Venta</td>
            <td >Pagos</td>
        </tr>);
    }
    return (<div className="panel-body" id="contenedor_tabla">
        <table className="table table-bordered">
            {
                ventas.length > 0 ? ventas.map(e => <Clasificador clasificador={e} />):<p>Sin Datos.</p>
            }
        </table>
    </div>);
}
const BtnMostrarMas = ({ valor, evento}) => {
    return (<span className="btn-mas"> {valor} {valor.search('SIN') > -1 || valor == 0 ?
        '' :
        <i title="ver Detalle." onClick={() => evento(valor)} className="glyphicon glyphicon-share"></i>}
    </span>);
}

const DetallesCorte = ({ detalles, evAbonoDeuda }) =>{
    const Cuerpo = ({ corte }) => {
        const { detalle, empleado, tickets, ventas } =  corte;
        return (<div id="cuerpo_indicadores_corte">
            <MonitorCorte
                detalle={detalle || {}}
                ventas={ventas || {}}
            />
            <DatosEmpleado
                empleado={empleado || {}}
            />
            <DatosTickets
                tickets={tickets}
            />
        </div>);
    }

    const MonitorCorte = ({ detalle, ventas }) => {
        const { folio_corte, asignaciones_en_corte, realizo_corte, empleado_reviso_en_auditoria, comentario_auditoria, cantidad_autorizaciones_por_supervisor, fecha_de_corte, promedio_de_escaneo_de_productos } = detalle;
        const { cheques,  efectivo, recibo_de_luz, tiempo_aire,importe_retiros_a_cajero, dolares, vales, total_de_vauchers, importe_fuente_de_sodas, total_pagos_dinero_electronico, corte_del_sistema, apartados, diferiencia_de_corte, abonos, diferencia_total, deposito_en_caja, total_de_retiros_clientes, cantidad_de_articulos_diferentes, cantidad_de_tickets } = ventas;
        const CorteInfo = () => {
            return (<span id="container_info_corte">
                <div>
                    <label>Folio Corte : </label>
                    <strong>{folio_corte || "NA"}.</strong>
                </div>
                <div>
                    <label>Asignacion : </label>
                    <strong>{asignaciones_en_corte || "NA"}.</strong>
                </div>
                <div>
                    <label>Fecha : </label>
                    <strong>{fecha_de_corte || "NA"}.</strong>
                </div>
                <div>
                    <label>Realizo Corte : </label>
                    <strong>{realizo_corte || "NA"}.</strong>
                </div>
                <div>
                    <label>Reviso En Auditoria : </label>
                    <strong>{empleado_reviso_en_auditoria || "NA"}.</strong>
                </div>
                <div>
                    <label>Cantidad Autorizaciones: </label>
                    <strong>{cantidad_autorizaciones_por_supervisor || "NA"}.</strong>
                </div>
                <div>
                    <label>Articulos Diferentes : </label>
                    <strong>{cantidad_de_articulos_diferentes || "NA"}.</strong>
                </div>
                <div>
                    <label>Cantidad Tickets : </label>
                    <strong>{cantidad_de_tickets || "NA"}.</strong>
                </div>
                <div>
                    <label>Promedio De Productos : </label>
                    <strong>{promedio_de_escaneo_de_productos || "NA"} Escan.</strong>
                </div>
                <div>
                    <label>Deposito En Caja : </label>
                    <strong>{redondeoMoney(deposito_en_caja) || "NA"}.</strong>
                </div>
                <div id="comentario_auditoria">
                    <label>Comentario Auditoria : </label>
                    <div>
                        {comentario_auditoria || "NA"}.
                    </div>
                </div>
            </span>);
        }
        const TotalesInfo = () => {
            return (<span id="container_totales_info">
                <div>
                    <label>Importe Retiros Caja : </label>
                    <strong>{redondeoMoney(importe_retiros_a_cajero) || "NA"}.</strong>
                </div>
                <div>
                    <label>Efectivo : </label>
                    <strong>{redondeoMoney(efectivo) || "NA"}.</strong>
                </div>
                <div>
                    <label>Dolares : </label>
                    <strong>{redondeoMoney(dolares) || "NA"}.</strong>
                </div>
                <div>
                    <label>Vales : </label>
                    <strong>{redondeoMoney(vales) || "NA"}.</strong>
                </div>
                <div>
                    <label>Cheque : </label>
                    <strong>{redondeoMoney(cheques) || "NA"}.</strong>
                </div>
                <div>
                    <label>Vouchers : </label>
                    <strong>{redondeoMoney(total_de_vauchers) || "NA"}.</strong>
                </div>
                <div>
                    <label>Fuente Sodas : </label>
                    <strong>{redondeoMoney(importe_fuente_de_sodas) || "NA"}.</strong>
                </div>
                <div>
                    <label>Dinero Electronico : </label>
                    <strong>{redondeoMoney(total_pagos_dinero_electronico) || "NA"}.</strong>
                </div>
                <div>
                    <label>Corte Sistema : </label>
                    <strong>{redondeoMoney(corte_del_sistema) || "NA"}.</strong>
                </div>
                <div>
                    <label>Apartados : </label>
                    <strong>{redondeoMoney(apartados) || "NA"}.</strong>
                </div>
                <div>
                    <label>Diferencia Corte : </label>
                    <strong>{redondeoMoney(diferiencia_de_corte) || "NA"}.</strong>
                </div>
                <div>
                    <label>Abonos : </label>
                    <strong>{redondeoMoney(abonos) || "NA"}.</strong>
                </div>
                <div id={(diferencia_total < 20 && diferencia_total > -20) ? "diferencia_total_bien" :"diferencia_total_mal" }>
                    <label>Diferencia Total : </label>
                    <strong>{redondeoMoney(diferencia_total) || "NA"}.</strong>
                </div>
                <div>
                    <label>Recibo Luz : </label>
                    <strong>{redondeoMoney(recibo_de_luz) || "NA"}.</strong>
                </div>
                <div>
                    <label>Tiempo Aire : </label>
                    <strong>{redondeoMoney(tiempo_aire) || "NA"}.</strong>
                </div>
                <div>
                    <label>Retiros Clientes : </label>
                    <strong>{redondeoMoney(total_de_retiros_clientes) || "NA"}.</strong>
                </div>

            </span>);
        }
        return (<div id="container_monitor_corte" >
            <label className="titulo_container"><i className="fa fa-money"></i> Corte</label>
            <div>
                <CorteInfo />
                <TotalesInfo />
            </div>
        </div>);
    }
    const DatosEmpleado = ({ empleado }) => {
        const { departamento, folio_establecimiento, establecimiento, estatus, fecha_ingreso, foto, id_scoi, nombre_completo, puesto, comentario } = empleado;
        return (<div id="container_datos_empleados">
            <label className="titulo_container"><i className="fa fa-user"></i> Empleado</label>
            <div>
                <img className="img-thumbnail" src={foto} alt="Empleado." height="130" width="130"/>
                <div> <label>Folio Empleado : </label> <strong>{id_scoi || "NA"}.</strong></div>
                <div> <label>Empleado : </label> <strong>{nombre_completo || "NA"}.</strong></div>
                <div> <label>Departamento : </label> <strong>{departamento || "NA"}.</strong></div>
                <div> <label>Puesto : </label> <strong>{puesto || "NA"}.</strong></div>
                <div> <label>Folio Establecimiento : </label> <strong>{folio_establecimiento || "NA"}.</strong></div>
                <div> <label>Establecimiento : </label> <strong>{establecimiento || "NA"}.</strong></div>
                <div> <label>Fecha Ingreso : </label> <strong>{fecha_ingreso || "NA"}.</strong>  <strong className="btn btn-default">{estatus || "NA"}</strong></div>
                <div>
                    <label className="btn btn-info" onClick={() => evAbonoDeuda(id_scoi)}>Abono y Deuda a Detalle.</label>
                </div>
                <div id="container_comentarios">
                    <h4>Comentarios</h4>
                    <div>{comentario || "NA"}</div>
                </div>
            </div>
        </div>);
    }
    const DatosTickets = ({ tickets }) => {
        const Lista = ({ datos }) => {
            return datos.map(e => <tr>
                <td>{e.ticket}</td>
                <td>{e.afiliacion}</td>
                <td className="redondeoMoney">{redondeoMoney(e.retiro)}</td>
                <td className="redondeoMoney">{redondeoMoney(e.importe)}</td>
            </tr>);
        }
        return (<div id="container_lista_tickets">
            <label className="titulo_container"><i className="fa fa-credit-card"></i> Vouchers</label>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ticket</th>
                            <th>Afiliacion</th>
                            <th>Retiro</th>
                            <th>Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets ? <Lista datos={tickets} />:<p>Sin Datos A Mostrar...</p>
                        }
                    </tbody>
                </table>
            </div>
        </div>);
    }
    return (<div className="container_modal" id="detalles_corte">
        <div className="panel panel-default">
            <div className="panel-heading">
                <i className="btn btn-danger close fa fa-close" onClick={() => document.querySelector("#detalles_corte").style.display = "none"}></i>
               <h4> Detalles De Corte.</h4>
            </div>
            <div className="panel-body">
                {detalles != {} ? <Cuerpo corte={detalles} /> : <h3>No hay Datos</h3>}
            </div>
        </div>
    </div>);
}

const AbonosDeudasDetalleEmpleado = ({ lista }) => {
    
    const Cuerpo = ({ datos }) => {
        const ObtenerPendiente = (posicion, dif_corte, abono) =>  posicion == 0 ? (dif_corte - abono) : (datos[posicion - 1]["pendiente"] + dif_corte - abono);
        return (<div id="tabla_detalles_abono_deuda"><table className="table">
            <thead>
                <tr>
                    <th>Folio Corte</th>
                    <th>Fecha Corte</th>
                    <th>Fecha Movimiento</th>
                    <th>Diferencia Corte</th>
                    <th>Abono</th>
                    <th>Pendiente</th>
                    <th>Lista De Raya</th>
                </tr>
            </thead>
                <tbody>
                    {
                    datos.map((e, p) => {
                        e.pendiente = ObtenerPendiente(p, e.diferencia_corte, e.abono);
                        p == 0 ? console.log("posicion",p) : '';
                      return(<tr>
                        <td>{e.folio_corte}</td>
                        <td>{e.fecha_corte}</td>
                        <td>{e.fecha_movimiento}</td>
                        <td>{redondeoMoney(e.diferencia_corte)}</td>
                        <td>{redondeoMoney(e.abono)}</td>
                        <td>{redondeoMoney(e.pendiente)}</td>
                          <td>{e.lista_de_raya_del_abono}</td>
                    </tr>)
                    })
                    }
                </tbody>
        </table></div>);
    }
    return (<div className="container_modal" id="detalles_corte_Abonos_y_deudas_a_detalle">
        <div className="panel panel-default">
            <div className="panel-heading">
                <i className="btn btn-danger close fa fa-close" onClick={() => document.querySelector("#detalles_corte_Abonos_y_deudas_a_detalle").style.display = "none"}></i>
                <h4>Abono y Deuda a Detalle.</h4>
            </div>
            <div className="panel-body">
                {lista != {} ? <Cuerpo datos={lista} /> : <h3>No hay Datos</h3>}
                <GraficaAbonosDeudasDetalle lista={lista} />
            </div>
        </div>
    </div>);
}
class GraficaAbonosDeudasDetalle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtro:"S"
        }
        this.barChart = null;
        this.evCamvio = this.cambiofiltro.bind(this);
    }
    //eventos
    cambiofiltro() {
        let f = this.state.filtro;
        let nvo = f != "S" ? 'S' : 'N';
        this.setState({ filtro: nvo });
    }
    render() {
        const { filtro } = this.state;
        setTimeout(()=>this.renderGrafica(filtro),200);
        return (<div id="grafica_Detalle_abono_deuda">
            <BtnFiltroGrafica
                tipo={filtro}
                evento={this.evCamvio}
            />
            <div>
                <canvas id="grafica_Detalle_abono_deuda_canvas">
              
                </canvas>
            </div>
        </div>);
    }
    renderGrafica(filtro) {
        const seleccion = this.props.lista.filter(e =>  filtro == "N" ?true : e.parametro === "S");

        console.log("Seleccion=>", seleccion);
        graficar_abonos_deudas_detalle_usuario(this.barChart, seleccion);
    }
}
const BtnFiltroGrafica = ({ tipo, evento }) => {
    const texto = tipo === "S" ? 'Ultimos Dos Meses.' : 'Todos.';
    const clase = tipo === "S" ? 'btn btn-info glyphicon glyphicon-filter' : 'btn btn-success glyphicon glyphicon-search';
    return (<i className={clase} onClick={evento}> Filtro de Grafica por {texto}</i>);
}

//metodos Globales
const parseo_fecha = (fecha) => {
    fecha = fecha.split("-");
    return `${fecha[2]}-${fecha[1]}-${fecha[0]}`;
}
const fecha_hoy = () => {
    let hoy = new Date();
    const mont = hoy.getMonth() > 10 ? (hoy.getMonth() + 1) : `0${(hoy.getMonth() + 1)}`;
    return `${hoy.getDate()}-${mont}-${hoy.getFullYear()}`;
}
const moneyFormat = (numero_) => {
    const decimal_con_cero = (i) => i > 9 || i.search(0) > -1 ? i : i + "0";
    const mayora_a_mil = (numero) => new Intl.NumberFormat('es-MX').format(numero);

    const numero_string = numero_.toString();
    const decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    const unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return `$${unidades != 'NaN' ? unidades: 0}.${decimal}`;
}
const IndicadorEstado = (indicadorCorte, indicadorTrabajo)=> indicadorCorte == 'SIN CORTE' ? '#ff1a1a' : indicadorTrabajo == 'SIN CONCENTRADO' ? '#ffff00' : '#FFFFFF';
const buscarIndocadoresEnEstablecimiento = lista => {  
    const corte = lista.find(e => e.Corte == 'SIN CORTE' || e.Folio_trabajo_de_Corte == 'SIN CONCENTRADO');
    return {
        background: corte ? IndicadorEstado(corte.Corte, corte.Folio_trabajo_de_Corte) : '#cce6ff',
        color:'#000000'
    };
}
///<-----------------------------------------------------------------
function redondeoMoney(numero) {
    return moneyFormat(Math.round(numero * 100) / 100);
}

const graficar_abonos_deudas_detalle_usuario = (barChart,lista) => {
    const datos_barras = [{
        label: "Diferencia.",
        data: lista.map(e => e.diferencia_corte),
        borderColor: "#00b300",
        fill: false
        },
        {
            label: "Abono.",
            data: lista.map(e => -e.abono),
            borderColor: "#0099cc",
            fill: false
        },
        {
            label: "Pendiente.",
            data: lista.map(e => e.pendiente),
            borderColor: "#ffb533",
            fill: false
        }];
    if (barChart != null) {
        barChart.clear();
        barChart.destroy();
    }
    var ctx = document.getElementById("grafica_Detalle_abono_deuda_canvas");
    barChart = new Chart(ctx,
        {
            type: 'line',
            data: {
                labels: lista.map(e => e.fecha_corte ? e.fecha_corte : e.fecha_movimiento),
                datasets: datos_barras
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                callback: (value, index, values) => `$${value} .`
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Detalle Cuenta."
                            }
                        }
                    ]
                }
            }
        });
    barChart.update();
}

location.protocol != "http:" ? location.protocol = "http:":ReactDOM.render(<Monitor />,document.querySelector('#root'));