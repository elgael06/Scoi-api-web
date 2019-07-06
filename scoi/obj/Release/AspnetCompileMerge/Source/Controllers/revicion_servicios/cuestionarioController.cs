using api_seguimiento.objetos;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;

namespace api_seguimiento.Controllers.revicion_servicios
{
    public class cuestionarioController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_web = sql_izagar.Scoi();
        public SqlDataReader lector;
        public List<string> Guardar_cuestionario([FromBody]JObject datos_respuestas )
        {
            //listas para almacenar folios y respuestas
            var lista = new List<string>();
            var lista_folios = new List<int>();
            var list_errores = new List<string>();
            //arreglos que se obtienen de la des-serializacion de JSON
            var respuestas = from p in datos_respuestas["datos_cuestionario"] select (string)p;
            var observaciones = from p in datos_respuestas["observaciones"] select (IList<string>)p;

            //recorrido a respuestas para enviarlas al guardado
            foreach (var respuesta in respuestas ) {
                SqlCommand comando = new SqlCommand("servicios_guardar_resultados_cuestionario " + respuesta, conexion_web);
                try
                {
                    conexion_web.Open();
                    lector = comando.ExecuteReader();
                    if (lector.HasRows) {
                        while (lector.Read()) {
                            lista_folios.Add( int.Parse( lector["folio"].ToString()));
                        }
                    }
                }
                catch {
                    conexion_web.Close();
                    list_errores.Add(respuesta);
                    return list_errores;
                }
                conexion_web.Close();
            }
            //recorrido para eliminar observaciones previas
            foreach (var folio in lista_folios) {
                SqlCommand comando = new SqlCommand("delete servicio_cuestionario_observaciones where folio_resultado= " + folio, conexion_web);
                conexion_web.Open();
                comando.ExecuteNonQuery();
                conexion_web.Close();
            }
            //recorre las observaciones para guardarlas 
            int pos = 0;
            foreach (var folio in lista_folios) {
                foreach (var obs in observaciones) {
                    if (obs[0].Equals(pos.ToString())) {
                        SqlCommand comando = new SqlCommand("insert into servicio_cuestionario_observaciones values(" + folio+","+ obs[1]+ "')", conexion_web);
                        conexion_web.Open();
                        comando.ExecuteNonQuery();
                        conexion_web.Close();
                    }
                    pos+=1;
                }
            }
            return lista;
        }
       /* public List<string> Nombres_json2([FromBody]JObject usuario) {
            var nombres =from d in usuario["nombres"] select (string)d;
            var lista = new List<string>();
            int i = 0;
            foreach (var dato in nombres) {
                lista.Add(" persona " + (i+1)+" : "+ dato+" " +  (string)usuario["apeidos"][i]);
                i++;
            }
            return lista;
        }*/
    }
}