using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Ordenes_de_pago_en_efectivo
{
    public class Modelo_ordenes_de_pago_en_efectivo
    {
        public int     cod_estab { get; set; }
        public string  establecimimiento { get; set; }
        public string  concepto_compra_gasto { get; set; }
        public int     numero_de_cuenta { get; set; }
        public string  nombre_de_cuenta { get; set; }
        public string  concepto { get; set; }
        public string  clasificacion { get; set; }
        public string  subclasificacion_estado_de_resultados { get; set; }
        public string  tipo_movimiento_estado_de_resultados { get; set; }
        public string  concepto_orden_de_pago { get; set; }
        public int     folio_de_pago { get; set; }
        public int     folio_orden_de_gasto { get; set; }
        public int     folio_corte_caja_chica { get; set; }
        public string  observaciones { get; set; }
        public string  proveedor { get; set; }
        public string  tipo_proveedor { get; set; }
        public double  cantidad { get; set; }
        public string  solicito { get; set; }
        public string  autorizo { get; set; }
        public string  nombre_realizo_pago { get; set; }
        public string  tipo { get; set; }
        public string  forma_de_pago { get; set; }
        public string  fecha_pago { get; set; }
        public int     semana_del_anio_pago { get; set; }
        public string  mes_pago { get; set; }
        public int     anio_pago { get; set; }
        public string  tipo_recibe_pago { get; set; }
        public int     folio_beneficiario { get; set; }
        public string  recibe_pago { get; set; }
        public int     folio_cheque { get; set; }
        public string  tipo_beneficiario { get; set; }
    }
}