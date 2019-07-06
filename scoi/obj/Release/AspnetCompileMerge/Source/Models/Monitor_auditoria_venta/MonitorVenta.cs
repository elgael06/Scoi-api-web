using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Monitor_auditoria_venta
{
    public class MonitorVenta
    {
        public string Clasificador { get; set; }
        public int Cod_Establecimiento { get; set; }
        public string Nom_establecimiento { get; set; }
        public double Total { get; set; }
        public string Asignacion { get; set; }
        public string Fecha_venta { get; set; }
        public string Fecha_Inicial { get; set; }
        public string Fecha_Liquidacion { get; set; }
        public string Corte { get; set; }
        public string Folio_trabajo_de_Corte { get; set; }
        public string Folio_Banco_Interno { get; set; }
        public double Pagos { get; set; }

    }
}