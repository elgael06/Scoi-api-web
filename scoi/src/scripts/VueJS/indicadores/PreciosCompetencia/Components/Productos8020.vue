

<template>
    <tbody>
        <tr class="bg-green">
            <td class="descripcion_tabla_ch" style="text-align:center;width:50px;font-size:20px">
                <i :class="btn_togle" @click="toggle"></i>
            </td>
            <td class="descripcion_tabla">{{pasillo_8020.Pasillo}}</td>
            <td class="descripcion_tabla_ch">
                <i :class="comparacion_margen">
                    {{redondeo(pasillo_8020.Margen) }} %
                </i>
            </td>
            <td class="descripcion_tabla_ch">{{redondeo(pasillo_8020.Margen_familia)}} %</td>
            <td class="descripcion_tabla_ch" style="color:black">{{pasillo_8020.productos_no_cumplen}}</td>
            <td class="descripcion_tabla_ch">{{pasillo_8020.Cantidad}}</td>
            <td class="descripcion_tabla_ch">{{pasillo_8020.Avance}}</td>
            <td class="descripcion_tabla_ch">{{pasillo_8020.Diferencia}}</td>
            <td class="descripcion_tabla_ch">{{acumulado(pasillo_8020.Acumulado)}}</td>
        </tr>
        <tr :class="is_visible">
            <td ></td>
            <td colspan="8" style="max-height:400px;overflow:auto">
                <TablaProducto v-bind:mueble="pasillo_8020"
                                v-if="pasillo_8020"
                                v-bind:on_producto="on_producto" />
            </td>
        </tr>
    </tbody>
</template>

<script>
    import TablaProducto from './TablaProducto';

    export default {
        name: 'Productos8020',
        props: ["pasillo_8020", 'acumulado', 'on_producto'],
        components: {
            TablaProducto,
        },
        data() {
            return {
                visible: false,
            }
        },
        methods: {
            toggle() {
                this.visible = !this.visible; 
            },
            redondeo(dato) {
                return Math.round(dato*100) / 100;
            },
        },
        computed: {
            is_visible() {
                return this.visible ? "" : "celda_oculta";
            },
            btn_togle() {
                return this.visible ? 'fa fa-minus' : 'fa fa-plus';            
            },
            comparacion_margen() {
                let { Margen, Margen_familia } = this.pasillo_8020;
                return Margen > Margen_familia ? "btn btn-success btn-rounder" : "btn btn-danger btn-rounder";
            },
        }
    }
</script>


