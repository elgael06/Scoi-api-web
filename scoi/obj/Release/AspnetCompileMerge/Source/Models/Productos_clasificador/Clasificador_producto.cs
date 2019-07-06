using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Productos_clasificador
{//sp_datos_productos_por_establecimiento_y_servidor
    public class Clasificador_producto
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public float Existencia_pz { get; set; }
        public float Costo_promedio { get; set; }
        public float Precio_venta { get; set; }
        public float Ultimo_costo { get; set; }
        public string Establecimiento { get; set; }
        public string Fecha { get; set; }
        public Int16 Decimales { get; set; }
        public string Precio_volumen { get; set; }

}
}