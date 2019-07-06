
<template>
    <div class="ventana" id="ventana_filtro">
        <div class="paenl panel-default">
            <div class="panel-heading">
                <i class="btn btn-danger fa fa-close" v-on:click="cerrar" style="float:right" ></i>
                <h4>Productos</h4>
            </div>
            <div class="panel-body" style= "height:80%">
                <strong>Lista </strong>
                <i class="badge">{{cantidad}}</i>
                <div style="height:100%;overflow:auto">
                    <table class="table">
                        <thead>
                            <tr id="cavecera_tabla_filtro">
                                <th>Codigo</th>
                                <th>Descripcion</th>
                                <th>Embarque</th>
                                <th>Pedido</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="filtro_productos" v-for="e in lista" v-if="hay_productos" :key="e.cod_prod">
                                <td>{{e.cod_prod}}</td>
                                <td>{{e.descripcion}}</td>
                                <td style="text-align:right">{{e.embarque}}</td>
                                <td style="text-align:right">{{e.pedido}}</td>
                                <td>
                                    <i class="btn btn-danger glyphicon glyphicon-trash" von-click="modificar(e.cod_prod)" ></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>    
    export default {
        name: 'ModalFiltroEmbarque',
        props: ['lista'],
        methods: {
        modificar(cod_prod) {
            console.log("Codigo=>", cod_prod);
            },
            cerrar() {
                document.getElementById("ventana_filtro").style.display = "none";
                document.querySelector("#entrada_codigo_producto").select()
            }
        },
        computed: {
            hay_productos() {
                return this.lista.length > 0
            },
            cantidad() {
                return this.lista ? this.lista.length : 0;
            }
        }
    }
</script>

