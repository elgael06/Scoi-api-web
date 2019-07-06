using api_seguimiento.Models.Matrices;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.Matrices
{
    public class Obtener_conceptos
    {
        private List<Matrices_conceptos> Lista_conceptos = new List<Matrices_conceptos>();
        private Matrices_conceptos Concepto = new Matrices_conceptos();

        // la conexion a sql
        SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        SqlDataReader lector;

        public List<Matrices_conceptos> Todos()
        {
            ConsultarTodos();
            return Lista_conceptos;
        }

        public Matrices_conceptos Editar(Matrices_conceptos concepto)
        {
            Editar_concepto(concepto);
            return Concepto;
        }

        //metodos conexiones SQL

        private void ConsultarTodos()
        {
            string query = "select folio, concepto, abreviatura, status, convert(varchar(20), fecha, 103) as fecha,convert(varchar(20), ultima_modificacion, 103) as ultima_modificacion from matrices_conceptos";
            SqlCommand comando = new SqlCommand(query,conexion_scoi);
            
            conexion_scoi.Open();
            lector = comando.ExecuteReader();
            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    Lista_conceptos.Add(
                        new Matrices_conceptos() {
                            Folio              = (int)lector["folio"],
                            Concepto           = (string)lector["concepto"],
                            Abreviatura        = (string)lector["Abreviatura"],
                            Estatus            = (string)lector["status"],
                            Fecha              = (string)lector["fecha"],
                            Fecha_modificacion = (string)lector["ultima_modificacion"]
                        });
                }
            }
            conexion_scoi.Close();
        }
        private void Editar_concepto(Matrices_conceptos concepto)
        {
            Concepto = concepto;
            string query = string.Format("exec matrices_modificar_concepto {0},'{1}','{2}','{3}';",
                concepto.Folio,concepto.Concepto,concepto.Abreviatura,concepto.Estatus);
            SqlCommand comando = new SqlCommand(query,conexion_scoi);
            conexion_scoi.Open();
            lector = comando.ExecuteReader();

            lector.Read();
            Concepto.Folio = (int)lector["folio"];
            conexion_scoi.Close();
        }
    }
}