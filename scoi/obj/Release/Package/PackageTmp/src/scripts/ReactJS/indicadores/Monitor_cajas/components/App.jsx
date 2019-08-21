//librerias
import React, { Component } from 'react';
import Axios from 'axios';
//componentes
import Header from './Header';
import TableBodyEstablecimientos from './TableBodyEstablecimientos';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filtro: '',
            leyenda: '',
            establecimiento: {
                cod_estab_venta: -1,
                establecimiento: '',
                seleccion: {
                    cancelacion: 0,
                    diferencia: 0,
                    venta: 0
                }
            },
            colaborador: {
                folio: -1,
                nombre: '',
                foto: '',
                antiguedad: '',
                puesto: '',
                fecha: '',
                departamento: '',
                actual: {
                    venta: 0,
                    cancelacion: 0,
                    diferencia: 0
                },
                pasado: {
                    venta: 0,
                    cancelacion: 0,
                    diferencia: 0
                }
            },
            fecha: this.fecha_hoy(),
            lista: [],
            indicadores_monitor: [
                { Indicador: "Cajeros Ventas", Valor_optimo_indicador: 0, Operador: '' },
                { Indicador: "Cancelaciones", Valor_optimo_indicador: 0, Operador: '' },
                { Indicador: "Diferencia Corte", Valor_optimo_indicador: 0, Operador: '' }]
        }
        this.meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        this.barChart = null;
        this.indicadores_monitor = this.MonitoreoDeIndicadoresContraCaptura.bind(this);
        this.Obtener_indicadores();
        this.Obtener_indicadores_monitor();
    }
    render() {
        return (
            <div className="panel panel-default">
                <Header
                    titulo={` Indicadores Establecimientos De Eldorado Del Mes De "${this.fecha_mes()}".`}
                    evento={this.on_fecha.bind(this)}
                    recargar={this.on_recargar.bind(this)}
                    fecha={this.parseo_fecha()}
                />
                <TableBodyEstablecimientos
                    list={this.state.lista}
                    IndicadorMonitor={this.indicadores_monitor}
                    mes={this.fecha_mes()}
                    seleccion={this.on_seleccion_est.bind(this)}
                />
            </div>

        );
    }
    /*eventos*/
    on_fecha(e) {
        const f = e.target.value.split("-");
        this.setState({ fecha: f[2] + "/" + f[1] + "/" + f[0], lista: [] })
    }
    on_seleccion_est(seleccion, indicadores) {
        const objeto = {
            cod_estab_venta: seleccion.cod_estab_venta_venta,
            establecimiento: seleccion.establecimiento_venta,
            seleccion: indicadores
        }
        this.setState({ establecimiento: objeto });
        document.getElementById("modal_establecimiento").style.display = "flex";
    }
    on_recargar() {
        this.setState({ lista: [] });
        document.getElementById("modal_de_efecto_carga").style.display = "flex";
        this.Obtener_indicadores();
    }
    on_colaborador(seleccion) {
        const indicadores = this.Obtener_indicadores_por_mes(seleccion);
        const objeto = {
            folio: seleccion.folio_empleado,
            nombre: seleccion.nombre_empleado,
            foto: '',
            antiguedad: seleccion.antiguedad,
            puesto: seleccion.puesto,
            fecha: seleccion.fecha_ingreso,
            departamento: seleccion.departamento,
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
        this.setState({ filtro: seleccion, leyenda: leyenda_ });
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
        if (f[1] > 1)
            return this.meses[parseInt(f[1]) - 1];
        else return this.meses[parseInt(f[1]) + 11];
    }
    Obtener_indicadores_por_mes(seleccion) {
        //inicializa variables
        var venta = 0, cancelacion = 0, diferencia = 0, corte = 0, total = 0;
        var p_venta = 0, p_cancelacion = 0, p_diferencia = 0, p_corte = 0, p_total = 0;
        //lista de resultados
        const actual = this.state.lista.filter(d => d.cod_estab_venta_venta == seleccion.cod_estab_venta_venta &&
            d.folio_empleado == seleccion.folio_empleado && d.mes == this.fecha_mes()
        );
        const anterior = this.state.lista.filter(d => d.cod_estab_venta_venta == seleccion.cod_estab_venta_venta &&
            d.folio_empleado == seleccion.folio_empleado && d.mes != this.fecha_mes()
        );

        //recorre el filtro para sumar los valores
        actual.forEach(r => {
            venta += r.indicador_venta_x100;
            cancelacion += r.indicador_de_cancelaciones_x100;
            diferencia += r.indicador_diferencias_x1000;
            corte += r.total_diferencia_de_corte;
            total += r.venta_por_semana_empleado;
        });
        //recorre el filtro para sumar los valores
        anterior.forEach(r => {
            p_venta += r.indicador_venta_x100;
            p_cancelacion += r.indicador_de_cancelaciones_x100;
            p_diferencia += r.indicador_diferencias_x1000;
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

            cancelacion = lista_seleccion.map(e => this.state.indicadores_monitor.find(f => f.Indicador == "Cancelaciones").Valor_optimo_indicador),

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

        var ctx = document.getElementById("barras_char");

        if (this.barChart != null) {
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
        const venta = this.state.indicadores_monitor.find(f => f.Indicador == "Cajeros Ventas");
        const cancelacion = this.state.indicadores_monitor.find(f => f.Indicador == "Cancelaciones");
        const diferencia = this.state.indicadores_monitor.find(f => f.Indicador == "Diferencia Corte");
        var indicador_respuesta = { indicador: '', estatus: false }

        //funciones estatus
        const indicadorMayor = (selection) => valor > selection;
        const indicadorMenor = (selection) => valor < selection;
        const indicadorIgual = (selection) => valor == selection;
        const Indicador_mayo_i = (selection) => valor >= selection;
        const Indicador_menor_i = (selection) => valor >= selection;

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
            indicador_respuesta.indicador = `${Valor_optimo_indicador}  ${parametro}`;
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
    Obtener_indicadores() {
        Axios.get(`api/monitor_indicadores_cajeros?fecha=${this.state.fecha}`, {
            fecha: this.state.fecha
        }).then(respuesta => {
            if (respuesta.status == "200") {
                this.setState({ lista: respuesta.data });
            }
            else {
                alert("Error De Conexion!!!");
            }
            document.getElementById("modal_de_efecto_carga").style.display = "none";
        })
        .catch((error) => {
            console.log(error)
        })
    }
    Obtener_foto_empleado(folio) {
        Axios.get(`api/Lista_usuarios/?foto=${folio}`)
            .then(respuesta => {
                if (respuesta.status == "200")
                    objeto.foto = r.data.foto;

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
        Axios.get("api/monitor_indicadores")
            .then(respuesta => {
                this.setState({ indicadores_monitor: respuesta.data });
            })
            .catch(err=>console.log(err));
    }
}

export default App;