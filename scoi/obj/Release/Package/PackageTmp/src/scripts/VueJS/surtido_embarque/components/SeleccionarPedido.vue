
<template>
    <div class="panel panel-default" >
        <div class="panel-heading">
            <label>Establecimientos.</label>
            <i class="fa fa-refresh btn btn-info" @click="ObtenerPedidos"> Cargar.</i>
            <select class="form-control" v-model="establecimiento" @change="ObtenerPedidos">
                <option  v-for="est in establecimientos" :key="est.folio">{{ est.nombre }}</option>
            </select>
        </div>
        <div class="panel-body">
            <h4 v-if="!establecimiento">Seleccione Establecimiento...</h4>
            <div style="height:260px;overflow:auto">
                <table class="table" v-if="establecimiento">
                    <thead>
                        <tr style="background:#2e6f9f;z-index:999">
                            <th style="color:azure;background:#2e6f9f">Folio</th>
                            <th style="color:azure;background:#2e6f9f">Solicita</th>
                            <th style="color:azure;background:#2e6f9f">Estado</th>
                            <th style="color:azure;background:#2e6f9f">Surte</th>
                        </tr>
                    </thead>
                    <tbody  v-for="pedido in pedidos" :key="pedido.folio">
                    |   <tr>
                            <td rowspan="1"> 
                                <i class="btn btn-info fa fa-cogs btn-round" @click="on_pedido(pedido)"> {{pedido.Folio}}</i>
                            </td> 
                            <td>{{pedido.Establecimiento}}</td>
                            <td>{{pedido.Estatus_surtido}}</td>
                            <td>{{pedido.Alterno}}</td>                      
                        </tr>
                        <tr >
                            <td colspan="3">{{pedido.Usuario_capturo}}</td>
                            <td> <label>{{pedido.Elaboraccion}} </label></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
    const $URL_API = "/api/";
    const $URL_API_IZA = $MI_URL + ":180/api/";
    export default {
        name: 'SeleccionPedido',
        props: ['pedido','embarque'],
        data() {
            return {
                establecimiento: "",
                establecimientos: [],
                pedidos:[]
            }
        },
        created() {
            this.ObtenerEstableciminetos();
        },
        methods: {
            //evento
            on_pedido(seleccion) {
                localStorage.setItem("Pedido", JSON.stringify(seleccion));
                this.pedido(seleccion);
                this.ObtenerEnmbarque(seleccion.Folio);
            },
            //funcion
            ObtenerEstableciminetos() {
                fetch(`${$URL_API}Obtener_establecimientosBMS`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(e => {
                    e.json().then(res => {
                        this.establecimientos = res;
                        document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                    })
                })
                .catch(err => console.error(err));
            },
            ObtenerPedidos() {
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                fetch(`${$URL_API}Obtener_establecimientosBMS`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.establecimiento.toString())
                })
                .then(e => {
                    e.json().then(res => {
                        this.pedidos = res;
                        document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                    })
                })
                .catch(err => console.error(err));
            },
            ObtenerEnmbarque(folio) {
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                fetch(`${$URL_API}Pedido_productos_embarque?folio=${folio}`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(e => {
                    e.json().then(res => {
                        localStorage.setItem("Embarque", JSON.stringify(res));
                        this.embarque(res);
                        document.querySelector("#entrada_codigo_producto").select()
                        document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                    })
                })
                .catch(err => console.error(err));
            }
        }
    }
</script>



