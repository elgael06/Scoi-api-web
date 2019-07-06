using api_seguimiento.Manager.Productos_clasificador;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.PropuestaCombioPrecios
{
    public class ModeloCambioPrecio
    {
        public ModeloCambioPrecio(int folio) {
            Producto = new Clasificador_obtener_productos().Obtener(folio.ToString(), "super V").Descripcion;
            Folio = folio;
        }
        public int Folio { get; set; }
        public int Codigo_producto { get; set; }
        public string Producto { get; set; }
        public double Precio_venta { get; set; }
        public double Precio_venta_nueva { get; set; }
        public double Margen_actual { get; set; }
        public double Margen_nuevo { get; set; }
        public double Costo { get; set; }
    }
}

/**
 select folio,
	codigo_producto,
	precio_venta,
	precio_venta_nueva,
	margen_actual,
	margen_nuevo,
	costo
 from cambio_de_precios;
     */
