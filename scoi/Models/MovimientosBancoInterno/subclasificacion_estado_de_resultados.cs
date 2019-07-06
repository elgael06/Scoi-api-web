using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.MovimientosBancoInterno
{
    public class subclasificacion_estado_de_resultados
    {
        public string estado_de_resultados { get; set; }
        public double total_movimientos { get; set; }
        public List<tipo_movimiento_estado_de_resultados> Lista_movimientos { get; set; }
    }
}
/*
 * subclasificacion_estado_de_resultados
total_movimientos
Lista_movimientos

 */
