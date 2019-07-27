//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication.Models.Pedido_establecimiento
{
    using System;
    using System.Collections.Generic;
    
    public partial class mpedestab
    {
        public long id { get; set; }
        public string folio { get; set; }
        public string transaccion { get; set; }
        public System.DateTime fecha { get; set; }
        public string cod_prod { get; set; }
        public string unidad { get; set; }
        public decimal cantidad_pedida { get; set; }
        public decimal cantidad_autorizada { get; set; }
        public decimal cantidad_surtida { get; set; }
        public decimal Precio_lista { get; set; }
        public decimal importe { get; set; }
        public decimal iva { get; set; }
        public decimal ieps { get; set; }
        public decimal costo { get; set; }
        public Nullable<decimal> utilidad_bruta { get; set; }
        public decimal peso { get; set; }
        public decimal volumen { get; set; }
        public bool back_order { get; set; }
        public string cod_estab { get; set; }
        public string cod_estab_alterno { get; set; }
        public string status { get; set; }
        public string abreviatura_unidad { get; set; }
        public System.Guid rowguid { get; set; }
        public decimal cantidad_adicional { get; set; }
        public short partida { get; set; }
        public Nullable<decimal> total { get; set; }
    
        public virtual productos productos { get; set; }
    }
}