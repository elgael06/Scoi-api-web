
/***
 monitor De Precios Competencia... 
 ***/
let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "/api/";

Vue.component('control-monitor', {
    props: ['estatus','parametros', 'cambio_vigencia','consultar_pasillos'],
    template: `#control_monitor`,
    computed: {
        btn_existencia() {
            return this.estatus ? "btn btn-primary" : "btn btn-primary  btn_existencia";
        },
        btn_no_existencia() {
            return !this.estatus ? "btn btn-danger" : "btn btn-danger btn_no_existencia";
        }
    }
});

Vue.component('tabla-producto', {
    props: ['mueble','on_producto'],
    template: `#tabla_producto`,
    methods: {
        comprobar(estado) {
            return estado ? "Revisado" : "Pendiente";
        }
    }
});

Vue.component("productos-8020", {
    props: ["pasillo_8020", 'acumulado', 'on_producto'],
    template: `<tbody>
        <tr class="bg-green">
            <td class="descripcion_tabla_ch" style="text-align:center;width:50px">
                <i :class="btn_togle" @click="toggle"></i>
            </td>
            <td class="descripcion_tabla">{{pasillo_8020.Pasillo}}</td>
            <td class="descripcion_tabla_ch">{{pasillo_8020.Cantidad}}</td>
            <td class="descripcion_tabla_ch">{{pasillo_8020.Avance}}</td>
            <td class="descripcion_tabla_ch">{{pasillo_8020.Diferencia}}</td>
            <td class="descripcion_tabla_ch">{{acumulado(pasillo_8020.Acumulado)}}</td>
        </tr>
        <tr :class="is_visible">
            <td colspan="6" style="max-height:400px;overflow:auto">
                <tabla-producto v-bind:mueble="pasillo_8020"
                                v-if="pasillo_8020"
                                v-bind:on_producto="on_producto" />
            </td>
        </tr>
    </tbody>`,
    data() {
        return {
            visible: false,
        }
    },
    methods: {
        toggle() {
            this.visible = !this.visible; 
        }
    },
    computed: {
        is_visible() {
            return this.visible ? "" : "celda_oculta";
        },
        btn_togle() {
            return this.visible ? 'fa fa-minus' : 'fa fa-plus';            
        }
    }
});

Vue.component('mueble-tabla', {
    props: ['on_mueble', 'acumulado', 'on_producto','pasillo'],
    template: `
 <table class="table table-bordered">
    <thead>
        <tr class="bg-warning">
            <th colspan="3">Mueble</th>
            <th>Cantidad</th>
            <th>Avance</th>
            <th>Diferencia</th>
            <th>Acumulado</th>
        </tr>
    </thead>
    <posicion-mueble v-for="mueble in pasillo.Muebles" :key="pasillo.Pasillo+'_'+mueble.Mueble" v-bind:mueble="mueble" v-bind:acumulado="acumulado" v-bind:on_mueble="on_mueble" v-bind:on_producto="on_producto" v-bind:pasillo="pasillo.Pasillo" ></posicion-mueble>
</table>`,
});
Vue.component('posicion-mueble', {
    props: ['mueble', 'acumulado', 'on_producto','on_mueble', 'pasillo'],
    template: `
    <tbody style="color:black">
        <tr :key="mueble.Mueble" style="color:black" class="bg-success">
            <td class="descripcion_tabla_ch" style="text-align:center;width:50px">
                <i :class="btn_togle" @click="toggle"></i>
            </td>
            <td style="width:30px">
                <i class="fa fa-share-square-o btn btn-info btn-round" v-on:click="on_mueble(pasillo,mueble)"></i>
            </td>
            <td class="descripcion_tabla">{{mueble.Mueble}}</td>
            <td class="descripcion_tabla_ch">{{mueble.Cantidad}}</td>
            <td class="descripcion_tabla_ch">{{mueble.Avance}}</td>
            <td class="descripcion_tabla_ch">{{mueble.Diferencia}}</td>
            <td class="descripcion_tabla_ch">{{acumulado(mueble.Acumulado)}}</td>
        </tr>
        <tr :class="is_visible">
             <td colspan="7" style="max-height:400px;overflow:auto">
                <tabla-producto v-bind:mueble="mueble"
                                    v-bind:on_producto="on_producto" />
            </td>
        </tr>
    </body>
    `,
    data() {
        return {
            visible: false,
        }
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
        }
    },
    computed: {
        is_visible() {
            return this.visible ? "" : "celda_oculta";
        },
        btn_togle() {
            return this.visible ? 'fa fa-minus' : 'fa fa-plus';
        }
    }
});

Vue.component('pasillos-tabla', {
    props: ['pasillo', 'acumulado', 'on_producto','on_mueble'],
    template:`
    <tbody style="color:black" class="success">
        <tr class="productos bg-info">
            <td class="descripcion_tabla_ch" style="text-align:center;width:50px">
                <i :class="btn_togle" @click="toggle"></i>
            </td>
            <td class="descripcion_tabla">{{pasillo.Pasillo}}</td>
            <td class="descripcion_tabla_ch">{{pasillo.Cantidad}}</td>
            <td class="descripcion_tabla_ch">{{pasillo.Avance}}</td>
            <td class="descripcion_tabla_ch">{{pasillo.Diferencia}}</td>
            <td class="descripcion_tabla_ch">{{acumulado(pasillo.Acumulado)}}</td>
        </tr>
         <tr :class="is_visible">
            <td colspan="6">
                <mueble-tabla v-bind:pasillo="pasillo" v-bind:acumulado="acumulado" v-bind:on_mueble="on_mueble" v-bind:on_producto="on_producto"></mueble-tabla>
            </td>
        </tr>
    </tbody>`,
    data() {
        return {
            visible: false,
        }
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
        }
    },
    computed: {
        is_visible() {
            return this.visible ? "" : "celda_oculta";
        },
        btn_togle() {
            return this.visible ? 'fa fa-minus' : 'fa fa-plus';
        }
    }
});

Vue.component('tabla-monitor', {
    props: ['pasillo_8020', 'pasillos', 'acumulado', 'on_mueble','on_producto'],
    template: `    
    <table class="table table-bordered">
        <thead>
            <tr class="bg-blue">
                <th colspan="2">Pasillo</th>
                <th>Cantidad</th>
                <th>Avance</th>
                <th>Diferencia</th>
                <th>Acumulado</th>
            </tr>
        </thead>
        <productos-8020 v-bind:pasillo_8020="pasillo_8020" v-bind:acumulado="acumulado" v-bind:on_producto="on_producto" ></productos-8020>
        <pasillos-tabla v-for="pasillo in pasillos" :key="pasillo.Pasillo+'_p'" v-bind:on_mueble="on_mueble" v-bind:pasillo="pasillo" v-bind:acumulado="acumulado" v-bind:on_producto="on_producto" ></pasillos-tabla>
    </table>`,
    methods: {
        toggle( clase ) {
            let productos = document.querySelectorAll(`.${clase}`);

            if (productos[0].style.display == "none")
                for (fila of productos) {
                    let clase2 = clase.split(" ");

                }
            else {

            }
        },
    },
    computed: {
    }
});

Vue.component('detalles-productos', {
    props: ['producto'],
    template: `#detalles_productos`
});

Vue.component('modal-detalle-producto',{
    props: ['producto'],
    template: `#modal_detalle_producto`,
    methods: {
        cerrar() {
            document.querySelector("#modal_producto").style.display = "none";
        },
    },
});

Vue.component('area-filtro-productos-mueble', {
    props: ['Mueble','seleccion'],
    template: `#area_filtro_productos_mueble`,  
});

Vue.component('modal-mueble', {
    props: ['pasillo','mueble','acumulado'],
    template: `#modal_mueble`,
    data() {
        return {
            seleccion: {
                Clases:"",
                Categorias: "",
                Familia: "",
                Talla: "",
                Color: "",
            }
        }
    },
    methods: {
        filtrar(Detalles) {
            try {
                let { Categorias, Clases, Color, Talla, Familia } = this.seleccion;
                return Detalles.Clase.search(Clases) > -1 &&
                    Detalles.Categoria.search(Categorias) > -1 &&
                    Detalles.Familia.search(Familia) > -1 &&
                    Detalles.Talla.search(Talla) > -1 &&
                    Detalles.Color.search(Color) > -1;
            }
            catch (err) {
                console.log("Fallo", err);
                return true;
            }
        },
        cerrar() {
            this.seleccion = {
                Clases: "",
                Categorias: "",
                Familia: "",
                Talla: "",
                Color: "",
            };
            document.querySelector("#modal_mueble").style.display = "none";
        }
    },
    computed: {
    }
});

const root = new Vue({
    el: "#root",
    data: {
        parametros: {
            vigencia: "S",
            fecha: "",
            anio:'2019'
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
                Bodart:{
                    Normal: 0,
                    Oferta: 0
                },
                Ley:{
                    Normal: 0,
                    Oferta: 0
                    },
                Lopez:{
                    Normal: 0,
                    Oferta: 0
                    },
                Mesquitillo:{
                    Normal: 0,
                    Oferta: 0
                    },
                Soriana:{
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
    created(){
       
    },
    updated(){

    },
    methods: {
    //eventos
        on_mueble(pasillo, mueble) {
            document.querySelector("#modal_de_efecto_carga").style.display = 'flex';

            setTimeout(e => {
                p1 = new Promise(resolve => this.cambio_pasillo_mueble(pasillo, mueble, resolve));
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
});
