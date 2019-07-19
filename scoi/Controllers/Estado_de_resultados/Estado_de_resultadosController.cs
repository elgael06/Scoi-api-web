using api_seguimiento.Manager.comparativo_resultados;
using api_seguimiento.Models.comparativo_resultados;
using api_seguimiento.Models.Estado_de_resultados;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace api_seguimiento.Controllers.comparativo_resultados
{
    public class Estado_de_resultadosController : ApiController
    {
        public Totales_y_truputs Get([FromUri] string fecha , [FromUri] int meses, [FromUri] int tipo)
        {
            var lista = new Comparativo().Consulta_sql_estado_de_resultados(fecha,meses, tipo);
            List<Establecimiento_res> establecimientos = new Comparativo().Obtener_resultados_establecimiento(lista);
            return new Totales_y_truputs(establecimientos, lista);
        }

        public List<Resultado> Get()
        {
            return new Comparativo().Consulta_sql_estado_de_resultados("06/01/2019", 0,1);
        }
        public IList<Establecimiento_res> Post([FromBody] string fecha, int meses)
        {
            return new Comparativo().Obtener_resultados_establecimiento(new Comparativo().Consulta_sql_estado_de_resultados(fecha, meses, 1));
        }

        public OrdenarMovimientos PostOrdenarMovimientos([FromBody] List<Resultado> lista)
        {
            if (lista == null)
            {
                throw new ArgumentNullException(nameof(lista));
            }
            if (lista.Count > 0)
                return new OrdenarMovimientos(lista);
            else
                return null;
        }
    }
}