using System.Collections.Generic;

namespace api_seguimiento.Models.Monitor_auditoria_venta
{
    public class Monitor_establecimiento_venta
    {
        //Atributos
        public int Folio { get; set; }
        public string Nombre { get; set; }
        public double Total { get; set; }
        public double Pagos { get; set; }
        public List<Monitor_asignacion_venta> Lista_asignaciones = new List<Monitor_asignacion_venta>();
        //Constructor
        public Monitor_establecimiento_venta(List<MonitorVenta> lista )
        {
            Enlistar_monitoreo_ventas_por_asignaciones(lista);
        }
        /*Metodos*/
        private void Enlistar_monitoreo_ventas_por_asignaciones(List<MonitorVenta> lista)
        {
            foreach (MonitorVenta dato in lista)
            {
                SumarTotal(dato.Total);
                SumarPagos(dato.Pagos);

                Lista_asignaciones.Add(new Monitor_asignacion_venta() {
                    Asignacion = dato.Asignacion,
                    Total = dato.Total,
                    Fecha_venta = dato.Fecha_venta,
                    Fecha_Inicial = dato.Fecha_Inicial,
                    Fecha_Liquidacion = dato.Fecha_Liquidacion,
                    Corte = dato.Corte,
                    Folio_trabajo_de_Corte = dato.Folio_trabajo_de_Corte,
                    Folio_Banco_Interno = dato.Folio_Banco_Interno,
                    Pagos  = dato.Pagos
                });
            }
        }
        private void SumarTotal(double valor) => Total += valor;
        private void SumarPagos(double valor) => Pagos += valor;
    }
}