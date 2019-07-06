
<template>
    <tbody>
        <tr>
            <td>{{producto.codigo_producto}}</td>
            <td>{{producto.descripcion}}</td>
            <td> 
                <Moneda :cantidad="producto.costo" />
            </td>
            <td :style="checarMargen">{{producto.margen_venta_familia}}%</td>
            <td>{{producto.margen_venta_actual}}%</td>
            <td>{{producto.margen_venta_nuevo}}%</td>
            <td>
                <Moneda :cantidad="producto.precio_venta" />
            </td>
            <td>
                <Moneda :cantidad="producto.precio_venta_nuevo" />
            </td>

            <!--Volumen 1-->
            <td v-if="comprobarVolumen(0)">{{producto.volumen[0].Llevando}} {{producto.volumen[0].Medida}}</td>
            <td v-if="comprobarVolumen(0)">
                <Moneda :cantidad="producto.volumen[0].Precio_Venta_actual" />
            </td>
            <td v-if="comprobarVolumen(0)">
                <Moneda :cantidad="producto.volumen[0].Precio_Venta" />
            </td>
            <!--Volumen 2-->
            <td v-if="comprobarVolumen(1)">{{producto.volumen[1].Llevando}} {{producto.volumen[1].Medida}}</td>
            <td v-if="comprobarVolumen(1)">
                <Moneda :cantidad="producto.volumen[1].Precio_Venta_actual" />
            </td>
            <td v-if="comprobarVolumen(1)">
                <Moneda :cantidad="producto.volumen[1].Precio_Venta" />
            </td>

        </tr>
    </tbody>
</template>

<script>
    import Moneda from '../../../ComponentesGlobales/Moneda';

    export default {
        name: 'ProductoGuardado',
        props: ['producto'],
        components: {
            Moneda
        },
        methods: {            
            comprobarVolumen(pos){
                let {volumen} = this.producto;
                return volumen != null ? volumen.length > pos : false;
            }
        },
        computed: {
            checarMargen() {
                return this.producto.margen_venta_familia >= this.producto.margen_venta_nuevo ?
                    { background:"#FF0C00" } :
                    { background:"#FFF" }
            }
        }
    }
</script>
