using api_seguimiento.Models.comparativo_resultados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Estado_de_resultados
{
    public class MovimientoAnio: Estado_de_resultados_total
    {
        public string Anio { get; set; }
        public List<MovimientoMes> Meses { get; set; }

        public MovimientoAnio(List<Resultado> lista) {

            Meses = new List<MovimientoMes>();
            OrdenPorAnio(lista);
        }

        private void OrdenPorAnio(List<Resultado> lista)
        {
            foreach (Resultado movimiento in lista)
            {
                int index = Meses.FindIndex(a => a.Mes == movimiento.Mes);

                if (index == -1)
                {
                    List<Resultado> r = lista.Where(a => a.Mes == movimiento.Mes ).ToList();
                    Meses.Add(
                        new MovimientoMes(r)
                        {
                            Mes = movimiento.Mes
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