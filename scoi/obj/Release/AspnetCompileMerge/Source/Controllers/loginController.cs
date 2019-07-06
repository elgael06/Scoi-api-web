using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace api_seguimiento.Controllers
{
    public class loginController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_web = sql_izagar.Web();
        public SqlDataReader lector;
        // GET api/<controller>/5
        public Login Get(string usr,string pasword)
        {
            Login usuario = new Login();
            byte[] array = Encoding.ASCII.GetBytes(convertir_asii(pasword));
            pasword = "pasword:" + Convert.ToBase64String(array);
            string query = string.Format("verificar_sesion_usuario '{0}', '{1}';",
              usr, pasword);
            SqlCommand comando = new SqlCommand(query, conexion_web);
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
                        foto = "https://192.168.4.154:453/api/Lista_usuarios/?foto=" + (int)lector["id_scoi"]
                    };
                }
                conexion_web.Close();
            }
            catch
            {

            }
            return usuario;
        }

        // POST api/<controller>
        public Login PostAll(string usr,string pasword)
        {
            Login usuario = new Login();
            byte[] array = Encoding.ASCII.GetBytes(convertir_asii(pasword));
            pasword = "pasword:" + Convert.ToBase64String(array);
            string query = string.Format("verificar_sesion_usuario '{0}', '{1}';",
                         usr, pasword);
            SqlCommand comando = new SqlCommand(query, conexion_web);
            try
            {
                conexion_web.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows) {
                    lector.Read();
                    usuario = new Login() {
                        id_usiario = (int)lector["id_usuario"],
                        nombre = (string)lector["nombre_usuario"],
                        nombre_completo_usuario = (string)lector["nombrecompleto_usuario"],
                        id_scoi = (int)lector["id_scoi"],
                        foto = "https://192.168.4.154:453/api/Lista_usuarios/?foto=" + (int)lector["id_scoi"]
                    };
                }
                conexion_web.Close();
            }
            catch
            {

            }
            return usuario;
        }
        public string convertir_asii(string dato) {
            string auxiliar ="";
            int n;
            int chart;
            string pos;
            for (n=0;n< dato.Length ;n++) {
                pos = dato[n].ToString();
                chart = (int)Convert.ToChar(pos);
                if (n > 0)
                {
                    auxiliar += "," + chart;
                }
                else {
                    auxiliar += "" + chart;
                }
            }

            return auxiliar;
        }
    }
}