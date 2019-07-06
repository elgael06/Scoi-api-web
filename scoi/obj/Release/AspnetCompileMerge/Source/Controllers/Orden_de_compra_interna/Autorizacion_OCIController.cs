using api_seguimiento.Manager.Orden_de_compra_interna;
using api_seguimiento.Models.Orden_de_compra_interna;
using System.Web.Http;

namespace api_seguimiento.Controllers.Orden_de_compra_interna
{
    public class Autorizacion_OCIController : ApiController
    {
        // PUT api/<controller>/5
        public string Post([FromBody]Autirizacion_OCI autirizacion)
        {
            return new Autorizacion_Estatus_OCI().Actualizar(autirizacion);
        }
    }
}