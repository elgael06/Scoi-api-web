
<template>
    <tbody style="color:black">
        <tr :key="mueble.Mueble" style="color:black" class="bg-success">
            <td class="descripcion_tabla_ch" style="text-align:center;width:50px;font-size:20px">
                <i :class="btn_togle" @click="toggle"></i>
            </td>
            <td style="width:30px">
                <i class="fa fa-share-square-o btn btn-info btn-round" v-on:click="on_mueble(pasillo,mueble)"></i>
            </td>
            <td class="descripcion_tabla">{{mueble.Mueble}}</td>
            <td class="descripcion_tabla_ch">
                <i :class="comparacion_margen">
                    {{redondeo(mueble.Margen) }} %
                </i>
            </td>
            <td class="descripcion_tabla_ch">{{redondeo(mueble.Margen_familia)}} %</td>
            <td class="descripcion_tabla_ch">{{mueble.productos_no_cumplen}}</td>
            <td class="descripcion_tabla_ch">{{mueble.Cantidad}}</td>
            <td class="descripcion_tabla_ch">{{mueble.Avance}}</td>
            <td class="descripcion_tabla_ch">{{mueble.Diferencia}}</td>
            <td class="descripcion_tabla_ch">{{acumulado(mueble.Acumulado)}}</td>
        </tr>
        <tr :class="is_visible" v-if="visible">
            <td></td>
             <td colspan="9" style="max-height:400px;overflow:auto">
                <TablaProducto v-bind:mueble="mueble"
                               v-bind:on_producto="on_producto" />
            </td>
        </tr>
    </tbody>
</template>

<script>
    import TablaProducto from './TablaProducto';

    export default {
        name:'PosicionMueble',
        props: ['mueble', 'acumulado', 'on_producto','on_mueble', 'pasillo'],
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
                let { Margen, Margen_familia } = this.mueble;
                return Margen > Margen_familia ? "btn btn-success btn-rounder" : "btn btn-danger btn-rounder";
            },
        }
    }
</script>


