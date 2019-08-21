using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models.Monitor_flujo_de_inventario;
using WebApplication.Models.Monitor_ventas;

namespace WebApplication.Controllers.Monitor_ventas
{
    public class MonitorDetalleProductoEstablecimientoController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public ModeloDetalleEstablecimientoVenta Get(string producto, int folio_establecimiento)
        {
            return new ModeloDetalleEstablecimientoVenta(producto,folio_establecimiento);
        }

        // POST api/<controller>
        public List<monitor_de_ventas_detalle_producto_por_establecimiento_Result> Post(string producto, int folio_establecimiento)
        {
            using (var context = new Entities())
            {
              return context.monitor_de_ventas_detalle_producto_por_establecimiento(producto, folio_establecimiento).ToList();
            }
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