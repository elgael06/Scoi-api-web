

<template id="detalles_productos">
    <div class="panel panel-info">
        <div class="panel-heading">
            <label> Folio : {{producto.Codigo}}</label>
            <label>Descripcion : {{producto.Descripcion}}</label>
        </div>
        <div class="panel-body">
            <table class="table table-condensed table-bordered">
                <tbody>
                    <tr class="bg-warning">
                        <th>Clase</th>
                        <th>Categoria</th>
                        <th>Familia</th>
                        <th>Talla</th>
                        <th>Color</th>
                    </tr>
                    <tr>
                        <th>{{producto.Detalles.Clase}}</th>
                        <th>{{producto.Detalles.Categoria}}</th>
                        <th>{{producto.Detalles.Familia}}</th>
                        <th>{{producto.Detalles.Talla}}</th>
                        <th>{{producto.Detalles.Color}}</th>
                    </tr>
                </tbody>
            </table>
            <table class="table table-condensed table-bordered">
                <thead class="bg-warning">
                    <tr>
                        <th>Precio(Venta)</th>
                        <th>Costo(Ultimo)</th>
                        <th>Costo(Promedio)</th>
                        <th>Precio(Oferta)</th>
                        <th>Margen(Actual)</th>
                        <th>Margen(Familia)</th>
                        <th>Venta(90 Dias)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <th style="text-align:right"><Moneda v-bind:cantidad="producto.Detalles.Precio_de_venta" /></th>
                        <th style="text-align:right"><Moneda v-bind:cantidad="producto.Detalles.Ultimo_costo" /></th>
                        <th style="text-align:right"><Moneda v-bind:cantidad="producto.Detalles.Costo_promedio" /></th>
                        <th style="text-align:right"><Moneda v-bind:cantidad="producto.Detalles.Precio_de_oferta_actual" /></th>
                        <th style="text-align:right"><i :class="comparacion_margen">{{producto.Detalles.Margen}} % </i></th>
                        <th style="text-align:right">{{producto.Detalles.Margen_familia}} %</th>
                        <th style="text-align:right">{{producto.Detalles.Venta_90_dias}} PZ</th>
                    </tr>
                </tbody>
            </table>
            <table class="table table-condensed table-bordered">
                <tbody>
                    <tr class="bg-warning">
                        <th rowspan="3">
                            <label style="margin-top:30px;margin-left:10px">
                                Comparativo
                                <p>{{producto.Fecha}}</p>
                            </label>
                        </th>
                        <th>Precio</th>
                        <th>Izagar</th>
                        <th>Ley</th>
                        <th>Lopez</th>
                        <th>Mezquitillo</th>
                        <th>Bodart</th>
                        <th>Teresita</th>
                        <th>Soriana</th>
                    </tr>
                    <tr>
                        <td> <label>Normal</label></td>
                        <td style="text-align:right">
                            <i :class="precio_izagar_normal"> 
                                <Moneda v-bind:cantidad="producto.Precio.Izagar.Normal" />
                            </i>
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Ley.Normal" v-if="producto.Precio.Ley.Normal!=0" />
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Lopez.Normal" v-if="producto.Precio.Lopez.Normal!=0" />
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Mesquitillo.Normal" v-if="producto.Precio.Mesquitillo.Normal!=0" />
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Bodart.Normal" v-if="producto.Precio.Bodart.Normal!=0"/>
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Teresita.Normal"  v-if="producto.Precio.Teresita.Normal!=0"/>
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Soriana.Normal" v-if="producto.Precio.Soriana.Normal!=0" />
                        </td>
                    </tr>
                    <tr>
                        <td> <label>Oferta</label></td>
                        <td style="text-align:right">
                            <i :class="precio_izagar_oferta">
                                <Moneda v-bind:cantidad="producto.Precio.Izagar.Oferta" />
                            </i>
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Ley.Oferta" v-if="producto.Precio.Ley.Oferta!=0" />
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Lopez.Oferta" v-if="producto.Precio.Lopez.Oferta!=0" />
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Mesquitillo.Oferta" v-if="producto.Precio.Mesquitillo.Oferta!=0" />
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Bodart.Oferta" v-if="producto.Precio.Bodart.Oferta!=0" />
                        </td>
                        <td style="text-align:right">
                            <Moneda v-bind:cantidad="producto.Precio.Teresita.Oferta"  v-if="producto.Precio.Teresita.Oferta!=0"/>
                        </td>
                        <td style="text-align:right">
                           <Moneda v-bind:cantidad="producto.Precio.Soriana.Oferta" v-if="producto.Precio.Soriana.Oferta!=0" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Moneda from '../../../ComponentesGlobales/Moneda';
    export default {
        name: 'DetallesProducto',
        props: ['producto'],
        components: {
            Moneda,
        },
        methods: {
        },
        computed: {
            comparacion_margen() {
                let { Margen, Margen_familia } = this.producto.Detalles;
                return Margen > Margen_familia ? "btn btn-success btn-rounder" : "btn btn-danger btn-rounder";
            },
            precio_izagar_normal() {
                let { Normal } = this.producto.Precio.Izagar;
                let { Ley, Lopez, Mesquitillo, Bodart, Teresita, Soriana } = this.producto.Precio;

                return (Normal != 0) ?
                        (Ley.Normal >= Normal || Ley.Normal == 0) && (Lopez.Normal >= Normal || Lopez.Normal==0) &&
                        (Mesquitillo.Normal >= Normal || Mesquitillo.Normal == 0) && (Bodart.Normal >= Normal || Bodart.Normal==0) &&
                        (Teresita.Normal >= Normal || Teresita.Normal==0) && (Soriana.Normal >= Normal || Soriana.Normal==0) ?
                        "btn btn-success" : "btn btn-danger" : "btn btn-warning" ;
            },
            precio_izagar_oferta() {
                let { Oferta } = this.producto.Precio.Izagar;
                let { Ley, Lopez, Mesquitillo, Bodart, Teresita, Soriana } = this.producto.Precio;

                return (Oferta != 0) ?
                        (Ley.Oferta >= Oferta || Ley.Oferta==0) && (Lopez.Oferta >= Oferta || Lopez.Oferta==0) &&
                        (Mesquitillo.Oferta >= Oferta || Mesquitillo.Oferta==0) && (Bodart.Oferta >= Oferta || Bodart.Oferta==0) && 
                        (Teresita.Oferta >= Oferta || Teresita.Oferta==0) && (Soriana.Oferta >= Oferta || Soriana.Oferta==0) ?
                        "btn btn-success" : "btn btn-danger" :"btn btn-warning";
            },
        }
    }
</script>



