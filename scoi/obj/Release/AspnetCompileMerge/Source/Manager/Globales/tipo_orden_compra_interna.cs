using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Manager.Globales
{
    public class tipo_orden_compra_interna
    {
        private SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        private SqlDataReader lector;
        public List<string> Lista = new List<string>();

        public tipo_orden_compra_interna()
        {   
            string query = "select tipo_orden_compra_interna from orden_compra_interna_tipos";
            SqlCommand comando = new SqlCommand(query, conexion_scoi);

            conexion_scoi.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    Lista.Add(lector["tipo_orden_compra_interna"].ToString());
                }
            }
            conexion_scoi.Close();
        }
    }
}