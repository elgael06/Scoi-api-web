using System;

namespace api_seguimiento.Models.Pedido_establecimiento
{
    public class Pedido_Productos_en_embarque
    {
        public string id_ped_estab_BMS { get; set; }
        public string id_inventario { get; set; }
        public string id_pedido { get; set; }
        public string cod_prod { get; set; }
        public string descripcion { get; set; }
        public Nullable<double> disponible { get; set; }
        public Nullable<double> pedido { get; set; }
        public Nullable<double> pendiente { get; set; }
        public Nullable<double> surtido { get; set; }
        public int embarque { get; set; }
        public double ajuste { get; set; }
        public int partida { get; set; }
    }
}