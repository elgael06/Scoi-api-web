
<template>
    <div class="row">
        <div class="form-group" style="max-width:200px;display:inline-block">
            <label>Productos</label>
            <i class="form-control">{{productos.length}}</i>
        </div>
        <div class="form-group" style="max-width:200px;display:inline-block">
            <label>Folio Productos</label>
            <input type="number" class="form-control" v-model="producto.folio" />
        </div>
        <div class="mt-3" style="max-width:400px;display:inline-block">
            <i class="btn btn-success fa fa-save" @click="guardadoProductos"> Guardar</i>
        </div>
        <div class="form-group" style="max-width:200px;display:inline-block;float:right">
            <label>Filas</label>
            <select v-model="incremento" @change="cambioFilas" class="form-control">
                <option>100</option>
                <option>200</option>
                <option>300</option>
                <option>400</option>
                <option>500</option>
            </select>
        </div>
        <div class="p-3" style="height:700px;overflow:auto" v-if="productos.length>0">
            <table class="table table-condensed">
                <Producto v-for="(item,i) in obtenerPosiciones"
                          v-bind:producto="item"
                          v-bind:Seleccion="Seleccion"
                          :filtro_folio="filtro_folio"
                          :key="i+'_producto'" />
            </table>
        </div>
        <div v-else>
            <label>Sin Productos A Mostrar...</label>
        </div>
        <div style="overflow-x:auto;height:40px;justify-content:center;display:flex;margin-top:20px">
            <a v-for="item in calculoPosiciones" @click="seleccionar(item)" :key="item.posicion" :class="activa(item)">{{item.posicion}}</a>
        </div>
    </div>
</template>

<script>
    import Producto from './Producto'

    export default {
        name: 'TablaProductos',
        props: ['productos','producto','guardadoProductos'],
        components: {
            Producto
        },
        data() {
            return {
                incremento:300,
                seleccion: {
                    inicio: 0,
                    fin:299,
                },
                posiciones: [],
            }
        },
        updated() {
            let { inicio } = this.seleccion;

            this.seleccion.fin = inicio + parseInt(this.incremento);
        },
        methods: {
            seleccionar(posicion) {
                console.log(posicion);
                this.seleccion = {
                    inicio: posicion.inicio,
                    fin: posicion.inicio + this.incremento ,
                };
            },
            activa(posicion) {
                let { inicio } = this.seleccion;
                return posicion.inicio == inicio ? "btn btn-info btn-round " : "btn btn-link btn-round";
            }
        },
        computed: {
            obtenerPosiciones() {
                let { inicio, fin } = this.seleccion;
                return this.productos.slice(inicio, fin);
            },
            cambioFilas() {
                this.seleccion = {
                    inicio: 0,
                    fin: this.incremento,
                };
            },
            calculoPosiciones() {
                let lista = [];
                let posiciones = this.productos.length / this.incremento;
                for (let i = 0; i <= posiciones; i++) {
                    lista.push({
                        posicion: i + 1,
                        inicio: i > 0 ? this.incremento * i : 0
                    });
                }

                return lista;
            },
        },
    }
</script>





