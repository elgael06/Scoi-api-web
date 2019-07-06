
///Globales/Tipo_orden_compra_interna
//api/obtener_establecimientos
//ObtenerMonitorOrdenCompraInterna?f1="",f2=""&tipo_orden="S"&estatus="S"&tipo_recibe=""&recibe=0&establecimiento=0&cod_prod="0"

let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "/api/";


const pase_fecha = fecha => {
    let f = fecha.split("-");
    return `${f[2]}-${f[1]}-${f[0]}`
}

const parametros = new Vue({
    el: "#cavecera_monitor",
    data: {
        parametros: {
            fi: '2019-01-01',
            ff: '2019-01-01',
            tipo_orden: 'S',
            estatus: 'SURTIDO',
            tipo_recibe: 'Todos',
            recibe: 0,
            nombre_recibe:"",
            establecimiento: 0,
            cod_prod:'0'
        },
        btn_parametros: {
            icono: "fa fa-close",
            descripcion: "Falta Colocar Parametros.",
            estado:"btn btn-danger btn-round"
        },
        ListaEstablecimientos: [],
        ListaTipoOrden:[]
    },
    created() {
        console.log("Parametros...");
        this.obtener_establecimientos();
        this.obtener_tipoOrden();
        this.checar_boton();
    },
    updated() {
        //console.log("parametros=>",this.parametros);
        this.checar_boton();
        monitor.lista_ordenes = [];
    },
    methods: {
    //eventos
        on_consultar() {
            this.parametros_correctos ? this.obtener_consulta() : alert("Faltan Parametros !!!");
        },
        on_cambio_tipo_recibe() {
            this.parametros.recibe =  0;
            this.parametros.nombre_recibe = ""; 
        },
    //funciones
        checar_boton() {
            let estatus_ = this.parametros_correctos;

            this.btn_parametros.icono       = estatus_ ? "fa fa-download" : "fa fa-close";
            this.btn_parametros.descripcion = estatus_ ? "Consultar orden De Compra Interna." : "Falta Colocar Parametros.";
            this.btn_parametros.estado      = estatus_ ? "btn btn-success btn-round" : "btn btn-danger btn-round";

            return estatus_;
        },
    //conexiones
        obtener_establecimientos() {
            fetch(`${$URL_API}obtener_establecimientos`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(lista => {
                    this.ListaEstablecimientos = lista;
                }))
        },
        obtener_tipoOrden() {
            fetch(`${$URL_MVC}Tipo_orden_compra_interna`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(lista => {
                    this.ListaTipoOrden = lista;
                    this.parametros.tipo_orden = lista[0];
                }))
        },
        obtener_beneficiarios: function () {
            document.querySelector("#modal_de_efecto_carga").style.display = "flex";
            fetch(`${$URL_API}Obtener_beneficiarios?tipo=${this.parametros.tipo_recibe}`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(lista => {
                    modal_beneficiarios.beneficiarios = lista;
                    document.querySelector("#modal_de_efecto_carga").style.display = "none";
                    document.querySelector("#modal_seleccion_beneficiarios").style.display = "flex";
                }))
        },
        obtener_consulta() {
            let { fi, ff, tipo_orden, estatus, tipo_recibe, recibe, nombre_recibe, establecimiento, cod_prod } = this.parametros;
            let f1 = pase_fecha(fi);
            let f2 = pase_fecha(ff);
            cod_prod = cod_prod!="" ? cod_prod : "0";

            document.querySelector("#modal_de_efecto_carga").style.display = "flex";
            fetch(`ObtenerMonitorOrdenCompraInterna?f1=${f1}&f2=${f2}&tipo_orden=${tipo_orden}&estatus=${estatus}&tipo_recibe=${tipo_recibe}&recibe=${recibe}&establecimiento=${establecimiento}&cod_prod=${cod_prod}`, {
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
                .then(res => res.json().then(lista => {
                    console.log("Respuesta=>", lista);
                    monitor.lista_ordenes = lista;
                    document.querySelector("#modal_de_efecto_carga").style.display = "none";
                }))
        } 
    },
    computed: {
        parametros_correctos() {
            let { fi, ff, estatus, tipo_recibe, recibe, nombre_recibe, establecimiento, cod_prod } = this.parametros;
            let estatus_ = false;

            this.parametros.recibe = this.recibe ? this.parametros.recibe : 0;
            estatus_ = fi != "" && ff != "" && this.recibe;
            
            return estatus_;
        },
        recibe() {
            this.parametros.recibe = this.parametros.tipo_recibe != "Todos" ? this.parametros.recibe : 0;
            this.parametros.nombre_recibe = this.parametros.tipo_recibe != "Todos" ? this.parametros.nombre_recibe : '';
            return this.parametros.tipo_recibe == "Todos" || (this.parametros.tipo_recibe != "Todos" && this.parametros.recibe > 0);
        }
    }
});

const monitor = new Vue({
    el: "#cuerpo_monitor",
    data: {
        lista_ordenes: [],
    },
    methods: {
        
    }
});

Vue.component("tabla_ordenes_de_compra", {
    props: ["compra_interna"],
    template: `
    <tr >
        <td >{{compra_interna.tipo_orden_compra_interna}}</td>
    </tr>    
    `
});


const modal_beneficiarios = new Vue({
    el: "#modal_seleccion_beneficiarios",
    data: {
        seleccion: {
            folio: 0,
            nombre: ""
        },
        filtro: "",
        beneficiarios: []
    },
    methods: {
        /** Eventos **/
        seleccionar: function (seleccion) {
            this.seleccion = {
                folio: seleccion.Folio,
                nombre: seleccion.Nombre
            }
        },
        agregar_seleccion: function () {

            if (this.seleccion.folio > 0) {
                parametros.parametros.recibe = this.seleccion.folio;
                parametros.parametros.nombre_recibe = this.seleccion.nombre;
                console.log("listo");
                document.querySelector("#modal_seleccion_beneficiarios").style.display = "none";

                this.seleccion = {
                    folio: 0,
                    nombre: ""
                }
                this.filtro = "";
                this.beneficiarios = [];
            } else
                alert("No A Seleccionado Beneficiario!!!");
        },
        cancelar_seleccion: function () {
            this.seleccion = {
                folio: 0,
                nombre: ""
            }
            this.filtro = "";
            this.beneficiarios = [];
            console.log("Cancelado...");
            document.querySelector("#modal_seleccion_beneficiarios").style.display = "none";
        },
        /** Funciones **/
        classSeleccionado: function (folio) {
            return folio === this.seleccion.folio ? "btn btn-info fa fa-check-circle-o btn_seleccion" : "btn btn-default fa fa-circle-o btn_seleccion";
        },
        verificar_coincidencias: function (texto) {
            let array_texto = texto.toString().split(" ");
            let array_filtro = this.filtro.toUpperCase().split(" ");
            let res = [];
            array_filtro.forEach(f => {
                res = res.concat(array_texto.filter(e => e.toUpperCase().search(f) > -1));
            });
            return array_filtro.length > 1 ? res.length > 1 : res.length > 0;
        },
        checar_filtro: function ({ Folio, Nombre }) {
            return this.verificar_coincidencias(Folio) || this.verificar_coincidencias(Nombre)
        }
    },
    computed: {
        filtro_beneficiarios: function () {
            return this.beneficiarios.filter(e => this.verificar_coincidencias(e.Folio) || this.verificar_coincidencias(e.Nombre));
        }
    }
});