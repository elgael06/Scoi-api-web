
<template>
    <div>
        <strong class="btn btn-success btn-block btn-round" style="font-size:14px;margin-top:30px" v-on:click="autorizar_guardado">
            Guardar  <i class="glyphicon glyphicon-saved"></i>
        </strong>
        <div class="ventana" id="ventana_entrada_autorizacion" style="display:none">
            <div class="panel panel-danger">
                <div class="panel-heading">
                    <i class="fa fa-close close" @click="cerrar"></i>
                    <label>Autorizacion Guardado</label>
                </div>
                <div class="panel-body">
                    <form  class="form-group" @submit.prevent="autorizar_guardado">
                        <label>Clave de Autorizacion : </label>
                        <input type="text" 
                               v-model="usuario" id="entrada_gafete" 
                               autocomplete="off" 
                               style="min-width:130px" 
                               name="entrada_gafete"
                               placeholder="XXXXXXXXXX" 
                               class="form-control" />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Embarque from '../models/ModelEmbarque'

    const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
    const $URL_API = "/api/";
    const $URL_API_IZA = $MI_URL + ":180/api/";

    export default {
        name: 'Guardar',
        props:["terminar"],
        data() {
            return {
                usuario:'',
            }
        },
        methods: {
            cerrar() {
                document.querySelector("#ventana_entrada_autorizacion").style.display = "none";
                this.usuario = "";
            },
            autorizar_guardado() {
                //let gafete = prompt("Capture Gafete") || '';
                let parametros = {
                    'pedido': localStorage["Pedido"].toString(),
                    'embarque': localStorage["Embarque"].toString().split("'").join(" "),
                };
                document.querySelector("#ventana_entrada_autorizacion").style.display = "flex";
                document.querySelector("#entrada_gafete").select();
                //gafete != "" ?
                this.usuario!="" ?
                    fetch(`${$URL_API}Usuarios_web/AutorizarEmbarque?folio_usuario=${this.usuario}`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(parametros),
                    }).catch(err => {
                        console.log(err);
                    }).then(res => {
                        res.json().then(r => {
                            console.log(r);
                            if (r.Folio > 0)
                                this.guardar_embarque();
                            else {
                                this.usuario = "";
                                alert("Sin Autorizacion !!!")
                            }
                        });
                    }) : '';
            },
            guardar_embarque() {    
                this.usuario = "";
                document.querySelector("#ventana_entrada_autorizacion").style.display = "none";
                let e = new Embarque();
                console.log("Guardar...", e);
                if (e.productos.length > 0) {
                        this.conexion(e);
                }
                else {
                    alert("Sin Productos A Guardar...");
                    document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                }
            },
            //conexiones
            conexion(value) {
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                fetch(`${$URL_API_IZA}Pedido/Embarque`, {
                    method: 'post',
                     headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                })
                .then(e => {
                    e.json().then(res => {
                        if (res) {
                            localStorage.removeItem('Embarque');
                            localStorage.removeItem('Pedido');
                            alert("Guardado...");
                            this.terminar();
                        }
                        else 
                            alert("Error al Guardado...");
                        document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                    })
                })
                .catch(err => {
                    document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                    ErrorPedido();
                });
            },
        },
        computed: {
            existenProductos() {
                let e = new Embarque();
                return e.productos.length > 0
            }
        }
    }
</script>

