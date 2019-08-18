using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas
{
    public class ModeloCategoriaVenta : ModeloMonitorVenta
    {
        public ModeloCategoriaVenta(List<monitor_de_ventas_consulta_sumarizada_Result> datos) : base(datos)
        {
            clasificador = datos.First().categoria;

            foreach (var filto in from familia in datos
                                  let nombre = familia.familia
                                  where Familias.FindIndex(e => e.clasificador == nombre) == -1
                                  select new ModeloFamiliaVenta(datos.Where(e => e.familia == nombre).ToList()))
            {
                Familias.Add(filto);
            }
        }

        public List<ModeloFamiliaVenta> Familias = new List<ModeloFamiliaVenta>();
    }
}