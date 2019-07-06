using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.pedido_frutas_y_verduras
{
    public class Categoria_frutas_y_verduras
    {
        public string Codigo_producto { get; set; }
        public string Descripcion { get; set; }
        public double Existencia_teorica { get; set; }
        public double Existencia_fisica { get; set; }
        public double Promedio_vta_90_dias { get; set; }
        public double Sugerido { get; set; }
    }
}