using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_flujo_de_inventario
{
    public class ModelMonitorFamilia: ModelConceptosInventario
    {
        public ModelMonitorFamilia(List<monitor_flujo_de_inventario_Result> datos) : base(datos)
        {

        }

        public string nombre { get; set; }
        public List<string> productos { get; set; }
    }
}