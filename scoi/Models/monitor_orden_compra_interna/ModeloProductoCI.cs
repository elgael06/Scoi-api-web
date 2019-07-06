using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.monitor_orden_compra_interna
{
    public class ModeloProductoCI
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Abrebiatura { get; set; }
        public double Cantida { get; set; }
        public double Ultimo_costo { get; set; }
        public double Costo_promedio { get; set; }
        public double Precio_venta { get; set; }
        public double Total { get; set; }
    }
}