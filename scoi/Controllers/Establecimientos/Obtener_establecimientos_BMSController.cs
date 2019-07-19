using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication.Controllers.Establecimientos
{
    public class Obtener_establecimientos_BMSController : ApiController
    {
        public SqlConnection conexion = new ConexionesSQL().Bms();
        public SqlDataReader lector;

        public IList<Establecimiento> PostAll()
        {
            var lista = new List<Establecimiento>();
            SqlCommand comando = new SqlCommand("select cod_estab,nombre from establecimientos", conexion);
            try
            {
                conexion.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Establecimiento
                        {
                            folio = int.Parse(lector["cod_estab"].ToString()),  //GetInt32(0),
                            nombre = lector["nombre"].ToString(),
                            estatus = "1"
                        });
                    }
                }
                conexion.Close();
            }
            catch
            {
                return lista;
            }
            return lista;
        }
    }
}
