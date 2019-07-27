using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Controllers.Monitor_flujo_de_inventario
{
    public class MonitorFlujoInventarioController : ApiController
    {
        // GET api/<controller>
        public List<ModelMonitorEstablecimiento> Get(string fecha,short meses)
        {
            using ( var context = new Entities())
            {
                List<ModelMonitorEstablecimiento> lista = new List<ModelMonitorEstablecimiento>();
                List<string> establecimientos = new List<string>();
                var datos = context.monitor_flujo_de_inventario(fi: DateTime.Parse(fecha), meses: (byte)meses).ToList();
                if (datos != null)
                {
                    foreach (var dato in datos)
                    {
                        string nombre = dato.establecimimiento;
                        if (establecimientos.FindIndex(e=>e==nombre)==-1)
                        {
                            establecimientos.Add(nombre);
                            lista.Add(new ModelMonitorEstablecimiento(datos: datos.Where(e=>e.establecimimiento==nombre).ToList())
                            {
                                nombre=nombre
                            });
                        }
                    }
                }
                return lista;
            }
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public List<monitor_flujo_de_inventario_Result> Post(string fecha, short meses)
        {
            using (var context = new Entities())
            {
                return context.monitor_flujo_de_inventario(fi: DateTime.Parse(fecha), meses: (byte)meses).ToList();
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