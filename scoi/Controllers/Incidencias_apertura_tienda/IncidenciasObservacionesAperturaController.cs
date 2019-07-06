using api_seguimiento.Manager.Incidencias_apertura_tienda;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_seguimiento.Controllers.Incidencias_apertura_tienda
{
    public class IncidenciasObservacionesAperturaController : ApiController
    {
        // GET api/<controller>
        [HttpPost]
        public Incidencias_obtener_observaciones Post(int Folio,string Fecha)
        {
            return new Incidencias_obtener_observaciones(Folio, Fecha);
        }

        //// GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}