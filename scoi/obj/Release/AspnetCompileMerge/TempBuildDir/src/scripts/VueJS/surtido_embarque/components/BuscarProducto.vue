
<template>
    <form class="form-group"
        style="width:210px;display:flex;justify-content:center;"
        v-on:submit.prevent="evBuscar">
        <label class="fa fa-shopping-cart" style="margin-left:20px;color:#0b41a3;font-size:37px;margin-left:10px" >  </label>
        <input type="text"
            class="form-control"
            placeholder="Codigo Producto ... "
            select="true"
            style="display:inline-block;text-align:right;padding:10px;color:white"
            id="entrada_codigo_producto"
            active
            autocomplete="off"
            v-model="producto.Codigo" />
    </form>
</template>

<script>
    const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
    const $URL_API = "/api/";
    const $URL_API_IZA = $MI_URL + ":180/api/";

    export default {
        name: 'buscar-productos',
        props: ['establecimiento',"obtener_seleccion"],
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
                        this.obtener_seleccion({
                            Codigo: producto.Codigo,
                            Descripcion: producto.Descripcion,
                            decimales: producto.Decimales,
                            Existencia : producto.Existencia_pz
                        });
                    })
                })
                .catch(err => console.error("Error=>", err)) 
            }
        }
    }
</script>

