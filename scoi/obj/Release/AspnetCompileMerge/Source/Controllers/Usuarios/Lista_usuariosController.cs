using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Http;

namespace api_seguimiento.Controllers
{
    public class Lista_usuariosController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_scoi = sql_izagar.Scoi();
        public SqlDataReader lector;
        public IList<Usuario> PostAll()
        {
            var lista = new List<Usuario>();
            SqlCommand comando = new SqlCommand("[dh_curso_empleados_activos]", conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Usuario()
                        {
                            id_scoi = Int32.Parse(lector["id_scoi"].ToString()),
                            nombre_completo = lector["nombre_completo"].ToString(),
                            foto = "https://192.168.4.200:453/api/Lista_usuarios/?foto=" + lector["id_scoi"].ToString(),
                            folio_establecimiento = Int32.Parse(lector["folio_establecimiento"].ToString()),
                            establecimiento = lector["establecimiento"].ToString(),
                            departamento = lector["departamento"].ToString(),
                            puesto = lector["puesto"].ToString(),
                            escolaridad = lector["escolaridad"].ToString(),
                            turno = lector["turno"].ToString(),
                            horario = lector["horario"].ToString(),
                            estatus = lector["estatus_empleado"].ToString()
                        });
                    }
                }
            }
            catch{
                return lista;
            }
            return lista;
        }
        public Usuario PostFolio(int folio) {
            Usuario usr = new Usuario();
            SqlCommand comando = new SqlCommand("[dh_curso_empleados_activos] id_scoi," + folio, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    lector.Read();
                    usr = new Usuario()
                    {
                        id_scoi = Int32.Parse(lector["id_scoi"].ToString()),
                        nombre_completo = lector["nombre_completo"].ToString(),
                        foto = ":453/api/Lista_usuarios/?foto=" + lector["id_scoi"].ToString(),
                        folio_establecimiento = Int32.Parse(lector["folio_establecimiento"].ToString()),
                        establecimiento = lector["establecimiento"].ToString(),
                        departamento = lector["departamento"].ToString(),
                        puesto = lector["puesto"].ToString(),
                        escolaridad = lector["escolaridad"].ToString(),
                        turno = lector["turno"].ToString(),
                        horario = lector["horario"].ToString(),
                        estatus = lector["estatus_empleado"].ToString()
                    };
                }
                conexion_scoi.Close();
            }
            catch
            {
                return usr;
            }
            return usr;
        }
        public IList<Usuario> PostEstablecimiento(string establecimiento)
        {
            var lista = new List<Usuario>();
            Usuario usr = new Usuario();
            SqlCommand comando = new SqlCommand("[dh_curso_empleados_activos] Establecimiento, '" + establecimiento +"'", conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Usuario()
                        {
                            id_scoi = (int)lector["id_scoi"],
                            nombre_completo = lector["nombre_completo"].ToString(),
                            foto = "https://192.168.4.200:453/api/Lista_usuarios/?foto=" + lector["id_scoi"].ToString(),
                            folio_establecimiento = (int)lector["folio_establecimiento"],
                            establecimiento = lector["establecimiento"].ToString(),
                            departamento = lector["departamento"].ToString(),
                            puesto = lector["puesto"].ToString(),
                            escolaridad = lector["escolaridad"].ToString(),
                            turno = lector["turno"].ToString(),
                            horario = lector["horario"].ToString(),
                            estatus = lector["estatus_empleado"].ToString()
                        });
                    }
                }
            }
            catch
            {
                return lista;
            }
                return lista;
        }
        public string GetFoto(int foto) {
            string res="";
            SqlCommand comando = new SqlCommand("[dh_curso_empleados_activos] id_scoi," + foto, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    lector.Read();
                    byte[] dato = (byte[])lector["foto"];
                    res = "data:image/jpeg;base64," + Convert.ToBase64String(dato);
                }
                conexion_scoi.Close();
            }
            catch
            {
                return res;
            }
             return res;
        }
    }
}
