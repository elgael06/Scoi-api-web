using System.Collections.Generic;

namespace WebApplication.Models.Pedido_establecimiento
{
    public class ModelEmbarquePedidoSolicitud
    {
        public string folio_pedido { get; set; }
        public int usuario { get; set; }
        public List<ModelEmbarquePedidoItem> productos { get; set; }
    }
}