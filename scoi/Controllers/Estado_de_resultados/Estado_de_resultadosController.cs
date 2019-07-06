using api_seguimiento.Manager.comparativo_resultados;
using api_seguimiento.Models.comparativo_resultados;
using api_seguimiento.Models.Estado_de_resultados;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_seguimiento.Controllers.comparativo_resultados
{
    public class Estado_de_resultadosController : ApiController
    {
        public Totales_y_truputs Get([FromUri] string fecha , [FromUri] int meses )
        {
            var lista = new Comparativo().Consulta_sql_estado_de_resultados(fecha,meses);
            List<Establecimiento_res> establecimientos = new Comparativo().Obtener_resultados_establecimiento(lista);
            return new Totales_y_truputs(establecimientos,lista);

        }
        public List<Resultado> Get()
        {
            List < Resultado > res = new Comparativo().Consulta_sql_estado_de_resultados("06/01/2019", 0);

            return res;
        }
        public IList<Establecimiento_res> Post([FromBody] string fecha, int meses)
        {
            var lista = new Comparativo().Consulta_sql_estado_de_resultados(fecha,meses);
            return new Comparativo().Obtener_resultados_establecimiento(lista);
        }
        public OrdenarMovimientos PostOrdenarMovimientos([FromBody] List<Resultado> lista) {
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