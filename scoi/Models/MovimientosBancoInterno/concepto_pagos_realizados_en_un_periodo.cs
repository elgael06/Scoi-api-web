using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.MovimientosBancoInterno
{
    public class concepto_pagos_realizados_en_un_periodo
    {
        public string pagos_realizados_en_un_periodo { get; set; }
        public double total_clasificaciones { get; set; }
        public List<subclasificacion_estado_de_resultados> Lista_clasificaciones  = new List<subclasificacion_estado_de_resultados>();
    }
}
/*
 * total_clasificaciones
Lista_clasificaciones

 */
