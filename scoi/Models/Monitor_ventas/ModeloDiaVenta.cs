using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas 
{
    public class ModeloDiaVenta : ModeloMonitorVenta
    {
        public ModeloDiaVenta(List<monitor_de_ventas_consulta_sumarizada_Result> datos) : base(datos)
        {
            foreach (var filtro in from clase in datos
                                   let nombre = clase.clase
                                   where Clases.FindIndex(e => e.clasificador == nombre) == -1
                                   select new ModeloClaseVenta(datos.Where(e => e.clase == nombre).ToList()))
            {
                Clases.Add(filtro);
            }
        }

        public List<ModeloClaseVenta> Clases = new List<ModeloClaseVenta>();
    }
}