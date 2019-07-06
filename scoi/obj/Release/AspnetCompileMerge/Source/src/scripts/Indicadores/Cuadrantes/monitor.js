

const parametros_cavecera = new Vue({
    el: "#modal_principal",
    data: {
        fechas: {
            "Lunes": '',
            "Domingo": '',
            "Semana": "18",
            "Anio": "2019"
        },
        establecimiento: "Todos",
        menu:0,
        Lista_cuadrantes:[]
    },
    created() {
        console.log("Funciona...");
        this.fechas.Lunes = this.asignar_fecha;
        this.fechas.Domingo = this.asignar_fecha;
        this.Obtener_fechas();
    },
    updated() {
        console.log("Cambio...");
    },
    methods: {
        //Eventos
        on_fecha() {
            this.comprobar_fechas ? this.Obtener_fechas() : alert("Coloque La Fecha!!!");
        },
        on_cargar_cuadrantes() {
            console.log("Cargar Cuadrantes...");
            this.Lista_cuadrantes = [];
            this.Obtener_cuadrantes(this.fechas);
        },
        //Funciones
        invertir_fecha(fecha) {
            let a = fecha.split("/")
            return a[2] + "-" + a[1] + "-" + a[0];
        },
        formato_fecha(fecha) {
            let a = fecha.split("-")
            return a[2] + "-" + a[1] + "-" + a[0];
        },
        //Conexiones
        Obtener_fechas() {
            fetch(`/Globales/Semana_actual?fecha=${this.formato_fecha(this.fechas.Lunes)}`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(err => console.error("Error=>", err))
            .then(res => res.json().then(res => {
                this.fechas = {
                    "Lunes": this.invertir_fecha(res.Lunes),
                    "Domingo": this.invertir_fecha(res.Domingo),
                    "Semana": res.Semana,
                    "Anio": res.Anio
                }
                this.Obtener_cuadrantes(this.fechas);
            }))
        },
        Obtener_cuadrantes({ Lunes, Domingo}) {
            
            fetch(`Cuadrantes_reporte_para_monitor_general?fi=${this.formato_fecha(Lunes)}&ff=${this.formato_fecha(Domingo)}&establecimiento=${this.establecimiento}`, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error("Error=>", err))
                .then(res => res.json().then(res => {
                    console.log("respuesta=>", res);
                    this.Lista_cuadrantes = res.cuadrantes;
                }))
        }
    },
    computed: {
        asignar_fecha() {
           let dia = new Date(), d = dia.getDate(), m = dia.getMonth(), a = dia.getFullYear();
            m = m < 10 ? "0" + (m + 1) : m + 1 ;
            d = (d < 10) ? "0" + d: d;
            console.log("Fecha:",`${a}-${m}-${d}`);
            return `${a}-${m}-${d}`;
        },
        comprobar_fechas() {
            return this.fechas.Lunes != "" && this.fechas.Domingo != "";
        },
        obtener_establecimientos() {

            const obtener_promedios = (lista) => {
                let r_si = lista.filter(e => e.valor_respuesta === 1).length,
                r_no = lista.filter(e => e.valor_respuesta === 0).length; 

                console.log("si =>"+r_si+", No=>"+r_no);

                let res = (r_si / (r_si + r_no)) ? function () {
                    let r = (r_si / (r_si + r_no)) * 1000;
                    return (Math.round(r) / 10)+" %" ;
                }() : r_si===0 ?'0%' : "--%";
                console.log("res=>" + res);
                return res;
            }

            let lista = [];
            for (establecimiento of this.Lista_cuadrantes)
            {
                if (lista.findIndex(e => e.establecimiento === establecimiento.establecimiento) === -1)
                {
                    let filtro = this.Lista_cuadrantes.filter(e => e.establecimiento === establecimiento.establecimiento);
                    lista.push({
                        folio:           establecimiento.folio_establecimiento,
                        establecimiento: establecimiento.establecimiento,
                        generales:       obtener_promedios(filtro.filter(e => e.aspecto===  'Generales')),
                        senializaciones: obtener_promedios(filtro.filter(e => e.aspecto === 'Señalizaciones')),
                        surtido:         obtener_promedios(filtro.filter(e => e.aspecto === 'Surtido')),
                        caducados:       obtener_promedios(filtro.filter(e => e.aspecto === 'Caducidades')),
                        limpieza:        obtener_promedios(filtro.filter(e => e.aspecto === 'Limpieza')),
                        promedio:        obtener_promedios(filtro),
                        departamentos:         filtro
                    });
                }
            };
            return lista;
        }
    }
});

Vue.component('Establecimientos', {
    props: ["establecimiento"],
    props:["lista"],
    template: `
    <table class="table">
        <thead>
            <tr class="bg-blue">
                <th ><i class="fa fa-home"></i> ELDORADO</th>
                <th style="text-align:center">GENERALES</th>
                <th style="text-align:center">SEÑALIZACION</th>
                <th style="text-align:center">SURTIDO</th>
                <th style="text-align:center">CADUCIDAD</th>
                <th style="text-align:center">LIMPIEZA</th>
                <th style="text-align:center">PROMEDIO</th>
            </tr>
        </thead>
        <tbody>
           <tr v-for="dato in lista" :key="dato.folio" style="text-align:right">
                <td  style="text-align:left">{{dato.establecimiento}}</td>
                <td>{{dato.generales}}</td>
                <td>{{dato.senializaciones}}</td>
                <td>{{dato.surtido}}</td>
                <td>{{dato.caducados}}</td>
                <td>{{dato.limpieza}}</td>
                <td>{{dato.promedio}}</td>
            </tr>
        </tbody>
    </table>
    `,
    methods: {
    //eventos

    //funciones
    }
})