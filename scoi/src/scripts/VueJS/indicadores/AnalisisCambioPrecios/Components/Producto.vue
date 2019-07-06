
<template>
    <tbody >
        <tr class="active">
            <td><label>Codigo</label></td>
            <td colspan="2"><label>Descripcion</label></td>
            <td><label>Costo Promedio</label></td>
            <td><label>Ultimo Costo</label></td>
            <td><label>Precio De Venta</label></td>
            <td><label>Precio De Oferta Actual</label></td>
            <td><label>Venta 90 Dias</label></td>
            <td><label>Margen</label></td>
            <td><label>Margen Meta</label></td>
            <td rowspan="2"><i :class="producto8020" @click="seleccion"></i></td>
        </tr>
        <tr class="warning">
            <td>{{producto.Codigo}}</td>
            <td  colspan="2">{{producto.Descripcion}}</td>
            <td>
                <Moneda v-bind:cantidad="producto.Costo_promedio" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Ultimo_costo" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Precio_venta" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Precio_oferta_actual" />
            </td>
            <td>{{producto.Venta_90_dias}}</td>
            <td>{{producto.Margen}} %</td>
            <td>{{producto.Margen_familia}} %</td>
        </tr>
        <tr class="active">
            <td>
                <label>Precio Venta</label></td>
            <td>
                <label> Margen</label></td>
            <td>
                <label>Diferencia Margen </label>
            </td>
            <td ><label>$Captura</label></td>
            <td ><label>Competencia</label></td>
            <td> <label>Ley</label></td>
            <td ><label>Soriana</label></td>
            <td ><label>Teresita</label></td>
            <td ><label>Bodart</label></td>
            <td ><label>Mezquitillo</label></td>
            <td ><label>Lopez</label></td>
        </tr>
        <tr class="warning">
            <td rowspan="2" :class="estatusPrecioVentaNuevo">
                <input type="text" @keyup="margen" @change="modificado" v-model="producto.Precio_venta_nvo" style="width:100px;display:inline-block" class="form-control  input-sm" />
            </td>
            <td rowspan="2" :class="estatusNuevoMargen">
                <input type="text" @keyup="venta" @change="modificado" v-model="producto.Margen_nvo" style="width:100px;display:inline-block" class="form-control input-sm" />
            </td>
            <td rowspan="2" :class="estatusNuevoMargen">{{diferenciaMargen}} %</td>
            <td rowspan="2">
                <Moneda v-bind:cantidad="producto.Precio_venta_captura" />
            </td>
            <td class="active" style="background:#efeeee;"><label class="active">Normal</label></td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Ley.Normal" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Soriana.Normal" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Teresita.Normal" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Bodart.Normal" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Mesquitillo.Normal" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Lopez.Normal" />
            </td>
        </tr>
        <tr class="warning">
            <td class="active" style="background:#efeeee;"><label class="active">Oferta</label></td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Ley.Oferta" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Soriana.Oferta" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Teresita.Oferta" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Bodart.Oferta" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Mesquitillo.Oferta" />
            </td>
            <td>
                <Moneda v-bind:cantidad="producto.Competencias.Lopez.Oferta" />
            </td>
        </tr>
        <tr v-if="comprobar_volumen_1" class="active">
            <td class="active" style="background:#efeeee;"><label>P.Volumen 1</label></td>
            <td class="active" style="background:#efeeee;">
                <label>Volumen 1</label>
            </td>
            <td class="active" style="background:#efeeee;"><label>P.Volumen_N</label> </td>
            <td class="active" style="background:#efeeee;"><label>Margen Vol.</label> </td>
            <td class="active" style="background:#efeeee;"><label>Diferencia</label> </td>

            <td class="active" rowspan="2"></td>

            <td v-if="comprobar_volumen_2" class="active" style="background:#efeeee;"><label>P.Volumen 2</label></td>
            <td v-if="comprobar_volumen_2" class="active" style="background:#efeeee;">
                <label>Volumen 2</label>
            </td>
            <td v-if="comprobar_volumen_2" class="active" style="background:#efeeee;"><label>P.Volumen_N</label> </td>
            <td v-if="comprobar_volumen_2" class="active" style="background:#efeeee;"><label>Margen Vol.2</label> </td>
            <td v-if="comprobar_volumen_2" class="active" style="background:#efeeee;"><label>Diferencia</label> </td>
        </tr>
        <tr v-if="comprobar_volumen_1" class="warning">
            <td>
                <Moneda v-bind:cantidad="producto.Volumen[0].Precio_Venta_actual" />
            </td>
            <td>{{ producto.Volumen[0].Llevando + " "+ producto.Volumen[0].Medida }} </td>
            <td>
                <input type="text"
                       @change="modificado"
                       @keyup="margenVol(0)"
                       v-model="producto.Volumen[0].Precio_Venta"
                       style="width:100px;display:inline-block"
                       class="form-control input-sm" />
            </td>
            <td>
                <input type="text" @keyup="ventaVol(0)"
                       @change="modificado"
                       v-model="producto.Volumen[0].Margen"
                       style="width:100px;display:inline-block"
                       class="form-control input-sm" />
            </td>
            <td :class="estatusNuevoMargenVol(0)">{{ difetenciaMargenVolumen_1 }}</td>


            <td v-if="comprobar_volumen_2">
                <Moneda v-bind:cantidad="producto.Volumen[1].Precio_Venta_actual" />
            </td>
            <td v-if="comprobar_volumen_2">{{ producto.Volumen[1].Llevando + " "+ producto.Volumen[1].Medida }} </td>
            <td v-if="comprobar_volumen_2">
                <input type="text"
                       @keyup="margenVol(1)"
                       @change="modificado"
                       v-model="producto.Volumen[1].Precio_Venta"
                       style="width:100px;display:inline-block"
                       class="form-control input-sm" />
            </td>
            <td v-if="comprobar_volumen_2">
                <input type="text" @keyup="ventaVol(1)"
                       @change="modificado"
                       v-model="producto.Volumen[1].Margen"
                       style="width:100px;display:inline-block"
                       class="form-control input-sm" />
            </td>
            <td v-if="comprobar_volumen_2" :class="estatusNuevoMargenVol(1)">{{ difetenciaMargenVolumen_2 }}</td>
        </tr>
        <tr>
            <td colspan="11" style="height:50px;"></td>
        </tr>
    </tbody>
</template>

<script >
    import Moneda from "../../../ComponentesGlobales/Moneda";

    export default {
        name: 'Producto',
        props: ['producto','Seleccion'],
        data() {
            return {
                volumen: 0,
            }
        },
        components: {
            Moneda
        },
        methods: {  
            seleccion() {
                console.log("Producto => ", this.producto);
                console.log("Producto => ", this.producto.Precios_volumen);
                console.log("Producto => ", this.producto.Volumen);
            },
            margen(){
                let {Ultimo_costo,Precio_venta_nvo} = this.producto;
                let t_costo = parseFloat(Ultimo_costo),
                t_venta = parseFloat(Precio_venta_nvo);
                let margen  = ((t_venta - t_costo)/t_venta )*100 || 0;

                this.producto.Margen_nvo = Math.round( (margen*100) )/100;
            },
            margenVol(pos) {
                let t_costo = parseFloat(this.producto.Ultimo_costo || 0),
                    t_venta = parseFloat(this.producto.Volumen[pos].Precio_Venta);

                this.producto.Volumen[pos].Margen = Math.round( ((((t_venta - t_costo)/t_venta )*100 || 0)*100) )/100;
            },
            venta(){
                let {Ultimo_costo,Margen_nvo} = this.producto;
                let t_costo = parseFloat(Ultimo_costo),
                    t_margen = parseFloat(Margen_nvo) / 100,
                    t_veta = t_costo/(1-t_margen) || 0;
                this.producto.Precio_venta_nvo = Math.round( (t_veta*100) )/100;
            },
            ventaVol(pos) {
                let t_costo = parseFloat(parseFloat( this.producto.Ultimo_costo || 0)),
                    t_margen = parseFloat(this.producto.Volumen[pos].Margen) / 100;

                this.producto.Volumen[pos].Precio_Venta = Math.round( ((t_costo/(1-t_margen) || 0)*100) )/100;
            },
            modificado() {
                this.producto.Estatus = true
            },
            estatusNuevoMargenVol(pos) {
                let { Margen, Margen_familia } = this.producto;
                let Margen_nvo = parseFloat(this.producto.Volumen[pos].Margen || 0);
                let res = (Math.round(((Margen_nvo - Margen) * 100)) / 100 || 0);
                return res>= 0 ?  res>Margen_familia ? "success": "info":  "danger" ;
            },
        },
        computed: {
            producto8020() {
                return this.producto.Clasificacion8020.search("8020")>-1 ? "btn btn-info fa fa-shopping-cart" : "btn btn-default fa fa-info";
            },
            diferenciaMargen() {
                let {Margen_nvo,Margen } = this.producto;
                return  Math.round( ( (Margen_nvo - Margen )*100) )/100 || 0;
            },
            difetenciaMargenVolumen_1() {
                let { Margen } = this.producto;
                let Margen_nvo = this.producto.Volumen[0].Margen;
                return  Math.round( ( (Margen_nvo - Margen )*100) )/100 || 0;
            },
            difetenciaMargenVolumen_2() {
                let { Margen } = this.producto;
                let Margen_nvo = this.comprobar_volumen_2 ? this.producto.Volumen[1].Margen :0;
                return  Math.round( ( (Margen_nvo - Margen )*100) )/100 || 0;
            },
            estatusNuevoMargen() {
                let { Margen_nvo, Margen, Margen_familia } = this.producto;
                let res = (Math.round(((Margen_nvo - Margen) * 100)) / 100 || 0);
                return res>= 0 ?  res>Margen_familia ? "success": "info":  "danger" ;
            },
            estatusPrecioVentaNuevo() {
                let { Precio_venta_nvo, Competencias } = this.producto;
                let { Ley, Soriana, Teresita, Bodart, Mesquitillo, Lopez } = Competencias;

                return Precio_venta_nvo > 0 ? (
                    (Precio_venta_nvo > Ley.Normal && Precio_venta_nvo > Ley.Oferta) && 
                    (Precio_venta_nvo > Soriana.Normal && Precio_venta_nvo > Soriana.Oferta) && 
                    (Precio_venta_nvo > Teresita.Normal && Precio_venta_nvo > Teresita.Oferta) && 
                    (Precio_venta_nvo > Bodart.Normal && Precio_venta_nvo > Bodart.Oferta) && 
                    (Precio_venta_nvo > Mesquitillo.Normal && Precio_venta_nvo > Mesquitillo.Oferta) && 
                    (Precio_venta_nvo > Lopez.Normal && Precio_venta_nvo > Lopez.Oferta) 
                    ) ? "success" :
                    "danger" :
                    "danger";
            },
            comprobar_volumen_1() {
                return this.producto.Volumen.length > 0;
            },
            comprobar_volumen_2() {
                return this.producto.Volumen.length > 1;
            }
        },
    }
</script>
