
<template>
    <div>
        <i class="btn btn-primary fa fa-list-alt" @click="abrir"> Mostrar Guardados</i>
        <div class="modal" id="modal_guardado">

            <div class="panel panel-default" style="max-width:95%">
                <div class="panel-heading">
                    <i class="fa fa-close close" @click="cerrar"></i>
                    <label>Cambios De Precios</label>
                </div>
                <div class="panel-body">
                    <form class="form-group-sm form-inline" @submit.prevent="consultar" >
                        <label>Folio :</label>
                        <input type="number" class="form-control" style="width:171px;text-align:right" v-if="cuadroFolio" v-model="folio" />
                        <i v-else class="form-control" style="width:171px;text-align:right">{{folio}}</i>

                        <i class="btn btn-default fa fa-search btn-round" v-if="cuadroFolio" @click="obtenerFolio"></i>
                    </form>

                    <div v-if="checarPrductos" style="max-height:550px;overflow:auto;border:#c2c4c4 solid 1px;border-radius:5px;margin-top:20px">
                        <table class="table table-condensed" id="tabla_productos_guardados">
                            <thead>
                                <tr>
                                    <th style="background:#0094ff;color:#FFF">Codigo</th>
                                    <th style="background:#0094ff;color:#FFF">Descripcion</th>
                                    <th style="background:#0094ff;color:#FFF">Costo</th>
                                    <th style="background:#0094ff;color:#FFF">Margen Familia</th>
                                    <th style="background:#0094ff;color:#FFF">Margen Actual</th>
                                    <th style="background:#0094ff;color:#FFF">Margen Nuevo</th>
                                    <th style="background:#0094ff;color:#FFF">Precio Venta</th>
                                    <th style="background:#0094ff;color:#FFF">Precio Venta Nuevo</th>
                                    <th style="background:#0094ff;color:#FFF">volumen Llevando</th>
                                    <th style="background:#0094ff;color:#FFF">volumen Precio Actual </th>
                                    <th style="background:#0094ff;color:#FFF">volumen Precio Nuevo</th>
                                    <th style="background:#0094ff;color:#FFF">volumen(2) Llevando</th>
                                    <th style="background:#0094ff;color:#FFF">volumen(2) Precio Actual </th>
                                    <th style="background:#0094ff;color:#FFF">volumen(2) Precio Nuevo</th>
                                </tr>
                            </thead>
                            <ProductoGuardado v-for="item in productos" :producto="item" :key="item.codigo_producto" />
                        </table>
                    </div>
                    <div v-if="cuadroFolio && folios">
                        <div style="max-height:550px;overflow:auto;border:#c2c4c4 solid 1px;border-radius:5px;margin-top:20px">
                            <table class="table">
                                <thead>
                                    <tr class="bg-primary">
                                        <th><i :class="claseIndicadorOrden('folio')" @click="ordenarFolio('folio')"> </i> Folio</th>
                                        <th><i :class="claseIndicadorOrden('nombre')" @click="ordenarFolio('nombre')"> </i> Usuario</th>
                                        <th colspan="2"><i :class="claseIndicadorOrden('fecha')" @click="ordenarFolio('fecha')"> </i> Fecha</th>
                                    </tr>
                                </thead>
                                <tbody v-for="item in listaFolios" :key="item.Folio">
                                    <tr>
                                        <td>{{item.Folio}}</td>
                                        <td>{{item.Empleado}}</td>
                                        <td>{{item.Fecha}}</td>
                                        <td><i class="btn btn-primary fa fa-send" @click="obtenerConsulta(item.Folio)"></i></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel-footer" style="height:50px">
                    <i class="btn btn-success fa fa-file-excel-o" v-if="checarPrductos" @click="exportar"> Exportar Excel.</i>
                    <i class="btn btn-danger fa fa-close" style="float:right" @click="cerrar"> Cerrar.</i>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductoGuardado from './ProductoGuardado';
    import ExportToExcel from '../../../../Globales/ExportarExcel';
    
    const $URL_API = "/api/";

    export default {
        name: 'VistaGuardados',
        components: {
            ProductoGuardado
        },
        data() {
            return {
                folio: '',
                productos: [],
                listaFolios: [],
                ordenFolios: {
                    folio: 0,
                    nombre: 0,
                    fecha:0
                }
            }
        },
        methods: {
            cerrar() {
                document.querySelector("#modal_guardado").style.display = "none";
                this.folio= '';
                this.productos = []
                this.listaFolios = []
                this.ordenFolios={
                    folio: 0,
                    nombre: 0,
                    fecha:0
                }
            },
            abrir() {
                document.querySelector("#modal_guardado").style.display = "flex";
            },
            exportar() {
                ExportToExcel("tabla_productos_guardados","tabla_productos_guardados_folio_"+this.folio);
            },
            consultar() {
                console.log("Folio=", this.folio);
                this.folio == ""|| this.obtenerConsulta(this.folio);
            },
            llenarProductos(respuesta) {
                console.log(respuesta)
                this.productos = respuesta;
                this.listaFolios =[]
            },
            llenarFolios(respuesta) {
                console.log(respuesta)
                this.listaFolios = respuesta;
            },
            obtenerConsulta(folio) {
                this.folio = folio;
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                let url = `${$URL_API}CambioPrecios/Consultar?folio=${folio}`;
                fetch(url, {
                    method: 'get',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).catch(err => {
                        console.error("Error=>", err);
                        alert("fallo En La Consulta!!!");
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                }).then(res =>
                    res.json().then(respuesta => {
                        console.log("Consulta Finalizada...");
                        respuesta.length > 0 ? this.llenarProductos(respuesta) : alert("Sin datos A Mostrar");
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";

                    }).catch(e => {
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                        alert("Error Faltal\n"+e.toString())
                        console.error("ERRR : ",e);

                    }))
            },            
            obtenerFolio() {
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                let url = `${$URL_API}CambioPrecios/FolioCambioPrecio`;
                fetch(url, {
                    method: 'get',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).catch(err => {
                        console.error("Error=>", err);
                        alert("fallo En La Consulta!!!");
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                }).then(res =>
                    res.json().then(respuesta => {
                        console.log("Consulta Finalizada...");
                        respuesta.length > 0 ? this.llenarFolios(respuesta) : alert("Sin datos A Mostrar");
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";

                    }).catch(e => {
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                        alert("Error Faltal\n"+e.toString())
                        console.error("ERRR : ",e);

                    }))
            },
            ordenarFolio(clase) {
                console.log("Orden : ",clase)
                this.ordenFolios[`\"${clase}\"`] = this.ordenFolios[`\"${clase}\"`] == 0 ? 1 : 0;
                let folio  = this.ordenFolios[`\"${clase}\"`];
                this.listaFolios.sort((a, b) => {
                    if (folio == 0) {
                        return a[`\"${clase}\"`] > b[`\"${clase}\"`] ? 1 : -1;
                    } else {                    
                        return a[`\"${clase}\"`] < b[`\"${clase}\"`]  ? 1 : -1;
                    }
                })

            },
            claseIndicadorOrden(clase) {
                return this.ordenFolios[clase]==0 ? "fa fa-caret-square-o-down" : "fa fa-caret-square-o-up";
            }
        },
        computed: {
            checarPrductos() {
                return this.productos.length>0;
            },
            cuadroFolio() {
                return !this.checarPrductos;
            },
            folios() {
                return this.listaFolios.length > 0;
            }
        }
    }
</script>
