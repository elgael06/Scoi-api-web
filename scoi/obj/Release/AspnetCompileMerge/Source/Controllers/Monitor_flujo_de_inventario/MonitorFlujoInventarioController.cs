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
            using ( var context = new FlujoDatosInvetario())
            {
                List<ModelMonitorEstablecimiento> lista = new List<ModelMonitorEstablecimiento>();
                List<string> establecimientos = new List<string>();
                //try
                //{
                string[] fechas = fecha.Split('-');
                DateTime parametro = DateTime.Parse(String.Format("{0}/{1}/{2}", int.Parse(fechas[0]) + 1, fechas[1], fechas[2]));
                var datos = context.monitor_flujo_de_inventario(fi: parametro, meses: byte.Parse(meses.ToString())).ToList();
                if (datos != null)
                {
                    foreach (string establecimiento in from dato in datos
                                            where establecimientos.FindIndex(e => e == dato.establecimimiento) == -1
                                            select dato.establecimimiento)
                    {
                        establecimientos.Add(establecimiento);
                        lista.Add(new ModelMonitorEstablecimiento(datos: datos.Where(e => e.establecimimiento.ToString() == establecimiento).ToList()));
                    }
                }
                //}
                //catch 
                //{
                //}
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