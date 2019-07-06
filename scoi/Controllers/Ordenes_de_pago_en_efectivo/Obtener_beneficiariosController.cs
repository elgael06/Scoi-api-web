using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Manager.Ordenes_de_pago_en_efectivo;
using WebApplication.Models.Ordenes_de_pago_en_efectivo;


namespace WebApplication.Manager.Ordenes_de_pago_en_efectivo
{
    public class Obtener_beneficiariosController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        // POST api/<controller>
        public List<Beneficiario> Post([FromUri]string tipo)=> new Obtener_beneficiarios(tipo).Lista_beneficiarios;
        
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