using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models.Monitor_ventas;

namespace WebApplication.Controllers.Monitor_ventas
{
    public class SemanasMesFechaController : ApiController
    {
        // GET api/<controller>
        public ModeloMesActual Get()=>new ModeloMesActual();
       
        // GET api/<controller>/5
        public ModeloMesActual Get(string fecha)=>new ModeloMesActual(DateTime.Parse(fecha));
    }
}