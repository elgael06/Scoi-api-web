
<template>
    <div class="modal" id="VistaDetalleOrden">
        <div class="panel panel-primary" style="max-width:950px">
            <div class="panel-heading">
                <i class="fa fa-close close" @click="cerrar"></i>
                <label>Orden Compra #{{ordenes.Seleccionada.Folio}}. </label>
            </div>
            <div class="panel-body">
                <div class="row">

                    <div class="col-sm-4 form-group-sm">
                        <label>Elaboro</label>
                        <i class="form-control">{{ordenes.Seleccionada.Detalle.Elaboro}}</i>
                    </div>
                    <div class="col-sm-4 form-group-sm">
                        <label>Surtio</label>
                        <i class="form-control">{{ordenes.Seleccionada.Detalle.Surtio}}</i>
                    </div>
                    <div class="col-sm-4 form-group-sm">
                        <label>Autorizo</label>
                        <i class="form-control">{{ordenes.Seleccionada.Detalle.Autorizo}}</i>
                    </div>
                    <div class="col-sm-4 form-group-sm">
                        <label>Recoge</label>
                        <i class="form-control">{{ordenes.Seleccionada.Detalle.Recoge}}</i>
                    </div>
                    <div class="col-sm-2 form-group-sm">
                        <label>Tipo Recoge</label>
                        <i class="form-control">{{ordenes.Seleccionada.Detalle.Tipo_recoge}}</i>
                    </div>
                    <div class="col-sm-3 form-group-sm">
                        <label>Tipo</label>
                        <i class="form-control">{{ordenes.Seleccionada.Tipo}}</i>
                    </div>
                    <div class="col-sm-3 form-group-sm">
                        <label>Fecha</label>
                        <i class="form-control">{{ordenes.Seleccionada.Fecha_mod}}</i>
                    </div>
                    <div class="col-sm-12 form-group-sm">
                        <label>Uso</label>
                        <textarea class="form-control" cols="5" style="resize:none">{{ordenes.Seleccionada.Detalle.Uso_mercancia}}</textarea>
                    </div>

                </div>
                <label>Productos: {{ordenes.Seleccionada.Productos.length}}</label>
                <div style="max-height:400px;overflow:auto;border:solid 2px #3498DB ;border-radius:5px;border-bottom-right-radius:0px">
                    <table class="table table-bordered table-condensed">
                        <thead>
                            <tr>
                                <th class="bg-blue">Codigo</th>
                                <th class="bg-blue">Descripcion</th>
                                <th class="bg-blue">Abreviatura</th>
                                <th class="bg-blue">Cantidad</th>
                                <th class="bg-blue">Costo</th>
                                <th class="bg-blue">Promedio</th>
                                <th class="bg-blue">Precio</th>
                                <th class="bg-blue">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in ordenes.Seleccionada.Productos" :key="item.Codigo">
                                <td>{{item.Codigo}}</td>
                                <td>{{item.Descripcion}}</td>
                                <td>{{item.Abrebiatura}}</td>
                                <td>{{item.Cantida}}</td>
                                <td style="text-align:right">
                                    <Moneda :cantidad="item.Ultimo_costo" />
                                </td>
                                <td style="text-align:right">
                                    <Moneda :cantidad="item.Costo_promedio" />
                                </td>
                                <td style="text-align:right">
                                    <Moneda :cantidad="item.Precio_venta" />
                                </td>
                                <td style="text-align:right">
                                    <Moneda :cantidad="item.Total" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style="color:#000;text-align:right; float:right;width:200px;border:solid 2px #3498DB ;border-bottom-right-radius:5px;border-bottom-left-radius:5px;border-top:none;padding:5px" 
                     class="form-group-sm form-inline" >
                    <label>Total :</label>
                    <Moneda :cantidad="total" />
                </div>
            </div>
            <div class="panel-footer" style="height:50px">
                <i class="fa fa-close btn btn-danger" @click="cerrar" style="float:right"> Cerrar</i>
            </div>
        </div>
    </div>
</template>

<script>
    import Moneda from '../../../ComponentesGlobales/Moneda';
    export default {
        name: 'VistaDetalleOrden',
        components: {
            Moneda
        },
        props: {
             ordenes: {
                Seleccionada: {
                     Folio: 0,
                    Fecha_mod:'',
                     Detalle: {
                        Autorizo: '',
                        Elaboro: '',
                        Id_recoge: '',
                        Recoge: '',
                        Solicito: '',
                        Surtio: '',
                        Tipo_recoge: '',
                        Tipo_solicitante:'',
                        Uso_mercancia: ''
                      },
                      Productos:[]
                 }
            },
        },
        methods: {
            cerrar() {
                document.querySelector("#VistaDetalleOrden").style.display = "none";
            }
        },
        computed: {
            total() {
                let t = 0;
                for (let p of this.ordenes.Seleccionada.Productos) {
                    t+=p.Total
                }
                return t;
            }
        }
    }
</script>
