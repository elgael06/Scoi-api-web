using api_seguimiento.Models.comparativo_resultados;
using api_seguimiento.Models.Estado_de_resultados;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.comparativo_resultados
{
    public class Comparativo
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_scoi = sql_izagar.Scoi();
        public SqlDataReader lector;

        public List<Establecimiento_res> Obtener_resultados_establecimiento(List<Resultado> lista) {

            List<Establecimiento_res> lista_establecimientos = new List<Establecimiento_res>();

                foreach (Resultado establecimiento in lista)
                {
                    var index = lista_establecimientos.FindIndex(a => a.folio_establecimiento == establecimiento.Folio_establecimiento);

                    if (index == -1)
                    {
                        List<Resultado> lista_auxiliar = lista.Where(a => a.Folio_establecimiento == establecimiento.Folio_establecimiento).ToList();

                        lista_establecimientos.Add(new Establecimiento_res(lista_auxiliar)
                        {
                            folio_establecimiento = establecimiento.Folio_establecimiento,
                            establecimiento = establecimiento.Establecimiento
                        });
                }
            }
            return lista_establecimientos;
        }
        public List<Concepto> Obtener_resultado_por_concepto() {


            return null;
        }
        public List<Resultado> Consulta_sql_estado_de_resultados(string fecha ,int meses) {
            List<Resultado> lista = new List<Resultado>();

            string query =  string.Format("exec monitor_estado_de_resultados '{0}',{1} ;",fecha, meses);

            SqlCommand comando = new SqlCommand(query, conexion_scoi) {
                CommandTimeout=50000
            };
            try
            {
                conexion_scoi.Open();

                lector = comando.ExecuteReader();

                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Resultado()
                        {
                            Folio_establecimiento = int.Parse(lector["cod_estab"].ToString()),
                            Establecimiento = lector["establecimimiento"].ToString(),
                            Concepto = lector["concepto"].ToString(),
                            Anio = int.Parse(lector["anio"].ToString()),
                            Mes = lector["mes"].ToString(),
                            Semana_del_anio = int.Parse(lector["semana_del_año"].ToString()),
                            Clasificacion = lector["clasificacion"].ToString(),
                            Movimiento = lector["tipo_movimiento"].ToString(),
                            Subclasificacion = lector["subclasificacion"].ToString(),
                            Total_Costo = double.Parse(lector["costo"].ToString()),
                            Total_Precio_venta = double.Parse(lector["precio_venta"].ToString())
                        });
                    }
                }
                conexion_scoi.Close();
            }
            catch {
                conexion_scoi.Close();
            }

            return lista;
        }
    }
}
