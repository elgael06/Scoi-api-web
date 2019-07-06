using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.Pedido_establecimiento;

namespace WebApplication.Manager.Pedido_establecimiento
{
    public class Embarquer_obtener_usuario_autoriza
    {
        SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        SqlDataReader lector;

        public Usuario_autiriza_embarque Consultar(string folio_usuario,string pedido,string embarque)
        {
            Usuario_autiriza_embarque usuario = new Usuario_autiriza_embarque();
            string query = string.Format("exec surtido_embarquer_obtener_usuario_autiriza '{0}';", folio_usuario);
            SqlCommand comand = new SqlCommand(query,conexion_scoi);

            conexion_scoi.Open();
            lector = comand.ExecuteReader();

            if (lector.HasRows)
            {
                lector.Read();
                usuario.Folio = int.Parse(lector["folio"].ToString());
                usuario.Nombre = lector["nombre"].ToString();
                usuario.Id_puesto = int.Parse(lector["id_puesto"].ToString());
                usuario.Puesto = lector["puesto"].ToString();
            }
            conexion_scoi.Close();
            if (usuario.Folio > 0)
            {
                usuario.Respuesta = Guardar_registro(usuario,pedido,embarque);
            }

            return usuario;
        }
        private string Guardar_registro(Usuario_autiriza_embarque usuario, string pedido, string embarque)
        {
            string query = string.Format("insert into surtido_embarque_registro_autorizacion (folio_usuario_autorizo,id_puesto,pedido,embarque )" +
                " values({0},{1},'{2}','{3}');",
              usuario.Folio, usuario.Id_puesto, pedido, embarque);

            SqlCommand commando = new SqlCommand(query, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                commando.ExecuteNonQuery();
                conexion_scoi.Close();
            }
            catch(Exception e) {
                return e.ToString();
            }
            return "Listo";
        }
    }
}
/*
 folio,
	nombre,
	id_puesto,
	puesto
     */
