using api_seguimiento.objetos;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Http;

namespace api_seguimiento.Controllers.revicion_servicios
{
    public class Monitor_servicios_resultadosController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_web = sql_izagar.Scoi();
        public SqlDataReader lector;
        // POST api/<controller>
        public List<monitor_servicios_resultados_cuestionarios> PostAll(string f1, string f2)
        {
            var lista = new List<monitor_servicios_resultados_cuestionarios>();
            SqlCommand comando = new SqlCommand("[servicios_reportes_monitor_resultados] '" + f1 + "','" + f2 + "'", conexion_web);
            try
            {
                conexion_web.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new monitor_servicios_resultados_cuestionarios()
                        {
                            folio_establecimiento = int.Parse( lector["folio_establecimiento"].ToString()),
                            establecimiento = lector["establecimiento"].ToString(),
                            folio_departamento = int.Parse(lector["folio_departamento"].ToString()),
                            departamento = lector["departamento"].ToString(),
                            solucion_si = int.Parse(lector["si"].ToString()),
                            solucion_no = int.Parse(lector["no"].ToString()),
                            solucion_na = int.Parse(lector["na"].ToString()),
                            promedio = double.Parse(lector["si"].ToString()) /(double.Parse(lector["si"].ToString()) + double.Parse(lector["no"].ToString()))*100
                        });
                    }
              }
        } catch
            {
                return lista;
            }
            return lista;
        }
        public List<monitor_servicios_resultados_cuestionarios> PostZonas(string f1, string f2,int establecimiento,int departamento)
        {
            var lista = new List<monitor_servicios_resultados_cuestionarios>();
            SqlCommand comando = new SqlCommand("[servicios_reportes_monitor_resultados] '" + f1 + "','" + f2 + "','zona'," + establecimiento+","+departamento, conexion_web);
            try
            {
                conexion_web.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add( new monitor_servicios_resultados_cuestionarios()
                        {
                            folio_zona = int.Parse(lector["folio_zona"].ToString()),
                            zona = lector["zona"].ToString(),
                            folio_cuestionario = int.Parse(lector["folio_cuestionario"].ToString()),
                            cuestionario = lector["cuestionario"].ToString(),
                            solucion_si = int.Parse(lector["si"].ToString()),
                            solucion_no = int.Parse(lector["no"].ToString()),
                            solucion_na = int.Parse(lector["na"].ToString()),
                            promedio = double.Parse(lector["si"].ToString()) / (double.Parse(lector["si"].ToString()) + double.Parse(lector["no"].ToString())) * 100
                        });
                    }
                }
            }
            catch
            {
                return lista;
            }
            return lista;
        }
        public List<monitor_servicios_resultados_cuestionarios> PostActivos(string f1, string f2, int establecimiento, int departamento, int cuestionario)
        {
            var lista = new List<monitor_servicios_resultados_cuestionarios>();
            SqlCommand comando = new SqlCommand("[servicios_reportes_monitor_resultados] '" + f1 + "','" + f2 + "','activo',"+establecimiento+","+departamento+","+cuestionario , conexion_web);
            try
            {
                conexion_web.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new monitor_servicios_resultados_cuestionarios()
                        {
                            folio = int.Parse(lector["folio"].ToString()),
                            activo_por_departamento = lector["activo_por_departamento"].ToString(),
                            folio_activo = int.Parse(lector["folio_activo"].ToString()),
                            activo = lector["activo"].ToString(),
                            criterio = lector["criterio"].ToString(),
                            aplicador = lector["aplicador"].ToString(),
                            responsable = lector["responsable"].ToString(),
                            solucion_si = int.Parse(lector["si"].ToString()),
                            solucion_no = int.Parse(lector["no"].ToString()),
                            solucion_na = int.Parse(lector["na"].ToString()),
                            promedio = double.Parse(lector["si"].ToString()) / (double.Parse(lector["si"].ToString()) + double.Parse(lector["no"].ToString())) * 100
                        });
                    }
                }
            }
            catch
            {
                return lista;
            }
            return lista;
        }
        public List<string> PostObservaciones(int activo)
        {
            var lista = new List<string>();
            SqlCommand comando = new SqlCommand("select observacion from servicio_cuestionario_observaciones where folio_resultado= " + activo, conexion_web);
            try
            {
                conexion_web.Open();
                lector = comando.ExecuteReader();

                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add((string)lector["observacion"]);
                    }
                }
            }
            catch
            {
                return null;
            }
            conexion_web.Close();
            return lista;
        }
    }
}