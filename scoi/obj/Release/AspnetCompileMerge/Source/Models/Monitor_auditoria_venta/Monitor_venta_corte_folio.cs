using api_seguimiento;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_auditoria_venta
{
    public class Monitor_venta_corte_folio
    {

        public Monitor_venta_detalle_corte detalle { get; set; }
        public Usuario empleado { get; set; }
        public Monitor_venta_totales ventas { get; set; }
        public List<Monitor_auditoria_venta_ticket> tickets { get; set; }

        public Monitor_venta_corte_folio() {
            tickets = new List<Monitor_auditoria_venta_ticket>();
        }
    }
}