//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication.Models.Monitor_flujo_de_inventario
{
    using System;
    
    public partial class monitor_de_ventas_detalle_producto_por_establecimiento_Result
    {
        public string establecimiento { get; set; }
        public string cod_prod { get; set; }
        public string descripcion { get; set; }
        public string asignacion_actual { get; set; }
        public Nullable<int> folio { get; set; }
        public string nombre_cajero { get; set; }
        public string ticket { get; set; }
        public decimal venta_piezas_actual { get; set; }
        public decimal costo_actual { get; set; }
        public decimal importe_sin_IVA_actual { get; set; }
        public decimal utilidad_bruta_actual { get; set; }
        public decimal margen_actual { get; set; }
        public string tipo_de_venta { get; set; }
        public string cliente { get; set; }
        public Nullable<System.DateTime> fecha_de_venta_actual { get; set; }
        public string dia_semana_actual { get; set; }
    }
}