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
    public class Obtener_ordenes_pago_en_efectivoController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public List<Modelo_ordenes_de_pago_en_efectivo> Post([FromBody] Filtro_pagos filtro) => new Monitor_obtener_pagos_en_efectivo(filtro).Lista;
        
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