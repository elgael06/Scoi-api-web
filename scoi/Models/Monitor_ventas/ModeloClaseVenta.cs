using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas
{
    public class ModeloClaseVenta : ModeloMonitorVenta
    {
        public ModeloClaseVenta(List<monitor_de_ventas_consulta_sumarizada_Result> datos) : base(datos)
        {
            clasificador = datos.First().clase;

            foreach (var filtro in from categoria in datos
                                   let nombre = categoria.categoria
                                   where Categorias.FindIndex(e => e.clasificador == nombre) == -1
                                   select new ModeloCategoriaVenta(datos.Where(e => nombre == e.categoria).ToList()))
            {
                Categorias.Add(filtro);
            }
        }

        public List<ModeloCategoriaVenta> Categorias = new List<ModeloCategoriaVenta>();
    }
}