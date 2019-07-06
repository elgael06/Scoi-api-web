

<template>
    <table class="table" style="width:100%;float:left">
        <thead>
            <tr class="active">
                <td>Folio</td>
                <td>Producto</td>
                <td>Margen(Actual)</td>
                <td>Margen(Familia)</td>
                <td>Estatus</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="producto in mueble.Productos" :key="producto.Codigo">
                <td class="descripcion_tabla_ch">{{producto.Codigo}}</td>
                <td>{{producto.Descripcion}}</td>
                <td class="descripcion_tabla_ch">
                    <i :class="comparacion_margen(producto)">{{producto.Detalles.Margen}} % </i>
                </td>
                <td class="descripcion_tabla_ch">{{producto.Detalles.Margen_familia}} %</td>
                <td class="descripcion_tabla_ch">
                    <i :class="producto.Estado?'btn btn-success glyphicon glyphicon-ok-circle':'btn btn-warning glyphicon glyphicon-ban-circle'"
                       style="float:right" v-on:click="on_producto(producto)">
                        {{comprobar(producto.Estado)}}.
                    </i>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'TablaProducto',
        props: ['mueble','on_producto'],
        methods: {
            comprobar(estado) {
                return estado ? "Revisado" : "Pendiente";
            },
            comparacion_margen(producto) {
                let { Margen, Margen_familia } = producto.Detalles;
                return Margen > Margen_familia ? "btn btn-success btn-rounder" : "btn btn-danger btn-rounder";
            }
        },
    }
</script>


