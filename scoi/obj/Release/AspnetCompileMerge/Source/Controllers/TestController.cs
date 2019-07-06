using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_seguimiento
{
    public class TestController : ApiController
    {
        public HttpResponseMessage Get(string nombre)
        {
            return new HttpResponseMessage()
            {
                Content = new StringContent("GET: Test Prueba de api =>" + nombre)
            };
        }

        public IHttpActionResult Post()
        {
            return Ok( new { resultado="listo"});
        }
            
        public HttpResponseMessage Put()
        {
            return new HttpResponseMessage()
            {
                Content = new StringContent("PUT: Test message")
            };
        }
    }
}