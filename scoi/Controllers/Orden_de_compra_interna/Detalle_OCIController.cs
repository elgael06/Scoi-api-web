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
    public class Detalle_OCIController : ApiController
    {

        // GET api/<controller>/5
        public Detalles_OCI Get([FromUri] int folio)
        {
            return new Detalle_OCI().Obtener(folio);
        }
    }
}