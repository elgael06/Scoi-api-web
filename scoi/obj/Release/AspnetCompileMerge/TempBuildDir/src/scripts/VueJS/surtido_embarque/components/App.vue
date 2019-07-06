
<template>
    <div>
        <div v-if="existe_pedido" id="main">
            <div class="">
                <i class="btn btn-danger glyphicon glyphicon-trash btn-round" id="btn_cancelar_embarque_pedido" v-on:click="eliminar_embarque_localStorange"></i>
                <div class="form-inline" style="margin-left:-10px;width:120px;display:inline-block">
                    <label>Folio :</label>
                    <strong style="color:black">{{Pedido.Folio}}</strong>
                </div>
            </div>
            <div class="form-group" style="width:95px;display:inline-block">
                <label>Del: <i class="fa fa-truck" style=" transform: scaleX(-1);"></i> </label>
                <div class="form-control" style="text-align: left">{{Pedido.Alterno}}</div>
            </div>
            <div class="form-group" style="width:95px;display:inline-block">
                <label>Al: <i class="fa fa-cubes"></i> </label>
                <div class="form-control" style="text-align: left">{{Pedido.Establecimiento}}</div>
            </div>
            <BuscarProducto v-bind:establecimiento="Pedido.Alterno"
                            v-bind:obtener_seleccion="obtener_seleccion" />
            <SeleccionModal v-bind:total_pendiente="total_pendiente"
                            v-bind:total_surtido="total_surtido"
                            v-bind:total_embarque="total_embarque" />
            <Guardar v-bind:terminar="cancelar" />
        </div>
        <CapturaSurtido v-bind:seleccion="seleccion" v-bind:Productos="Embarque" />
        <SeleccionPedido v-if="!existe_pedido" v-bind:pedido="asignar_pedido" v-bind:embarque="asignar_embarque" />
    </div>
</template>

<script>
    import BuscarProducto   from './BuscarProducto';
    import SeleccionModal   from './SeleccionModal';
    import SeleccionPedido  from './SeleccionarPedido';
    import CapturaSurtido   from './CapturarSurtido';
    import Guardar          from './Guardar';

    const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
    const $URL_API = "/api/";
    const $URL_API_IZA = $MI_URL + ":180/api/";

    if (location.protocol != "http:")
        location.protocol = "http:";

    export default {
        data() {
            return {
                seleccion: {
                    folio: 0,
                    descripcion: "",
                    existencia: 0,
                    cantidad: 0,
                    pedido: 0,
                    surtido: '',
                    total: 0,
                    operador: "+",
                    punto: false,
                },
                Pedido: JSON.parse(localStorage.getItem("Pedido")) || {},
                Embarque: JSON.parse(localStorage.getItem("Embarque")) || [],
            }
        },
        components: {
            BuscarProducto,
            SeleccionModal,
            SeleccionPedido,
            CapturaSurtido,
            Guardar,
        },
        created() {
            setTimeout(()=> document.querySelector("#entrada_codigo_producto").select(),100);
        },
        methods: {
            //eventos
            eliminar_embarque_localStorange() {
                let e = prompt("Escriba '1379' Para Confirmar Borrado!!!") || " ";
                if (e.toUpperCase() === '1379') {
                    console.log(e.toUpperCase())
                    if (confirm("Esta Seguro De Eliminar los Cambios De Embarque?")) {
                        localStorage.removeItem('Embarque');
                        localStorage.removeItem('Pedido');
                        this.Pedido = {};
                        this.Embarque = [];
                        return null;
                    }
                }
                else
                    alert("Eliminacion Cancelada!!!");
            },
            cancelar() {
                this.Pedido = {};
                this.Embarque = [];
            },
            //funciones
            asignar_pedido(seleccion) {
                this.Pedido = seleccion;
            },
            asignar_embarque(seleccion) {
                this.Embarque = seleccion;
            },
            obtener_seleccion(producto) {
                this.Embarque = JSON.parse(localStorage.getItem("Embarque"));
                let index_filtro = this.Embarque.findIndex(e => parseInt(e.cod_prod) == parseInt(producto.Codigo));
                if (index_filtro > -1) {
                    let filtro = this.Embarque.find(e => e.cod_prod == producto.Codigo);
                    this.seleccion = {
                        folio: producto.Codigo,
                        descripcion: filtro.descripcion,
                        existencia: producto.Existencia,
                        cantidad: filtro.embarque,
                        pedido: filtro.pedido,
                        surtido: "",
                        total: filtro.embarque,
                        operador: "+",
                        punto: producto.decimales != 0,
                    };
                    document.querySelector("#main").style.display = "none";
                    document.querySelector("#captura_surtido_view").style.display = "";
                    document.querySelector("#entrada_codigo_producto_vista").select();
                } else {
                    alert(`El Producto\n Folio: ${producto.Codigo || "N/A"}.\n Descripcion: ${producto.Descripcion || "Desconocido"}.\n No Se Encuentra En El Embarque!!!`);
                    document.querySelector("#entrada_codigo_producto").disabled = false;
                    document.querySelector("#entrada_codigo_producto").select()
                }
            },
        },
        computed: {
            total_pendiente() {
                return this.Embarque.filter(e => e.embarque == 0).length;
            },
            total_surtido() {
                return this.Embarque.filter(e => e.embarque > 0).length;
            },
            total_embarque() {
                return this.Embarque.length
            },
            existe_pedido() {
                console.log("Pedido =>",this.Pedido.Folio)
                return this.Pedido.Folio  ? true : false;
            }
        }
    }
</script>