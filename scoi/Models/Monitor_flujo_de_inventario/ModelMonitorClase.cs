using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_flujo_de_inventario
{
    public class ModelMonitorClase : ModelConceptosInventario
    {
        public ModelMonitorClase(List<monitor_flujo_de_inventario_Result> datos) : base(datos)
        {
            categoriasNombres = new List<string>();
            categorias = new List<ModelMonitorCategoria>();

            foreach (var dato in datos)
            {
                string categoria = dato.categoria;
                if (categoriasNombres.FindIndex(e => e == categoria) == -1)
                {
                    categoriasNombres.Add(categoria);
                    categorias.Add(new ModelMonitorCategoria(datos: datos.Where(e => e.categoria == categoria).ToList())
                    {
                        nombre = categoria
                    });
                }
            }
        }

        public string nombre { get; set; }
        public List<string> categoriasNombres { get; set; }
        public List<ModelMonitorCategoria> categorias { get; set; }
    }
}