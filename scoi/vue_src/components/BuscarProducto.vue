
<template>
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
</template>


<script>
    export default {
        props: ["establecimiento"],
        name:'BuscarProducto',
        data() {
            return {
                producto: {
                    Codigo: ''
                }
            }
        },
        created() {
            console.log("Buscar...")
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
    }
</script>


