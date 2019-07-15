import { redondeo, moneyFormat } from '../../../../Globales/moneda';

var barChart = null;
const grafica_barras=($lista_establecimientos) => {
    const $lista_conceptos = ["VENTAS NETAS", "COSTO DE VENTAS", "UTILIDAD BRUTA", "MARGEN BRUTO", "UTILIDAD OPERACIONAL", "IMPUESTOS PTU 10%", "UTILIDAD NETA", "MARGEN NETO"];
    const $colores = ["#00b300", "#66ccff", "#ff9933", "#ff0000", "#ff00a3", "#0077b3", "#996633", "#999966", "#33cccc"];
    let   ctx = document.getElementById("dashboard_graficos");
    const $indicadores = [];
    const $establecimientos = [];

    $lista_establecimientos.forEach(establecimiento_ => {
        $establecimientos.push(establecimiento_.establecimiento);
    });
    $lista_conceptos.forEach((concepto_, p) => {
        if (concepto_ != "RETIROS UTILIDAD") {
            const $obj = {
                label: concepto_,
                data: [],
                backgroundColor: $colores[p],
                borderColor: "black",
                borderWidth: 1,
                fill: false
            }
            $lista_establecimientos.forEach(establecimiento_ => {
                switch (concepto_) {
                    case "VENTAS NETAS":
                        $obj.data.push(redondeo(establecimiento_.VENTAS_NETAS.Total_Costo));
                        break;
                    case "COSTO DE VENTAS":
                        $obj.data.push(redondeo(establecimiento_.COSTO_DE_VENTAS.Total_Costo * -1));
                        break;
                    case "UTILIDAD BRUTA":
                        $obj.data.push(redondeo(establecimiento_.UTILIDAD_EN_OPERACIONES.Total_Costo));
                        break;
                    case "MARGEN BRUTO":
                        $obj.data.push(redondeo(establecimiento_.GASTOS_DE_OPERACION.Total_Costo * -1));
                        break;
                    case "UTILIDAD OPERACIONAL":
                        $obj.data.push(redondeo(establecimiento_.UTILIDAD_NETA_OPERACIONES.Total_Costo));
                        break;
                    case "IMPUESTOS PTU 10%":
                        $obj.data.push(redondeo(establecimiento_.IMPUESTOS_PTU.Total_Costo * -1));
                        break;
                    case "MARGEN NETO":
                        $obj.data.push(redondeo(establecimiento_.Total_Costo));
                        break;
                }
            });
            $indicadores.push($obj);
        }
    });
    if (barChart != null) 
        barChart.clear(),barChart.destroy();
    barChart = new Chart(ctx,
        {
            type: 'bar',
            data: {
                labels: $establecimientos,
                datasets: $indicadores
            },
            options: {
                scales: {
                    yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        callback: (value) => moneyFormat(value)
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "CONCEPTOS ($)."
                    }
                    }]
                },
                title: {
                    display: true,
                    text: 'Grafica Estado De Resultados De Operaciones.',
                    fontSize: 18
                },
                tooltips: {
                    labelColor: () => { return {
                        borderColor: 'rgb(0, 153, 204)',
                        backgroundColor: 'rgb(66d9ff)'
                    }},
                labelTextColor:() =>'#543453'
                }
            }
        });
    barChart.update();
}
export default grafica_barras;