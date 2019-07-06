using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Orden_de_compra_interna
{
    public class Orden_OCI
    {
        public int    Folio                 { get; set; }
        public string Uso_mercancia         { get; set; }
        public string Tipo_solicitante      { get; set; }
        public string Nombre_solicitante    { get; set; }
        public string Fecha                 { get; set; }
        public string Establecimiento       { get; set; }
        public string Estatus               { get; set; }
        public string Fecha_autorizacion    { get; set; }
        public string Usuario_autorizo      { get; set; }
    }
}