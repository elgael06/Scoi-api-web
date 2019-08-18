using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas
{
    public class ModeloProductoVenta : ModeloMonitorVenta
    {
        public ModeloProductoVenta(List<monitor_de_ventas_consulta_sumarizada_Result> datos) : base(datos)
        {
            codigo_producto = datos.First().cod_prod;
            clasificador = datos.First().descripcion;
        }
        public string codigo_producto { get; set; }
    }
}