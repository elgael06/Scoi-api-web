using api_seguimiento.Manager;
using api_seguimiento.Models.Monitor_auditoria_venta;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models.Monitor_auditoria_venta;

namespace api_seguimiento.Controllers.Monitor_auditoria_venta
{
    public class monitor_auditoria_ventasController : ApiController
    {
        public List<Monitor_clasificador_venta> Post([FromUri]string fecha)
        {
            return new Monitor_obtener_auditorioa_venta().Clasificadores(fecha);
        }
        public List<MonitorVenta> Get()
        {
            return new Monitor_obtener_auditorioa_venta().ObtenerSQL("20-03-2019");
        }
        [HttpGet]
        [Route("folio_corte/{folio}")]
        public Monitor_venta_corte_folio Consulta_Corte_por_folio(string folio) => new Monitor_obtener_auditorioa_venta().Obtener_corte_por_folio(folio);
    }
}