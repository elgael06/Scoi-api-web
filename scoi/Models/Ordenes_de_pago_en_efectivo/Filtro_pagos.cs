using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Ordenes_de_pago_en_efectivo
{
    public class Filtro_pagos
    {
       public string  f1 { get; set; }
       public string  f2 { get; set; }
       public string  cuenta { get; set; }
       public string  concepto_compra_o_gasto { get; set; }
       public string  tipo_beneficiario { get; set; }

        public string beneficiario = " ";
       public string  concepto_orden_pago { get; set; }
    }
}