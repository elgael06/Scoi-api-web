using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas 
{
    public class ModeloDiaVenta : ModeloMonitorVenta
    {
        public ModeloDiaVenta(List<monitor_de_ventas_consulta_sumarizada_Result> datos) : base(datos)
        {
            var nombre_     = datos.First().dia_semana_actual;
            var pasado_     = datos.First().dia_semana_anio_pasado;
            clasificador    = nombre_ != "" ? nombre_ : pasado_;

            foreach (var filtro in from clase in datos
                                   let nombre = clase.clase
                                   where Clases.FindIndex(e => e.clasificador == nombre) == -1
                                   select datos.Where(e => e.clase == nombre).ToList())
            {
                if(filtro.Count>0)
                    Clases.Add(new ModeloClaseVenta(filtro));
            }
        }

        public List<ModeloClaseVenta> Clases = new List<ModeloClaseVenta>();
    }
}