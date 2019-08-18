using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_flujo_de_inventario
{
    public class ModelMonitorCategoria: ModelConceptosInventario
    {
        public ModelMonitorCategoria(List<monitor_flujo_de_inventario_Result> datos) : base(datos)
        {
            familiasNombres = new List<string>();
            familias = new List<ModelMonitorFamilia>();

            foreach (var dato in datos)
            {
                string familia = dato.familia;
                if (familiasNombres.FindIndex(e=>e==familia) == -1)
                {
                    familiasNombres.Add(familia);
                    familias.Add(new ModelMonitorFamilia(datos: datos.Where(e => e.familia == familia).ToList())
                    {
                        nombre = familia
                    });
                }
            }

        }
        public string nombre { get; set; }
        public List<string> familiasNombres { get; set; }
        public List<ModelMonitorFamilia> familias { get; set; }
    }
}