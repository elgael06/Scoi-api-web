using System.Collections.Generic;
using System.Web.Http;
using api_seguimiento.objetos;
using System.Data.SqlClient;
using System.Linq;

namespace api_seguimiento.Controllers.matrices
{
    public class Evaluacion_matrizController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_scoi = sql_izagar.Scoi();
        public SqlDataReader lector;
        // POST api/<controller>
        public List<Etapa_matriz> PostEtapa(int folio_matriz)
        {
            var lista = new List<Etapa_matriz>();
            SqlCommand comando = new SqlCommand("matrices_etapas_por_matriz " + folio_matriz, conexion_scoi);
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                    if (int.Parse(lector["orden_etapa"].ToString()) > 0)
                    {
                        lista.Add(
                            new Etapa_matriz()
                            {
                                folio_etapa = int.Parse(lector["folio_etapa"].ToString()),
                                etapa = (string)lector["etapa"],
                                folio_matriz = int.Parse(lector["folio_matriz"].ToString()),
                                matriz = (string)lector["matriz"],
                                orden_etapa = int.Parse(lector["orden_etapa"].ToString()),
                                aplicado = (string)lector["aplicado"]
                            });
                    }
                    }
                }
            conexion_scoi.Close();
            return lista;
        }
        public List<Unidad_de_inspeccion_por_etapa> PostUnidad_de_inspeccion_por_etapa(string etapa,string matriz)
        {
            var lista = new List<Unidad_de_inspeccion_por_etapa>();
            string query = string.Format("matrices_unidad_de_inspeccion_por_etapa '{0}','{1}';", etapa, matriz);
            SqlCommand comando = new SqlCommand(query, conexion_scoi);
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    { var muestra = int.Parse(lector["muestra_sugerida"].ToString());
                        var list = new List<string>();
                        for (int i = 0; i < muestra ; i++)
                        {
                        list.Add("NO");
                        }
                        lista.Add(
                            new Unidad_de_inspeccion_por_etapa()
                            {
                                folio = int.Parse(lector["folio"].ToString()),
                                unidad_de_inspeccion = (string)lector["unidad_de_inspeccion"],
                                consepto = (string)lector["concepto"],
                                muestra_sugerida = muestra,
                                respuestas = list
                            });
                    }
                }
            conexion_scoi.Close();
            return lista;
        }
        public List<Unidad_de_inspeccion_por_etapa> postResultados_etapa(string fecha , int etapa, int matriz)
        {
            var lista = new List<Unidad_de_inspeccion_por_etapa>();
            var lista_respuestas = new List<Unidad_de_inspeccion_por_etapa>();

            string query = string.Format("matrices_unidad_de_inspeccion_por_etapa_res '{0}','{1}',{2};", fecha, etapa, matriz);
            SqlCommand comando = new SqlCommand(query, conexion_scoi);
            conexion_scoi.Open();
            lector = comando.ExecuteReader();
            if (lector.HasRows)
            {
                int folio_u = 0;
                string cons = "";
                Unidad_de_inspeccion_por_etapa unidades = new Unidad_de_inspeccion_por_etapa();
                while (lector.Read())
                {

                    if (folio_u != int.Parse(lector["folio"].ToString()) && cons != (string)lector["unidad_de_inspeccion"])
                    {
                        folio_u = int.Parse(lector["folio"].ToString());
                        cons = (string)lector["unidad_de_inspeccion"];

                        lista.Add(
                            new Unidad_de_inspeccion_por_etapa()
                            {
                                folio = int.Parse(lector["folio"].ToString()),
                                unidad_de_inspeccion = (string)lector["unidad_de_inspeccion"],
                                consepto = (string)lector["concepto"]
                            });

                    }
                    lista_respuestas.Add(
                        new Unidad_de_inspeccion_por_etapa()
                        {
                            folio = int.Parse(lector["folio"].ToString()),
                            unidad_de_inspeccion = (string)lector["unidad_de_inspeccion"],
                            consepto = (string)lector["concepto"],
                            r = (string)lector["respuestas"]
                        });
                }
            }
            lista.ForEach(dato => {
                dato.respuestas = from d in lista_respuestas where dato.folio == d.folio select d.r;
                dato.muestra_sugerida = dato.respuestas.Count();
            });
            return lista;
        }
         
    }
}