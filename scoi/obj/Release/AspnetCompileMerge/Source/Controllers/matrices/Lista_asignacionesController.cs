using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_seguimiento.Controllers.matrices
{
    public class Lista_asignacionesController : ApiController
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_scoi = sql_izagar.Scoi();
        public SqlDataReader lector;

        // POST api/<controller>
        public IList<Matriz_asignacion> PostAll()
        {
            var lista = new List<Matriz_asignacion>();
            SqlCommand comando = new SqlCommand("[matrices_asignadas]", conexion_scoi);
            conexion_scoi.Open();
            lector = comando.ExecuteReader();
            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    lista.Add(new Matriz_asignacion()
                    {
                        folio = int.Parse(lector["folio"].ToString()),
                        folio_matriz = int.Parse(lector["folio_matriz"].ToString()),
                        matriz = lector["matriz"].ToString(),
                        id_usuario = int.Parse(lector["id_usuario"].ToString()),
                        usuario = lector["usuario"].ToString(),
                        fecha_asignacion = lector["fecha_asignacion"].ToString(),
                        fecha = lector["fecha"].ToString(),
                        folio_establecimiento = int.Parse(lector["folio_establecimiento"].ToString()),
                        establecimiento = lector["establecimiento"].ToString(),
                        estatus = (string)lector["estatus"]
                    });
                }
            }
            conexion_scoi.Close();

            return lista;
        }
        public IList<Matriz_asignacion> PosFolio_establecimiento(int Folio_establecimiento) {
            var lista = new List<Matriz_asignacion>();
            SqlCommand comando = new SqlCommand("[matrices_asignadas_por_establecimiento] " + Folio_establecimiento, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Matriz_asignacion()
                        {
                            folio = int.Parse(lector["folio"].ToString()),
                            folio_matriz = int.Parse(lector["folio_matriz"].ToString()),
                            matriz = lector["matriz"].ToString(),
                            id_usuario = int.Parse(lector["id_usuario"].ToString()),
                            usuario = lector["usuario"].ToString(),
                            fecha_asignacion = lector["fecha_asignacion"].ToString(),
                            fecha = lector["fecha"].ToString(),
                            folio_establecimiento = int.Parse(lector["folio_establecimiento"].ToString()),
                            establecimiento = lector["establecimiento"].ToString(),
                            estatus =  (string)lector["estatus"]
                        });
                    }
                }
                conexion_scoi.Close();
            }
            catch {
                return lista;
            }
            return lista;
        }
        public IList<Matriz_asignacion> PosEstatus(string estatus)
        {
            var lista = new List<Matriz_asignacion>();
            SqlCommand comando = new SqlCommand("[matrices_asignadas_por_estatus] " + estatus, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Matriz_asignacion()
                        {
                            folio = int.Parse(lector["folio"].ToString()),
                            folio_matriz = int.Parse(lector["folio_matriz"].ToString()),
                            matriz = lector["matriz"].ToString(),
                            id_usuario = int.Parse(lector["id_usuario"].ToString()),
                            usuario = lector["usuario"].ToString(),
                            fecha_asignacion = lector["fecha_asignacion"].ToString(),
                            fecha = lector["fecha"].ToString(),
                            folio_establecimiento = int.Parse(lector["folio_establecimiento"].ToString()),
                            establecimiento = lector["establecimiento"].ToString(),
                            estatus = (string)lector["estatus"]
                        });
                    }
                }
                conexion_scoi.Close();
            }
            catch
            {
                return lista;
            }
            return lista;
        }
        public string PostAsignacion(string Asignacion)
        {
            int folio=0;
            SqlCommand comando = new SqlCommand("[matriz_asignada_guardar] " + Asignacion, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    lector.Read();
                    folio = lector.GetInt32(0);
                }
                conexion_scoi.Close();
            }
            catch ( InvalidCastException e){
                return " Error : "+ e;
            }
            return "Guardado...\nFolio : " +  folio;
        }
        public string PostEliminar(int eliminar)
        {
            SqlCommand comando = new SqlCommand("delete matrices_asignacion where folio= " + eliminar, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                comando.ExecuteNonQuery();
                conexion_scoi.Close();
            }
            catch
            {
                return "Error Al Borrar!!!";
            }
            return "Asignacion Eliminada...\nFolio : " + eliminar;
        }
    }
   
}