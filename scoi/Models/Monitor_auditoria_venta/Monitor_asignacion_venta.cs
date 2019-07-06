
namespace api_seguimiento.Models.Monitor_auditoria_venta
{
    public class Monitor_asignacion_venta
    {
        public string Asignacion { get; set; }
        public double Total { get; set; }
        public double Pagos { get; set; }
        public string Fecha_venta { get; set; }
        public string Fecha_Inicial { get; set; }
        public string Fecha_Liquidacion { get; set; }
        public string Corte { get; set; }
        public string Folio_trabajo_de_Corte { get; set; }
        public string Folio_Banco_Interno { get; set; }
    }
}