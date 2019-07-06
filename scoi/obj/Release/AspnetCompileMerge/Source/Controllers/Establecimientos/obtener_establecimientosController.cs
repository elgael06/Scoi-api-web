using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_seguimiento.Controllers.Establecimientos
{
    public class obtener_establecimientosController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_scoi = sql_izagar.Scoi();
        public SqlDataReader lector;
        // posy api/<controller>
        public IList<Establecimiento> PostAll()
        {
            var lista = new List<Establecimiento>();
            SqlCommand comando = new SqlCommand("select folio,nombre,status from tb_establecimiento", conexion_scoi);
            try {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Establecimiento
                        {
                            folio = lector.GetInt32(0),
                            nombre = lector.GetString(1),
                            estatus = "" + lector.GetInt32(2)
                        });
                    }
                }
                conexion_scoi.Close();
            }
            catch{
                return lista;
            }
            return lista;
        }

        // post api/<controller>/5
        public Establecimiento PostFolio(int folio)
        {
            Establecimiento dato = new Establecimiento();
            SqlCommand comando = new SqlCommand("select folio,nombre,status from tb_establecimiento where folio=" +folio, conexion_scoi);
            try {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    lector.Read();
                    dato.folio = lector.GetInt32(0);
                    dato.nombre = lector.GetString(1);
                    dato.estatus = "" + lector.GetInt32(2);
                    conexion_scoi.Close();
                }
            }
            catch{
                return dato;
            }
        return dato;
        }
    }
}