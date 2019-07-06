using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.MovimientosBancoInterno
{
    public class concepto_compra_gasto
    {
        public string compra_gasto { get; set; }
        public double total_conceptos { get; set; }
        public string fecha_inicial { get; set; }
        public string fecha_final { get; set; }
        public List< concepto_pagos_realizados_en_un_periodo > Lista_conceptos { get; set; }
    }
}
/*
 * total_conceptos
fecha_inicial
fecha_final
Lista_conceptos

 */
