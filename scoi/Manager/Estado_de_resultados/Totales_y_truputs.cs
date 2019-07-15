using api_seguimiento.Models.comparativo_resultados;
using api_seguimiento.Models.Estado_de_resultados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.comparativo_resultados
{
    public class Totales_y_truputs : ModelConcepto
    {
        public List<Establecimiento_res> lista_establecimientos = new List<Establecimiento_res>();

        public Totales_y_truputs(List<Establecimiento_res> lista,List<Resultado> movimientos)
        {
            foreach (Establecimiento_res establecimiento in lista)
            {
                lista_establecimientos.Add(establecimiento);
            }
            Resultados(lista);
        }
    }
}