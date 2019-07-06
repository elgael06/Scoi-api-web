
<template>
     <label>{{redondeo_cantidad(cantidad)}}</label>
</template>

<script>
    export default {
        name: 'Moneda',
        props: ['cantidad'],
        methods: {
            Formato_moneda(numero_) {
                const decimal_con_cero = (i) => i > 9 || i.search(0) > -1 ? i : i + "0";
                const mayora_a_mil = (numero) => new Intl.NumberFormat('es-MX').format(numero);

                const numero_string = numero_.toString();
                const decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
                const unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

                return `$${unidades != 'NaN' ? unidades : 0}.${decimal}`;
            },
            redondeo_cantidad(numero) {
                return this.Formato_moneda(Math.round(numero * 100) / 100);
            }
        }
    }
</script>



