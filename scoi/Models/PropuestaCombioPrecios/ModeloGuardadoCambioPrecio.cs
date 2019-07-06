using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.PropuestaCombioPrecios
{
    public class ModeloGuardadoCambioPrecio
    {
        public string codigo_producto { get; set; }
        public string descripcion { get; set; }
        public double precio_venta { get; set; }
        public double precio_venta_nuevo { get; set; }
        public double margen_venta_actual { get; set; }
        public double margen_venta_familia { get; set; }
        public double margen_venta_nuevo { get; set; }
        public double costo { get; set; }
        public dynamic volumen { get; set; }
        public int id_usuario { get; set; }
    }
}