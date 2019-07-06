

<template>
    <div style="height:90%;overflow:auto">
        <table class="table table-bordered">
            <thead class="bg-blue">
                <tr>
                    <th>ID</th>
                    <th colspan="3">AUTORIZO</th>
                    <th>PUESTO</th>
                    <th>FECHA</th>
                    <th>ACCION</th>
                </tr>
            </thead>
            <tbody v-for="item in pedidos">
                <tr class="bg-info">
                    <td>{{item.Folio}}</td>
                    <td colspan="3">{{item.Usuario_autorizo}}</td>
                    <td>{{item.Puesto}}</td>
                    <td>{{item.Fecha}}</td>
                    <td rowspan="3" class="bg-info"> 
                        <i class="btn btn-default fa fa-list-ul" style="font-size:20px" @click="Seleccion_Pedido(item)"></i>
                    </td>
                </tr>
                <tr class="bg-warning">
                    <td>Folio</td>
                    <td>Usuario Capturo</td>
                    <td>Alterno</td>
                    <td>Establecimiento</td>
                    <td>Estatus Surtido</td>
                    <td>Elaboraccion</td>
                </tr>
                <tr>
                    <td>{{item.Pedido.Folio}}</td>
                    <td>{{item.Pedido.Usuario_capturo}}</td>
                    <td>{{item.Pedido.Alterno}}</td>
                    <td>{{item.Pedido.Establecimiento}}</td>
                    <td>{{item.Pedido.Estatus_surtido}}</td>
                    <td>{{item.Pedido.Elaboraccion}}</td>
                </tr>
                <tr><td colspan="6"></td></tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'TablaPedidos',
        props: ['pedidos','Seleccion_Pedido'],
    }
</script>

