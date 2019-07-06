using System.Collections.Generic;

namespace WebApplication.Models.monitor_orden_compra_interna
{
    public class ModeloOrdenCI
    {
        public int Folio { get; set; }
        public string Folio_BMS { get; set; }
        public int Folio_servicio { get; set; }
        public int Folio_establecimiento_solicita { get; set; }
        public string Establecimiento_solicita { get; set; }
        public string Establecimiento_surte { get; set; }
        public string Fecha_mod { get; set; }
        public int Semana_anio { get; set; }
        public int Anio { get; set; }
        public string Mes { get; set; }
        public string Tipo { get; set; }
        public string Estatus { get; set; }

        public ModeloDescripcionCI Detalle = new ModeloDescripcionCI();

        public List<ModeloProductoCI> Productos = new List<ModeloProductoCI>();

    }
}