using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Orden_de_compra_interna
{
    public class Autirizacion_OCI
    {
        public int      Folio   { get; set; }
        public string   Estatus { get; set; }
        public int      Usiario { get; set; }
        public string   Pc      { get; set; }
        public string   Ip      { get; set; }

    }
}