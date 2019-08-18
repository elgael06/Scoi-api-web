

<template>
    <div class="panel-heading" style="min-height:50px">
        <i class="btn btn-warning" @click="regresar" style="float:right"> regresar</i>
        <i :class="botonMostrar" @click="toggle" style="float:left"> </i>
        <h4 style="margin-top:-2px;margin-left:30px;">Filtro Analisis Cambio De Precios.</h4>
        <div class="row" v-if="visibles">
            <div class="col-sm-3">
                <label>Pasillo</label>
                <select class="form-control" v-model="parametros.Pasillo">
                    <option v-for="item in Analisis.Pasillo">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Zona</label>
                <select class="form-control" v-model="parametros.zona">
                    <option v-for="item in Analisis.zona">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Clase</label>
                <select class="form-control" v-model="parametros.Clase">
                    <option v-for="item in Analisis.Clase">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Categoria</label>
                <select class="form-control" v-model="parametros.Categoria">
                    <option v-for="item in Analisis.Categoria">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Familia</label>
                <select class="form-control" v-model="parametros.Familia">
                    <option v-for="item in Analisis.Familia">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Canasta Basica</label>
                <select class="form-control" v-model="parametros.CanastaBasica">
                    <option v-for="item in Analisis.CanastaBasica">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Color</label>
                <select class="form-control" v-model="parametros.Color">
                    <option v-for="item in Analisis.Color">{{item}}</option>
                </select>
            </div>
            <div class="col-sm-3">
                <label>Marca</label>
                <select class="form-control" v-model="parametros.Marca">
                    <option v-for="item in Analisis.Marca">{{item}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'FiltroAnalisis',
        props: {
            parametros: {
                Localizacion: "Todos",
                Pasillo: "Todos",
                Clase:"Todos",
                Categoria: "Todos",
                Familia: "Todos",
                CanastaBasica: "Todos",
                Color: "Todos",
                Marca: "Todos",
                Clasificacion8020: "Todos",
                zona:"Todos"
            },
            Analisis: {
                Localizacion: [],
                Pasillo: [],
                Clase: [],
                Categoria: [],
                Familia: [],
                CanastaBasica: [],
                Color: [],
                Marca: [],
                Clasificacion8020: [],
                zona:[],
                Productos:[]
            },
            regresar: () => {console.log("regresar") }
        },
        data() {
            return {
                visibles:true
            }
        },
        updated() {
            console.log("Cambio...");
        },
        methods: {
            toggle() {
                this.visibles = !this.visibles;
            }
        },
        computed: {
            botonMostrar() {
                return this.visibles ? "fa fa-plus" : "fa fa-minus";
            }
        }
    }
</script>