using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_auditoria_venta
{
    public class Monitor_venta_detalle_corte
    {
        public string folio_corte { get; set; }
        public string asignaciones_en_corte { get; set; }
        public string folio_trabajo_de_cortes { get; set; }
        public string fecha_de_corte { get; set; }
        public string realizo_corte { get; set; }
        public string comentario_auditoria { get; set; }
        public string empleado_reviso_en_auditoria { get; set; }
        public string cantidad_autorizaciones_por_supervisor { get; set; }
        public string promedio_de_escaneo_de_productos { get; set; }
    }
}