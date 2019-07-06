using api_seguimiento.Models.comparativo_resultados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Estado_de_resultados
{
    public class MovimientoMes : Estado_de_resultados_total
    {
        public string Mes{ get; set; }
        public List<MovimientoSemana> Semanas { get; set; }

        public MovimientoMes(List<Resultado> lista) {
            Semanas = new List<MovimientoSemana>();
            OrdenarPorMes(lista);
        }

        private void OrdenarPorMes(List<Resultado> lista)
        {
            foreach (Resultado movimiento in lista)
            {
                int index = Semanas.FindIndex(a => a.Semana == movimiento.Semana_del_anio);

                if (index == -1)
                {
                    List<Resultado> r = lista.Where(a => a.Semana_del_anio == movimiento.Semana_del_anio).ToList();
                    Semanas.Add(
                        new MovimientoSemana(r) {
                            Semana = movimiento.Semana_del_anio
                        });
                    LlenarTotales(r);
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