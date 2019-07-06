using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_auditoria_venta
{
    public class Monitor_venta_totales
    {
        public string importe_retiros_a_cajero { get; set; }
        public string efectivo { get; set; }
        public string dolares { get; set; }
        public string vales { get; set; }
        public string cheques { get; set; }
        public string total_de_vauchers { get; set; }
        public string importe_fuente_de_sodas { get; set; }
        public string total_pagos_dinero_electronico { get; set; }
        public string corte_del_sistema { get; set; }
        public string apartados { get; set; }
        public string diferiencia_de_corte { get; set; }
        public string abonos { get; set; }
        public string diferencia_total { get; set; }
        public string recibo_de_luz { get; set; }
        public string tiempo_aire { get; set; }
        public string deposito_en_caja { get; set; }
        public string total_de_retiros_clientes { get; set; }
        public string cantidad_de_articulos_diferentes { get; set; }
        public string cantidad_de_tickets { get; set; }
    }
}