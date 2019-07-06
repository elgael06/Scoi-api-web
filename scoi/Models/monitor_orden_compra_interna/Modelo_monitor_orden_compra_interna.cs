
namespace WebApplication.Models.monitor_orden_compra_interna
{
    public class Modelo_monitor_orden_compra_interna
    {
        public string tipo_orden_compra_interna { get; set; }
        public int cod_estab { get; set; }
        public string establecimiento_solicito { get; set; }
        public int folio_scoi_oci { get; set; }
        public string fecha_ultima_modificacion { get; set; }
        public int semana_del_anio { get; set; }
        public string mes { get; set; }
        public int anio { get; set; }
        public string estatus { get; set; }
        public string folio_bms { get; set; }
        public string establecimiento_surte { get; set; }
        public int folio_servicio { get; set; }
        public string persona_solicito_oci { get; set; }
        public string tipo_de_solicitante { get; set; }
        public string uso_de_mercancia { get; set; }
        public string cod_prod { get; set; }
        public string descripcion { get; set; }
        public double cantidad { get; set; }
        public string abreviatura { get; set; }
        public double ultimo_costo { get; set; }
        public double costo_promedio { get; set; }
        public double precio_venta { get; set; }
        public double Total { get; set; }
        public string empleado_elaboro_oci { get; set; }
        public string empleado_autorizo_oci { get; set; }
        public string usuario_recoge { get; set; }
        public string persona_recoge_mercancia { get; set; }
        public string empleado_surtio_oci { get; set; }
        public string tipo_persona_recoge { get; set; }
    }
}