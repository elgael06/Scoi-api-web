
<template>
    <div class="panel panel-default" style="margin-top:70px">

        <Controles v-bind:parametros="parametros"
                   v-bind:titulo="'Consulta Analisis Cambio De Precios'"
                   v-bind:estatus="this_Vigencia"
                   v-bind:cambio_vigencia="cambio_vigencia"
                   v-bind:consultar_pasillos="ConsultarAnalisis"
                   v-if="Analisis.Productos.length == 0" />
        <FiltroAnalisis v-else v-bind:parametros="Seleccion"
                        :regresar="regresar"
                        v-bind:Analisis="Analisis" />
        <VistaGuardados />
        <div class="panel-body" v-if="this.Analisis.Productos.length>0">
            <TablaProductos :guardadoProductos="guardadoProductos"
                            :producto="producto"
                            :productos="productos_filtrados" />
        </div>
    </div>
</template>

<script>
    import Controles from '../../PreciosCompetencia/Components/Controles';
    import FiltroAnalisis from './FiltrosAnalisis';
    import TablaProductos from './TablaProductos';
    import VistaGuardados from './VistaGuardados';

    const $URL_API = "/api/";

    export default {
        components: {
            Controles,
            FiltroAnalisis,
            TablaProductos,
            VistaGuardados
        },
        data() {
            return {
                producto:{
                    folio: ""
                },
                parametros: {
                    vigencia: "S",
                    fecha: "Enero",
                    anio: '2019'
                },
                Seleccion: {
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
                }
            }
        },
        created() {

        },
        methods: {
            regresar() {
                this.Analisis = {
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
                }
            },
            cambio_vigencia(tipo) {
                this.parametros.vigencia = tipo;
            },
            ConsultarAnalisis() {
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                let url = `${$URL_API}monitor_precio_competencia/ConsultaAnalisisPrecioProducto?mes=${this.parametros.fecha}&filtro=${this.parametros.vigencia}&anio=${this.parametros.anio}`;
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

                        this.Analisis = respuesta;
                        this.Analisis.Productos.map((e,i) => {
                            
                            try {
                                e.Volumen = e.Precios_volumen;
                                for ( let prec of  e.Volumen)
                                {
                                    prec.Precio_Venta_actual = prec.Precio_Venta;
                                }
                            }
                            catch (f) {
                            }
                            return e;
                        });

                        console.log("R : ",this.Analisis);

                        document.querySelector("#modal_de_efecto_carga").style.display = "none";

                    }).catch(e => {
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                        alert("Error Faltal")
                        console.log("R : ",this.Analisis);
                        console.error("ERRR : ",e);

                    }))
            },
            filtro_froducto(producto) {
                let { zona, Pasillo, Clase, Categoria, Familia, CanastaBasica, Color, Marca } = this.Seleccion;

                return (zona == "Todos" || producto.zona.search(zona)>-1) && (Pasillo == "Todos" || Pasillo == producto.Pasillo) &&
                    (Clase == "Todos" || producto.Clase.search( Clase )>-1) && (Categoria == "Todos" || producto.Categoria.search(Categoria)>-1) &&
                    (Familia == "Todos" || producto.Familia.search( Familia )>-1) && (CanastaBasica == "Todos" || CanastaBasica == producto.CanastaBasica) &&
                    (Color == "Todos" || Color == producto.Color) && (Marca == "Todos" || Marca == producto.Marca) && this.filtro_folio(producto.Codigo);

            },
            filtro_folio(folio) {
                return  this.producto.folio != "" ? folio.search(this.producto.folio) > -1 :true;
            },
            guardadoProductos() {
                let productos = this.Analisis.Productos.filter(prod => {
                    return prod.Estatus
                }).map(e => {
                    return {
                        codigo_producto: e.Codigo,
                        descripcion:'',
                        precio_venta: e.Precio_venta,
                        precio_venta_nuevo: e.Precio_venta_nvo,
                        margen_venta_actual: e.Margen,
                        margen_venta_familia: e.Margen_familia,
                        margen_venta_nuevo: e.Margen_nvo,
                        costo: e.Costo_promedio,
                        volumen: JSON.stringify(e.Volumen),
                        id_usuario:USUARIO.id_scoi
                    }
                });
                console.log("Cantidad De Productos A Guardar", productos.length);
                console.log("Productos A Guardar", productos);
                productos.length >0 ? this.conexionGuardado(productos) : alert("Sin Productos A Guardar");
            },
            conexionGuardado(productos) {
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                let url = `${$URL_API}CambioPrecios/Guardar`;
                fetch(url, {
                    method: 'post',
                    credentials: 'same-origin',
                    body:JSON.stringify(productos),
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
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                        for (let res of respuesta) {
                            alert(res);
                        }

                    }).catch(e => {
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                        alert("Error Faltal")
                        console.log("R : ",this.Analisis);
                        console.error("ERRR : ",e);

                    }))
            }
        },
        computed: {
            this_Vigencia() {
                return this.parametros.vigencia === "S";
            },
            productos_filtrados() {
                console.log("Filtro...")
                return this.Analisis.Productos.filter(this.filtro_froducto);
            }
        }
    }
</script>
