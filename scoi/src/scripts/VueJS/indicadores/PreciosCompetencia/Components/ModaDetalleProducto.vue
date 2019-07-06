

<template id="modal_detalle_producto">
    <div class="modal" id="modal_producto">
        <div class="panel panel-primary" style="max-height:100%">
            <div class="panel-heading">
                <i class="fa fa-close" v-on:click="cerrar" style="float:right"></i>
                <label>Detalles Producto.</label>
            </div>
            <div class="panel-body" style="max-height:90%">
                <div class="panel-group" style="overflow:auto;max-height:750px">
                    <DetallesProducto v-bind:producto="producto" />
                    <HistoricoProducto v-bind:Obtener="Obtener"  v-bind:lista="lista"/>
                </div>
            </div>
            <div class="panel-footer" style="height:50px">
                <span class="btn btn-default fa fa-close" style="float:right" @click="cerrar"> Cerrar</span>
            </div>
        </div>
    </div>
</template>

<script>
    import DetallesProducto from './DetallesProducto';
    import HistoricoProducto from './HistoricoProducto';    

    const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
    const $URL_API = "/api/";

    export default {
        name: 'ModalDetalleProducto',
        props: ['producto'],
        components: {
            DetallesProducto,
            HistoricoProducto,
        },
        data() {
            return {
                lista:[]
            }
        },
        methods: {
            cerrar() {
                this.lista = [];
                document.querySelector("#modal_producto").style.display = "none";
            },
            Obtener() {
                let url = `${$URL_API}monitor_precio_competencia/HistoricoProducto?folio=${this.producto.Codigo}`;
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                fetch(url, {
                    method: 'post',
                    credentials: 'same-origin',
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
                        console.log("Consulta Finalizada...");
                        this.lista = lista.sort((e,d)=>new Date(e.Fecha)>new Date(d.Fecha)?-1:1);                        
                        console.log("Respuesta=>",lista);
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                    }))
            }
        },
    }
</script>







