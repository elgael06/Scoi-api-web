/**
 manejador de componente de vista embarque.
 */

const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = "/api/"
const $URL_API_IZA = $MI_URL + ":180/api/"

Vue.component('modal-filtro-embarque', {
    props: ['lista'],
    template: `
    <div class="ventana" id="ventana_filtro">
            <div class="paenl panel-default">
                <div class="panel-heading">
                    <i class="btn btn-danger fa fa-close" v-on:click="cerrar" style="float:right" ></i>
                    <h4>Productos</h4>
                </div>
                <div class="panel-body" style= "height:80%">
                    <strong>Lista </strong>
                    <i class="badge">{{lista.length}}</i>
                    <div style="height:100%;overflow:auto">
                        <table class="table">
                            <thead>
                                <tr id="cavecera_tabla_filtro">
                                    <th>Codigo</th>
                                    <th>Descripcion</th>
                                    <th>Embarque</th>
                                    <th>Pedido</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="filtro_productos" 
                                    v-for="e in lista" :key="e.cod_prod"
                                >
                                    <td>{{e.cod_prod}}</td>
                                    <td>{{e.descripcion}}</td>
                                    <td style="text-align:right">{{e.embarque}}</td>
                                    <td style="text-align:right">{{e.pedido}}</td>
                                    <td>
                                        <i class="btn btn-danger glyphicon glyphicon-trash" von-click="modificar(e.cod_prod)" ></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        modificar(cod_prod) {
            console.log("Codigo=>", cod_prod);
        },
        cerrar() {
            document.getElementById("ventana_filtro").style.display = "none";
            document.querySelector("#entrada_codigo_producto").select()
        }
    }
});

Vue.component("seleccion-modal", {
    props: ['total_pendiente', 'total_surtido','total_embarque'],
    template: `
    <div className="caja_contenedora_items">

        <div class="">
                <div class="form-group" style="width:70px;display:inline-block;">
                    
                    <i class="btn btn-sm btn-warning" v-on:click="evMostrar('P')" >Pendiente</i>
                    <div style="text-align:right" class="form-control">{{total_pendiente}}</div>
                </div>
                <div class="form-group" style="width:70px;display:inline-block;">
                   
            <i class="btn btn-sm btn-info" v-on:click="evMostrar('S')" >Surtido</i>
                    <div style="text-align:right" class="form-control">{{total_surtido}}</div>
                </div>
                <div class="form-group" style="width:70px;display:inline-block;">
                   
        <i class="btn btn-sm btn-primary"  v-on:click="evMostrar('E')" >Total</i>
                    <div style="text-align:right" class="form-control">{{total_embarque}}</div>
                </div>
            </div>
        <modal-filtro-embarque v-bind:lista="filtro"></modal-filtro-embarque>
    </div>
   
    `,
    data() {
        return {
            filtro: []
        }
    },
    methods: {
        //eventos
        evMostrar(filtro) {
            let datos = JSON.parse(localStorage.getItem("Embarque")) || [];
            this.filtro = (function () {
                var resultado = () => null;
                switch (filtro) {
                    case "P"://pendiente
                        resultado = pendiente => pendiente.embarque == 0;
                        break;
                    case "S"://surtido
                        resultado = surtido => surtido.embarque > 0;
                        break;
                    case "E"://embarque
                        resultado = embarque => embarque
                        break;
                }
                document.getElementById("ventana_filtro").style.display = "flex";
                return datos.filter(resultado);
            }());
            console.log("Tabla=>", this.filtro);

        }
        //funciones
    }
});

Vue.component('buscar-productos', {
    props:["establecimiento"],
    template: `
        <form class="form-group"
            style="width:190px;display:inline-block"
            v-on:submit.prevent="evBuscar">
            <label>Producto:</label>
            <input type="text"
                class="form-control"
                placeolder="Producto..."
                select="true"
                style="display:inline-block;text-align:right"
                id="entrada_codigo_producto"
                active
                autocomplete="off"
                v-model="producto.Codigo" />
       </form>
    `,
    data() {
        return {
            producto: {
                Codigo: ''
            }
        }
    },
    methods: {
        //evento
        evBuscar() {
            this.producto.Codigo ? this.obtener_producto()  :
                document.querySelector("#entrada_codigo_producto").select();
        },
        //funciones
        obtener_producto() {
            document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
            const folio = this.producto.Codigo.toString();
            document.querySelector("#entrada_codigo_producto").disabled = true;
            fetch(`${$URL_API}Productos_clasificador_por_folio?folio=${folio}&establecimineto=${this.establecimiento}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.establecimiento)
            })
            .then(e => {
                e.json().then(producto => {
                    this.producto = {
                        Codigo: "",
                    }
                    document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                    viewSurtido.obtener_seleccion({
                        Codigo: producto.Codigo,
                        Descripcion: producto.Descripcion,
                        decimales: producto.Decimales,
                        Existencia : producto.Existencia_pz
                    });
                    //this.codigo_producto(res)
                })
            })
            .catch(err => console.error("Error=>", err)) 
        }
    }
});

Vue.component('seleccion-pedido', {
    props: ['existe_pedido'],
    template: `
        <div class="panel panel-default" v-if="!existe_pedido">
            <div class="panel-heading">
                <label>Establecimientos.</label>
                <i class="fa fa-refresh btn btn-info" @click="ObtenerPedidos"> Cargar.</i>
                <select class="form-control" v-model="establecimiento" @change="ObtenerPedidos">
                    <option  v-for="est in establecimientos" :key="est.folio">{{ est.nombre }}</option>
                </select>
            </div>
            <div class="panel-body">
                <h4 v-if="!establecimiento">Seleccione Establecimiento...</h4>
                <div style="height:260px;overflow:auto">
                    <table class="table" v-if="establecimiento">
                        <thead>
                            <tr style="background:#2e6f9f;z-index:999">
                                <th style="color:azure;background:#2e6f9f">Folio</th>
                                <th style="color:azure;background:#2e6f9f">Solicita</th>
                                <th style="color:azure;background:#2e6f9f">Estado</th>
                                <th style="color:azure;background:#2e6f9f">Surte</th>
                            </tr>
                        </thead>
                        <tbody  v-for="pedido in pedidos" :key="pedido.folio">
                            <tr>
                                <td rowspan="1"> 
                                    <i class="btn btn-info fa fa-cogs btn-round "
                                        @click="on_pedido(pedido)"> {{pedido.Folio}}</i>
                                </td> 
                                <td>{{pedido.Establecimiento}}</td>
                                <td>{{pedido.Estatus_surtido}}</td>
                                <td>{{pedido.Alterno}}</td>                      
                            </tr>
                            <tr >
                                <td colspan="3">{{pedido.Usuario_capturo}}</td>
                                <td> <label>{{pedido.Elaboraccion}} </label></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
`,
    data() {
        return {
            establecimiento: "",
            establecimientos: [],
            pedidos:[]
        }
    },
    created() {
        this.ObtenerEstableciminetos();

    },
    methods: {
        //evento
        on_pedido(seleccion) {
            localStorage.setItem("Pedido", JSON.stringify(seleccion));
            pedido.Pedido = seleccion;
            this.ObtenerEnmbarque(seleccion.Folio);
        },
        //funcion
        ObtenerEstableciminetos() {
            fetch(`${$URL_API}Obtener_establecimientosBMS`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(e => {
                e.json().then(res => {
                    this.establecimientos = res;
                    document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                })
            })
            .catch(err => console.error(err));
        },
        ObtenerPedidos() {
            document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
            fetch(`${$URL_API}Obtener_establecimientosBMS`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.establecimiento.toString())
            })
            .then(e => {
                e.json().then(res => {
                    this.pedidos = res;
                    document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                })
            })
            .catch(err => console.error(err));
        },
        ObtenerEnmbarque(folio) {
            document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
            fetch(`${$URL_API}Pedido_productos_embarque?folio=${folio}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(e => {
                e.json().then(res => {
                    pedido.Embarque = res;
                    localStorage.setItem("Embarque", JSON.stringify(res));
                    document.querySelector("#entrada_codigo_producto").select()
                    document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                })
            })
            .catch(err => console.error(err));
        }
    }
});

const pedido = new Vue({
    el: "#main",
    data: {
        Pedido: JSON.parse(localStorage.getItem("Pedido")) || {},
        Embarque: JSON.parse(localStorage.getItem("Embarque")) || [],
    },
    created() {
        setTimeout(()=> document.querySelector("#entrada_codigo_producto").select(),100);
    },
    methods: {
        //eventos
        eliminar_embarque_localStorange() {
            let e = prompt("Escriba '1379' Para Confirmar Borrado!!!") || " ";
            if (e.toUpperCase() === '1379') {
                console.log(e.toUpperCase())
                if (confirm("Esta Seguro De Eliminar los Cambios De Embarque?")) {
                    localStorage.removeItem('Embarque');
                    localStorage.removeItem('Pedido');
                    this.Pedido = {};
                    this.Embarque = [];
                    return null;
                }
            }
            else
                alert("Eliminacion Cancelada!!!");
        },
        guardar_embarque() {
            guardar_embarque();
        }
        //funciones

    },
    computed: {
        total_pendiente() {
            return this.Embarque.filter(e => e.embarque == 0).length;
        },
        total_surtido() {
            return this.Embarque.filter(e => e.embarque > 0).length;
        },
        total_embarque() {
            return this.Embarque.length
        },
        existe_pedido() {
            return this.Pedido.Folio ? true : false;
        }
    }
});


if (location.protocol != "http:")
    location.protocol = "http:";

class Embarque {
    constructor() {
        this.folio_pedido = "";
        this.usuario = parseInt(USUARIO.id_scoi);//ID_SCOI
        this.productos = [];
        this.ContruirPedido();
    }
    ContruirPedido() {
        const $pedido = JSON.parse(localStorage["Pedido"]);
        this.productos = this.filtrarProductosEnCero();

        this.getFolio($pedido.Folio);
    }
    getFolio(folio) {
        this.folio_pedido = folio;
    }
    filtrarProductosEnCero() {
        const $lista = JSON.parse(localStorage["Embarque"]);
        return $lista.filter(surtido => surtido.embarque > 0);
    }
}

function guardar_embarque() {
    document.querySelector("#modal_de_efecto_carga").style.display = 'flex';
    const e = prompt("Escriba '1379' Para Confirmar!!!") || " ";
    if (e.toUpperCase() === '1379') {
        if (confirm("Esta Seguro De GUARDAR los Cambios De Embarque?")) {

            const value = new Embarque();
            const conexionBMS = (estatus) => {
                if (estatus) {
                    fetch(`${$URL_API_IZA}PedidoBms/EmbarqueBms`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(value)
                    })
                        .then(e => {
                            e.json().then(res => {
                                localStorage.removeItem('Embarque');
                                localStorage.removeItem('Pedido');
                                alert("Guardado..." + res);
                                document.querySelector("#modal_de_efecto_carga").style.display = 'none';
                            })
                        })
                        .catch(err => ErrorPedido());
                } else {
                    Alert("error Al Guardar!!!")
                }
            }
            if (value.productos.length > 0) {
                alert(`Guardar... \n${value.productos.length} Productos.`)
                //CONEXION BMS
                fetch(`${$URL_API_IZA}Pedido/Embarque`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                })
                    .then(e => {
                        e.json().then(res => conexionBMS(res))
                    })
                    .catch(err => ErrorPedido());
                return null;
            }
            else {
                alert("Sin Productos A Guardar...");
                document.querySelector("#modal_de_efecto_carga").style.display = 'none';
            }
        }
    } else {
        document.querySelector("#modal_de_efecto_carga").style.display = 'none';
        alert("GUARDADO CANCELADO!!!");
    }
}