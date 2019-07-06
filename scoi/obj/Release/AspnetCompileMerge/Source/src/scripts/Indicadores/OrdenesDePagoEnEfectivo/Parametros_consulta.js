/***
 * Obtiene Beneficiarios, Selectores y Realiza Consulta.
 * Verfica los campos.
 * 
 * **/
let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "/api/";

const pase_fecha = fecha => {
    let f = fecha.split("-");
    return `${f[2]}/${f[1]}/${f[0]}`
}

const cavecera_parametros = new Vue({
    el: "#cavecera_parametros",
    data: {
        btn_consultar: {
            tipo: "",
            icono: "",
            mensaje: ""
        },
        filtro: {
            f1: "",
            f2: "",
            cuenta: "",
            concepto_compra_o_gasto: "Todos",
            tipo_beneficiario: "Todos",
            concepto_orden_pago: "Todos",
            beneficiario: "",
            nombre_beneficiario:""
        },
        estatus: false,
        cuentas: [],
        ordenes_pago: []
    },
    created: function () {
        this.obtener_cuentas();
        this.obtener_ordenes_pago();
        this.verificar_Campos();
    },
    updated: function () {
        this.verificar_Campos();
        this.estatus || llenar_tabla_pagos([]);
    },
    methods: {
        /**eventos**/
        consultar_orden_de_gasto: function () {
            this.verificar_Campos() ? this.realizar_consuta() : alert("Faltan Campos!!!");
        },
        canbio_tipo_beneficiario: function () {
            this.filtro.beneficiario = "";
            this.filtro.nombre_beneficiario = "";
        },
        buscar_beneficiario: function () {

        },
        remover_parametro: function () {
            this.estatus = false;
            llenar_tabla_pagos([]);
        },
        /**funciones**/
        verificar_Campos: function () {
            let estado = false;
            this.filtro.beneficiario = this.filtro.tipo_beneficiario == "Todos" ? "" : this.filtro.beneficiario;
            this.filtro.nombre_beneficiario = this.filtro.tipo_beneficiario == "Todos" ? "" : this.filtro.nombre_beneficiario;
            estado = (this.filtro.f1.length > 0 && this.filtro.f2.length > 0 );
            estado = this.filtro.tipo_beneficiario == "Todos" ? estado : this.filtro.beneficiario != "" && estado;

            this.btn_consultar.tipo = estado ? "btn btn-success btn-round" : "btn btn-danger btn-round";
            this.btn_consultar.icono = estado ? "fa fa-download" : "fa fa-close";
            this.btn_consultar.mensaje = estado ? "Consultar Orden De Pago" : "Faltan Campos Por Seleccionar!!!";
            return estado;
        },
        /**conexiones**/
        obtener_cuentas: function () {
            fetch(`${$URL_MVC}Combos?tipo=Cuentas_Reporte_Banco_Interno`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(lista => {
                    this.cuentas = lista;
                    this.filtro.cuenta = lista[0];
                }))
        },
        obtener_ordenes_pago: function () {
            fetch(`${$URL_MVC}/Conceptos_de_orden_de_pago`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(lista => this.ordenes_pago = lista))
        },
        obtener_beneficiarios: function () {
            document.querySelector("#modal_de_efecto_carga").style.display = "flex";
            fetch(`${$URL_API}Obtener_beneficiarios?tipo=${this.filtro.tipo_beneficiario}`, {
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
        realizar_consuta: function () {
            vista_pagos_por_semana.eliminar_todo();

             let filtro =  {
                 f1: pase_fecha(this.filtro.f1),
                 f2: pase_fecha(this.filtro.f2),
                 cuenta: this.filtro.cuenta,
                 concepto_compra_o_gasto: this.filtro.concepto_compra_o_gasto,
                 tipo_beneficiario: this.filtro.tipo_beneficiario,
                 concepto_orden_pago: this.filtro.concepto_orden_pago,
                 beneficiario: this.filtro.tipo_beneficiario =="Todos"?" ":this.filtro.beneficiario
             }

            document.querySelector("#modal_de_efecto_carga").style.display = "flex";
            console.log("Enviar=>", filtro);
            fetch(`${$URL_API}Obtener_ordenes_pago_en_efectivo`, {
                method: 'post',
                credentials: 'same-origin',
                body: JSON.stringify(filtro),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => {
                    console.error("Error=>", err);
                    alert("fallo En La Consulta!!!");
                    document.querySelector("#modal_de_efecto_carga").style.display = "none";
                })
                .then(res => res.json().then(lista => {
                    console.log(lista);
                    llenar_tabla_pagos(lista);
                    this.estatus = lista.length > 0;
                    document.querySelector("#modal_de_efecto_carga").style.display = "none";
                }))
        }
    }
});

const modal_beneficiarios = new Vue({
    el: "#modal_seleccion_beneficiarios",
    data:{
        seleccion: {
            folio: 0,
            nombre:""
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
                cavecera_parametros.filtro.beneficiario = this.seleccion.folio;
                cavecera_parametros.filtro.nombre_beneficiario = this.seleccion.nombre;
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
        classSeleccionado: function(folio) {
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
        checar_filtro: function ({ Folio, Nombre}) {
            return this.verificar_coincidencias(Folio) || this.verificar_coincidencias(Nombre)
        }
    },
    computed: {
        filtro_beneficiarios: function () {
            return this.beneficiarios.filter(e => this.verificar_coincidencias(e.Folio) || this.verificar_coincidencias(e.Nombre));
        }
    }
});
