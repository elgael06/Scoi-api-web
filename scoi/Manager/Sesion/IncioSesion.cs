using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace WebApplication.Manager.Sesion
{
    public class IncioSesion
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_web = sql_izagar.Web();
        public SqlDataReader lector;

        public Login Get(string usr, string pasword)
        {
            Login usuario = new Login();
            byte[] array = Encoding.ASCII.GetBytes(convertir_asii(pasword));
            pasword = "pasword:" + Convert.ToBase64String(array);

            SqlCommand comando = new SqlCommand("verificar_sesion_usuario '" + usr + "','" + pasword + "'", conexion_web);
            try
            {
                conexion_web.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    lector.Read();
                    usuario = new Login()
                    {
                        id_usiario = (int)lector["id_usuario"],
                        nombre = (string)lector["nombre_usuario"],
                        nombre_completo_usuario = (string)lector["nombrecompleto_usuario"],
                        id_scoi = (int)lector["id_scoi"],
                        foto = "data:image/jpeg;base64," + Convert.ToBase64String((byte[])lector["foto"])
                    };
                }
                conexion_web.Close();
            }
            catch
            {

            }
            return usuario;
        }

        public int AccesoUrl(int id,int url)
        {
            int acceso = 0;
            string query = string.Format("exec acceso_permiso_url_usuario {0},{1};", id,url);
            SqlCommand comando = new SqlCommand(query, conexion_web);

            conexion_web.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                lector.Read();
                acceso = int.Parse(lector["acceso"].ToString());
            }

            conexion_web.Close();
            return acceso;
        }
        public string convertir_asii(string dato)
        {
            string auxiliar = "";
            int n;
            int chart;
            string pos;
            for (n = 0; n < dato.Length; n++)
            {
                pos = dato[n].ToString();
                chart = (int)Convert.ToChar(pos);
                if (n > 0)
                {
                    auxiliar += "," + chart;
                }
                else
                {
                    auxiliar += "" + chart;
                }
            }

            return auxiliar;
        }
    }
}