
<template>
    <tbody>
        <tr>
            <td>{{producto.Folio}}</td>
            <td>{{producto.Tipo}}</td>
            <td>{{producto.Estatus}}</td>
            <td>{{producto.Fecha_mod}}</td>
            <td>{{producto.Folio_BMS}}</td>
            <td>{{producto.Folio_servicio}}</td>
            <td>{{producto.Establecimiento_solicita}}</td>
            <td>{{producto.Establecimiento_surte}}</td>
            <td>{{producto.Mes}}</td>
            <td>{{producto.Semana_anio}}</td>
            <td>{{producto.Anio}}</td>
            <td>
                <i class="fa fa-info btn btn-success" @click="detalle(producto)"></i>
            </td>
        </tr>
    </tbody>
</template>

<script>
    export default {
        name: 'OrdenCompra',
        props:['producto','detalle']
    }
</script>

