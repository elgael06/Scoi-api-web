
<template>
    <div id="cavecera_monitor" class="panel-heading">
        <h2>Monitor Orden Compra Interna</h2>
        <div class="row">
            <!--fechas-->
            <div class="form-group col-lg-2 contenedor_parametros">
                <h4>Fechas</h4>
                <div class="form-group">
                    <label>Inicio: </label>
                    <input type="date" class="form-control" v-model="parametros.fi" />
                </div>
                <div class="form-group">
                    <label>Termino: </label>
                    <input type="date" class="form-control" v-model="parametros.ff" />
                </div>
            </div>
            <!--Orden-->
            <div class="form-group col-lg-2 contenedor_parametros">
                <h4>Orden</h4>
                <div class="form-group">
                    <i class="fa fa-spinner rotate" name="tipo" v-if="ListaTipoOrden.length==0"> </i>
                    <label> Tipo:</label>
                    <select class="form-control" v-model="parametros.tipo_orden">
                        <option v-for="tipo in ListaTipoOrden" :key="tipo">{{tipo}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Estatus:</label>
                    <select class="form-control" v-model="parametros.estatus">
                        <option>SURTIDO</option>
                        <option>AUTORIZADO</option>
                        <option>CANCELADO</option>
                        <option>EN VALIDACION</option>
                    </select>
                </div>
            </div>
            <!--Recibo-->
            <div class="form-group col-lg-2 contenedor_parametros">
                <h4>Recibe</h4>
                <div class="form-group">
                    <i class="fa fa-spinner rotate" name="tipo" v-if="ListaEstablecimientos.length==0"> </i>
                    <label> Establecimiento:</label>
                    <select class="form-control" v-model="parametros.establecimiento">
                        <option value="0">Todos</option>
                        <option v-for="estab in ListaEstablecimientos" :key="estab.folio" :value="estab.folio" v-if="estab.estatus==1">{{estab.nombre}}</option>
                    </select>
                </div> <div class="form-group">
                    <label>Tipo:</label>
                    <select class="form-control" v-model="parametros.tipo_recibe" v-on:change="on_cambio_tipo_recibe">
                        <option>Todos</option>
                        <option>Empleado</option>
                        <option>Proveedor</option>
                    </select>
                </div>
            </div>
            <!--Otros Parametros-->
            <div class="form-group col-lg-5 contenedor_parametros">
                <h4>Parametros Adicionales</h4>
                <div class="form-group form-inline form-group-sm"v-if="!recibe || parametros.recibe>0 ">
                    <label>{{this.parametros.tipo_recibe}} Recibe :</label>
                    <i class="form-control"  style="width:270px" >{{parametros.nombre_recibe}}</i>
                    <i class="btn btn-default fa fa-search" v-on:click="obtener_beneficiarios"> Seleccionar.</i>
                </div>
                <div class="form-inline">
                    <label>Folio Activo :</label>
                    <input type="number" class="form-control" v-model="parametros.cod_prod" />
                </div>
            </div>
            <hr />
            <!--Boton-->
            <div id="btn_cavecera" class="form-group col-lg-12">
                <span :class="estadoBoton" v-on:click="on_consultar">
                    <label>{{descripcionBoton}} </label>
                    <i :class="iconoBoton"></i>
                </span>
            </div>

        </div>
    </div>
</template>

<script>

    let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "/api/";

 const pase_fecha = fecha => {
    let f = fecha.split("-");
    return `${f[2]}-${f[1]}-${f[0]}`
}

    export default {
        name: 'CaveceraParametros',
        props: {
            ordenes: {
                lista:[]
            }
        },
        data() {
            return {
                parametros: {
                    fi: '2019-01-01',
                    ff: '2019-01-01',
                    tipo_orden: 'S',
                    estatus: 'SURTIDO',
                    tipo_recibe: 'Todos',
                    recibe: 0,
                    nombre_recibe: "",
                    establecimiento: 0,
                    cod_prod: '0'
                },
                ListaEstablecimientos: [],
                ListaTipoOrden: []
            }
        },
        created() {
            console.log("Parametros...");
            this.obtener_establecimientos();
            this.obtener_tipoOrden();
        },
        updated() {
        },
        methods: {
            //eventos
            on_consultar() {
                this.parametros_correctos ? this.obtener_consulta() : alert("Faltan Parametros !!!");
            },
            on_cambio_tipo_recibe() {
                this.parametros.recibe = 0;
                this.parametros.nombre_recibe = "";
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
            obtener_beneficiarios() {
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
                let { fi, ff, tipo_orden, estatus, tipo_recibe, recibe, establecimiento, cod_prod } = this.parametros;
                let f1 = pase_fecha(fi);
                let f2 = pase_fecha(ff);
                cod_prod = cod_prod != "" ? cod_prod : "0";

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
                        this.ordenes.lista = lista;
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                    }))
            },
        },
        computed: {
            parametros_correctos() {
                let { fi, ff } = this.parametros;
                let estatus_ = false;

                this.parametros.recibe = this.recibe ? this.parametros.recibe : 0;
                estatus_ = fi != "" && ff != "" && this.recibe;
                return estatus_;
            },
            descripcionBoton() {
                return this.parametros_correctos ? "Consultar orden De Compra Interna." : "Falta Colocar Parametros.";
            },
            estadoBoton() {
                return this.parametros_correctos ? "btn btn-success btn-round" : "btn btn-danger btn-round";
            },
            iconoBoton() {
                return this.parametros_correctos ? "fa fa-download" : "fa fa-close";
            },
            recibe() {
                this.parametros.recibe = this.parametros.tipo_recibe != "Todos" ? this.parametros.recibe : 0;
                this.parametros.nombre_recibe = this.parametros.tipo_recibe != "Todos" ? this.parametros.nombre_recibe : '';
                return this.parametros.tipo_recibe == "Todos" || (this.parametros.tipo_recibe != "Todos" && this.parametros.recibe > 0);
            }
        }
    }
</script>
