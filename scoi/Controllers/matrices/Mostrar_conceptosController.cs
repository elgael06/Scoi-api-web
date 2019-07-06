using api_seguimiento.Manager.Matrices;
using api_seguimiento.Models.Matrices;
using System.Collections.Generic;
using System.Web.Http;

namespace api_seguimiento.Controllers.matrices
{
    public class Mostrar_conceptosController : ApiController
    {
        // GET api/<controller>
        public List<Matrices_conceptos> Get()
        {
            return new Obtener_conceptos().Todos();
        }
    }
}