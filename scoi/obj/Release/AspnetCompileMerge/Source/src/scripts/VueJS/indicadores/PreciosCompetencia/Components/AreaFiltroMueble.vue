
<template>
    <div class="col-sm-8 bg-blue">
        <div class="col-sm-4">
            <label>Clase</label>
            <select class="form-control" v-model="seleccion.Clases">
                <option value="">Todos</option>
                <option v-for="item in Mueble.Clases" :key="item">{{item}}</option>
            </select>
        </div>
        <div class="col-sm-4">
            <label>Categoria</label>
            <select class="form-control" v-model="seleccion.Categorias">
                <option value="">Todos</option>
                <option v-for="item in Mueble.Categorias" :key="item">{{item}}</option>
            </select>
        </div>
        <div class="col-sm-4">
            <label>Familia</label>
            <select class="form-control" v-model="seleccion.Familia">
                <option value="">Todos</option>
                <option v-for="item in Mueble.Familia" :key="item">{{item}}</option>
            </select>
        </div>
        <div class="col-sm-4">
            <label>Talla</label>
            <select class="form-control" v-model="seleccion.Talla">
                <option value="">Todos</option>
                <option v-for="item in Mueble.Talla" :key="item">{{item}}</option>
            </select>
        </div>
        <div class="col-sm-4">
            <label>Color</label>
            <select class="form-control" v-model="seleccion.Color">
                <option value="">Todos</option>
                <option v-for="item in Mueble.Color" :key="item">{{item}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        name:'AreaFiltroMueble',
        props: ['Mueble','seleccion'],
    }
</script>
