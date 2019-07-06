
<template>
    <div class="panel-body" v-if="existe">
        <label>Total {{totalOrdenes}}  Ordenes</label>
        <div style="height:30pc;overflow:auto">
            <table class="table">
                <CaveceraTabla />
                <thead>
                    <tr>
                        <th class="bg-blue-sky">Folio</th>
                        <th class="bg-blue-sky">Tipo</th>
                        <th class="bg-blue-sky">Estatus</th>
                        <th class="bg-blue-sky">Fecha</th>
                        <th class="bg-blue-sky">Folio BMS</th>
                        <th class="bg-blue-sky">Folio Servicio</th>
                        <th class="bg-blue-sky">Solicita</th>
                        <th class="bg-blue-sky">Surte</th>
                        <th class="bg-blue-sky">Mes</th>
                        <th class="bg-blue-sky">Semana Año</th>
                        <th class="bg-blue-sky">Año</th>
                        <th class="bg-blue-sky">Detalle</th>
                    </tr>
                </thead>
                <OrdenCompra v-for="item in lista" :producto="item" :key="item.Folio" :detalle="detalle" />
            </table>
        </div>
    </div>
</template>

<script>
    import OrdenCompra from './OrdenCompra';

    export default {
        name: 'TablaOrdenes',
        components: {
            OrdenCompra,
        },
        props: {
            lista: [],
            detalle: (p) => { console.log(p) }
        },
        computed: {
            totalOrdenes() {
                return this.lista.length
            },
            existe() {
                return this.totalOrdenes > 0;
            }
        }
    }
</script>
