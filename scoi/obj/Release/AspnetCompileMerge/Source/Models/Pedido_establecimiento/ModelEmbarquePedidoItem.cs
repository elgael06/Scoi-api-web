
namespace WebApplication.Models.Pedido_establecimiento
{
    public class ModelEmbarquePedidoItem
    {
        public long id_ped_estab_BMS { get; set; }
        public int id_inventario { get; set; }

        public int id_pedido { get; set; }
        public string cod_prod { get; set; }
        public string descripcion { get; set; }

        public float disponible { get; set; }
        public float pedido { get; set; }
        public float pendiente { get; set; }

        public float surtido { get; set; }
        public float embarque { get; set; }

        public float ajuste { get; set; }

        public int partida { get; set; }
    }
}