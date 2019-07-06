

<template>
    <div class="panel panel-default">
        <div class="panel-heading"  v-if="!existe">
            <label>Historico Producto </label>
            <label class="btn btn-primary fa fa-download" v-if="!existe" @click="Obtener"> Cargar</label>
        </div>
        <div class="panel-body" v-if="existe">
            <div style="max-height:300px;overflow:auto">
                <table class="table table-striped">
                    <thead>
                        <tr class="bg-blue">
                            <th rowspan="2">Fecha</th>
                            <th rowspan="2">Ultimo Costo</th>
                            <th rowspan="2">Costo Promedio</th>
                            <th rowspan="2">Margen</th>
                            <th rowspan="2">Margen Meta</th>
                            <th rowspan="2" style="text-align:center">Izagar</th>

                            <th colspan="2" style="text-align:center">Ley</th>
                            <th colspan="2" style="text-align:center">Lopez</th>
                            <th colspan="2" style="text-align:center">Mezquitillo</th>
                            <th colspan="2" style="text-align:center">Bodat</th>
                            <th colspan="2" style="text-align:center">Teresita</th>
                            <th colspan="2" style="text-align:center">Soriana</th>
                        </tr>
                        <tr class="bg-blue">
                            <th>Normal</th>
                            <th>Oferta</th>

                            <th>Normal</th>
                            <th>Oferta</th>

                            <th>Normal</th>
                            <th>Oferta</th>

                            <th>Normal</th>
                            <th>Oferta</th>

                            <th>Normal</th>
                            <th>Oferta</th>

                            <th>Normal</th>
                            <th>Oferta</th>
                        </tr>
                    </thead>
                    <tbody  v-for="item in lista" :key="item.Fecha">
                        <tr>
                            <td>{{item.Fecha}}</td>
                            <td>
                                <Moneda v-bind:cantidad="item.Ultimo_Costo" />
                            </td>
                            <td>
                                <Moneda v-bind:cantidad="item.Costo_promedio" />
                            </td>
                            <td>{{margen(item.Margen)}}</td>
                            <td>{{margen(item.Margen_meta)}}</td>
                            <td>
                                <Moneda v-bind:cantidad="item.Izagar" />
                            </td>

                            <td>
                                <Moneda v-bind:cantidad="item.Ley.Normal" />
                            </td>
                            <td>
                                <Moneda v-bind:cantidad="item.Ley.Oferta" />
                            </td>

                            <td>
                                <Moneda v-bind:cantidad="item.Lopez.Normal" />
                            </td>
                            <td>
                                <Moneda v-bind:cantidad="item.Lopez.Oferta" />
                            </td>

                            <td>
                                <Moneda v-bind:cantidad="item.Mesquitillo.Normal" />
                            </td>
                            <td>
                                <Moneda v-bind:cantidad="item.Mesquitillo.Oferta" />
                            </td>

                            <td>
                                <Moneda v-bind:cantidad="item.Bodart.Normal" />
                            </td>
                            <td>
                                <Moneda v-bind:cantidad="item.Bodart.Oferta" />
                            </td>

                            <td>
                                <Moneda v-bind:cantidad="item.Teresita.Normal" />
                            </td>
                            <td>
                                <Moneda v-bind:cantidad="item.Teresita.Oferta" />
                            </td>

                            <td>
                                <Moneda v-bind:cantidad="item.Soriana.Normal" />
                            </td>
                            <td>
                                <Moneda v-bind:cantidad="item.Soriana.Oferta" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Moneda from '../../../ComponentesGlobales/Moneda';

    export default {
        name: 'HistoricoProducto',
        props: ['Obtener', 'lista'],
        components: {
            Moneda,
        },
        methods: {
            margen(dato) {
                return (dato*100) +" %" 
            }
        },
        computed: {
            existe() {
                return this.lista.length > 0;
            }
        }
    }
</script>


