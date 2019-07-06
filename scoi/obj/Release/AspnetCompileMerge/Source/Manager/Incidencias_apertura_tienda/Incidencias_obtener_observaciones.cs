using api_seguimiento.Models.Incidencias_apertura_tienda;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using api_seguimiento.objetos;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.Incidencias_apertura_tienda
{
    public class Incidencias_obtener_observaciones
    {
        public List<Incidencias_cuestionario> Observaciones { get; set;}

        public Incidencias_obtener_observaciones(int Folio, string Fecha)
        {
            Observaciones = Lista_observaciones(Folio, Fecha);
        }

        private List<Incidencias_cuestionario> Lista_observaciones(int Folio, string Fecha)
        {
            List<Incidencias_cuestionario> lista = new List<Incidencias_cuestionario>();
            List<Incidencias_crud_sql> datos = Consultar(Folio,Fecha);

            foreach (Incidencias_crud_sql dato in datos)
            {
                int index = lista.FindIndex(e=>e.Cuestionario == dato.cuestionario);
                if (index == -1)
                {
                    List<Incidencias_crud_sql> filtro = datos.Where(e => e.cuestionario == dato.cuestionario).ToList();
                    lista.Add(
                        new Incidencias_cuestionario(filtro) {
                            Cuestionario= dato.cuestionario
                        });
                }
            }

            return lista;
        }
        private List<Incidencias_crud_sql> Consultar(int Folio, string Fecha)
        {
            List<Incidencias_crud_sql> lista = new List<Incidencias_crud_sql>();
            SqlConnection conexion = new ConexionesSQL().Web();
            SqlDataReader lector;

            string Query = string.Format("exec check_list_observaciones {0},'{1}';", Folio,Fecha);

            SqlCommand comando = new SqlCommand(Query,conexion);
            try
            {
                conexion.Open();
                lector = comando.ExecuteReader();

                if (lector.HasRows)
                    while (lector.Read())
                    {
                        lista.Add(new Incidencias_crud_sql
                        {
                            folio = (int)lector["folio"],
                            cuestionario = (string)lector["cuestionario"],
                            Usuario = (string)lector["usuario"],
                            pregunta = (string)lector["pregunta"],
                            posicion = (int)lector["posicion"],
                            observaciones = (string)lector["observaciones"],
                            solucion = (int)lector["solucion"],
                            tipo_solucion = (string)lector["tipo_solucion"]
                        });
                    }
            }
            catch (Exception e){
                lista.Add(new Incidencias_crud_sql {
                    observaciones= Query,
                    folio= lista.Count,
                    tipo_solucion= e.ToString()
                });
            }
            conexion.Close();

            return lista;
        }


    }
}