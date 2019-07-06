

<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <label>Monitor</label>
            <p>cantidad Pedidos : {{Embarques.length}}.</p>
        </div>
        <div class="panel-body" style="height:700px">
            <TablaPedidos v-bind:pedidos="Embarques" v-bind:Seleccion_Pedido="Seleccion_Pedido" />
        </div>
        <ModalDetalle v-bind:Seleccion="Seleccion" />
    </div>
</template>

<script>
    import TablaPedidos from './TablaPedidos';
    import ModalDetalle from './ModalDetalle';
import { setInterval } from 'timers';

    const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
    const $URL_API = "/api/";
    const $URL_API_IZA = $MI_URL + ":180/api/";
    export default {
        data() {
            return {
                Seleccion: {
                    Embarque: [],
                    Pedido: {
                        Alterno: '',
                        Elaboraccion: '',
                        Establecimiento: '',
                        Estatus_surtido: '',
                        Folio: '',
                        Modificacion: '',
                        Usuario_capturo: ''
                    },
                },
                Embarques: [],
            }
        },
        components: {
            TablaPedidos,
            ModalDetalle,
        },
        methods: {
             Seleccion_Pedido(pedido) {
                console.log("pedido=>", pedido);
                let {Embarque ,Pedido} = pedido;
                this.Seleccion = { Embarque, Pedido }; 
                
                console.log("Seleccion=>", this.Seleccion);
                document.querySelector("#modal_detalle_embarque").style.display = "flex";
            },
            ObtenerEmbarques() {
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                 fetch(`${$URL_API}Pedido_productos_embarque/MonitorEmbarques`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.establecimiento)
                })
                .then(e => {
                    e.json().then(res => {
                        document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                        console.log(res);
                        this.Embarques = res.map(e => {
                            e.Embarque = JSON.parse(e.Embarque);
                            e.Pedido = JSON.parse(e.Pedido);
                            return e;
                        });
                        this.Embarques.sort((e,f)=>e.Folio<=f.Folio ?1:-1);
                    })
                })
                .catch(err => console.error("Error=>", err)) 
            },
        },
        created() {
            console.log("Listo...");
            setTimeout(() => this.ObtenerEmbarques(), 100);
            setInterval(() => {
                this.ObtenerEmbarques();
                console.log("Peticion...")
            }, 60000);
        },
        updated() {
            console.log("Actualizado...");
        },
        computed: {

        },
    }
</script>
