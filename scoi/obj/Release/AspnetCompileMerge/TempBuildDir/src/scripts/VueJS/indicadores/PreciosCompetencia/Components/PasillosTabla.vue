
<template>
    <tbody style="color:black" class="success">
        <tr class="productos bg-info">
            <td class="descripcion_tabla_ch" style="text-align:center;width:50px;font-size:20px">
                <i :class="btn_togle" @click="toggle"></i>
            </td>
            <td class="descripcion_tabla">{{pasillo.Pasillo}}</td>
            <td class="descripcion_tabla_ch">
                <i :class="comparacion_margen">
                    {{redondeo(pasillo.Margen) }} %
                </i>
            </td>
            <td class="descripcion_tabla_ch">{{redondeo(pasillo.Margen_familia)}} %</td>
            <td class="descripcion_tabla_ch">{{pasillo.productos_no_cumplen}}</td>
            <td class="descripcion_tabla_ch">{{pasillo.Cantidad}}</td>
            <td class="descripcion_tabla_ch">{{pasillo.Avance}}</td>
            <td class="descripcion_tabla_ch">{{pasillo.Diferencia}}</td>
            <td class="descripcion_tabla_ch">{{acumulado(pasillo.Acumulado)}}</td>
        </tr>
         <tr :class="is_visible" v-if="visible">
             <td></td>
            <td colspan="8">
                <MuebleTabla v-bind:pasillo="pasillo" v-bind:acumulado="acumulado" v-bind:on_mueble="on_mueble" v-bind:on_producto="on_producto" />
            </td>
        </tr>
    </tbody>
</template>

<script>
    import MuebleTabla from './MuebleTabla';

    export default {
        name:'PasilloTabla',
        props: ['pasillo', 'acumulado', 'on_producto', 'on_mueble'],
        components: {
            MuebleTabla,
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
            comparacion_margen() {
                let { Margen, Margen_familia } = this.pasillo;
                return Margen > Margen_familia ? "btn btn-success btn-rounder" : "btn btn-danger btn-rounder";
            },
            is_visible() {
                return this.visible ? "" : "celda_oculta";
            },
            btn_togle() {
                return this.visible ? 'fa fa-minus' : 'fa fa-plus';
            }
        }
    }
</script>





