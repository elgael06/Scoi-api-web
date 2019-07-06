using api_seguimiento.Manager.Incidencias_personal;
using api_seguimiento.Models.Incidencias_personal;
using System.Collections.Generic;
using System.Web.Http;

namespace api_seguimiento.Controllers.Incidencias_personal
{
    public class Pesonal_IncidenciaController : ApiController
    {
        // GET api/<controller>/
        public IList<Departamento_incidencia> Get([FromUri] int folio, [FromUri]  int diferencia)
        {
            return new Incidencias_personal_establecimiento().Checar_incidencias(folio,diferencia);
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {

        }

    }
}