using api_seguimiento.objetos;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Http;

namespace api_seguimiento.Controllers.matrices
{
    public class Lista_matricesController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_scoi = sql_izagar.Scoi();
        public SqlDataReader lector;

        // POST api/<controller>
        public IList<Matriz> PostAll()
        {
            var lista = new List<Matriz>();
            SqlCommand comando = new SqlCommand("select * from matrices", conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Matriz()
                        {
                            folio = int.Parse(lector["folio"].ToString()),
                            nombre = lector["matriz"].ToString(),
                            folio_establecimiento = int.Parse(lector["folio_establecimiento"].ToString()),
                            fecha = lector["fecha"].ToString(),
                            fecha_ultima_modificacion = lector["fecha_ultima_modificacion"].ToString(),
                            fecha_cancelacion = lector["fecha_cancelado"].ToString(),
                            estatus = lector["status"].ToString(),
                            usuario_ultima_modificacion = int.Parse(lector["usuario_ultima_modificacion"].ToString())
                        });
                    }
                }
                conexion_scoi.Close();
            }
            catch {
                return lista;
            }
            return lista;
        }
        public IList<Matriz> PostFolio_establecimiento(int folio_establecimiento) {
            var lista = new List<Matriz>();
            SqlCommand comando = new SqlCommand("select * from matrices where folio_establecimiento=" + folio_establecimiento, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Matriz()
                        {
                            folio = int.Parse(lector["folio"].ToString()),
                            nombre = lector["matriz"].ToString(),
                            folio_establecimiento = int.Parse(lector["folio_establecimiento"].ToString()),
                            fecha = lector["fecha"].ToString(),
                            fecha_ultima_modificacion = lector["fecha_ultima_modificacion"].ToString(),
                            fecha_cancelacion = lector["fecha_cancelado"].ToString(),
                            estatus = lector["status"].ToString(),
                            usuario_ultima_modificacion = int.Parse(lector["usuario_ultima_modificacion"].ToString())
                        });
                    }
                }
                conexion_scoi.Close();
            }
            catch {
                return lista;
            }
            return lista;
        }
    }
}