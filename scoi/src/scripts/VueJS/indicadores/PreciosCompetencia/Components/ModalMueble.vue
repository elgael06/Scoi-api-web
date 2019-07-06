
<template>
    <div class="modal" id="modal_mueble">
        <div class="animate panel panel-primary">
            <div class="panel-heading">
                <i class="fa fa-close" style="float:right" v-on:click="cerrar"></i>
                <label>Detalles Pasillo {{pasillo}}</label>
            </div>
            <div class="panel-body" id="body_modal_mueble">
                <div class="row">
                    <div class="col-sm-4">
                        <table class="table table-condensed">
                            <thead>
                                <tr class="bg-blue">
                                    <th rowspan="2"><label>Mueble</label></th>
                                    <th colspan="4" style="text-align:center">Productos</th>
                                </tr>
                                <tr class="bg-blue">
                                    <th>Cantidad</th>
                                    <th>Avance</th>
                                    <th>Diferencia</th>
                                    <th>Acumulado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-with" style="background:#FFF">
                                    <td class="descripcion_tabla">{{mueble.Mueble}}</td>
                                    <td class="descripcion_tabla_ch">{{mueble.Cantidad}}</td>
                                    <td class="descripcion_tabla_ch">{{mueble.Avance}}</td>
                                    <td class="descripcion_tabla_ch">{{mueble.Diferencia}}</td>
                                    <td class="descripcion_tabla_ch">{{acumulado(mueble.Acumulado)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <AreaFiltroMueble v-bind:Mueble="mueble"
                                                  v-bind:seleccion="seleccion" />
                    <h5 class="col-sm-12">Productos :</h5>
                    <div class="panel-group lista_productos col-sm-12">
                        <DetallesProducto v-for="producto in mueble.Productos" :key="producto.Codigo" v-bind:producto="producto" v-if="filtrar(producto.Detalles)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AreaFiltroMueble from './AreaFiltroMueble';
    import DetallesProducto from './DetallesProducto';

    export default {
        name:'ModalMueble',
        props: ['pasillo', 'mueble', 'acumulado'],
        components: {
            AreaFiltroMueble,
            DetallesProducto,
        },
        data() {
            return {
                seleccion: {
                    Clases:"",
                    Categorias: "",
                    Familia: "",
                    Talla: "",
                    Color: "",
                }
            }
        },
        methods: {
            filtrar(Detalles) {
                try {
                    let { Categorias, Clases, Color, Talla, Familia } = this.seleccion;
                    return Detalles.Clase.search(Clases) > -1 &&
                        Detalles.Categoria.search(Categorias) > -1 &&
                        Detalles.Familia.search(Familia) > -1 &&
                        Detalles.Talla.search(Talla) > -1 &&
                        Detalles.Color.search(Color) > -1;
                }
                catch (err) {
                    console.log("Fallo", err);
                    return true;
                }
            },
            cerrar() {
                this.seleccion = {
                    Clases: "",
                    Categorias: "",
                    Familia: "",
                    Talla: "",
                    Color: "",
                };
                document.querySelector("#modal_mueble").style.display = "none";
            }
        },
    }
</script>
