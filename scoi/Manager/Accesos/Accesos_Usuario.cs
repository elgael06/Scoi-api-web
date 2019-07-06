using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using WebApplication.Models.Accesos;

namespace WebApplication.Manager.Accesos
{
    public class Accesos_Usuario
    {
        //abre la conexion a sql
        public SqlConnection conexion_web = new ConexionesSQL().Web();
        public SqlDataReader lector;

        public List<Accesos_menus_usuario> Obtener_Urls_accesos(int folio,int estatus) {
            List<Accesos_menus_usuario> lista = new List<Accesos_menus_usuario>();
            List<urls_sql> consulta = (estatus==1)? Obtener_Urls_accesos_SQL(folio) : Accesos_por_Usuario(folio);
            foreach (urls_sql dato in consulta)
            {
                int index = lista.FindIndex(e => e.Menu == dato.menu);
                if (index == -1)
                {
                    List<urls_sql> filtro = consulta.Where(e => e.menu == dato.menu).ToList();
                    lista.Add(new Accesos_menus_usuario(filtro)
                    {
                        Menu = dato.menu,
                        Icon_Menu = dato.icon_menu,
                    });
                }
            }
            return lista;
        }
        public List<urls_sql> Obtener_Urls_accesos_SQL(int folio) {
           List<urls_sql> lista_sql = new List<urls_sql>();

            string query = string.Format("exec acceso_menus_acceso_usuarios {0};", folio);
            SqlCommand comando = new SqlCommand(query,conexion_web);

            conexion_web.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    lista_sql.Add(new urls_sql() {
                        menu            = lector["menu"].ToString(),
                        icon_menu       = lector["icon_menu"].ToString(),
                        submenu         = lector["submenu"].ToString(),
                        icon_submenu    = lector["icon_submenu"].ToString(),
                        acceso          = lector["acceso"].ToString(),
                        url             = lector["url"].ToString(),
                        estatus         = lector["estatus"].ToString(),
                    });
                }
            }
            conexion_web.Close();
            return lista_sql;
        }
        public string Actualizar_accesos_usuarios(int id_usuario,List<Accesos_url_usuario> accesos) {
            foreach (Accesos_url_usuario acceso in accesos) {
                Acceso_por_usuario_estatus(acceso,id_usuario);
            }
            return "OK";
        }
        private List<urls_sql> Accesos_por_Usuario(int folio)
        {
            List<urls_sql> lista_sql = new List<urls_sql>();

            string query = string.Format("exec ACCESO_USUARIO_CHECAR {0};", folio);
            SqlCommand comando = new SqlCommand(query, conexion_web);

            conexion_web.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    lista_sql.Add(new urls_sql()
                    {
                        folio_acceso = int.Parse(lector["folio_acceso"].ToString()),
                        menu = lector["menu"].ToString(),
                        icon_menu = lector["icon_menu"].ToString(),
                        submenu = lector["submenu"].ToString(),
                        icon_submenu = lector["icon_submenu"].ToString(),
                        acceso = lector["acceso"].ToString(),
                        url = lector["url"].ToString(),
                        estatus = lector["estatus"].ToString(),
                    });
                }
            }
            conexion_web.Close();
            return lista_sql;
        }
        private void Acceso_por_usuario_estatus(Accesos_url_usuario acceso,int usuario) {
            string query = string.Format("acceso_menus_usuario_url_estatus {0},{1},'{2}'",
                acceso.Folio_acceso,usuario,acceso.Estatus);
            SqlCommand comando = new SqlCommand(query,conexion_web);
            conexion_web.Open();
            comando.ExecuteNonQuery();
            conexion_web.Close();
        }
        public string ComprobarNombreUsuarioWeb(string nombre,int id) {

            string query = string.Format("select id_usuario from usuarios where nombre_usuario = '{0}' and id_usuario != {1}", nombre,id);
            SqlCommand comando = new SqlCommand(query,conexion_web);
            conexion_web.Open();

            lector = comando.ExecuteReader();
            if (lector.HasRows)
            {
                nombre = "C";
            }
            else {
                nombre = "V";
            }
            conexion_web.Close();

            return nombre;
        }
    }
}