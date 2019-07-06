<template>
    <div id="captura_surtido_view" style="display:none">
        <h4>Surtido Producto:</h4>
        <div style="width:80px;display:inline-block;">
            <label>folio:</label>
            <i style="text-align:right" class="form-control">{{seleccion.folio}}</i>
        </div>
        <div style="width:80px;display:inline-block;">
            <label>Existencia:</label>
            <i style="text-align:right" class="form-control">{{seleccion.existencia}}</i>
        </div>
        <div style="width:70px;display:inline-block;">
            <label>Requiere:</label>
            <i style="text-align:right" class="form-control">{{seleccion.pedido}}</i>
        </div>
        <div>
            <label>Descripcion:</label>
            <textarea style="resize:none;" disabled rows="3" class="form-control">{{seleccion.descripcion}}</textarea>
        </div>
        <form v-on:submit.prevent="on_guardad_cambios">
            <div style="width:70px;display:inline-block">
                <label>Capturado:</label>
                <input class="form-control" style="text-align:right" disabled type="text" v-model="seleccion.cantidad" />
            </div>
            <i v-bind:class="icono_operador"></i>
            <div style="width:70px;display:inline-block">
                <label>Surtir:</label>
                <input class="form-control"
                       id="entrada_codigo_producto_vista"
                       type="text"
                       style="text-align:right"
                       v-on:keyup="handle_cambio_surtir"
                       max="999"
                       autocomplete="off"
                       v-model.number="seleccion.surtido" />
            </div>
            <strong style="font-size:18px">=</strong>
            <div style="width:70px;display:inline-block">
                <label>Total:</label>
                <input class="form-control" style="text-align:right" disabled type="text" v-model="seleccion.total" />
            </div>
            <div style="margin-top:10px;" v-if="seleccion.cantidad>0">
                <i class="btn btn-info fa fa-plus" style="float:left;" v-on:click="cambio_operador('+')"></i>
                <i class="btn btn-info fa fa-minus" style="float:right;" v-on:click="cambio_operador('-')"></i>
            </div>
            <button type="submit"
                    style="top:10px"
                    class="btn btn-block btn-primary glyphicon glyphicon-download-alt btn-round">
                Agregar
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'CapturaSurtido',
        props:['seleccion','Productos'],
        created() {
            //this.Productos = JSON.parse(localStorage.getItem("Embarque"));
        },
        updated() {
        },
        methods: {
            //eventos
            on_guardad_cambios(event) {
                if (this.cambio_parametros()) {
                    this.cambio_cantidad();
                    document.querySelector("#captura_surtido_view").style.display = "none";
                    document.querySelector("#main").style.display = "";
                    document.querySelector("#entrada_codigo_producto").disabled = false;
                    document.querySelector("#entrada_codigo_producto").select();
                }
                event.preventDefault();
            },
            handle_cambio_surtir() {
                let { surtido } = this.seleccion;
                this.seleccion.surtido = surtido.toString().length > 0 ? (parseFloat(surtido) < 10000 ? parseFloat(surtido) : 999) : '';
                this.seleccion.total = surtido.toString().length > 0 ? (this.seleccion.operador == "+" ?
                    (parseFloat(this.seleccion.cantidad) + parseFloat(this.seleccion.surtido)) :
                    (parseFloat(this.seleccion.cantidad) - parseFloat(this.seleccion.surtido)) ):
                    parseFloat(this.seleccion.cantidad);
            },
            cambio_operador(operador) {
                this.seleccion.operador = operador;
                this.handle_cambio_surtir();
                document.querySelector("#entrada_codigo_producto_vista").select();
            },
            //Funciones
            cambio_parametros() {
                let state = false,
                    { existencia,pedido,total} = this.seleccion;
                if (existencia >= total) 
                    state = pedido >= total ? true : confirm(`! El Total Supera al Pedido por ${(total - pedido) } PZ ¡\n¿Continuar?`);
                else {
                    alert("El Surtido Supera La Existencia!!!");
                    document.querySelector("#entrada_codigo_producto_vista").select();
                }
                return state;
            },
            cambio_cantidad() {
                let { folio, total} = this.seleccion;
                let index_seleccion = this.Productos.findIndex(prod => prod.cod_prod == folio);
                if (index_seleccion > -1) {
                    this.Productos[index_seleccion].embarque = total;
                    this.cargarProductonLocalStorange();
                }
            },
            cargarProductonLocalStorange() {
                localStorage.setItem("Embarque", JSON.stringify(this.Productos));
            },
        },
        computed: {
            icono_operador() {
                return {
                    "fa fa-plus": this.seleccion.operador == "+",
                    "fa fa-minus": this.seleccion.operador != "+"
                };
            }
        }
    }
</script>

