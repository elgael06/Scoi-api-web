using api_seguimiento.Manager.pedido_frutas_y_verduras;
using api_seguimiento.Models.pedido_frutas_y_verduras;
using System.Collections.Generic;
using System.Web.Http;

namespace api_seguimiento.Controllers.pedido_verduras.Alimentacio_pedido
{
    public class Obtener_categoria_f_y_vController : ApiController
    {
        // GET api/<controller>
        public IList<Categoria_frutas_y_verduras> Get()
        {
            return new Obtener_pedido_f_y_v().Lista_Pedido();
        }
    }
}