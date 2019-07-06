using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using WebApplication.Models.Manejador_usuarios;

namespace WebApplication.Manager.Sesion
{
    public class usuarios_acceso
    {
        //abre la conexion a sql
        public SqlConnection conexion_web = new ConexionesSQL().Web();
        public SqlDataReader lector;

        public List<Manejador_usuarios> Obtener_usuarios() => Obtener_usuarios_SQL();
        public bool ActualizarUsuario_web(Manejador_usuarios Usuario)
        {
            string query = string.Format("update usuarios set nombre_usuario='{0}',nombrecompleto_usuario='{1}',email_usuario='{2}',id_scoi={4} where id_usuario='{3}'",
                Usuario.nombre_usuario,Usuario.nombrecompleto_usuario,Usuario.email_usuario, Usuario.id_usuario, Usuario.id_scoi);

            SqlCommand comando = new SqlCommand(query, conexion_web);
            conexion_web.Open();
            comando.ExecuteNonQuery();
            conexion_web.Close();

            return true;
        }

        private List<Manejador_usuarios> Obtener_usuarios_SQL() {

            List<Manejador_usuarios> lista = new List<Manejador_usuarios>();

            string query = string.Format("select * FROM usuarios");
            SqlCommand comando = new SqlCommand(query,conexion_web);
            conexion_web.Open();
            lector = comando.ExecuteReader();
            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    lista.Add(new Manejador_usuarios() {
                        id_usuario=int.Parse(lector["id_usuario"].ToString()),
                        nombre_usuario = lector["nombre_usuario"].ToString(),
                        nombrecompleto_usuario = lector["nombrecompleto_usuario"].ToString(),
                        email_usuario = lector["email_usuario"].ToString(),
                        id_scoi= int.Parse(lector["id_scoi"].ToString()),
                        foto = "data:image/jpeg;base64," + Convert.ToBase64String((byte[])lector["foto"])
                    });
                }
            }
            return lista;
        }
        public int RestaurarPassword(string id) {
            string contrasenia = ConvertirPasword("1234567890");
            ActualizarPassword(id,contrasenia);

            return 1234567890;
        }
        public string CambioPassword(string id,string pass) {
            string contrasenia = ConvertirPasword(pass);
            return ActualizarPassword(id,contrasenia);
        }
        private string ActualizarPassword(string id,string pass ) {

            string query = string.Format("update usuarios set password_usuario= '{0}' where id_scoi='{1}'", pass,id);

            SqlCommand comando = new SqlCommand(query, conexion_web);
            conexion_web.Open();
            comando.ExecuteNonQuery();
            conexion_web.Close();

            return "OK";
        }


        private string ConvertirPasword(string pass) {
            string auxiliar = "";
            int chart = 0;
            char[] password = pass.ToCharArray();

            for(int n =0; n < password.Length; n++) {
                chart = Convert.ToInt32(password[n]);
                auxiliar += (n > 0) ? ("," + chart) : chart.ToString();
            }
            return "pasword:" + Convert.ToBase64String(Encoding.ASCII.GetBytes(auxiliar));
        }
    }
}