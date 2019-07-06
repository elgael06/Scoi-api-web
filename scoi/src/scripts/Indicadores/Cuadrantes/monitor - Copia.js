//leector del documento
$(document).ready(function () {

    descargar_tabla_empeado_dia_semana()
});
init_llenado_tabla = function () {
    asignar_fecha();
    obtener_semana_de_anio();
    CUADRANTES = conexion_ajax("../servicios/monitor_cumplimiento_cuadrantesServ.asmx/cuadrantes_reporte_para_monitor_general", {
        fecha_i: SEMANA_ANIO.lunes
        , fecha_f: SEMANA_ANIO.domingo
        , Establecimiento: "Todos"
    });
    eventos_estaticos()
    obtener_cuadrantes()
    llenar_indicadores()

}


/********************************
    variables globales
*********************************/
//Arreglos
var CUADRANTES = [], PERSONAS = [], DEPARTAMENTOS = [], PUESTOS = [], PERSONA_CUADRANTES = [], ESTABLECIMIENTOS = [];

//Objetos
var USUARIO_ = { establecimiento: "Todos", nombre: "", folio: "" };
var OBJ_PERSONA = {}, OBJ_PERSONA_CUADRANTE = {}, OBJ_DEPARTAMENTO = {}, OBJ_PUESTOS = {}, OBJ_ESTABLECIMIENTO = {};
//arreglo aspectos
var Generales = { si: 0, no: 0, na: 0, promedios: [] }, Senalizaciones = { si: 0, no: 0, na: 0, promedios: [] }, Surtido = { si: 0, no: 0, na: 0, promedios: [] }, Caducidades = { si: 0, no: 0, na: 0, promedios: [] }, Limpieza = { si: 0, no: 0, na: 0, promedios: [] }
var SEMANA_ANIO = {}

/********************************************************
            clases 
*******************************************************/
class manejo_numeros {

    static checar_numero(dato) {
        if (dato > -1)
            return dato
        else return "--"
    }
    static convertir_porciento(dato) {
        return (dato > -1) ? Math.round((dato * 10000)) / 100 : "--";
    }
    static promedio_datos(datos) {
        var suma = 0, cantidad = 0;
        if (datos.length > 0) {
            datos.forEach(function (item, index) {
                if (item > -1) {
                    suma += item;
                    cantidad += 1;
                }
            })
        }
        else return "--"

        return suma / cantidad;
    }
    static convertir_texto_en_cero(dato) {
        return (dato > -1) ? dato : 0;
    }
    static retornar_color_segun_valor_porcentual(item) {
        if (item >= .95) { return "#4cb500" }
        else if (item >= .90 && item < .95) { return "#FFFFFF" }
        else if (item >= .85 && item < .90) { return "#ffff00" }
        else if (item < .85) { return "red" }
        else { return "#4cb2c4" }
    }
}
class aspecto {

    constructor() {

        if (CUADRANTES.length >= 1) {
            this.llenar_personas();
            this.llenar_puestos();
            this.llena_departamento();
            this.llenar_establecimientos();
        }
        else alert("Sin Datos A Mostrar!!!")
    }

    static llenar_aspectos(item) {
        Generales.si += manejo_numeros.convertir_texto_en_cero(item.Generales.si)
        Generales.no += manejo_numeros.convertir_texto_en_cero(item.Generales.no)
        Generales.na += manejo_numeros.convertir_texto_en_cero(item.Generales.na)

        Senalizaciones.si += manejo_numeros.convertir_texto_en_cero(item.Senalizaciones.si)
        Senalizaciones.no += manejo_numeros.convertir_texto_en_cero(item.Senalizaciones.no)
        Senalizaciones.na += manejo_numeros.convertir_texto_en_cero(item.Senalizaciones.na)

        Surtido.si += manejo_numeros.convertir_texto_en_cero(item.Surtido.si)
        Surtido.no += manejo_numeros.convertir_texto_en_cero(item.Surtido.no)
        Surtido.na += manejo_numeros.convertir_texto_en_cero(item.Surtido.na)

        Caducidades.si += manejo_numeros.convertir_texto_en_cero(item.Caducidades.si)
        Caducidades.no += manejo_numeros.convertir_texto_en_cero(item.Caducidades.no)
        Caducidades.na += manejo_numeros.convertir_texto_en_cero(item.Caducidades.na)
        Caducidades.promedios.push(item.Caducidades.promedio)

        Limpieza.si += manejo_numeros.convertir_texto_en_cero(item.Limpieza.si)
        Limpieza.no += manejo_numeros.convertir_texto_en_cero(item.Limpieza.no)
        Limpieza.na += manejo_numeros.convertir_texto_en_cero(item.Limpieza.na)
    }
    //puestos
    llenar_puestos() {
        //funciones internas
        function llenar_promedios(item) {

            OBJ_PUESTOS.Generales.push(item.Generales.promedio)
            OBJ_PUESTOS.Senalizaciones.push(item.Senalizaciones.promedio)
            OBJ_PUESTOS.Surtido.push(item.Surtido.promedio)
            OBJ_PUESTOS.Limpieza.push(item.Limpieza.promedio)
            OBJ_PUESTOS.Caducidades.push(item.Caducidades.promedio)
            OBJ_PUESTOS.promedio_total.push(item.promedio_total)
        }
        function obtener_porcentaje() {
            OBJ_PUESTOS.Generales = manejo_numeros.promedio_datos(OBJ_PUESTOS.Generales)
            OBJ_PUESTOS.Senalizaciones = manejo_numeros.promedio_datos(OBJ_PUESTOS.Senalizaciones)
            OBJ_PUESTOS.Surtido = manejo_numeros.promedio_datos(OBJ_PUESTOS.Surtido)
            OBJ_PUESTOS.Limpieza = manejo_numeros.promedio_datos(OBJ_PUESTOS.Limpieza)
            OBJ_PUESTOS.Caducidades = manejo_numeros.promedio_datos(OBJ_PUESTOS.Caducidades)
            OBJ_PUESTOS.promedio_total = manejo_numeros.promedio_datos(OBJ_PUESTOS.promedio_total)

            PUESTOS.push(OBJ_PUESTOS)
        }
        //recorrido de cuadrantes para llenar objetos
        PERSONAS.forEach(function (item, index) {
            if (index == 0) {
                OBJ_PUESTOS = {
                    puesto: item.puesto
                    , departamento: item.departamento
                    , establecimiento: item.establecimiento
                    , Generales: []
                    , Senalizaciones: []
                    , Surtido: []
                    , Limpieza: []
                    , Caducidades: []
                    , promedio_total: []
                }
            }
            if (OBJ_PUESTOS.puesto == item.puesto) {
                llenar_promedios(item);
            }
            else if (OBJ_PUESTOS.puesto != item.puesto) {
                obtener_porcentaje();
                //reinicia puestos
                OBJ_PUESTOS = {
                    puesto: item.puesto
                    , departamento: item.departamento
                    , establecimiento: item.establecimiento
                    , Generales: []
                    , Senalizaciones: []
                    , Surtido: []
                    , Limpieza: []
                    , Caducidades: []
                    , promedio_total: []
                }
                llenar_promedios(item);
            }
        });

        obtener_porcentaje();
    }
    //estaablecimientos
    llenar_establecimientos() {
        //funciones internas
        function llenar_promedios(item) {
            OBJ_ESTABLECIMIENTO.Generales.push(item.Generales);
            OBJ_ESTABLECIMIENTO.Señalizacion.push(item.Senalizaciones);
            OBJ_ESTABLECIMIENTO.Surtido.push(item.Surtido);
            OBJ_ESTABLECIMIENTO.Caducidades.push(item.Caducidades);
            OBJ_ESTABLECIMIENTO.Limpieza.push(item.Limpieza);
            OBJ_ESTABLECIMIENTO.promedio_total.push(item.promedio_total)
        }
        function obtener_porcentaje() {
            OBJ_ESTABLECIMIENTO.Generales = manejo_numeros.promedio_datos(OBJ_ESTABLECIMIENTO.Generales)
            OBJ_ESTABLECIMIENTO.Señalizacion = manejo_numeros.promedio_datos(OBJ_ESTABLECIMIENTO.Señalizacion)
            OBJ_ESTABLECIMIENTO.Surtido = manejo_numeros.promedio_datos(OBJ_ESTABLECIMIENTO.Surtido)
            OBJ_ESTABLECIMIENTO.Caducidades = manejo_numeros.promedio_datos(OBJ_ESTABLECIMIENTO.Caducidades)
            OBJ_ESTABLECIMIENTO.Limpieza = manejo_numeros.promedio_datos(OBJ_ESTABLECIMIENTO.Limpieza)
            OBJ_ESTABLECIMIENTO.promedio_total = manejo_numeros.promedio_datos(OBJ_ESTABLECIMIENTO.promedio_total)

            ESTABLECIMIENTOS.push(OBJ_ESTABLECIMIENTO)
        }

        DEPARTAMENTOS.forEach(function (item, index) {
            if (index == 0) {
                OBJ_ESTABLECIMIENTO = {
                    establecimiento: item.establecimiento
                    , Generales: []
                    , Señalizacion: []
                    , Surtido: []
                    , Caducidades: []
                    , Limpieza: []
                    , promedio_total: []
                }
            }
            if (OBJ_ESTABLECIMIENTO.establecimiento == item.establecimiento) {
                llenar_promedios(item);
            }
            else if (OBJ_ESTABLECIMIENTO.establecimiento != item.establecimiento) {

                obtener_porcentaje();

                OBJ_ESTABLECIMIENTO = {
                    establecimiento: item.establecimiento
                    , Generales: []
                    , Señalizacion: []
                    , Surtido: []
                    , Caducidades: []
                    , Limpieza: []
                    , promedio_total: []
                }
                llenar_promedios(item);
            }
        })

        obtener_porcentaje();
    }
    //personas
    llenar_personas() {
        //funciones internas
        function llenar_actividad(item) {
            var actividad = {
                folio_actividad: item.folio_actividad
                , actividad: item.actividad
                , aspecto: item.aspecto
                , tipo_actividad: item.tipo_actividad
                , respuesta: item.respuesta
                , observacion: item.observacion
                , fecha: item.fecha
                , dia_semana: item.dia_semana
                , semana_del_año: item.semana_del_año
            }
            OBJ_PERSONA.actividad.push(actividad)
        }
        function llenar_aspectos_persona(item) {

            if (item.aspecto == "Generales") {
                if (item.respuesta == "Si" || item.respuesta == "si") { OBJ_PERSONA.Generales.si += 1 }
                else if (item.respuesta == "No" || item.respuesta == "no") { OBJ_PERSONA.Generales.no += 1 }
                else { OBJ_PERSONA.Generales.na += 1 }
            }
            else if (item.aspecto == "Señalizaciones") {
                if (item.respuesta == "Si" || item.respuesta == "si") { OBJ_PERSONA.Senalizaciones.si += 1 }
                else if (item.respuesta == "No" || item.respuesta == "no") { OBJ_PERSONA.Senalizaciones.no += 1 }
                else { OBJ_PERSONA.Senalizaciones.na += 1 }
            }
            else if (item.aspecto == "Surtido") {
                if (item.respuesta == "Si" || item.respuesta == "si") { OBJ_PERSONA.Surtido.si += 1 }
                else if (item.respuesta == "No" || item.respuesta == "no") { OBJ_PERSONA.Surtido.no += 1 }
                else { OBJ_PERSONA.Surtido.na += 1 }
            }
            else if (item.aspecto == "Caducidades") {
                if (item.respuesta == "Si" || item.respuesta == "si") { OBJ_PERSONA.Caducidades.si += 1 }
                else if (item.respuesta == "No" || item.respuesta == "no") { OBJ_PERSONA.Caducidades.no += 1 }
                else { OBJ_PERSONA.Caducidades.na += 1 }
            }
            else if (item.aspecto == "Limpieza") {
                if (item.respuesta == "Si" || item.respuesta == "Si") { OBJ_PERSONA.Limpieza.si += 1 }
                else if (item.respuesta == "No" || item.respuesta == "no") { OBJ_PERSONA.Limpieza.no += 1 }
                else { OBJ_PERSONA.Limpieza.na += 1 }
            }
        }
        function obtener_promedio_llenar_arreglo() {
            //promedio es: si/(si + no).
            OBJ_PERSONA.Generales.promedio = manejo_numeros.checar_numero(manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Generales.si) / (manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Generales.si) + manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Generales.no)))

            OBJ_PERSONA.Senalizaciones.promedio = manejo_numeros.checar_numero(manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Senalizaciones.si) / (manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Senalizaciones.si) + manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Senalizaciones.no)))

            OBJ_PERSONA.Surtido.promedio = manejo_numeros.checar_numero(manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Surtido.si) / (manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Surtido.si) + manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Surtido.no)))

            OBJ_PERSONA.Caducidades.promedio = manejo_numeros.checar_numero(manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Caducidades.si) / (manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Caducidades.si) + manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Caducidades.no)))

            OBJ_PERSONA.Limpieza.promedio = manejo_numeros.checar_numero(manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Limpieza.si) / (manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Limpieza.si) + manejo_numeros.convertir_texto_en_cero(OBJ_PERSONA.Limpieza.no)))

            //promedio total de aspectos
            OBJ_PERSONA.promedio_total = manejo_numeros.checar_numero(manejo_numeros.promedio_datos([
                OBJ_PERSONA.Generales.promedio
                , OBJ_PERSONA.Senalizaciones.promedio
                , OBJ_PERSONA.Surtido.promedio
                , OBJ_PERSONA.Caducidades.promedio
                , OBJ_PERSONA.Limpieza.promedio
            ]
            ))

            PERSONAS.push(OBJ_PERSONA)
        }

        var AUX_CUADRANTES = [];
        CUADRANTES.forEach(function (item, index) {
            AUX_CUADRANTES.push(item)
        })
        AUX_CUADRANTES.sort(function (a, b) {
            if (a.nombre_colaborador > b.nombre_colaborador) {
                return 1;
            }
            if (a.nombre_colaborador < b.nombre_colaborador) {
                return -1;
            }
            return 0;
        });

        //recorrido de cuadrantes para llenar objetos
        AUX_CUADRANTES.forEach(function (item, index) {

            if (index == 0) {

                OBJ_PERSONA = {
                    nombre_colaborador: item.nombre_colaborador
                    , departamento: item.departamento
                    , establecimiento: item.establecimiento
                    , puesto: item.puesto
                    , actividad: []
                    , Generales: { si: 0, no: 0, na: 0, promedio: [] }
                    , Senalizaciones: { si: 0, no: 0, na: 0, promedio: [] }
                    , Surtido: { si: 0, no: 0, na: 0, promedio: [] }
                    , Caducidades: { si: 0, no: 0, na: 0, promedio: [] }
                    , Limpieza: { si: 0, no: 0, na: 0, promedio: [] }
                }

            }
            if (OBJ_PERSONA.nombre_colaborador == item.nombre_colaborador) {
                llenar_actividad(item)
                llenar_aspectos_persona(item)

            }
            else if (OBJ_PERSONA.nombre_colaborador != item.nombre_colaborador) {

                obtener_promedio_llenar_arreglo();

                OBJ_PERSONA = {
                    nombre_colaborador: item.nombre_colaborador
                    , departamento: item.departamento
                    , establecimiento: item.establecimiento
                    , puesto: item.puesto
                    , actividad: []
                    , Generales: { si: 0, no: 0, na: 0, promedio: [] }
                    , Senalizaciones: { si: 0, no: 0, na: 0, promedio: [] }
                    , Surtido: { si: 0, no: 0, na: 0, promedio: [] }
                    , Caducidades: { si: 0, no: 0, na: 0, promedio: [] }
                    , Limpieza: { si: 0, no: 0, na: 0, promedio: [] }
                }
                llenar_aspectos_persona(item)
            }
        });
        obtener_promedio_llenar_arreglo();
        PERSONAS.sort(function (a, b) {
            if (a.puesto > b.puesto) {
                return 1;
            }
            if (a.puesto < b.puesto) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        PERSONAS.sort(function (a, b) {
            if (a.departamento > b.departamento) {
                return 1;
            }
            if (a.departamento < b.departamento) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        PERSONAS.sort(function (a, b) {
            if (a.establecimiento > b.establecimiento) {
                return 1;
            }
            if (a.establecimiento < b.establecimiento) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

    }
    //departamentos
    llena_departamento() {
        //funciones internas
        function llenar_promedios(item) {

            OBJ_DEPARTAMENTO.Generales.push(item.Generales)
            OBJ_DEPARTAMENTO.Senalizaciones.push(item.Senalizaciones)
            OBJ_DEPARTAMENTO.Surtido.push(item.Surtido)
            OBJ_DEPARTAMENTO.Caducidades.push(item.Caducidades)
            OBJ_DEPARTAMENTO.Limpieza.push(item.Limpieza)
            OBJ_DEPARTAMENTO.promedio_total.push(item.promedio_total)
        }
        function obtener_porcentaje() {

            OBJ_DEPARTAMENTO.Generales = manejo_numeros.promedio_datos(OBJ_DEPARTAMENTO.Generales)
            OBJ_DEPARTAMENTO.Senalizaciones = manejo_numeros.promedio_datos(OBJ_DEPARTAMENTO.Senalizaciones)
            OBJ_DEPARTAMENTO.Surtido = manejo_numeros.promedio_datos(OBJ_DEPARTAMENTO.Surtido)
            OBJ_DEPARTAMENTO.Caducidades = manejo_numeros.promedio_datos(OBJ_DEPARTAMENTO.Caducidades)
            OBJ_DEPARTAMENTO.Limpieza = manejo_numeros.promedio_datos(OBJ_DEPARTAMENTO.Limpieza)
            OBJ_DEPARTAMENTO.promedio_total = manejo_numeros.promedio_datos(OBJ_DEPARTAMENTO.promedio_total)

            DEPARTAMENTOS.push(OBJ_DEPARTAMENTO)

        }
        PUESTOS.forEach(function (item, index) {

            if (index == 0) {
                OBJ_DEPARTAMENTO = {
                    departamento: item.departamento
                    , establecimiento: item.establecimiento
                    , Generales: []
                    , Senalizaciones: []
                    , Surtido: []
                    , Caducidades: []
                    , Limpieza: []
                    , promedio_total: []
                }
            }
            if (OBJ_DEPARTAMENTO.departamento == item.departamento) {
                llenar_promedios(item);
            }
            else if (OBJ_DEPARTAMENTO.departamento != item.departamento) {

                obtener_porcentaje();

                OBJ_DEPARTAMENTO = {
                    departamento: item.departamento
                    , establecimiento: item.establecimiento
                    , Generales: []
                    , Senalizaciones: []
                    , Surtido: []
                    , Caducidades: []
                    , Limpieza: []
                    , promedio_total: []
                }
                llenar_promedios(item);
            }
        })
        obtener_porcentaje();
    }
}
/********************************
        funciones generales
*********************************/
function eventos_estaticos() {
    $(".fa-refresh").on("click", function () {
        recargar_tabla();
    })
    $("#fecha_1 input").on("change", function () {
        obtener_semana_de_anio();
        recargar_tabla();
    });
    $("#cerrar").on("click", function () {

        $("#modal_empleado").hide()//animate({ marginTop: "-1000px" }, 1000);
        //$("#modal_empleado").animate({ marginTop: "-3px" }, 1000);
    })

}
recargar_tabla = function () {
    var est = "Todos";
    if (USUARIO_.length != "") { }
    //Arreglos
    CUADRANTES = [], PERSONAS = [], DEPARTAMENTOS = [], PUESTOS = [], PERSONA_CUADRANTES = [], ESTABLECIMIENTOS = [];
    //Objetos
    OBJ_PERSONA = {}, OBJ_PERSONA_CUADRANTE = {}, OBJ_DEPARTAMENTO = {}, OBJ_PUESTOS = {}, OBJ_ESTABLECIMIENTO = {};

    CUADRANTES = conexion_ajax("../servicios/monitor_cumplimiento_cuadrantesServ.asmx/cuadrantes_reporte_para_monitor_general", {
        fecha_i: SEMANA_ANIO.lunes
        , fecha_f: SEMANA_ANIO.domingo
        , Establecimiento: USUARIO_.establecimiento
    });
    obtener_cuadrantes()
    llenar_indicadores()
}
filtrar_por_ususario = function () {
    asignar_fecha();
    obtener_semana_de_anio();
    USUARIO_ = conexion_ajax("../servicios/monitor_cumplimiento_cuadrantesServ.asmx/establecimiento_pertenece_empleado"
        , {
            usuario: USUARIO.nombre_usuario
        });

    CUADRANTES = conexion_ajax("../servicios/monitor_cumplimiento_cuadrantesServ.asmx/cuadrantes_reporte_para_monitor_general", {
        fecha_i: SEMANA_ANIO.lunes
        , fecha_f: SEMANA_ANIO.domingo
        , Establecimiento: USUARIO_.establecimiento
    });

    PERSONAS = [], DEPARTAMENTOS = [], PUESTOS = [], PERSONA_CUADRANTES = [], ESTABLECIMIENTOS = [];
    //Objetos
    OBJ_PERSONA = {}, OBJ_PERSONA_CUADRANTE = {}, OBJ_DEPARTAMENTO = {}, OBJ_PUESTOS = {}, OBJ_ESTABLECIMIENTO = {};
    eventos_estaticos()
    obtener_cuadrantes()
    llenar_indicadores()

}
//eventos dinamicos: estos eventos son lanzados al cambiar la tabla
eventos_dinamocos_tablas = function () {

    $(".area").on("click", function () {

        var departamento = $(this).children(":nth-child(1)").text();
        console.log(departamento + ":" + $(this).attr("name"));

        DEPARTAMENTOS.forEach(function (item, index) {

            if (item.departamento == departamento) {

                $("#contenedor").children("*").remove();

                OBJ_DEPARTAMENTO = item;
                llenar_cavecera_establecimientos(OBJ_DEPARTAMENTO.establecimiento);
                llenar_tabla_departamentos(OBJ_DEPARTAMENTO);
                llenar_talba_puestos()
            }
        });
    })

}
//funcion
obtener_cuadrantes = function () {

    //funciones de llenado
    new aspecto;

}
//llenar los datos en memoria
llenar_datos_memorio_usuario = function () {
    sessionStorage['id_usuario'] = USUARIO_.folio;
    sessionStorage['establecimiento'] = USUARIO_.establecimiento;
    sessionStorage['usuario'] = USUARIO_.nombre;
}
//manejo de fecha
asignar_fecha = function (dia) {
    if (dia == null) {
        dia = new Date(), d = dia.getDate(), m = dia.getMonth(), a = dia.getFullYear();
        m = m + 1;
        if (m < 10)
            m = "0" + m;
        if (d < 10)
            d = "0" + d;
        var f = (a + "-" + m + "-" + d);
        // console.log("Fecha:"+f);
        $('#fecha_1 input').val(f);
        $('#fecha_2 input').val(f);
    }
    else {
        dia = new Date(dia), d = dia.getDate(dia), m = dia.getMonth(dia), a = dia.getFullYear(dia);
        m = m + 1;
        if (m < 10)
            m = "0" + m;
        if (d < 10)
            d = "0" + d;
        var f = (a + "-" + m + "-" + d);
        // console.log("Fecha:"+f);
        $('#fecha_1 input').val(f);
        $('#fecha_2 input').val(f);
    }
}
obtener_fecha = function (id) {
    var dia = $('#' + id).val();
    var d = dia[8] + dia[9];
    var m = dia[5] + dia[6];
    var a = dia[0] + dia[1] + dia[2] + dia[3];

    return d + "-" + m + "-" + a;
}
const obtener_semana_de_anio = () => {
    let fecha = obtener_fecha("fecha_1 input");
    fetch(`/Globales/Semana_actual?fecha=${fecha}`, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(err => console.error("Error=>", err))
        .then(res => res.json().then(res => {

            //asignar Semana
            $("#selector_semana").val(res.Semana)
            $("#selector_anio").val(res.Anio)
            //asignar Dias
            $('#fecha_1 input').val(invertir_fecha(res.Lunes));
            $('#fecha_2 input').val(invertir_fecha(res.Domingo));

        }))

    //funcion interna
    function invertir_fecha(fecha) {
        var a = fecha.split("/")
        return a[2] + "-" + a[1] + "-" + a[0];
    }
}

/********************************
    manejo de DOM
*********************************/
llenar_indicadores = function () {

    $("#contenedor").children("*").remove();
    //funciones
    //llamada a funcines
    llenar_cavecera_establecimientos()
    ESTABLECIMIENTOS.forEach(function (item, index) {
        llenar_tabla_establecimientos(item)
    })
    //eventos_dinamocos_tablas();
}

llenar_cavecera_establecimientos = function (dato) {
    if (dato == null)
        dato = "ELDORADO";

    $("#contenedor").append(
        $("<table>").append(
            $("<tr>").append(
                $("<th>").append($("<i>").addClass("fa fa-home").css({ "margin-right": "10px", "margin-left": "2px" }), dato)
                , $("<th>").append("GENERALES").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("SEÑALIZACION").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("SURTIDO").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("CADUCIDAD").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("LIMPIEZA").css({ "text-align": "center" }).attr({ "colspan": "3" })
                , $("<th>").append("PROMEDIO").css({ "text-align": "center" })
            ).css({ "background": "#0094ff", "color": "white" }).addClass("cavecera")
        ).addClass("indicadores")
    );
    //recarga la primer tabla
    $(".cavecera").on("click", function () {
        llenar_indicadores()
    })
}
//esta funcion va dentro de un ciclo que recorrera los datos a colocar de parametro
llenar_tabla_departamentos = function (area) {

    var promedio, Generales = manejo_numeros.checar_numero(area.Generales)
        , Señalizacion = manejo_numeros.checar_numero(area.Senalizaciones)
        , Surtido = manejo_numeros.checar_numero(area.Surtido)
        , Caducidades = manejo_numeros.checar_numero(area.Caducidades)
        , Limpieza = manejo_numeros.checar_numero(area.Limpieza)

    promedio = manejo_numeros.promedio_datos([Generales, Señalizacion, Surtido, Caducidades, Limpieza])
    // console.log(promedio)
    $(".indicadores").append(
        $("<tr>").append(
            $("<td>").append($("<i>").addClass("fa fa-angle-right").css({ "margin-right": "3px", "margin-left": "12px" }), "" + area.departamento)

            , $("<td>").append(manejo_numeros.convertir_porciento(Generales) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Generales), "color": "black" }).attr({ "colspan": "3" })

            , $("<td>").append(manejo_numeros.convertir_porciento(Señalizacion) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Señalizacion), "color": "black" }).attr({ "colspan": "3" })

            , $("<td>").append(manejo_numeros.convertir_porciento(Surtido) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Surtido), "color": "black" }).attr({ "colspan": "3" })

            , $("<td>").append(manejo_numeros.convertir_porciento(Caducidades) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Caducidades), "color": "black" }).attr({ "colspan": "3" })

            , $("<td>").append(manejo_numeros.convertir_porciento(Limpieza) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Limpieza), "color": "black" }).attr({ "colspan": "3" })

            , $("<td>").append(manejo_numeros.convertir_porciento(promedio) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(promedio), "color": "black" })

        ).addClass("area").css({ "color": "#217dbf" }).attr("name", area.establecimiento)
    )
    //aqui va la llamada de tabla empleado
}
llenar_tabla_establecimientos = function (Establecimiento) {

    llenar_tabla_establecimiento = function () {

        var promedio = manejo_numeros.checar_numero(Establecimiento.promedio_total)
            , Generales = manejo_numeros.checar_numero(Establecimiento.Generales)
            , Señalizacion = manejo_numeros.checar_numero(Establecimiento.Señalizacion)
            , Surtido = manejo_numeros.checar_numero(Establecimiento.Surtido)
            , Caducidades = manejo_numeros.checar_numero(Establecimiento.Caducidades)
            , Limpieza = manejo_numeros.checar_numero(Establecimiento.Limpieza)

        //console.log(promedio)
        $(".indicadores").append(
            $("<tr>").append(
                $("<th>").append(Establecimiento.establecimiento)
                , $("<th>").append(manejo_numeros.convertir_porciento(Generales) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Generales), "color": "black" }).attr({ "colspan": "3" })

                , $("<th>").append(manejo_numeros.convertir_porciento(Señalizacion) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Señalizacion), "color": "black" }).attr({ "colspan": "3" })

                , $("<th>").append(manejo_numeros.convertir_porciento(Surtido) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Surtido), "color": "black" }).attr({ "colspan": "3" })

                , $("<th>").append(manejo_numeros.convertir_porciento(Caducidades) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Caducidades), "color": "black" }).attr({ "colspan": "3" })

                , $("<th>").append(manejo_numeros.convertir_porciento(Limpieza) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(Limpieza), "color": "black" }).attr({ "colspan": "3" })

                , $("<th>").append(manejo_numeros.convertir_porciento(promedio) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(promedio), "color": "black" })

            ).css({}).addClass("establecimiento")
        )
    }

    llenar_tabla_establecimiento()

    DEPARTAMENTOS.forEach(function (dato, indice) {
        if (dato.establecimiento == Establecimiento.establecimiento) { llenar_tabla_departamentos(dato) }
    })
    //eventos dinamicos para tabla
    eventos_dinamocos_tablas()
}
llenar_talba_puestos = function () {

    PUESTOS.forEach(function (item, index) {

        if (OBJ_DEPARTAMENTO.departamento == item.departamento) {

            $(".indicadores").append(
                $("<tr>").append(
                    $("<td>").append($("<i>").addClass("fa fa-angle-double-right").css({ "margin-right": "3px", "margin-left": "22px" }), item.puesto)
                    , $("<td>").append(manejo_numeros.convertir_porciento(item.Generales) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(item.Generales), "color": "black" }).attr({ "colspan": "3" })

                    , $("<td>").append(manejo_numeros.convertir_porciento(item.Senalizaciones) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(item.Senalizaciones), "color": "black" }).attr({ "colspan": "3" })

                    , $("<td>").append(manejo_numeros.convertir_porciento(item.Surtido) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(item.Surtido), "color": "black" }).attr({ "colspan": "3" })

                    , $("<td>").append(manejo_numeros.convertir_porciento(item.Caducidades) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(item.Caducidades), "color": "black" }).attr({ "colspan": "3" })

                    , $("<td>").append(manejo_numeros.convertir_porciento(item.Limpieza) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(item.Limpieza), "color": "black" }).attr({ "colspan": "3" })

                    , $("<td>").append(manejo_numeros.convertir_porciento(item.promedio_total) + "%").css({ "text-align": "center", "background": manejo_numeros.retornar_color_segun_valor_porcentual(item.promedio_total), "color": "black" })

                ).css({ "color": "#547c98" }).addClass("puestos").attr("name", OBJ_DEPARTAMENTO.departamento)
            )
        }

    })

    $(".puestos").on("click", function () {
        var puesto = $(this).children(":nth-child(1)").text();
        console.log(puesto + ">" + $(this).attr("name"));
        $("#contenedor").children("*").remove();

        llenar_cavecera_establecimientos($(this).attr("name"))
        llenar_tabla_empleado(puesto)
    })
}
llenar_tabla_empleado = function (puesto) {

    var AUXILIAR_PUESTOS = [];

    var promedios = {
        Generales_promedios: []
        , Senalizaciones_promedios: []
        , Surtido_promedios: []
        , Caducidades_promedios: []
        , Limpieza_promedios: []
        , suma_promedios: []
    }

    /*funciones internas*/
    evento_click_para_cambiar_tabla = function () {
        //evento click para retroceder
        $(".cavecera_si_no_na").on("click", function () {
            var departamento = $(this).attr("name");
            console.log(departamento + ":");
            DEPARTAMENTOS.forEach(function (item, index) {
                if (item.departamento == departamento) {

                    $("#contenedor").children("*").remove();
                    OBJ_DEPARTAMENTO = item;
                    llenar_cavecera_establecimientos(OBJ_DEPARTAMENTO.establecimiento)
                    llenar_tabla_departamentos(OBJ_DEPARTAMENTO)
                    llenar_talba_puestos()
                }
            })
        })
        //evento de click para tabla empleado
        $(".empleados").on("click", function () {

            var nombre_empleado = $(this).children(":nth-child(1)").text();

            console.log(nombre_empleado)
            AUXILIAR_PUESTOS.forEach(function (item, index) {
                if (item.nombre_colaborador == nombre_empleado) {
                    OBJ_PERSONA_CUADRANTE = item;
                }
            })
            mostrar_semana_de_actividades()
        })
    }

    //filtramos las personas por puesto y establecimiento 
    PERSONAS.forEach(function (item, index) {
        if (item.departamento == OBJ_DEPARTAMENTO.departamento && item.establecimiento == OBJ_DEPARTAMENTO.establecimiento && item.puesto == puesto) {
            AUXILIAR_PUESTOS.push(item)
        }
    })
    //ordenamos por nombre
    AUXILIAR_PUESTOS.sort(function (a, b) {
        if (a.nombre_colaborador > b.nombre_colaborador) { return 1; }
        if (a.nombre_colaborador < b.nombre_colaborador) { return -1; }
        return 0;
    });
    //recorrer datos ya filtrados
    AUXILIAR_PUESTOS.forEach(function (item, index) {

        if (index == 0) {
            var tr = $("<tr>")
            tr.append($("<th>").append($("<i>").addClass("fa fa-mail-reply").css({ "margin-right": "3px", "margin-left": "2px" }), item.puesto));
            for (var i = 0; i < 5; i++) {
                tr.append($("<th>").append("SI").css({ "text-align": "center" }).attr({ "colspan": "1" }).css({ "border-left": "solid 2px #0094ff", "background": "#4cb500" })
                    , $("<th>").append("NO").css({ "text-align": "center" }).attr({ "colspan": "1" }).css({ "background": "red" })
                    , $("<th>").append("NA").css({ "text-align": "center" }).attr({ "colspan": "1" }).css({ "border-right": "solid 2px #0094ff", "background": "#0073e3" })
                )
            }
            tr.append($("<th>").append("TOTAL").css({ "text-align": "center" }).attr({ "colspan": "1" })).addClass("cavecera_si_no_na").attr("name", item.departamento)
            $(".indicadores").append(tr)
        }

        $(".indicadores").append(
            $("<tr>").append($("<td>").append($("<i>").addClass("fa fa-angle-double-right").css({ "margin-right": "3px", "margin-left": "20px" }), item.nombre_colaborador)
                , $("<td>").append(item.Generales.si).css({ "text-align": "center" }).attr({ "colspan": "1" }).css({ "border-left": "solid 2px #0094ff" })
                , $("<td>").append(item.Generales.no).css({ "text-align": "center" }).attr({ "colspan": "1" })
                , $("<td>").append(item.Generales.na).css({ "text-align": "center" }).attr({ "colspan": "1" }).css({ "border-right": "solid 2px #0094ff" })

                , $("<td>").append(item.Senalizaciones.si).css({ "text-align": "center" }).attr({ "colspan": "1" })
                , $("<td>").append(item.Senalizaciones.no).css({ "text-align": "center" }).attr({ "colspan": "1" })
                , $("<td>").append(item.Senalizaciones.na).css({ "text-align": "center" }).attr({ "colspan": "1" }).css({ "border-right": "solid 2px #0094ff" })

                , $("<td>").append(item.Surtido.si).css({ "text-align": "center" }).attr({ "colspan": "1" })
                , $("<td>").append(item.Surtido.no).css({ "text-align": "center" }).attr({ "colspan": "1" })
                , $("<td>").append(item.Surtido.na).css({ "text-align": "center" }).attr({ "colspan": "1" }).css({ "border-right": "solid 2px #0094ff" })

                , $("<td>").append(item.Caducidades.si).css({ "text-align": "center" }).attr({ "colspan": "1" })
                , $("<td>").append(item.Caducidades.no).css({ "text-align": "center" }).attr({ "colspan": "1" })
                , $("<td>").append(item.Caducidades.na).css({ "text-align": "center" }).attr({ "colspan": "1" }).css({ "border-right": "solid 2px #0094ff" })

                , $("<td>").append(item.Limpieza.si).css({ "text-align": "center" }).attr({ "colspan": "1" })
                , $("<td>").append(item.Limpieza.no).css({ "text-align": "center" }).attr({ "colspan": "1" })
                , $("<td>").append(item.Limpieza.na).css({ "text-align": "center" }).attr({ "colspan": "1" }).css({ "border-right": "solid 2px #0094ff" })

                , $("<td>").append(manejo_numeros.convertir_porciento(item.promedio_total) + "%").css({ "text-align": "right", "background": manejo_numeros.retornar_color_segun_valor_porcentual(item.promedio_total), "color": "black" }).attr({ "colspan": "1" })
            ).css({ "color": "#547c98" }).addClass("empleados")
        );

        //llenar aspectos promedios
        promedios.Generales_promedios.push(item.Generales.promedio)
        promedios.Senalizaciones_promedios.push(item.Senalizaciones.promedio)
        promedios.Surtido_promedios.push(item.Surtido.promedio)
        promedios.Caducidades_promedios.push(item.Caducidades.promedio)
        promedios.Limpieza_promedios.push(item.Limpieza.promedio)

        promedios.suma_promedios.push(item.promedio_total)

    })

    //crear promedios totales
    promedios.Generales_promedios = manejo_numeros.promedio_datos(promedios.Generales_promedios);
    promedios.Senalizaciones_promedios = manejo_numeros.promedio_datos(promedios.Senalizaciones_promedios);
    promedios.Surtido_promedios = manejo_numeros.promedio_datos(promedios.Surtido_promedios);
    promedios.Caducidades_promedios = manejo_numeros.promedio_datos(promedios.Caducidades_promedios);
    promedios.Limpieza_promedios = manejo_numeros.promedio_datos(promedios.Limpieza_promedios);


    //agregar pie de promedios sumados
    $(".indicadores").append(
        $("<tr>").append(
            $("<td>").append("PROMEDIOS TOTALES:").css({ "text-align": "left" }).attr({ "colspan": "1" }).css({ "border-right": "solid 2px #0094ff" })

            , $("<td>").append(manejo_numeros.convertir_porciento(promedios.Generales_promedios) + "%").css({ "text-align": "center" }).attr({ "colspan": "3" }).css({ "border-left": "solid 2px #0094ff", "background": manejo_numeros.retornar_color_segun_valor_porcentual(promedios.Generales_promedios), "color": "black" })

            , $("<td>").append(manejo_numeros.convertir_porciento(promedios.Senalizaciones_promedios) + "%").css({ "text-align": "center" }).attr({ "colspan": "3" }).css({ "border-right": "solid 2px #0094ff", "background": manejo_numeros.retornar_color_segun_valor_porcentual(promedios.Senalizaciones_promedios), "color": "black" })

            , $("<td>").append(manejo_numeros.convertir_porciento(promedios.Surtido_promedios) + "%").css({ "text-align": "center" }).attr({ "colspan": "3" }).css({ "border-right": "solid 2px #0094ff", "background": manejo_numeros.retornar_color_segun_valor_porcentual(promedios.Surtido_promedios), "color": "black" })

            , $("<td>").append(manejo_numeros.convertir_porciento(promedios.Caducidades_promedios) + "%").css({ "text-align": "center" }).attr({ "colspan": "3" }).css({ "border-right": "solid 2px #0094ff", "background": manejo_numeros.retornar_color_segun_valor_porcentual(promedios.Caducidades_promedios), "color": "black" })

            , $("<td>").append(manejo_numeros.convertir_porciento(promedios.Limpieza_promedios) + "%").css({ "text-align": "center" }).attr({ "colspan": "3" }).css({ "border-right": "solid 2px #0094ff", "background": manejo_numeros.retornar_color_segun_valor_porcentual(promedios.Limpieza_promedios), "color": "black" })

            , $("<td>").append(manejo_numeros.convertir_porciento(manejo_numeros.promedio_datos(promedios.suma_promedios)) + "%").css({ "text-align": "right", "background": manejo_numeros.retornar_color_segun_valor_porcentual(manejo_numeros.promedio_datos(promedios.suma_promedios)), "color": "black" })
        ).css({ "color": "#ffffff", "background": "#89c7f5", "font-size": "17px", "height": "19px" })
    );
    evento_click_para_cambiar_tabla();
}
mostrar_semana_de_actividades = function () {
    //variables
    const dias = ["desc", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"];
    let lista_de_dias = {
        lunes: "--"
        , martes: "--"
        , miercoles: "--"
        , jueves: "--"
        , viernes: "--"
        , sabado: "--"
        , domingo: "--"
    }
    let tabla = $("<table>");
    let obj_resultado = {
        total_si: 0
        , total_no: 0
        , total: "--"
        , dia: ""
        , folio_actividad: []
        , observacion: []
        , respuesta: []
    }
    var tabla_resultados = []

    //funciones
    function sumar_respuesta(item) {

        if (item.respuesta == "si" || item.respuesta == "Si") { obj_resultado.total_si += 1 }
        else if (item.respuesta == "no" || item.respuesta == "No") { obj_resultado.total_no += 1 }

        obj_resultado.folio_actividad.push(item.folio_actividad)
        obj_resultado.observacion.push(item.observacion)
        obj_resultado.respuesta.push(item.respuesta)

    }
    function promedios_dia() {

        obj_resultado.total = manejo_numeros.checar_numero(obj_resultado.total_si / (obj_resultado.total_si + obj_resultado.total_no))

        switch (obj_resultado.dia) {
            case 1: lista_de_dias.lunes = obj_resultado.total
                break;
            case 2: lista_de_dias.martes = obj_resultado.total
                break;
            case 3: lista_de_dias.miercoles = obj_resultado.total
                break;
            case 4: lista_de_dias.jueves = obj_resultado.total
                break;
            case 5: lista_de_dias.viernes = obj_resultado.total
                break;
            case 6: lista_de_dias.sabado = obj_resultado.total
                break;
            case 7: lista_de_dias.domingo = obj_resultado.total
                break;
        }

        tabla_resultados.push(obj_resultado)
    }
    function obtener_resultados() {
        //ordenar por actividad
        OBJ_PERSONA_CUADRANTE.actividad.sort((a, b) => a.actividad > b.actividad ? 1 : -1);
        //ordenar por dia de la semana
        OBJ_PERSONA_CUADRANTE.actividad.sort((a, b) => a.dia_semana > b.dia_semana ? 1 : -1);

        OBJ_PERSONA_CUADRANTE.actividad.forEach((item, index) => {
            index = 0 ? function () {
                obj_resultado.dia = item.dia_semana;
                sumar_respuesta(item);
            }() : function () {
                promedios_dia();

                obj_resultado = {
                    total_si: 0
                    , total_no: 0
                    , total: "--"
                    , dia: item.dia_semana
                    , folio_actividad: []
                    , observacion: []
                    , respuesta: []
                }
                sumar_respuesta(item);
            }();
        });
        promedios_dia();
    }

    obtener_resultados();

    $("#modal_empleado").show();
    $("#contenido_datos table").remove()

    $("#nombre_empleado").text(OBJ_PERSONA_CUADRANTE.nombre_colaborador);

    tabla.append(
        $("<tr>").append(
            $("<th>").append(dias[1]).css({ "background": "rgb(152, 201, 226)", "color": "gray" })
            , $("<th>").append(dias[2]).css({ "background": "rgb(152, 201, 226)", "color": "gray", "border-left": "solid 2px #ffffff" })
            , $("<th>").append(dias[3]).css({ "background": "rgb(152, 201, 226)", "color": "gray", "border-left": "solid 2px #ffffff" })
            , $("<th>").append(dias[4]).css({ "background": "rgb(152, 201, 226)", "color": "gray", "border-left": "solid 2px #ffffff" })
            , $("<th>").append(dias[5]).css({ "background": "rgb(152, 201, 226)", "color": "gray", "border-left": "solid 2px #ffffff" })
            , $("<th>").append(dias[6]).css({ "background": "rgb(152, 201, 226)", "color": "gray", "border-left": "solid 2px #ffffff" })
            , $("<th>").append(dias[7]).css({ "background": "rgb(152, 201, 226)", "color": "gray", "border-left": "solid 2px #ffffff" })
        )
        , $("<tr>").append(
            $("<td>").append(manejo_numeros.convertir_porciento(lista_de_dias.lunes) + "%").attr({ "name": 1 })
            , $("<td>").append(manejo_numeros.convertir_porciento(lista_de_dias.martes) + "%").attr("name", 2)
            , $("<td>").append(manejo_numeros.convertir_porciento(lista_de_dias.miercoles) + "%").attr("name", 3)
            , $("<td>").append(manejo_numeros.convertir_porciento(lista_de_dias.jueves) + "%").attr("name", 4)
            , $("<td>").append(manejo_numeros.convertir_porciento(lista_de_dias.viernes) + "%").attr("name", 5)
            , $("<td>").append(manejo_numeros.convertir_porciento(lista_de_dias.sabado) + "%").attr("name", 6)
            , $("<td>").append(manejo_numeros.convertir_porciento(lista_de_dias.domingo) + "%").attr("name", 7)
        ).addClass("dias")
    ).css({ "background": "#ffffff", "color": "black", "text-align": "center", "position": "sticky", "top": "0", "width": "100%" }).addClass("promedio_semana")

    $("#contenido_datos").append(tabla);

    $(".dias td").on("click", function () {

        $(".dias td").css({ "background": "#ffffff", "color": "black" });
        $(this).css({ "background": "rgba(93, 170, 246, 0.89)", "color": "#ffffff" });
        mostrar_actividad_Colaborador($(this).attr("name"));
    })

}//listo
mostrar_actividad_Colaborador = function (dia_semana) {

    $(".contenido_aspectos").remove()

    var dias = ["desc", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"];

    var tabla = $("<table>").addClass("contenido_aspectos").attr({ "name": dias[dia_semana], "id": dias[dia_semana] })
    var actividades = 0, total_si = 0, total = 0;
    OBJ_PERSONA_CUADRANTE.actividad.forEach(function (item, index) {
        if (index == 0) {

            tabla.append(
                $("<tr>").append(
                    $("<th>").append("Folio").css({ "text-align": "center", "width": "70px", "border-left": "solid 1px #0094ff", "background": "rgb(93, 170, 246)" })
                    , $("<th>").append("Actividad").css({ "text-align": "center", "width": "450px", "border-left": "solid 1px #0094ff", "background": "rgb(93, 170, 246)" })
                    , $("<th>").append("Cumplio").css({ "text-align": "center" }).css({ "border-left": "solid 1px #0094ff", "width": "70px", "background": "rgb(93, 170, 246)" })
                    , $("<th>").append("Observacion").css({ "text-align": "center" }).css({ "border-right": "solid 1px #0094ff", "border-left": "solid 1px #0094ff", "width": "320px", "background": "rgb(93, 170, 246)" })
                ).addClass("cavecera_si_no_na").attr("name", item.departamento).css({ "top": "53px" })
            )
        }
        if (dia_semana == item.dia_semana) {
            var bg_res = "#0094ff", res = "fa fa-meh-o";

            if (item.respuesta == "Si") { total_si += 1, bg_res = "green", res = "fa fa-check" }
            else if (item.respuesta == "No") { total += 1, bg_res = "red", res = "fa fa-remove" }

            actividades += 1;

            tabla.append(
                $("<tr>").append(
                    $("<td>").append(item.folio_actividad).css({ "text-align": "center", "width": "70px", "border-left": "solid 1px #0094ff", "border-right": "solid 1px #0094ff" })
                    , $("<td>").append(item.actividad).css({ "border-left": "solid 1px #0094ff", "border-right": "solid 1px #0094ff" })
                    , $("<td>").text(item.respuesta + " ").append($("<section>").addClass(res).css({ "color": bg_res, "text-size": "24px" })).css({ "border-left": "solid 1px #0094ff", "border-right": "solid 1px #0094ff", "text-align": "center" })
                    , $("<td>").append(item.observacion).css({ "border-left": "solid 1px #0094ff", "border-right": "solid 1px #0094ff" })
                ).css({ "background": "with", "color": "black" })
            )
        }
    })

    total += total_si;

    if (actividades > 0) {
        tabla.append(
            $("<tr>").append(
                $("<td >").append("Actividades Cumplidas " + total_si + " de " + total + " Aplicadas, " + actividades + " Actividad(es) En Registro.").attr({ "colspan": "4" }).css({ "text-align": "center" }).css({ "border-left": "solid 1px #0094ff", "border-right": "solid 1px #0094ff", "background": "#0094ff", "color": "#ffffff" })))
    }
    //agregar_a_table()
    $("#contenido_datos").append(tabla)
}//listo
const descargar_tabla_empeado_dia_semana = () => {

    $("#gdr_tabla_semana").on("click", (e) => {
        if ($(".contenido_aspectos tr").length > 2) {
            const id_tabla = $(".contenido_aspectos").attr("name");
            const nombre_empleado = $("#nombre_empleado").text();
            alert(id_tabla);
            tableToExcel(id_tabla, nombre_empleado + "-" + id_tabla)

            var a = document.createElement('a');

            var data_type = 'data:application/vnd.ms-excel';
            var table_div = document.getElementById(id_tabla);
            var table_html = table_div.outerHTML.replace(/ /g, '%20');
            a.href = data_type + ', ' + table_html;

            a.download = 'download.xlsx';

            a.click();

            e.preventDefault();
        }
    })
}