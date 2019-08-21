using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Controllers.Monitor_indicadores
{
    public class monitor_indicadores_cajerosController : ApiController
    {
       [HttpGet]
       [Route("api/monitor_indicadores")]
        public IEnumerable<monitor_indicadores> monitor_indicadores()
        {
            return new Entities().monitor_indicadores;
        }

        // GET api/<controller>/5
        public List<monitor_indicadores_cajeros_Result> Get(string fecha)
        {
            return new Entities().monitor_indicadores_cajeros(DateTime.Parse(fecha)).ToList();
        }

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