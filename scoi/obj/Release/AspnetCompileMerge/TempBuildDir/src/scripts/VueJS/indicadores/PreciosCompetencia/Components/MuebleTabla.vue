

<template>
    <table class="table table-bordered">
        <thead>
            <tr class="bg-warning">
                <th colspan="3">Mueble</th>
                <th>Margen(Actual)</th>
                <th>Margen(Familia)</th>
                <th>Incumple(Margen)</th>
                <th>Cantidad(Productos)</th>
                <th>Avance</th>
                <th>Diferencia</th>
                <th>Acumulado</th>
            </tr>
        </thead>
        <PosicionMueble v-for="mueble in pasillo.Muebles" 
                        :key="pasillo.Pasillo+'_'+mueble.Mueble" 
                        v-bind:mueble="mueble" 
                        v-bind:acumulado="acumulado" 
                        v-bind:on_mueble="on_mueble" 
                        v-bind:on_producto="on_producto" 
                        v-bind:pasillo="pasillo.Pasillo" />
    </table>
</template>

<script>
    import PosicionMueble from './PosicionMueble';

    export default {
        name:'MuebleTabla',
        props: ['on_mueble', 'acumulado', 'on_producto', 'pasillo'],
        components: {
            PosicionMueble,
        },
    }

</script>

