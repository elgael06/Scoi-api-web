
<template>
    <div class="panel panel-default">
        <Controles v-bind:parametros="parametros"
                   v-bind:estatus="this_Vigencia"
                   v-bind:cambio_vigencia="cambio_vigencia"
                   v-bind:consultar_pasillos="consultar_pasillos" />
        <div class="panel-body" style="height:800px">
            <strong>Total Productos = {{total_productos}}</strong>
            <div class="container_table" v-if="total_productos>0">
                <TablaMonitor v-bind:pasillo_8020="pasillo_8020"
                              v-bind:pasillos="pasillos"
                              v-bind:acumulado="acumulado"
                              v-bind:on_mueble="on_mueble"
                              v-bind:on_producto="on_producto" />
            </div>
            <div v-else class="flex bg-danger" style="justify-content:center;padding:40px;height:120px;border-radius:10px">
                <h1 class="fa fa-info-circle"> Sin Productos a Mostrar...</h1>
            </div>
        </div>

        <ModalMueble v-bind:mueble="seleccion" v-bind:pasillo="pasillo" v-bind:acumulado="acumulado" />
        <ModalDetalleProducto v-bind:producto="seleccion_producto" />
    </div>
</template>

<script>
    import Controles from './Controles';
    import TablaMonitor from './TablaMonitor';
    import ModalMueble from './ModalMueble';
    import ModalDetalleProducto from './ModaDetalleProducto';

    const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
    const $URL_API = "/api/";


    export default {
        components: {
            Controles,
            TablaMonitor,
            ModalMueble,
            ModalDetalleProducto,
        },
        data() {
            return {
                parametros: {
                    vigencia: "S",
                    fecha: "Enero",
                    anio: '2019'
                },
                total_productos: 0,
                pasillos: [],
                pasillo_8020: {
                    "Productos": [],
                    "Pasillo": "8020",
                    "Cantidad": 0,
                    "Avance": 0,
                    "Diferencia": 0,
                    "Acumulado": 0
                },
                pasillo: '',
                seleccion: {

                },
                seleccion_producto: {
                    Detalles: {
                        Categoria: "",
                        Clase: "",
                        Color: "",
                        Costo_promedio: 0,
                        Familia: "",
                        Margen: 0,
                        Margen_familia: 0,
                        Talla: "",
                        Ultimo_costo: 0,
                        Venta_90_dias: 0,
                    },
                    Codigo: '',
                    Detalles: '',
                    Estado: '',
                    Fecha: '',
                    Precio: {
                        Izagar: {
                            Normal: 0,
                            Oferta: 0
                        },
                        Bodart: {
                            Normal: 0,
                            Oferta: 0
                        },
                        Ley: {
                            Normal: 0,
                            Oferta: 0
                        },
                        Lopez: {
                            Normal: 0,
                            Oferta: 0
                        },
                        Mesquitillo: {
                            Normal: 0,
                            Oferta: 0
                        },
                        Soriana: {
                            Normal: 0,
                            Oferta: 0
                        },
                        Teresita: {
                            Normal: 0,
                            Oferta: 0
                        },
                    },
                    Tipo: '',
                }
            }
    },
        methods: {
        //eventos
            on_mueble(pasillo, mueble) {
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';

                setTimeout(e => {
                   let p1 = new Promise(resolve => this.cambio_pasillo_mueble(pasillo, mueble, resolve));
                    p1.then(function (r) {
                        console.log("Cierra Modal...");
                        document.querySelector("#modal_mueble").style.display = "flex";
                        document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                        console.log(r);
                    }).catch(function () {
                        alert("Error Al Carcar Modal!!!");
                        document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                    });
                }, 100);

            },
            on_producto(seleccion) {
                console.log('seleccion: ', seleccion);
                this.seleccion_producto = seleccion;
                document.querySelector("#modal_producto").style.display = "flex";
            },
            cambio_pasillo_mueble(pasillo, mueble, resolve) {
                console.log("Activa Modal...");
                this.seleccion = mueble;
                this.pasillo = pasillo;
                console.log('Seleccion =>', this.seleccion);
                console.log('Pasillo =>', this.pasillo);
                resolve('Success!');
            },
            cambio_vigencia(tipo) {
                this.parametros.vigencia = tipo;
                this.reset_datos();
            },
            consultar_pasillos() {
                console.log("Obtener pasillos...");
                this.reset_datos();
                this.Obtener_pasillos();
            },
        //funciones
            reset_datos() {
                console.log("Reset Datos..");
                this.pasillos = [];
                this.muebles = [];
                this.productos = [];
                this.seleccion = {
                };
                this.pasillo_8020 = {
                    "Productos": [],
                    "Pasillo": "8020",
                    "Cantidad": 0,
                    "Avance": 0,
                    "Diferencia": 0,
                    "Acumulado": 0
                },
                    this.seleccion_producto = {
                        Detalles: {
                            Categoria: "",
                            Clase: "",
                            Color: "",
                            Costo_promedio: 0,
                            Familia: "",
                            Margen: 0,
                            Margen_familia: 0,
                            Talla: "",
                            Ultimo_costo: 0,
                            Venta_90_dias: 0,
                        },
                        Codigo: '',
                        Detalles: '',
                        Estado: '',
                        Fecha: '',
                        Precio: {
                            Izagar: {
                                Normal: 0,
                                Oferta: 0
                            },
                            Bodart: {
                                Normal: 0,
                                Oferta: 0
                            },
                            Ley: {
                                Normal: 0,
                                Oferta: 0
                            },
                            Lopez: {
                                Normal: 0,
                                Oferta: 0
                            },
                            Mesquitillo: {
                                Normal: 0,
                                Oferta: 0
                            },
                            Soriana: {
                                Normal: 0,
                                Oferta: 0
                            },
                            Teresita: {
                                Normal: 0,
                                Oferta: 0
                            },
                        },
                        Tipo: '',
                    }
            },
            acumulado(total) {
                let acumulado = total * 10000;
                acumulado = Math.round(acumulado);
                return (acumulado/100 )+ "%";
            },
        //conexiones
            Obtener_pasillos() {
                console.log("Consultando...");
                document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
                fetch(`${$URL_API}monitor_precio_competencia?mes=${this.parametros.fecha}&filtro=${this.parametros.vigencia}&anio=${this.parametros.anio}`, {
                    method: 'post',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .catch(err => {
                        console.error("Error=>", err);
                        alert("fallo En La Consulta!!!");
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                    })
                    .then(res => res.json().then(lista => {
                        console.log("Consulta Finalizada...");
                        console.log(lista);
                        this.total_productos = lista.Total_productos;
                        this.pasillo_8020 = lista.pasillo_8020;
                        this.pasillos = lista.pasillos.sort((e,f) => {
                            return e.Pasillo > f.Pasillo ? 1 : -1;
                        });
                        document.querySelector("#modal_de_efecto_carga").style.display = "none";
                    }))
            }
        },
        computed: {
            this_Vigencia() {
                return this.parametros.vigencia === "S";
            },
        }
    }
</script>

