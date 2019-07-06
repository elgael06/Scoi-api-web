using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Orden_de_compra_interna
{
    public class Producto_OCI
    {
        public string Descripcion { get; set; }
        public double Cantidad { get; set; }
        public string Unidad { get; set; }
    }
}