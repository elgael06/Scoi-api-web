using api_seguimiento.Manager.Pedido_establecimiento;
using api_seguimiento.Models.Pedido_establecimiento;
using System.Collections.Generic;
using System.Web.Http;
using WebApplication.Manager.Pedido_establecimiento;
using WebApplication.Models.Pedido_establecimiento;

namespace api_seguimiento.Controllers.Pedido_establecimiento
{
    public class Pedido_productos_embarqueController : ApiController
    {
        // POST api/<controller>
        public List<Pedido_Productos_en_embarque> Post(string folio)
        {
            return new pedido_envarques_por_establecimiento().Consulta_Productos(folio);
        }
        [HttpPost]
        public List<Monitor_embarques_surtidos> MonitorEmbarques() => new Monitor_embarque_surtido().ObteberEmbarques();
    }
}