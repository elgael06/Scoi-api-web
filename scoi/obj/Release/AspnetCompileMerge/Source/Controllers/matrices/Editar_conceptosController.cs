using api_seguimiento.Manager.Matrices;
using api_seguimiento.Models.Matrices;
using System.Web.Http;

namespace api_seguimiento.Controllers.matrices
{
    public class Editar_conceptosController : ApiController
    {
        public Matrices_conceptos Post([FromBody] Matrices_conceptos concepto)
        {
            return new Obtener_conceptos().Editar(concepto);
        }
    }
}