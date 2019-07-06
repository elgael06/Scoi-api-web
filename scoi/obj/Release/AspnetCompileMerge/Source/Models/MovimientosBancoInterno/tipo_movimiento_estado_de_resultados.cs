using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.MovimientosBancoInterno
{
    public class tipo_movimiento_estado_de_resultados
    {
        public string movimiento_estado_de_resultado { get; set; }
        public double total_conceptos { get; set; }
        public List<concepto_orden_de_pago> lista_conceptos { get; set; }
    }
}
/*
 * total_conceptos
lista_conceptos

 */
