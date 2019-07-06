using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.Pedido_establecimiento;

namespace WebApplication.Manager.Pedido_establecimiento
{
    public class Monitor_embarque_surtido
    {
        SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        SqlDataReader lector;

        public List<Monitor_embarques_surtidos> ObteberEmbarques() {
            List<Monitor_embarques_surtidos> Lista = new List<Monitor_embarques_surtidos>();

            string query = string.Format("exec monitor_autorizacion_surtido_embarque;");

            SqlCommand comand = new SqlCommand(query,conexion_scoi);

            conexion_scoi.Open();

            lector = comand.ExecuteReader();
            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    Lista.Add( new Monitor_embarques_surtidos {
                        Folio = int.Parse( lector["folio"].ToString()),
                        Folio_usuario_autorizo = int.Parse( lector["folio_usuario_autorizo"].ToString()),
                        Usuario_autorizo = lector["usuario_autorizo"].ToString(),
                        Id_puesto = int.Parse( lector["id_puesto"].ToString()),
                        Puesto = lector["puesto"].ToString(),
                        Pedido = lector["pedido"].ToString(),
                        Embarque = lector["embarque"].ToString(),
                        Fecha = lector["fecha"].ToString(),
                    });
                }

            }

            conexion_scoi.Close();

            return Lista;
        }

    }
}

/*
 
     folio_usuario_autorizo,
usuario_autorizo,
id_puesto,
puesto,
pedido,
embarque,
fecha
     */
