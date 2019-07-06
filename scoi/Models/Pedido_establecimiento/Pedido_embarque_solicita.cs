using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Pedido_establecimiento
{
    public class Pedido_embarque_solicita
    {
        public string Folio { get; set; }
        public int Usuario { get; set; }
        public List<Pedido_Productos_en_embarque> Productos { get; set; }
    }
}