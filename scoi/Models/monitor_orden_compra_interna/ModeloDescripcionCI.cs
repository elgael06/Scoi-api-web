using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.monitor_orden_compra_interna
{
    public class ModeloDescripcionCI
    {
        public string Solicito { get; set; }
        public string Tipo_solicitante { get; set; }
        public string Elaboro { get; set; }
        public string Autorizo { get; set; }
        public string Surtio { get; set; }
        public string Id_recoge { get; set; }
        public string Recoge { get; set; }
        public string Tipo_recoge { get; set; }
        public string Uso_mercancia { get; set; }
    }
}