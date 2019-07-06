using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_seguimiento.Controllers.revicion_servicios
{
    public class guardar_zonaController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_scoi = sql_izagar.Scoi();
        public SqlDataReader lector;

        // POST api/<controller>
        public string PostGuardar(string zona)
        {
            SqlCommand comando = new SqlCommand("[servicios_guardar_actualizar_zonas_ckl] " + zona, conexion_scoi);
            int folio;
            conexion_scoi.Open();
            lector= comando.ExecuteReader();
            lector.Read();
            folio = lector.GetInt32(0);
            conexion_scoi.Close();
            return "Guardado...\n Folio:" + folio;
        }
    }
}