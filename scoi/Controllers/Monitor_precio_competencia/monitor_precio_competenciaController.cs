
using System.Collections.Generic;
using System.Web.Http;
using WebApplication.Manager.Monitor_precio_competencia;
using WebApplication.Manager.PropuestaCombioPrecios;
using WebApplication.Models.Monitor_precio_competencia;
using WebApplication.Models.PropuestaCombioPrecios;

namespace WebApplication.Controllers.Monitor_precio_competencia
{
    public class monitor_precio_competenciaController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public Obtener_Monitor_precio_competencia Post(string mes,string filtro,string anio) => new Obtener_Monitor_precio_competencia(mes, filtro, anio);

        [HttpPost]
        public List<Modelo_precios_de_competencia_por_producto> HistoricoProducto(string folio) => new Obtener_precios_de_competencia_por_producto().Consulta(producto:folio);

        [HttpGet]
        public ObtenerAnalisis ConsultaAnalisisPrecioProducto(string mes, string filtro, string anio) => new ObtenerAnalisis(mes: mes, filtro: filtro, anio:anio);

    }
}