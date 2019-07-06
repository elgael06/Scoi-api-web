using api_seguimiento.Manager.Incidencias_personal;
using api_seguimiento.Models.Incidencias_personal;
using System.Collections.Generic;
using System.Web.Http;

namespace api_seguimiento.Controllers.Incidencias_personal
{
    public class PersonalInsidenciasGuardarController : ApiController
    {
        // POST api/<controller>
        public List<Colaborador_incidencia> Post([FromBody] List<Colaborador_incidencia> Lista,int capturo,string fecha)
        {
            new Incidencias_personal_establecimiento().Guardar(Lista, capturo,fecha);
            return Lista;
        }
    }
}