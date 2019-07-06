
<template>
    <thead>
        <tr>
            <th rowspan="3">Concepto</th>
        </tr>

    </thead>
</template>

<script>
    export default {
        name: 'CaveceraTabla',
        props: {
            anios: [],
            meses: [],
            semana: []
        },
        computed: {
            tamanioAnio() {
                return this.anios.length;
            }
        }
    }
</script>
