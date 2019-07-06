using System.Collections.Generic;
using System.Web.Http;
using WebApplication.Manager.PropuestaCombioPrecios;
using WebApplication.Models.PropuestaCombioPrecios;

namespace WebApplication.Controllers.Monitor_precio_competencia
{
    public class CambioPreciosController : ApiController
    {
        [HttpGet]
        public List<ModeloFiltroFolioCambioPrecio> FolioCambioPrecio() => new CambioDePrecios().FiltroFolioCambioPrecio();

        [HttpGet]
        public List<ModeloGuardadoCambioPrecio> Consultar(int folio) => new CambioDePrecios().Consultar(folio:folio);

        [HttpPost]
        public List<string> Guardar([FromBody] List<ModeloGuardadoCambioPrecio> productos) => new CambioDePrecios().Guardar(productos);
    }
}