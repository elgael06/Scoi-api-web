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
    public class AsignacionVentaController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public List<ModeloTicketAsignacionVenta> Get(string folio)
        {
            using (var context = new Entities())
            {
                var asignacion = context.monitor_de_ventas.Where(e => e.asignacion_actual == folio && e.fecha_de_venta_actual != null).ToList();
                if (asignacion != null)
                {
                    List<ModeloTicketAsignacionVenta> lista = new List<ModeloTicketAsignacionVenta>();

                    foreach(var filtro in from asing_ in asignacion 
                                          let ticket = asing_.ticket
                                          where lista.FindIndex(e=>e.ticket == ticket )==-1
                                          select asignacion.Where(e=>e.ticket == ticket).ToList())
                    {
                        if (filtro.Count > 0)
                            lista.Add(new ModeloTicketAsignacionVenta(filtro));
                    }

                    return lista;
                }
                return null;
            }
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