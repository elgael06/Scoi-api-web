using api_seguimiento.Manager.Productos_clasificador;
using api_seguimiento.Models.Productos_clasificador;
using System.Web.Http;

namespace api_seguimiento.Controllers.Productos_clasificador
{
    public class Productos_clasificador_por_folioController : ApiController
    {

        // GET api/Productos_clasificador_por_folio/
        public Clasificador_producto Get([FromUri] string folio, [FromUri] string establecimineto)
        {
            return new Clasificador_obtener_productos().Obtener(folio, establecimineto);
        }
        public Clasificador_producto Post([FromUri] string  folio, [FromUri] string establecimineto)
        {
            return  new Clasificador_obtener_productos().Obtener(folio, establecimineto);
        }
    }
}