/**
 * Muestra Los Pagos Dentro De Una Semana Por Order De Pago.
 * 
 **/
Vue.component('tabla_detalles',{
        props: ["detalles"],
    template: `<table class="table">
     <thead>
        <tr class="info">
            <td>folio de pago </td>
            <td>folio orden de gasto </td>
            <td>forma de pago </td>
            <td>cantidad </td>
            <td>observaciones </td>
            <td>fecha pago </td>
            <td>numero de cuenta </td>
            <td>nombre de cuenta </td>
            <td>tipo beneficiario </td>
            <td>recibe pago</td>
            <td>tipo movimiento estado de resultados </td>
            <td>tipo proveedor </td>
            <td>solicito </td>
            <td>autorizo </td>
            <td>nombre realizo pago </td>
        </tr>
    </thead>
    <tbody>
        <lista_mostrar_pagos v-for="item in detalles" v-bind:dato="item" :key="item.folio_de_pago"></lista_mostrar_pagos>
    </tbody>
</table>`
    }
);

Vue.component('lista_mostrar_pagos', {
    props: ['dato'],
    template: `<tr>
                <td>{{ dato.folio_de_pago }}</td>
                <td>{{ dato.folio_orden_de_gasto }}</td>
                <td>{{ dato.forma_de_pago }}</td>
                <td>{{ dato.cantidad_efectivo }}</td>
                <td>{{ dato.observaciones }}</td>
                <td>{{ dato.fecha_pago }}</td>
                <td>{{ dato.numero_de_cuenta }}</td>
                <td>{{ dato.nombre_de_cuenta }}</td>
                <td>{{ dato.tipo_beneficiario=="P" || dato.tipo_beneficiario=="p"?"PROVEEDOR":"EMPLEADO" }}</td>
                <td>{{ dato.recibe_pago }}</td>
                <td>{{ dato.tipo_movimiento_estado_de_resultados }}</td>
                <td>{{ dato.tipo_proveedor }}</td>
                <td>{{ dato.solicito }}</td>
                <td>{{ dato.autorizo }}</td>
                <td>{{ dato.nombre_realizo_pago }}</td>
            </tr>`
})

const vista_pagos_por_semana = new Vue({
    el: '#tabla_pago_por_semana',
    data: {
        establecimimiento: "",
        catidad_pago:0,
        concepto_pago: "",
        listaDetalles: []
    },
    methods: {
        agregar: function (dato) {
            this.listaDetalles.push(dato);
        },
        vista_pagos_por_semana: function (concepto_pago, dato) {
            this.concepto_pago = concepto_pago;
            this.catidad_pago = 0;
            this.establecimimiento = dato[0].establecimimiento;
            this.listaDetalles = dato.map(dato => {
                this.catidad_pago += dato["cantidad"];
                dato["cantidad_efectivo"] = moneyFormat(dato["cantidad"]);
                return dato;
            });
            this.catidad_pago = moneyFormat(this.catidad_pago);
            document.querySelector("#tabla_pago_por_semana").style.display = "flex";
        },
        eliminar_todo: function () {
            this.concepto_pago = "";
            this.catidad_pago = 0;
            this.establecimimiento = "";
            this.listaDetalles = [];
            document.querySelector("#tabla_pago_por_semana").style.display = "none";
        }
    },
    computed: {
        verificar_detalles: function () {
            return this.listaDetalles.length > 0;
        }
    }
});

