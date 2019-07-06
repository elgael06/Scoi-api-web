
<template>
    <div class="panel-heading">
        <h3 v-if="titulo">{{titulo}}</h3>
        <h3 v-else>Monitor Precio Competencia</h3>
        <div class="form-group">
            <div class="form-group" style="display:inline-block">
                <h4>Critero Productos:</h4>
                <a :class="btn_existencia" v-on:click="cambio_vigencia('S')">
                    <i class="fa fa-check-circle-o" v-if="estatus"></i>  Existencia
                </a>
                <a :class="btn_no_existencia" v-on:click="cambio_vigencia('N')">
                    <i class="fa fa-check-circle-o" v-if="!estatus"></i> Sin Existencia
                </a>
            </div>
            <div class="form-group" style="display:inline-block">
                <h4>Mes:</h4>
                <select type="month" class="btn btn-default" v-model="parametros.fecha">
                    <option v-for="item in meses" :key="item">{{item}}</option>
                </select>
            </div>
            <div class="form-group" style="display:inline-block">
                <h4>Año:</h4>
                <select class="btn btn-default" v-model="parametros.anio">
                    <option v-for="item in anios" :key="item">{{item}}</option>
                </select>
            </div>
            <i class="fa fa-download btn btn-success btn-round" v-on:click="consultar_pasillos" style="font-size:18px;"> Obtener.</i>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Controles',
        props: ['estatus', 'parametros', 'cambio_vigencia', 'consultar_pasillos','titulo'],
        data() {
            return {
                meses: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                anios:['2026','2025','2024','2023','2022','2021','2020','2019','2018','2017','2016','2015','2014','2013']
            }
        },
        computed: {
            btn_existencia() {
                return this.estatus ? "btn btn-primary" : "btn btn-primary  btn_existencia";
            },
            btn_no_existencia() {
                return !this.estatus ? "btn btn-danger" : "btn btn-danger btn_no_existencia";
            }
        }
    }
</script>

