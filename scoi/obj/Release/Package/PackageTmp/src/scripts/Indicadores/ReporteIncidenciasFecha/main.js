
let $MI_URL = `${window.location.protocol}//${window.location.hostname}`,
    $URL_MVC = "/Globales/",
    $URL_API = "/api/";

const cavecera_parametros = new Vue({
    el: "#main",
    data: {
        inicio: "",
        fin: "",
        filtro: "",
        reporte: []
    },
    created: function () {
        console.log("Funciona...");
    },
    updated: function () {
        
    },
    methods: {
        ObtenerReporteIncidenciasFecha: function () {
            fetch(`ObtenerReporteIncidenciasFecha?inicio=${this.pase_fecha(this.inicio)}&termino=${this.pase_fecha(this.fin)}`, {
                method: 'get',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(lista => {
                    this.reporte = lista;
                }))
        },
        pase_fecha: function (fecha) {
            let f = fecha.split("-");
            return `${f[2]}-${f[1]}-${f[0]}`
        },
        filtrado_resultados: function ({ Folio, Nombre }) {
            const f = this.filtro.toUpperCase();
            return (Folio.toString().toUpperCase().search(f) > -1) || (Nombre.toString().toUpperCase().search(f) > -1);
        }
    },
    computed: {
        verificar_fechas: function () {
            if (this.inicio == "" || this.fin == "") {
                this.reporte = [];
            }

            return this.inicio == "" || this.fin == "";
        }
    }
});
