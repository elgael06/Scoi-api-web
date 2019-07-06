/**
 * 
 * En Este Script Se Renderiza La Tabla Para Mostrar Las Ordenes de Pago.
 * Ordenandolas Por Clasificador, Establecimiento y  Concepto de Pago.
 * Mostrando Los Datos En Años, Meses y Semanas.
 * 
 * */

/* Clases */


/* Metodos */
const obtener_concepto_compra_gasto = lista => {
    let lista_conceptos = [];

    lista.forEach(c_g => {
        if (lista_conceptos.findIndex(e => e.concepto_compra_gasto === c_g.concepto_compra_gasto) === -1 ) {
            lista_conceptos.push({
                concepto_compra_gasto: c_g.concepto_compra_gasto,
                establecimientos: lista.filter(e => e.concepto_compra_gasto === c_g.concepto_compra_gasto),
                total: obtener_suma_total_lista( lista.filter(e => e.concepto_compra_gasto === c_g.concepto_compra_gasto))
            });
        }
    });
    return lista_conceptos;
}
const obtener_establecimientos = lista => {
    let lista_establecimientos = [];
    lista.forEach(esta => {
        if (lista_establecimientos.findIndex(e => e.cod_estab === esta.cod_estab) === -1) {
            lista_establecimientos.push({
                cod_estab: esta.cod_estab,
                establecimimiento: esta.establecimimiento,
                conceptos: lista.filter(e => e.cod_estab === esta.cod_estab),
                total: obtener_suma_total_lista(lista.filter(e => e.cod_estab === esta.cod_estab))
            });
        }
    });

    return lista_establecimientos;
}
const obtener_conceptos = (lista) => {
    const lista_res = [];
    lista.forEach(concep => {
        if (lista_res.findIndex(e => e.concepto_orden_de_pago === concep.concepto_orden_de_pago) === -1) {
            lista_res.push({
                concepto_orden_de_pago: concep.concepto_orden_de_pago,
                detalles: lista.filter(e => e.concepto_orden_de_pago === concep.concepto_orden_de_pago),
                total: obtener_suma_total_lista( lista.filter(e => e.concepto_orden_de_pago === concep.concepto_orden_de_pago))
            });
        }
    });


    return lista_res;
}
const obtener_suma_total_lista = lista => {
    return moneyFormat (lista.map(e => e.cantidad).reduce((a, b) => a + b));
}
const moneyFormat = numero_ => {

    const decimal_con_cero = (i) => i > 9 || i.search(0) > -1 ? i : i + "0";
    const mayora_a_mil = (numero) => new Intl.NumberFormat('es-MX').format(numero);

    const numero_string = function () {
        return Math.round(numero_ * 100) / 100;
    }().toString();
    const decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    const unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return `$${unidades || 0}.${decimal || 0}`;
}
const obtener_semanas_ocupadas_por_anio = lista => {
    const lista_meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    lista.sort((a, b) => a.anio_pago > b.anio_pago ? 1 : -1);

    let lista_anios = [];
    lista.forEach(anio => {
        if (lista_anios.findIndex(e => e.anio === anio.anio_pago) === -1) {
            let num_semana = semanas_obtenidas(lista.filter(e => e.anio_pago === anio.anio_pago));
            num_semana.sort((a, b) => lista_meses.findIndex(e => e == a.mes_pago) > lista_meses.findIndex(e => e == b.mes_pago) ? 1 : -1)
            lista_anios.push({
                anio: anio.anio_pago,
                meses: obtener_semanas_por_mes(num_semana),
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_anios;
}
const obtener_semanas_por_mes = lista => {
    let lista_meses = [];
    lista.forEach(mes => {
        if (lista_meses.findIndex(e => e.mes === mes.mes_pago) === -1) {
            let num_semana = semanas_obtenidas(lista.filter(e => e.mes_pago === mes.mes_pago));
            num_semana.sort((a, b) => a.semana_del_anio_pago > b.semana_del_anio_pago ? 1 : -1)
            lista_meses.push({
                mes: mes.mes_pago,
                semanas: num_semana.map(e => e.semana_del_anio_pago),
                cantidad_semanas: num_semana.length
            });
        }
    });
    return lista_meses;
}
const semanas_obtenidas = semanas => {
    let num_semana = [];
    semanas.forEach(sem => {
        if (num_semana.findIndex(e => e.semana_del_anio_pago === sem.semana_del_anio_pago && e.mes_pago === sem.mes_pago) === -1) {
            num_semana.push(sem);//semana_del_anio_pago
        }
    });
    return num_semana;
}
const total_de_semanas_anio = anios => {
    let meses = [], semanas = [];

    //meses en años
    anios.forEach(e => {
        //agrega los meses
        meses = meses.concat(e.meses.map(m => m.semanas.map(s => { return { semana: s, mes:m.mes } }))) || meses;
    });

    //fila senamas en meses 
    meses.forEach(m => {
        //agrega las semanas
        semanas = semanas.concat(m);
    });

    return semanas;
}
const mostrar_detalles_concepto = (concepto_pago,detalles) => {
    console.log("detalles=>", detalles);
    vista_pagos_por_semana.vista_pagos_por_semana(concepto_pago, detalles);
}
/* Componentes */
const CeldaTotal = ({ total }) => {
    return <td style={{ textAlign: "right" }}> <label>{total}</label></td>
}
const CaveceraTabla = ({ anios }) => {
    let lista = [],
        meses = [],
        semanas = [];

    let estado_color_mes = true;
    const color_fondo = () => {
        estado_color_mes = !estado_color_mes;
        return estado_color_mes ? "22, 131, 186" : "0, 119, 179";
    }
    //fila años
    lista.push(<tr className="cavecera_tabla">
        <th rowSpan="3" className="cavecera titulo" id="titulo"> <label>CONCEPTOS</label></th>
        {anios.map(e => {
         //agrega los meses
          meses = meses.concat(e.meses.map(m => m)) || meses;
            return <th colSpan={e.cantidad_semanas} >{e.anio}</th>
        })}
        <th rowSpan="3">
            <label>TOTAL</label>
        </th>
    </tr>);

    //fila meses 
    lista.push(<tr className="cavecera_tabla">
        {meses.map(m => { 
            let color_mes = color_fondo();
            //agrega las semanas
            semanas = semanas.concat(m.semanas.map(s => {
                return {
                    semana: s,
                    mes: color_mes
                }
            }))
            return <th style={{ top: "35px", background: `rgb(${color_mes})` }}  colSpan={m.cantidad_semanas}>{m.mes}</th>
        })}
    </tr>);

    //fila semanas 
    lista.push(<tr className="cavecera_tabla">
        {semanas.map(s => <th style={{ top: "68px", background: s.mes }} >{s.semana}</th>)}
    </tr>);
        
    return lista;
}
const SemanasResultadosConceptos = ({ Lista, anios}) => {///----------------->Pendiente
    let total_semanas_anio = total_de_semanas_anio(anios);

    return total_semanas_anio.map(dato => {
        // && e.mes_pago == dato.mes
        //console.log("lista Semanas =>", Lista.filter(e => e.semana_del_anio_pago == dato));
        let semanas = Lista.filter(e => e.semana_del_anio_pago == dato.semana && e.mes_pago == dato.mes);
        let filtro = semanas.map(w => w.cantidad) || [];
        let valor = filtro.length>0 ? filtro.reduce((ant, nvo) => nvo + ant) : 0;

        return (<td style={{ textAlign: "right" }}>{valor!=0 ? moneyFormat(valor):" "}</td>);
    });
}
const TablaMonitor = ({ datos }) => {
    datos.sort((a, b) => a.establecimimiento > b.establecimimiento ? 1 : -1);
    let conceptos = obtener_concepto_compra_gasto(datos || []),
        anios = obtener_semanas_ocupadas_por_anio(datos);

    return (<div style={{ height: "700px",overflow:"auto" }}>
        <table className="table">
            <thead>
                <CaveceraTabla
                    anios={anios}
                />
                
            </thead>
            <tbody>
                {conceptos.map(e => {
                    let ident = `tb_${remplazar_espacios_por_guion_bajo(e.concepto_compra_gasto)}`;
                    return[
                        <tr name="conceptos">
                            <td className="cavecera clasificador">
                                <BotonTogle
                                    identificador={ident}
                                />
                                <strong> {e.concepto_compra_gasto}</strong>
                            </td>
                            <SemanasResultadosConceptos
                                Lista={e.establecimientos}
                                anios={anios}
                            />
                            <CeldaTotal
                                total={e.total}
                            />
                        </tr>,
                        <VistaEstablecimiento
                            lista={e.establecimientos}
                            anios={anios}
                            nombre={ident}
                        />]
                })}
            </tbody>
        </table>
    </div>);
}
const VistaEstablecimiento = ({ lista, anios, nombre }) => {
    let establecimientos = obtener_establecimientos(lista || []);
    return establecimientos.map(e => {
        let ident = crear_identificador(nombre, e.establecimimiento);
        return[
            <tr name="estalbelcimientos"
                style={{ display: "none" }}
                className={nombre}>
                <td className="cavecera establecimimiento">
                    <BotonTogle
                        identificador={ident}
                    />
                    <strong>{e.establecimimiento}</strong>
                </td>
                <SemanasResultadosConceptos
                    Lista={e.conceptos}
                    anios={anios}
                />
                <CeldaTotal total={e.total} />
            </tr>,
            <VistaConceptos
                lista={e.conceptos}
                anios={anios}
                nombre={ident}
            />]
    });
}
const VistaConceptos = ({ lista, anios, nombre }) => {
    let conceptos = obtener_conceptos(lista);
    return conceptos.map(e => <tr name="ordenes"
        style={{display:"none"}}
        className={nombre}>
        <td className="cavecera concepto_orden_de_pago">
            <label>{e.concepto_orden_de_pago} </label>
            <i className="btn btn-default fa fa-info" style={{ float: "right" }} onClick={() => mostrar_detalles_concepto(e.concepto_orden_de_pago,e.detalles)}></i>
        </td>
        <SemanasResultadosConceptos
            Lista={e.detalles}
            anios={anios}
        />
        <CeldaTotal total={e.total} />
    </tr>);
}
const MostrarProveedores = ({ lista }) => {
    //handle_filter(event) {

    //}
    //handle_beneficiary(select) {

    //}
    if (lista.length > 0)
        return (<div className="panel panel-info" style={{ height: "750px" }}>
            <p>Cantidad De Registros = <strong>{lista.length || 0}</strong></p>
            <TablaMonitor
                datos={lista}
            />
        </div >);
    else return (<div><h3>Sin Registros a Mostrar!!!</h3></div>);
}

const llenar_tabla_pagos = lista => {
    ReactDOM.render(<MostrarProveedores lista={lista} />, document.querySelector("#resultados_tabla"));
}

