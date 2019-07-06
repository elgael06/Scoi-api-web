using api_seguimiento.Manager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models.Monitor_auditoria_venta;

namespace WebApplication.Manager.Monitor_auditoria_venta
{
    public class Monitor_auditoria__venta_detalle_corteController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public Monitor_venta_corte_folio Get(string folio) => new Monitor_obtener_auditorioa_venta().Obtener_corte_por_folio(folio);

        // POST api/<controller>
        public List<monitor_auditoria_ventas_abonos_y_deuda_a_detalle> Post([FromUri]int folio) => new Monitor_obtener_auditorioa_venta().Obtener_Abono_y_Deudas(folio);

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