using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_auditoria_venta
{
    public class monitor_auditoria_ventas_abonos_y_deuda_a_detalle
    {
        public string folio_corte { get; set; }
        public string fecha_corte { get; set; }
        public string fecha_movimiento { get; set; }
        public double diferencia_corte { get; set; }
        public int folio_abono { get; set; }
        public double abono { get; set; }
        public double pendiente { get; set; }
        public int lista_de_raya_del_abono { get; set; }
        public string parametro { get; set; }
//folio_corte
//fecha_movimiento
//diferencia_corte
//folio_abono
//abono
//lista_de_raya_del_abono

    }
}