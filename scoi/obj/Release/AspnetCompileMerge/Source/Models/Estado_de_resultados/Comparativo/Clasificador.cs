using api_seguimiento.Models.Estado_de_resultados.Periodo;
using System.Collections.Generic;
using System.Linq;

namespace api_seguimiento.Models.comparativo_resultados
{
    public class Clasificador : Estado_de_resultados_total
    {
        public string clasificador { get; set; }

        public List<Subclacificador> Lista_subclasificadores { get; set; }
        public List<PeriodoSemanaAnio> Lista_SemanaAnios { get; set; }
        public List<int> Semanas { get; set; }

        public Clasificador(List<Resultado> lista, List<int> semanas)
        {
            //LISTA
            Lista_subclasificadores     = new List<Subclacificador>();
            Lista_SemanaAnios           = new List<PeriodoSemanaAnio>();
            Semanas                     = new List<int>(semanas);
            //ATRIBUTOS
            clasificador        = "";
            Total_Costo         = 0;
            Total_Precio_venta  = 0;
            //FUNCIOES
            ObtenerSubClasificadores(lista);
            ResultadosSemanas(lista);
        }

        private void ObtenerSubClasificadores(List<Resultado> lista)
        {
            foreach (Resultado concepto in lista)
            {
                int index = Lista_subclasificadores.FindIndex(e => e.subclacificador == concepto.Subclasificacion);
                if (index == -1)
                {
                    List<Resultado> lista_auxiliar = lista.Where(e => e.Subclasificacion == concepto.Subclasificacion).ToList();
                    
                    Lista_subclasificadores.Add(new Subclacificador(lista_auxiliar, Semanas)
                    {
                        subclacificador = concepto.Subclasificacion
                    });
                }
            }
            Obtener_total_gastos();
        }
        public void Obtener_total_gastos()
        {
            foreach (Subclacificador elemento in Lista_subclasificadores)
            {
                Total_Costo += elemento.Total_Costo;
                Total_Precio_venta += elemento.Total_Precio_venta;
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