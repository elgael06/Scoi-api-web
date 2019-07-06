using api_seguimiento.Models.Estado_de_resultados.Periodo;
using System.Collections.Generic;
using System.Linq;

namespace api_seguimiento.Models.comparativo_resultados
{
    public class Subclacificador : Estado_de_resultados_total
    {
        public string subclacificador { get; set; } 
        public List<Movimiento> Lista_movimientos { get; set; }
        public List<PeriodoSemanaAnio> Lista_SemanaAnios { get; set; }
        public List<int> Semanas { get; set; }

        public Subclacificador(List<Resultado> lista, List<int> semanas)
        {
            //LISTAS
            Lista_movimientos   = new List<Movimiento>();
            Lista_SemanaAnios   = new List<PeriodoSemanaAnio>();
            Semanas             = new List<int>(semanas);
            //ATRIBUTOS
            subclacificador = "";
            Total_Costo = 0;
            Total_Precio_venta = 0;
            //FUNCIONES
            ResultadosSemanas(lista);
            ObtenerMovimientos(lista);
        }

        private void ObtenerMovimientos(List<Resultado> lista)
        {
            foreach (Resultado concepto in lista)
            {
                Lista_movimientos.Add(
                    new Movimiento() {
                        Tipo_movimiento = concepto.Movimiento,
                        Semana = concepto.Semana_del_anio,
                        Mes = concepto.Mes,
                        Anio = concepto.Anio,
                        Costo = concepto.Total_Costo,
                        Precio_venta = concepto.Total_Precio_venta
                    });
            }

            Obtener_total_gastos();
        }
        public void Obtener_total_gastos() {
            foreach (Movimiento elemento in Lista_movimientos) {
                Total_Costo += elemento.Costo;
                Total_Precio_venta += elemento.Precio_venta;
            }
        }
        private void ResultadosSemanas(List<Resultado> lista)
        {
            foreach (int semana in Semanas)
            {
                int indice = Lista_SemanaAnios.FindIndex(e => e.Semana == semana);
                if (indice == -1)
                {
                    List<Resultado> filtro = lista.Where(e => e.Semana_del_anio == semana).ToList();
                    Lista_SemanaAnios.Add(new PeriodoSemanaAnio(semana, filtro));
                }
            }
        }
    }
}