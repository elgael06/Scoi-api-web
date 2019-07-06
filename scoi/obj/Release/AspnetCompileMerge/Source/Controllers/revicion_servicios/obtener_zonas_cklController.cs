using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_seguimiento.Controllers
{

    public class obtener_zonas_cklController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_scoi = sql_izagar.Scoi();
        public SqlDataReader lector;

        // POST api/<controller>
        public IList<Servicios_Zona_ckl> PostAll()
        {
            var lista = new List<Servicios_Zona_ckl>();
            SqlCommand comando = new SqlCommand("select * from servicios_zonas_check_list", conexion_scoi);
            conexion_scoi.Open();
            lector = comando.ExecuteReader();
            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    lista.Add(new Servicios_Zona_ckl()
                    {
                        folio = lector.GetInt32(0),
                        nombre = lector.GetString(1),
                        Estatus = lector.GetString(2)
                    });
                }
            }
            conexion_scoi.Close();
            return lista;
        }
    }
}