using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas
{
    public class ModeloFamiliaVenta : ModeloMonitorVenta
    {
        public ModeloFamiliaVenta(List<monitor_de_ventas_consulta_sumarizada_Result> datos) : base(datos)
        {
            clasificador = datos.First().familia;
            foreach (var filtro in from producto in datos
                                   let codigo = producto.cod_prod
                                   where Productos.FindIndex(e => e.codigo_producto == codigo) == -1
                                   select datos.Where(e => e.cod_prod == codigo).ToList())
            {

                if (filtro.Count > 0)
                    Productos.Add(new ModeloProductoVenta(filtro));
            }
        }
        public List<ModeloProductoVenta> Productos = new List<ModeloProductoVenta>();
    }
}