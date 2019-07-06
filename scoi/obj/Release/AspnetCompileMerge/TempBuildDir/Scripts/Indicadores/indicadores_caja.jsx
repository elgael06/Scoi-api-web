
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filtro: '',
            leyenda:'',
            establecimiento: {
                folio_establecimiento: -1,
                establecimiento: '',
                seleccion: {
                    cancelacion: 0,
                    diferencia: 0,
                    venta:0
                }
            },
            colaborador: {
                folio: -1,
                nombre: '',
                foto: '',
                antiguedad: '',
                puesto: '',
                fecha: '',
                departamento:'',
                actual: {
                    venta: 0,
                    cancelacion: 0,
                    diferencia:0
                },
                pasado: {
                    venta: 0,
                    cancelacion: 0,
                    diferencia: 0
                }
            },
            fecha: this.fecha_hoy(),
            lista: [],
            indicadores_monitor:[
                { Indicador: "Cajeros Ventas", Valor_optimo_indicador: 0, Operador:''},
                { Indicador: "Cancelaciones", Valor_optimo_indicador: 0, Operador: ''},
                { Indicador: "Diferencia Corte", Valor_optimo_indicador: 0, Operador: ''}]
        }
        this.meses = ["","Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        this.barChart = null;
        this.indicadores_monitor = this.MonitoreoDeIndicadoresContraCaptura.bind(this);
        this.Obtener_indicadores();
        this.Obtener_indicadores_monitor();
    }
    render() {
        return (
            <div className="panel panel-default">
                <Header titulo={` Indicadores Establecimientos De Eldorado Del Mes De "${ this.fecha_mes()}".`}
                        evento={this.on_fecha.bind(this)}
                        recargar={this.on_recargar.bind(this)}
                        fecha={this.parseo_fecha()}/>
                <TableBodyEstablecimientos list={this.state.lista}
                    IndicadorMonitor={this.indicadores_monitor}
                    mes={this.fecha_mes()}
                    seleccion={this.on_seleccion_est.bind(this)}
                />
                <ModalEmpleados seleccion={this.state.establecimiento}
                    IndicadorMonitor={this.indicadores_monitor}
                    datos={this.state.lista}
                    mes={this.fecha_mes()}
                    evento={this.on_colaborador.bind(this)}
                    fecha={this.state.fecha}
                />
                <ModalDetalleEmpleado colaborador={this.state.colaborador}
                    IndicadorMonitor={this.indicadores_monitor}
                    actual={this.fecha_mes()}
                    anterior={this.fecha_mes_anterior()}
                    establecimiento={this.state.establecimiento.establecimiento}
                    evento={this.on_detalle_colaborador.bind(this)}
                    mes={this.fecha_mes()}
                />
                <ModalSemanasColaborador lista={this.state.lista}
                    IndicadorMonitor={this.indicadores_monitor}
                    establecimiento={this.state.establecimiento.folio_establecimiento}
                    actual={this.fecha_mes()}
                    anterior={this.fecha_mes_anterior()}
                    colaborador={this.state.colaborador}
                    filtro={this.state.filtro}
                    leyenda={this.state.leyenda}
                    grafica={this.graficar.bind(this)}
                />
            </div>

            );
    }
    /*eventos*/
    on_fecha(e) {
        const f = e.target.value.split("-");
        this.setState({ fecha: f[2] + "/" + f[1] + "/" + f[0], lista: [] })
    }
    on_seleccion_est(seleccion,indicadores) {
        const objeto = {
            folio_establecimiento: seleccion.folio_establecimiento_venta,
            establecimiento: seleccion.establecimiento_venta,
            seleccion:indicadores
        }
        this.setState({ establecimiento: objeto });
        document.getElementById("modal_establecimiento").style.display = "flex";
    }
    on_recargar() {
        this.setState({lista:[]});
        document.getElementById("carga_Establecimientos").style.display = "flex";
        this.Obtener_indicadores();
    }
    on_colaborador(seleccion) {
        const indicadores =  this.Obtener_indicadores_por_mes(seleccion);
        const objeto = {
            folio: seleccion.folio_empleado,
            nombre: seleccion.nombre_empleado,
            foto: '',
            antiguedad: seleccion.antiguedad,
            puesto: seleccion.puesto,
            fecha: seleccion.fecha_ingreso,
            departamento:seleccion.departamento,
            actual: indicadores.actual,
            pasado: indicadores.anterior
        }
        this.setState({ colaborador: objeto });
        this.Obtener_foto_empleado(seleccion.folio_empleado);
        document.getElementById("modal_detalle_empleados").style.display = "flex";
    }
    on_detalle_colaborador(seleccion) {

        const venta = this.state.indicadores_monitor.find(f => f.Indicador == "Cajeros Ventas");
        const cancelacion = this.state.indicadores_monitor.find(f => f.Indicador == "Cancelaciones");
        const diferencia = this.state.indicadores_monitor.find(f => f.Indicador == "Diferencia Corte");

        var leyenda_ = "";
        if (seleccion == "Venta X 100.") {
            leyenda_ = `Total De Venta Por Cada Cien. ( Venta X 100 ${venta.Operador} ${venta.Valor_optimo_indicador} )`;
        }
        else if (seleccion == "Cancelacion X 100.") {
            leyenda_ = `Un Producto Por Cada Cien. ( Cancelaciones X 100 ${cancelacion.Operador} ${cancelacion.Valor_optimo_indicador} )`;
        }
        else {
            leyenda_ = `Un Peso por Cada Diez Mil. ( Diferencia X 10,000 ${diferencia.Operador} ${diferencia.Valor_optimo_indicador} )`;
        }
        this.setState({ filtro: seleccion,leyenda:leyenda_ });
        document.getElementById("modal_vista_semana").style.display = "flex";
    }
    /*Metodos*/
    fecha_hoy() {
        const f = new Date();
        const dia = f.getDate() > 10 ? f.getDate() : "0" + f.getDate();
        const mes = (f.getMonth() + 1) > 10 ? (f.getMonth() + 1) : "0" + (f.getMonth() + 1);
        const anio = f.getFullYear();

        return dia + "/" + mes + "/" + anio;
    }
    parseo_fecha() {
        const f = this.state.fecha.split("/");
        return f[2] + "-" + f[1] + "-" + f[0];
    }
    fecha_mes() {
        const f = this.state.fecha.split("/");
        return this.meses[parseInt(f[1])];
    }
    fecha_mes_anterior() {
        const f = this.state.fecha.split("/");
        if (f[1]>1)
            return this.meses[parseInt(f[1]) - 1];
        else return this.meses[parseInt(f[1])+11];
    }
    Obtener_indicadores_por_mes(seleccion) {
        //inicializa variables
        var venta = 0, cancelacion = 0, diferencia = 0, corte = 0, total = 0;
        var p_venta = 0, p_cancelacion = 0, p_diferencia = 0, p_corte = 0, p_total = 0;
        //lista de resultados
        const actual = this.state.lista.filter(d => d.folio_establecimiento_venta == seleccion.folio_establecimiento_venta &&
            d.folio_empleado == seleccion.folio_empleado && d.mes == this.fecha_mes()
        );
        const anterior = this.state.lista.filter(d => d.folio_establecimiento_venta == seleccion.folio_establecimiento_venta &&
            d.folio_empleado == seleccion.folio_empleado && d.mes != this.fecha_mes()
        );

        //recorre el filtro para sumar los valores
        actual.forEach(r => {
            venta += r.indicado_venta_x_100;
            cancelacion += r.indicador_cancelacion_x_100;
            diferencia += r.indicacor_diferencia_x_1000;
            corte += r.total_diferencia_de_corte;
            total += r.venta_por_semana_empleado;
        });
        //recorre el filtro para sumar los valores
        anterior.forEach(r => {
            p_venta += r.indicado_venta_x_100;
            p_cancelacion += r.indicador_cancelacion_x_100;
            p_diferencia += r.indicacor_diferencia_x_1000;
            p_corte += r.total_diferencia_de_corte;
            p_total += r.venta_por_semana_empleado;
        });
        //ajusta a dos decimales
        venta = Math.round(((venta / actual.length) * 100)) / 100;
        cancelacion = Math.round(((cancelacion / actual.length) * 100)) / 100;
        diferencia = Math.round(((diferencia / actual.length) * 100)) / 100;
        corte = Math.round(((corte / actual.length) * 100)) / 100;
        total = Math.round(((total / actual.length) * 100)) / 100;
        //ajusta a dos decimales
        p_venta = Math.round(((p_venta / anterior.length) * 100)) / 100;
        p_cancelacion = Math.round(((p_cancelacion / anterior.length) * 100)) / 100;
        p_diferencia = Math.round(((p_diferencia / anterior.length) * 100)) / 100;
        p_corte = Math.round(((p_corte / anterior.length) * 100)) / 100;
        p_total = Math.round(((p_total / anterior.length) * 100)) / 100;

        return {
            actual: {
                venta: venta,
                cancelacion: cancelacion,
                diferencia: diferencia,
                corte: corte,
                total: total
            },
            anterior: {
                venta: p_venta,
                cancelacion: p_cancelacion,
                diferencia: p_diferencia,
                corte: p_corte,
                total: p_total
            }
        };

    }
    graficar(lista_seleccion, titulo, labs) {

        var venta = lista_seleccion.map(e => this.state.indicadores_monitor.find(f => f.Indicador == "Cajeros Ventas").Valor_optimo_indicador),

            cancelacion = lista_seleccion.map(e => this.state.indicadores_monitor.find(f => f.Indicador == "Cancelaciones").Valor_optimo_indicador) ,

            diferencia = lista_seleccion.map(e => this.state.indicadores_monitor.find(f => f.Indicador == "Diferencia Corte").Valor_optimo_indicador)

        const datos_barras = [{
            label: "inidcador.",
            data: lista_seleccion,
            borderColor: "#00b300",
            fill: false
        }];
        switch (titulo) {
            case "Venta X 100. Semanas Del Año.":
                datos_barras.push({
                    label: "Venta.",
                    data: venta,
                    borderColor: "#6a2172",
                    fill: false
                });
                break;
            case "Cancelacion X 100. Semanas Del Año.":
                datos_barras.push({
                    label: "Cancelacion.",
                    data: cancelacion,
                    borderColor: "#cd6543",
                    fill: false
                });
                break;
            case "Diferencia X 10,000. Semanas Del Año.":
                datos_barras.push({
                    label: "Diferencia.",
                    data: diferencia,
                    borderColor: "#136dbc",
                    fill: false
                });
                break;

        }

        var ctx= document.getElementById("barras_char");

        if (this.barChart!=null) {
            this.barChart.clear();
            this.barChart.destroy();
        }

        this.barChart = new Chart(ctx,
            {
                type: 'line',
                data: {
                    labels: labs,
                    datasets: datos_barras
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                    callback: (value, index, values) => `${value} .`
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: titulo
                                }
                            }
                        ]
                    }
                }
            });
        this.barChart.update();
    }
    MonitoreoDeIndicadoresContraCaptura(valor, tipo_indicador) {
        //objetos
        const venta             = this.state.indicadores_monitor.find(f => f.Indicador == "Cajeros Ventas");
        const cancelacion       = this.state.indicadores_monitor.find(f => f.Indicador == "Cancelaciones");
        const diferencia        = this.state.indicadores_monitor.find(f => f.Indicador == "Diferencia Corte");
        var indicador_respuesta = {indicador:'',estatus:false}
        
        //funciones estatus
        const indicadorMayor    = (selection) =>  valor > selection;
        const indicadorMenor    = (selection) =>  valor < selection;
        const indicadorIgual    = (selection) =>  valor == selection;
        const Indicador_mayo_i  = (selection) =>  valor >= selection;
        const Indicador_menor_i = (selection) =>  valor >= selection;

        //funciones operador
        const operador = ({ Operador, Indicador, Valor_optimo_indicador }) => {
            var parametro = "";

            switch (Operador) {
                case ">":
                    indicador_respuesta.estatus = indicadorMayor(Valor_optimo_indicador);
                    parametro = ">";
                    break;
                case "<":
                    indicador_respuesta.estatus = indicadorMenor(Valor_optimo_indicador);
                    parametro = "<";
                    break;
                case "=":
                    indicador_respuesta.estatus = indicadorIgual(Valor_optimo_indicador);
                    parametro = "=";
                    break;
                case ">=":
                    indicador_respuesta.estatus = Indicador_mayo_i(Valor_optimo_indicador);
                    parametro = ">=";
                    break;
                case "<=":
                    indicador_respuesta.estatus = Indicador_menor_i(Valor_optimo_indicador);
                    parametro = "<=";
                    break;

            }
            indicador_respuesta.indicador = `${Valor_optimo_indicador}  ${ parametro }`;
        };


        switch (tipo_indicador) {
            case "venta":
                operador(venta);
                break;
            case "cancelacion":
                operador(cancelacion);
                break;
            case "diferencia":
                operador(diferencia);
                break;
        }
        return indicador_respuesta;
    }
    /*coneciones*/
    Obtener_indicadores(){
        fetch("servicios/indicadores/indicadores_cajas_conexion.asmx/lista_indicadores", {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fecha: this.state.fecha
            })
        }).then(respuesta => {
            if (respuesta.status == "200")
                respuesta.text().then(
                    (r) => {
                        r = JSON.parse(r);
                        if (r.d.length > 0)
                            this.setState({ lista: r.d });
                        else alert("Sin Datos A Mostrar!!!");
                        document.getElementById("carga_Establecimientos").style.display = "none";
                    })
                    .catch(err => alert("Error en ", err));
            else {
                document.getElementById("carga_Establecimientos").style.display = "none";
                alert("Error De Conexion!!!");
            }
        })
        .catch((error) => {
            console.log(error)
            alert('Error:', error)
        })
    }
    Obtener_foto_empleado(folio) {
        fetch("servicios/ususrios_scoiServ.asmx/obtener_usuario_imagen", {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipo: "id_scoi",
                filtro: folio
            })
        }).then(respuesta => {
            if (respuesta.status == "200")
                respuesta.text().then(
                    r => {
                        const objeto = this.state.colaborador;
                        r = JSON.parse(r);
                        if (r.d.foto) {
                            objeto.foto = r.d.foto;
                            //console.log(objeto);
                            
                        }
                        else {
                            objeto.foto = "../../../Data/usr.jpg";
                            //console.log("Sin Foto A Mostrar!!!");
                        }
                        this.setState({ colaborador: objeto });
                    })
                    .catch(err => {
                        this.Obtener_foto_empleado(folio);
                    });
            else {
                alert("Error De Conexion!!!");
                this.Obtener_foto_empleado(folio);
            }
        })
            .catch((error) => {
                console.log(error)
                alert('Error:', error)
            })
    }
    Obtener_indicadores_monitor() {
        fetch("servicios/indicadores/indicadores_cajas_conexion.asmx/Indicadores_monitor",
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json()
                .then(respuesta => {
                    //console.table(respuesta.d);
                    this.setState({ indicadores_monitor:respuesta.d});
            }))
            .catch();
    }
}

const Cargar = ({ nombre }) => { 
    return (
        <div id={nombre}
        style={{
            display:"flex",
            position: "fixed",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(144, 144, 146, 0.29)",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            fontSize: "40px"
        }}>
        <label id={nombre + 1}>
                <i className="fa fa-circle-o-notch rotate" ></i>
                <strong style={{ fontSize: "20px" }}> Cargando...</strong><br />
        </label>
  </div>
  )
}

const Checar = (dato) => dato ? "green" : "red";


const Header = ({ titulo, fecha, evento,recargar}) => {
    return (
        <div className="panel-heading" style={{ "display": "flex", "top": "-10px" }}>
            <span>
                <h3>{titulo}</h3>
            </span>
            <Fecha />
            <i className="btn btn-default fa fa-download"
                onClick={recargar}
                style={{ "marginTop": "20px", "marginLeft": "20px", "fontSize": "20px" }}>
                <strong style={{marginLegt:"5px",fontSize:"15px"}}> Cargar Informacion. </strong>
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

const TableBodyEstablecimientos = ({ list, seleccion, mes, IndicadorMonitor}) => {
    const Lista = () => {
        //componente privado que genera y calcula las filas
        const Dato = ({ e }) => {
            //inicializa variables
            var venta = 0, cancelacion = 0, diferencia = 0, corte = 0, total = 0;
            //lista de resultados
            const res = list.filter(d => d.folio_establecimiento_venta == e.folio_establecimiento_venta && d.mes==mes);
            //recorre el filtro para sumar los valores
            res.forEach(r => {
                venta       += r.indicado_venta_x_100;
                cancelacion += r.indicador_cancelacion_x_100;
                diferencia  += r.indicacor_diferencia_x_1000;
                corte       += r.total_diferencia_de_corte;
                total       += r.venta_por_semana_empleado;
            });
            //ajusta a dos decimales
            venta       = Math.round(((venta        / res.length) * 100)) / 100;
            cancelacion = Math.round(((cancelacion  / res.length) * 100)) / 100;
            diferencia  = Math.round(((diferencia   / res.length) * 100)) / 100;
            corte       = Math.round(((corte        / res.length) * 100)) / 100;
            total = Math.round(((total / res.length) * 100)) / 100;
            //indicador monitor base
            var indicador_venta = IndicadorMonitor(venta, "venta");
            var indicador_cancelacion = IndicadorMonitor(cancelacion, "cancelacion");
            var indicador_diferencia = IndicadorMonitor(diferencia, "diferencia");
            //returna la fila
            return(
                <tr key={e.folio_establecimiento_venta}>
                    <td>{e.folio_establecimiento_venta}</td>
                    <td>{e.establecimiento_venta}</td>
                    <td style={{ textAlign: "right" }} className={Checar(indicador_venta.estatus)}>
                        <label>{indicador_venta.indicador}</label>
                        <strong> {venta}</strong>
                    </td>
                    <td style={{ textAlign: "right" }} className={Checar(indicador_cancelacion.estatus)}>
                        <label>{indicador_cancelacion.indicador}</label>
                        <strong style={{marginLeft:"5px"}}>{cancelacion}</strong>
                    </td>
                    <td style={{ textAlign: "right" }} className={Checar(indicador_diferencia.estatus)} >
                        <label>{indicador_diferencia.indicador}</label>
                        <strong style={{ marginLeft: "5px" }}>{diferencia}</strong>
                    </td>
                    <td style={{ textAlign: "right" }}>
                        $
                        <strong style={{ marginLeft: "5px" }}>{corte}</strong>
                    </td>
                    <td>
                        $
                        <strong>{total}</strong>
                    </td>
                    <td>
                        <i className="btn btn-info glyphicon glyphicon-list-alt"
                            onClick={() => seleccion(e, {venta,cancelacion,diferencia})}> Indicadores</i>
                    </td>
                </tr>
            );
        }

        const lista = [];//listas que contendra todas las filas
        var folio = 0;//folio para filtrar

        list.sort((a, b) => a.folio_establecimiento_venta > b.folio_establecimiento_venta?1:-1);//ordenamiento de establecimientos

        list.forEach( e => {
            if (folio != e.folio_establecimiento_venta ) {
                folio = e.folio_establecimiento_venta;
                lista.push(<Dato e={e} key={e.folio_establecimiento_venta} />);
            }
        });

        return lista;
    }

    return (
        <div className="panel-body" style={{ height: "560px"}}>
            <div style={{ height: "540px", overflow: "auto" }}>
                <table className="table">
                    <thead>
                        <tr style={{ background: "#0194ae" }} >
                            <th style={{ width: "40px", color: "azure",fontSize:"18px"}}>Folio</th>
                            <th style={{ color: "azure", fontSize: "18px"}}>Establecimiento</th>
                            <th style={{ width: "130px", color: "azure" }}>Venta x 100</th>
                            <th style={{ width: "130px", color: "azure" }}>Cancelaciones x 100</th>
                            <th style={{ width: "130px", color: "azure" }}>Diferencia x 10,000</th>
                            <th style={{ width: "90px", color: "azure" }}>Diferencia Cortes</th>
                            <th style={{ width: "70px", color: "azure" }}>Venta Total</th>
                            <th style={{ width: "70px", color: "azure" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Lista />
                    </tbody>
                </table>
            </div>
            <Cargar nombre={"carga_Establecimientos"} />
        </div>
        );
}

const ModalEmpleados = ({ seleccion, datos, evento, mes, IndicadorMonitor}) => {
    const Indicadores = ({ titulo,valor,r}) => {
        return (
            <div className="form-group" style={{ width: "125px", display: "inline-block", marginLeft: "25px"}}>
                <strong style={{fontSize:"12px"}}>{titulo}</strong>
                <label className={"form-control " + r} style={{textAlign:"right"}}>
                    {valor}
                </label>
            </div>
            );
    }

    const filtro =()=> {
        return datos.filter( e=>e.folio_establecimiento_venta==seleccion.folio_establecimiento && e.mes==mes );
    }

    //indicador monitor base
    var indicador_venta = IndicadorMonitor(seleccion.seleccion.venta, "venta");
    var indicador_cancelacion = IndicadorMonitor(seleccion.seleccion.cancelacion, "cancelacion");
    var indicador_diferencia = IndicadorMonitor(seleccion.seleccion.diferencia, "diferencia");

    return (
        <div id="modal_establecimiento"
            style={{
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(144, 144, 146, 0.29)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9991,
                display: "none"
            }}
        >
            <div className="panel panel-default animate" style={{ height: "90%", minHeight: "600px",width:"95%",maxWidth:"1100px",minWidth:"500px" }} >
                <div className="panel-heading" style={{ height: "8%", background:"#0194ae",color:"azure",fontSize:"18px" }} >
                    <i className="close fa fa-close"
                        onClick={() => cerrar()}></i>
                    <strong>INDICADORES {seleccion.establecimiento}.</strong>
                </div>
                <div className="panel-default" style={{ height: "85%" }}  >
                    <div className="panel-heading" >
                        <span>
                            <label style={{fontSize:"25px"}}>
                                Total Indicadores Del Mes "{mes}".
                            </label>
                        </span>
                        <span style={{display:"inline-block"}} >
                            <Indicadores titulo={"Venta X 100"}
                                valor={seleccion.seleccion.venta}
                                r={Checar(indicador_venta.estatus)} />
                            <Indicadores titulo={"Cancelacion X 100"}
                                valor={seleccion.seleccion.cancelacion}
                                r={Checar(indicador_cancelacion.estatus)} />
                            <Indicadores titulo={"diferencia X 10,000"}
                                valor={seleccion.seleccion.diferencia}
                                r={Checar(indicador_diferencia.estatus)} />
                        </span>
                    </div>
                    <div className="panel-body" style={{ height: "90%" }}>
                        <div style={{ height: "90%", overflow: "auto", marginTop: "1px"}}>
                            <TablaEmpleados
                                lista={filtro()}
                                evento={evento}
                                IndicadorMonitor={IndicadorMonitor}
                            />
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <i className="btn btn-danger close"
                        onClick={() => cerrar()}
                        style={{ marginLeft: "88%", fontSize: "14px",background:"red",color:"azure" }} >
                        Cerrar
                    </i>
                </div>
        </div>
    </div>
    );
    function cerrar() {
        document.getElementById("modal_establecimiento").style.display = "none";
    }
}
const TablaEmpleados = ({ lista, evento, IndicadorMonitor }) => {


    const Datos = ({ e }) => {
        //inicializa variables
        var venta = 0, cancelacion = 0, diferencia = 0, corte = 0, total = 0;
        //lista de resultados
        const res = lista.filter(d => d.folio_establecimiento_venta == e.folio_establecimiento_venta &&
            d.folio_empleado == e.folio_empleado);
        //recorre el filtro para sumar los valores
        res.forEach(r => {
            venta += r.indicado_venta_x_100;
            cancelacion += r.indicador_cancelacion_x_100;
            diferencia += r.indicacor_diferencia_x_1000;
            corte += r.total_diferencia_de_corte;
            total += r.venta_por_semana_empleado;
        });
        //ajusta a dos decimales
        venta = Math.round(((venta / res.length) * 100)) / 100;
        cancelacion = Math.round(((cancelacion / res.length) * 100)) / 100;
        diferencia = Math.round(((diferencia / res.length) * 100)) / 100;
        corte = Math.round(((corte / res.length) * 100)) / 100;
        total = Math.round(((total / res.length) * 100)) / 100;

        //indicador monitor base
        var indicador_venta = IndicadorMonitor(venta, "venta");
        var indicador_cancelacion = IndicadorMonitor(cancelacion, "cancelacion");
        var indicador_diferencia = IndicadorMonitor(diferencia, "diferencia");

        return (
            <tr style={{fontSize:"14px"}} >
                <td>{e.folio_empleado}</td>
                <td>{e.nombre_empleado}</td>
                <td style={{ textAlign: "center" }}> {indicador_venta.indicador}</td>
                <td style={{ textAlign: "center" }} className={Checar(indicador_venta.estatus)}>{venta}</td>
                <td style={{ textAlign: "center" }}> {indicador_cancelacion.indicador} </td>
                <td style={{ textAlign: "center" }} className={Checar(indicador_cancelacion.estatus)}>{cancelacion}</td>
                <td style={{ textAlign: "center" }}>{indicador_diferencia.indicador}</td>
                <td style={{ textAlign: "center" }} className={Checar(indicador_diferencia.estatus)}>{diferencia}</td>
                <td>
                    <i className="btn btn-primary fa fa-calendar"
                        onClick={() => evento(e)}
                        title="Indicadores Por Semana."> Colaborador</i>
                </td>
            </tr>
            );
    }
    const Lista = () => {
        const lista_f = [];//listas que contendra todas las filas
        var folio = 0;//folio para filtrar

        lista.forEach(e => {
            if (folio != e.folio_empleado) {
                folio = e.folio_empleado;
                lista_f.push(<Datos e={e} key={e.folio_empleado} />);
            }
        });
        return lista_f;
    }
    return (
        <table className="table">
            <thead >
                <tr style={{ background: "#087fe4", heigth: "20px"}} >
                    <th rowSpan="2" style={{ width: "40px", color: "azure", fontSize: "18px" }}>Folio</th>
                    <th rowSpan="2" style={{ color: "azure", fontSize: "18px" }}>Colaborador</th>
                    <th colSpan="2" style={{ width: "90px", color: "azure", fontSize: "12px",textAlign:"center" }}>Venta</th>
                    <th colSpan="2" style={{ width: "90px", color: "azure", fontSize: "12px", textAlign: "center" }}>Cancelacion</th>
                    <th colSpan="2" style={{ width: "90px", color: "azure", fontSize: "12px", textAlign: "center" }}>Diferencia</th>
                    <th rowSpan="2" style={{ width: "40px" }}></th>
                </tr>
                <tr style={{ background: "#087fe4" }}>
                    <th style={{ color: "azure", textAlign: "center"}}>Objetivo</th>
                    <th style={{ color: "azure", textAlign: "center" }}>Real</th>
                    <th style={{ color: "azure", textAlign: "center" }}>Objetivo</th>
                    <th style={{ color: "azure", textAlign: "center" }}>Real</th>
                    <th style={{ color: "azure", textAlign: "center" }}>Objetivo</th>
                    <th style={{ color: "azure", textAlign: "center" }}>Real</th>
                </tr>
            </thead>
            <tbody>
                <Lista />
            </tbody>
        </table>
        );
}

const ModalDetalleEmpleado = ({ colaborador, establecimiento, actual, anterior, evento, IndicadorMonitor}) => {

    return (
        <div id="modal_detalle_empleados"
            style={{
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(144, 144, 146, 0.29)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9991,
                display: "none"
            }}
        >
            <div className="panel panel-default animate" style={{ height: "80%", minHeight: "550px", width: "90%", maxWidth: "1050px", minWidth: "500px" }} >
                <div className="panel-heading" style={{ height: "8%", background: "#087fe4", color: "azure", fontSize: "18px" }} >
                    <i className="close fa fa-close"
                        onClick={() => cerrar()}></i>
                    <strong>INDICADORES COLABORADOR {establecimiento}. </strong>
                </div>
                <ViewUsuario usuario={colaborador} />
                <div className="panel-body" style={{ height: "55%" }}  >
                    <div style={{ height: "95%", overflow: "auto", marginTop: "1px", background: "#e0ebeb" }}>
                        <ListaIndicadores
                            indicadoresAnt={colaborador.pasado}
                            actual={actual}
                            anterior={anterior}
                            indicadoresAct={colaborador.actual}
                            IndicadorMonitor={IndicadorMonitor}
                            evento={evento}
                        />
                    </div>
                </div>
                <div className="panel-footer">
                    <i className="btn btn-danger"
                        onClick={() => cerrar()}
                        style={{ marginLeft: "88%", fontSize: "14px", background: "red", color: "azure" }} >
                        Cerrar
                        </i>
                </div>
            </div>
        </div>
    );
    function cerrar() {
        document.getElementById("modal_detalle_empleados").style.display = "none";
    }
}
const ViewUsuario = ({ usuario }) => {
    return (
        <div className="panel panel-default" style={{'display': 'inline-block', 'marginTop': '2px' }}>
            <div className="panel panel-heading">
                <div style={{ 'display': 'inline-block', 'marginTop': '-1px', 'height': '110px' }}>
                    <img src={usuario.foto} width='110' alt="Usuario" className="img-rounded" />
                </div>
                <Formularios
                    nombre={usuario.nombre}
                    puesto={usuario.puesto}
                    fecha={usuario.fecha}
                    antigurdad={usuario.antiguedad}
                    departamento={usuario.departamento}
                />
            </div>
        </div>);
}
const Formularios = ({ nombre, puesto, fecha, antigurdad ,departamento}) => {
    const ComponenteGrande = ({ titulo, valor }) => (
        <div className="form-group" style={{ 'width': '450px', 'display': 'inline-block', 'marginLeft': '20px' }}>
            <strong>{titulo}</strong>
            <label className="form-control">{valor}</label>
        </div>);
    const ComponenteMediano = ({ titulo, valor }) => (
        <div style={{ 'width': '330px', 'display': 'inline-block', 'marginLeft': '20px' }}>
            <strong>{titulo}</strong>
            <label className="form-control">{valor.substr(0, 41) + "."}</label>
        </div>
    );
    const ComponenteCorto = ({ titulo, valor }) => (
        <div style={{ 'width': '180px', 'display': 'inline-block', 'marginLeft': '20px' }}>
            <strong>{titulo}</strong>
            <label className="form-control">{valor.substr(0, 31) + "."}</label>
        </div>
    );
    return (
        <div style={{ 'width': '860px', 'display': 'inline-block', 'marginLeft': '100px', 'marginTop': '-180px', 'fontFamily': 'consolas' }}>
            <ComponenteGrande titulo={'Nombre'}
                valor={nombre} />
            <ComponenteMediano titulo={'Puesto'}
                valor={puesto} />
            <ComponenteMediano titulo={'Departamento'}
                valor={departamento} />
            <ComponenteCorto titulo={'Antiguedad en puesto'}
                valor={antigurdad} />
            <ComponenteCorto titulo={'Fecha Ingreso'}
                valor={fecha} />
        </div>
    );
}
const ListaIndicadores = ({ indicadoresAct, indicadoresAnt, actual, anterior, evento, IndicadorMonitor }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr className="info">
                        <th>
                            <strong>Indicadores Por Mes</strong>
                        </th>
                        <th style={{width:"150px"}}>Objetivo Mensual</th>
                        <th style={styles.cuerpo.tabla.cavecera_indicador_ch}> {actual}</th>
                        <th style={styles.cuerpo.tabla.cavecera_indicador_ch}> {anterior}</th>
                        <th style={styles.cuerpo.tabla.cavecera_indicador_ch}></th>
                    </tr>
                </thead>
                <DatosIndicador
                    indicadoresAct={indicadoresAct}
                    indicadoresAnt={indicadoresAnt}
                    evento={evento}
                    IndicadorMonitor={IndicadorMonitor}
                />
            </table>
        </div>
    );
}
const DatosIndicador = ({ indicadoresAct, indicadoresAnt, evento, IndicadorMonitor }) => {

    //indicador monitor base actual
    var indicador_venta = IndicadorMonitor(indicadoresAct.venta, "venta");
    var indicador_cancelacion = IndicadorMonitor(indicadoresAct.cancelacion, "cancelacion");
    var indicador_diferencia = IndicadorMonitor(indicadoresAct.diferencia, "diferencia");
    //indicador monitor base anterior
    var indicador_venta_anterior = IndicadorMonitor(indicadoresAnt.venta, "venta");
    var indicador_cancelacion_anterior = IndicadorMonitor(indicadoresAnt.cancelacion, "cancelacion");
    var indicador_diferencia_anterior = IndicadorMonitor(indicadoresAnt.diferencia, "diferencia");

    const Fila = ({ descripcion, objetivo, actual, condicionAct, anterior, condicionAnt }) => {
        //console.log("Datos:empleado:", { descripcion, objetivo, actual, condicionAct, anterior, condicionAnt });
        return (
            <tr>
                <td>{descripcion}</td>
                <td>
                    <i style={styles.cuerpo.tabla.cavecera_indicador_ch} className="btn btn-default">
                        {objetivo}
                    </i>
                </td>
                <td > <Cumple valor={actual} condicion={condicionAct} /></td>
                <td > <Cumple valor={anterior} condicion={condicionAnt} /></td>
                <td style={styles.cuerpo.tabla.cavecera_indicador_ch}>
                    <i className="btn btn-info glyphicon glyphicon-list-alt" onClick={() => evento(descripcion)}>
                        <label style={{ marginLeft: "5px" }}>Indicadores Por Semanas</label>
                    </i>
                </td>
            </tr>
            );
    }
    return (
        <tbody>
            <Fila descripcion={"Venta X 100."}
                objetivo={indicador_venta.indicador}
                actual={indicadoresAct.venta}
                condicionAct={indicador_venta.estatus}
                anterior={indicadoresAnt.venta}
                condicionAnt={indicador_venta_anterior.estatus}
            />
            <Fila descripcion={"Cancelacion X 100."}
                objetivo={indicador_cancelacion.indicador}
                actual={indicadoresAct.cancelacion}
                condicionAct={indicador_cancelacion.estatus}
                anterior={indicadoresAnt.cancelacion}
                condicionAnt={indicador_cancelacion_anterior.estatus}
            />
            <Fila descripcion={"Diferencia X 10,000."}
                objetivo={indicador_diferencia.indicador}
                actual={indicadoresAct.diferencia}
                condicionAct={indicador_diferencia.estatus}
                anterior={indicadoresAnt.diferencia}
                condicionAnt={indicador_diferencia_anterior.estatus}
            />
        </tbody>
    );
    
    function Cumple({ valor, condicion }) {
        var cumple = condicion ? "btn btn-success glyphicon glyphicon-ok" : "btn btn-danger glyphicon glyphicon-remove";

        return (
            <i style={styles.cuerpo.tabla.cavecera_indicador_ch} className={cumple}>
                <label style={{ marginLeft: "5px" }}>{valor}</label>
            </i>
        );
    }
}

const ModalSemanasColaborador = ({ lista, establecimiento, colaborador, actual, anterior, filtro, grafica, leyenda, IndicadorMonitor}) => {

    const listaSemanas = lista.filter(e => e.folio_establecimiento_venta == establecimiento && e.folio_empleado == colaborador.folio);

    const condicion = [];

    //console.info("semanas", listaSemanas);

    const IndicadoresSemama = () => {
        var labels = [];
        listaSemanas.forEach((e)=> {
            labels.push("Semana " + e.semana_anio +" .");
        });
        if (filtro == "Venta X 100.") {
            const listaVenta = listaSemanas.map(e => e.indicado_venta_x_100) || [];
            listaVenta.forEach(e => {
                var indicador_venta = IndicadorMonitor(e, "venta");
                condicion.push(indicador_venta.estatus);
            });

            if (listaVenta.length > 0)
                grafica(listaVenta, filtro + " Semanas Del Año.", labels);

            return <TablaSemana
                condicion={condicion}
                lista={listaVenta}
                labels={labels}
            />;
        }
        else if (filtro == "Cancelacion X 100.") {
            const listaCancelacion = listaSemanas.map(e => e.indicador_cancelacion_x_100) || [];

            listaCancelacion.forEach(e => {
                var indicador_cancelacion = IndicadorMonitor(e, "cancelacion");
                condicion.push(indicador_cancelacion.estatus);
            });

            if (listaCancelacion.length > 0)
                grafica(listaCancelacion, filtro + " Semanas Del Año.", labels);

            return <TablaSemana
                condicion={condicion}
                lista={listaCancelacion}
                labels={labels}
            />;
        }
        else {
            const listaDiferencia = listaSemanas.map(e => e.indicacor_diferencia_x_1000) || [];

            listaDiferencia.forEach(e => {
                var indicador_diferencia = IndicadorMonitor(e, "diferencia");
                condicion.push(indicador_diferencia.estatus);
            });

            if (listaDiferencia.length > 0)
                grafica(listaDiferencia, filtro + " Semanas Del Año.", labels);

            return <TablaSemana
                condicion={condicion}
                lista={listaDiferencia}
                labels={labels}
            />;
        }
    }
    function cerrar() {
      document.getElementById("modal_vista_semana").style.display = "none";
    }
    return (
        <div style={styles.modal_base} id="modal_vista_semana">
            <div className="panel panel-default animate" style={styles2.vista}>
                <div className="panel-heading" style={styles2.cavecera}>
                    <i className="close fa fa-close" onClick={() =>cerrar()}></i>
                    <label>Indicadores Por semanas.</label>
                </div>
                <div className="panel-heading" style={styles2.tabla}>
                    <h4>Colaborador: {colaborador.nombre}.</h4>
                    <strong>Resultados Semanales {filtro} {anterior} Y {actual}.</strong>
                    <br />
                    <label>{leyenda}</label>
                    <IndicadoresSemama />
                </div>
                <div className="panel-body" id="constenedorCanvas" style={styles2.cuerpo}>
                    <canvas id="barras_char">
                    </canvas>
                </div>
            </div>
        </div>
    );
}
const TablaSemana = ({ lista, labels ,condicion}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {labels.map((e,p) => (
                        <th key={e+"_"+p}>{e}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <Datos />
            </tbody>
        </table>
    );
    function Datos() {
        return <tr>{lista.map(
            (e, p) => (
                <td key={e+"_"+p}>
                    <Comparar actual={e}
                        anterior={lista[p - 1]}
                        condicion={condicion[p]} />
                </td>
                )
        )}</tr>
    }
    function Comparar({ actual, anterior, condicion }) {
        var res;
        var a = condicion ? "btn btn-success" : "btn btn-danger";

        if (actual != anterior && anterior != null) {
            res = anterior > actual ? " glyphicon glyphicon-download" : " glyphicon glyphicon-upload";
        }
        else {
            res = anterior == actual ? "" : " glyphicon glyphicon-play-circle";
        }

        return <i className={a+res}>
            <label  style={{ marginLeft: "5px",width:"18px",fontSize:"12px" }}>{actual}</label>
        </i>
    }
}

const styles = {
    modal_base: {
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(144, 144, 146, 0.29)",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9991,
        display: "none"
    },
    vista: {
        height: "700px",
        width: "800px"
    },
    cavecera: {
        height: "40px",
        backgroundColor: "#349CEB",
        color: "#FFFFFF",
        foto: {
            height: "50px",
            display: "inline-block",
            width: "60px"
        },
        contenedor_nombre: {
            display: "inline-block",
            width: "480px",
            marginTop: "-60px",
            marginLeft: "68px"
        },
        contenedor_puesto: {
            marginLeft: "10px",
            display: "inline-block",
            marginTop: "-70px",
            width: "210px"
        },
        nombre: {
            borderBottom: "solid 1px #000000"
        },
        puesto: {
            borderBottom: "solid 1px #000000"
        }
    },
    cuerpo: {
        height: "550px",
        tabla: {
            cavecera_indicador_ch: {
                width: "80px",
                textAlign: "center"
            }
        }
    },
    pie: {
        height: "50px",
        cerrar: {
            marginLeft: "690px",
            marginTop: "-6px"
        }
    }

}
const styles2 = {
    vista: {
        height: "750px",
        width: "1000px"
    },
    cavecera: {
        height: "40px",
        backgroundColor: "#2EAB64",
        color: "#FFFFFF"
    },
    tabla: {
        height: "210px"
    },
    cuerpo: {
        position: "relative",
        height: "450px",
        width:"100%",
        tabla: {
            cavecera_indicador_ch: {
                width: "80px",
                textAlign: "center"
            }
        }
    },
    pie: {
        height: "50px",
        cerrar: {
            marginLeft: "590px",
            marginTop: "-6px"
        }
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById("root")
);