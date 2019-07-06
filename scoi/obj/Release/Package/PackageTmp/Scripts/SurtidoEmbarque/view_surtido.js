/**
     Acceso a la localStorange para obtener los productos y de esa forma editar el surtido de productos
**/

const viewSurtido = new Vue({
    el: "#captura_surtido_view",
    data() {
        return {
            seleccion: {
                folio: 0,
                descripcion: "",
                existencia: 0,
                cantidad: 0,
                pedido: 0,
                surtido: '',
                total: 0,
                operador: "+",
                punto: false,
            },
            Productos: [],
        }
    },
    created() {
        this.Productos = JSON.parse(localStorage.getItem("Embarque"));
    },
    updated() {
    },
    methods: {
        //eventos
        on_guardad_cambios(event) {
            if (this.cambio_parametros()) {
                this.cambio_cantidad();
                document.querySelector("#captura_surtido_view").style.display = "none";
                document.querySelector("#main").style.display = "";
                document.querySelector("#entrada_codigo_producto").disabled = false;
                document.querySelector("#entrada_codigo_producto").select();
                pedido.Embarque = JSON.parse(localStorage.getItem("Embarque"));
            }
            event.preventDefault();
        },
        handle_cambio_surtir() {
            let { surtido } = this.seleccion;
            this.seleccion.surtido = surtido.toString().length > 0 ? (parseFloat(surtido) < 10000 ? parseFloat(surtido) : 999) : '';
            this.seleccion.total = surtido.toString().length > 0 ? (this.seleccion.operador == "+" ?
                (parseFloat(this.seleccion.cantidad) + parseFloat(this.seleccion.surtido)) :
                (parseFloat(this.seleccion.cantidad) - parseFloat(this.seleccion.surtido)) ):
                parseFloat(this.seleccion.cantidad);
        },
        cambio_operador(operador) {
            this.seleccion.operador = operador;
            this.handle_cambio_surtir();
            document.querySelector("#entrada_codigo_producto_vista").select();
        },
        //Funciones
        cambio_parametros() {
            let state = false,
                { existencia,pedido,total} = this.seleccion;
            if (existencia >= total) 
                state = pedido >= total ? true : confirm(`! El Total Supera al Pedido por ${(total - pedido) } PZ ¡\n¿Continuar?`);
            else {
                alert("El Surtido Supera La Existencia!!!");
                document.querySelector("#entrada_codigo_producto_vista").select();
            }
            return state;
        },
        cambio_cantidad() {
            let { folio, total} = this.seleccion;
            let index_seleccion = this.Productos.findIndex(prod => prod.cod_prod == folio);
            if (index_seleccion > -1) {
                this.Productos[index_seleccion].embarque = total;
                this.cargarProductonLocalStorange();
            }
        },
        obtener_seleccion(producto) {
            this.Productos = JSON.parse(localStorage.getItem("Embarque"));
            let index_filtro = this.Productos.findIndex(e => parseInt(e.cod_prod) == parseInt(producto.Codigo));
            if (index_filtro > -1) {
                let filtro = this.Productos.find(e => e.cod_prod == producto.Codigo);
                this.seleccion = {
                    folio: producto.Codigo,
                    descripcion: filtro.descripcion,
                    existencia: producto.Existencia,
                    cantidad: filtro.embarque,
                    pedido: filtro.pedido,
                    surtido: "",
                    total: filtro.embarque,
                    operador: "+",
                    punto: producto.decimales != 0,
                };
                document.querySelector("#main").style.display = "none";
                document.querySelector("#captura_surtido_view").style.display = "";
                document.querySelector("#entrada_codigo_producto_vista").select();
            } else {
                alert(`El Producto\n Folio: ${producto.Codigo || "N/A"}.\n Descripcion: ${producto.Descripcion || "Desconocido"}.\n No Se Encuentra En El Embarque!!!`);
                document.querySelector("#entrada_codigo_producto").disabled = false;
                document.querySelector("#entrada_codigo_producto").select()
            }
        },
        cargarProductonLocalStorange() {
            localStorage.setItem("Embarque", JSON.stringify(this.Productos));
        },
    },
    computed: {
        icono_operador() {
            return {
                "fa fa-plus": this.seleccion.operador == "+",
                "fa fa-minus": this.seleccion.operador != "+"
            };
        }
    }
});