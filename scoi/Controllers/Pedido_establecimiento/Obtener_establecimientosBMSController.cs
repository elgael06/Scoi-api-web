using api_seguimiento.Manager.Pedido_establecimiento;
using api_seguimiento.Models.Pedido_establecimiento;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_seguimiento.Controllers.Pedido_establecimiento
{
    public class Obtener_establecimientosBMSController : ApiController
    {
        // GET api/<controller>
        public List<Establecimiento> GetAll()
        {
            return new Combo_establecimientosBMS().Obtener();
        }

        // GET api/<controller>/5
        public List<Pedido_embarque> Post([FromBody] string establecimiento)
        {
            return new pedido_envarques_por_establecimiento().Envarque_por_establecimiento(establecimiento);
        }
    }
}