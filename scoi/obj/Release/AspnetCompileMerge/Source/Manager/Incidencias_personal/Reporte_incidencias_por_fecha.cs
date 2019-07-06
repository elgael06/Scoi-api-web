using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.Incidencias_personal;

namespace WebApplication.Manager.Incidencias_personal
{
    public class Reporte_incidencias_por_fecha
    {
        // la conexion a sql
        SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        SqlDataReader lector;

        public List<Incidencias_checador_reporte_por_dia> Lista = new List<Incidencias_checador_reporte_por_dia>();

        public List<Incidencias_checador_reporte_por_dia> ObtenerReporte(string fecha1, string fecha2)
        {
            string query = string.Format("exec incidencias_checador_web '{0}','{1}'; ", fecha1, fecha2);

            SqlCommand comando = new SqlCommand(query,conexion_scoi);

            conexion_scoi.Open();

            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    Lista.Add(new Incidencias_checador_reporte_por_dia {
                        Folio = int.Parse(lector["folio_empleado"].ToString()),
                        Nombre = lector["nombre"].ToString(),
                        Hora = lector["hora"].ToString(),
                        Fecha = lector["fecha"].ToString(),
                        Movimiento = lector["entosal"].ToString(),
                    });
                }
            }

            conexion_scoi.Close();
            return Lista;
        }
    }
}