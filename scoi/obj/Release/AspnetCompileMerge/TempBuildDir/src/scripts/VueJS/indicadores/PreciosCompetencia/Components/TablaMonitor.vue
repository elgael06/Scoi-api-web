

<template>
    <table class="table table-bordered">
        <thead>
            <tr class="bg-blue">
                <th colspan="2">Pasillo</th>
                <th >Margen(Actual)</th>
                <th >Margen(Familia)</th>
                <th class="">Incumplen(Margen)</th>
                <th>Cantidad(Productos)</th>
                <th>Avance</th>
                <th>Diferencia</th>
                <th>Acumulado</th>
            </tr>
        </thead>
        <Productos8020 v-bind:pasillo_8020="pasillo_8020" v-bind:acumulado="acumulado" v-bind:on_producto="on_producto" />
        <PasilloTabla v-for="pasillo in pasillos" 
                      :key="pasillo.Pasillo+'_p'" 
                      v-bind:on_mueble="on_mueble" 
                      v-bind:pasillo="pasillo" 
                      v-bind:acumulado="acumulado" v-bind:on_producto="on_producto" />
    </table>
</template>


<script>
    import Productos8020 from './Productos8020';
    import PasilloTabla from './PasillosTabla';


    export default {
        name: 'TablaMonitor',
        components: {
            Productos8020,
            PasilloTabla,
        },
        props: ['pasillo_8020', 'pasillos', 'acumulado', 'on_mueble','on_producto'],
        methods: {
            toggle( clase ) {
                let productos = document.querySelectorAll(`.${clase}`);

                if (productos[0].style.display == "none")
                    for (fila of productos) {
                        let clase2 = clase.split(" ");

                    }
                else {

                }
            },
        },
    }
</script>



