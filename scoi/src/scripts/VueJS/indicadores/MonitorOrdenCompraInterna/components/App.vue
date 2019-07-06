
<template>
    <div class="panel panel-default">
        <CaveceraParametros :ordenes="ordenes" v-if="ExisteOrdenes" />
        <div v-else class="panel-heading">
            <i class="fa fa-reply btn btn-warning" @click="cancelar"></i>
            <label>Monitor Orden Compra Interna</label>
        </div>
        <TablaOrdenes :lista="ordenes.lista" :detalle="detalleOrden" />
        <VistaDetalleOrden :ordenes="ordenes" />
    </div>
</template>
<script>
    import CaveceraParametros from './CaveceraParametros';
    import TablaOrdenes from './TablaOrdenes';
    import VistaDetalleOrden from './VistaDetalleOrden';

    export default {
        components: {
            CaveceraParametros,
            TablaOrdenes,
            VistaDetalleOrden
        },
        data() {
            return {
                ordenes: {
                    lista: [],
                    Seleccionada: {
                        Folio:0,
                        Detalle: {
                            Autorizo: '',
                            Elaboro: '',
                            Id_recoge: '',
                            Recoge: '',
                            Solicito: '',
                            Surtio: '',
                            Tipo_recoge: '',
                            Tipo_solicitante:'',
                            Uso_mercancia: ''
                        },
                        Productos:[]
                    }
                },
            }
        },
        methods: {
            detalleOrden(seleccion) {
                console.log("seleccion => ", seleccion);
                this.ordenes.Seleccionada = seleccion;
                document.querySelector("#VistaDetalleOrden").style.display = "flex";
            },
            cancelar() {
                this.ordenes = {
                    lista: [],
                    Seleccionada: {
                        Folio:0,
                        Detalle: {
                            Autorizo: '',
                            Elaboro: '',
                            Id_recoge: '',
                            Recoge: '',
                            Solicito: '',
                            Surtio: '',
                            Tipo_recoge: '',
                            Tipo_solicitante:'',
                            Uso_mercancia: ''
                        },
                        Productos: []
                    }
                };
            }
        },
        computed: {
            ExisteOrdenes() {
                return this.ordenes.lista.length==0
            }
        }
    }
</script>

