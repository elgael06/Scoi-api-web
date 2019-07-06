using api_seguimiento.Models.comparativo_resultados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Estado_de_resultados
{
    public class MovimientoSemana: Estado_de_resultados_total
    {
        public int Semana { get; set; }
        public List<Clasificador> Clasificadores { get; set; }

        public MovimientoSemana(List<Resultado> lista) {
            Clasificadores = new List<Clasificador>();
            OrdenPorSemana(lista);
            LlenarTotales(lista);
        }

        private void OrdenPorSemana(List<Resultado> lista)
        {
            List<int> l = new List<int>();
            foreach (Resultado concepto in lista)
            {
                var index = Clasificadores.FindIndex(e => e.clasificador == concepto.Clasificacion);

                if (index == -1)
                {
                    List<Resultado> lista_auxiliar = lista.Where(e => e.Clasificacion == concepto.Clasificacion).ToList();

                    Clasificadores.Add(
                        new Clasificador(lista_auxiliar,l)
                        {
                            clasificador = concepto.Clasificacion
                        });
                }
            }
        }
        private void LlenarTotales(List<Resultado> lista)
        {
            foreach (Resultado movimiento in lista)
            {
                Total_Costo += movimiento.Total_Costo;
                Total_Precio_venta += movimiento.Total_Precio_venta;
            }
        }
    }
}