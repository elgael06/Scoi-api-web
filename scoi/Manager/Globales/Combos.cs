using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApplication.Manager.Globales
{
    public class Combos
    {
        private SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        private SqlDataReader lector;

        public List<string> Lista_combos = new List<string>();

        public Combos(string tipo)
        {
            Consulta_combos_SQL(tipo);
        }
        private void Consulta_combos_SQL(string tipo)
        {
            Lista_combos = new List<string>();

            string query = string.Format("exec combos '{0}'; ", tipo);
            SqlCommand comando = new SqlCommand(query, conexion_scoi);

            conexion_scoi.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    Lista_combos.Add(lector["nombre"].ToString());
                }
            }
            conexion_scoi.Close();
        }
    }
}