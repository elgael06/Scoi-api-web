using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.Globales;

namespace WebApplication.Manager.Globales
{
    public class Manejos_fechas
    {
        private SqlConnection CONEXION_WEB = new ConexionesSQL().Web();
        private SqlDataReader LECTOR;

        public Parametros_semana_actual Semana_actual(string fecha)
        {
            Parametros_semana_actual semana = new Parametros_semana_actual();
            string query = string.Format("exec retornar_semana_anio '{0}';", fecha);

            SqlCommand comando = new SqlCommand(query, CONEXION_WEB);

            CONEXION_WEB.Open();

            LECTOR = comando.ExecuteReader();

            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    semana = new Parametros_semana_actual
                    {
                        Lunes = LECTOR["Lunes"].ToString(),
                        Domingo = LECTOR["Domingo"].ToString(),
                        Semana = LECTOR["Semana"].ToString(),
                        Anio = LECTOR["Anio"].ToString(),
                    };
                }
            }

            CONEXION_WEB.Close();
            
            return semana;
        }
    }
}