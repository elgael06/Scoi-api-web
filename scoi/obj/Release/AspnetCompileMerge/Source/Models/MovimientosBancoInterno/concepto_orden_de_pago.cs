using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.MovimientosBancoInterno
{
    public class concepto_orden_de_pago
    {
        public int    folio_de_pago { get; set; }
        public int    folio_orden_de_gasto { get; set; }
        public string observaciones { get; set; }
        public double cantidad { get; set; }
        public string proveedor { get; set; }
        public string orden_de_pago { get; set; }
        public string fecha { get; set; }
        public string establecimimiento { get; set; }
    }
}