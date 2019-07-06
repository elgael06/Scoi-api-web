using api_seguimiento.Manager.Order_de_compra_interna;
using api_seguimiento.Models.Orden_de_compra_interna;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_seguimiento.Controllers.Orden_de_compra_interna
{
    public class Obtener_OCIController : ApiController
    {
        // GET api/<controller>/5
        public List<Orden_OCI> Get([FromUri] char estatus)
        {
            string Estatus="";
            switch (estatus)
            {
                case 'E':
                    Estatus = "EN AUTORIZACION";
                    break;
                case 'A':
                    Estatus = "AUTORIZADO";
                    break;
                case 'S':
                    Estatus = "SURTIDO";
                    break;
                case 'C':
                    Estatus = "CANCELADO";
                    break;
                default:
                    Estatus = "TODOS";
                    break;
            }
            return new Obtener_OCI().Obtener(Estatus);
        }
    }
}