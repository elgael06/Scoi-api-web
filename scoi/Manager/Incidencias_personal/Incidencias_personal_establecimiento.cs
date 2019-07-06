using api_seguimiento.Models.Incidencias_personal;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace api_seguimiento.Manager.Incidencias_personal
{
    public class Incidencias_personal_establecimiento
    {
        // la conexion a sql
        SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        SqlDataReader lector;

        public List<Departamento_incidencia> Checar_incidencias(int folio_establecimieto,int diferencia)
        {
            List<Departamento_incidencia> lista_depantamentos = new List<Departamento_incidencia>();
            List<Critterio_incidencia> criterios = Obtener_criterios();

            List<Establecimiento_incidencias> incidencias = Obtener_incidencias(folio_establecimieto, diferencia);

            foreach (Establecimiento_incidencias incidencia in incidencias)
            {
                int index = lista_depantamentos.FindIndex(departamento => departamento.Descripcion == incidencia.Departatento);
                if (index == -1)
                {
                    List<Establecimiento_incidencias> filtro = incidencias.Where(departamento => departamento.Departatento == incidencia.Departatento).ToList();
                    lista_depantamentos.Add(
                        new Departamento_incidencia(filtro) {
                            Descripcion = incidencia.Departatento,
                            Dia = incidencia.Dia,
                            Criterios = criterios
                        });
                }
            }
            return lista_depantamentos;
        }

        public void Guardar(List<Colaborador_incidencia> incidencias,int capturo,string dia) {
            //IList<Colaborador_incidencia> lista = incidencias;
            //Guardado_sql(lista[0], capturo, incidencias.Dia);
            foreach (Colaborador_incidencia colabirador in incidencias)
            {
                Console.WriteLine("Colaborador=>", colabirador.Nombre);
                Guardado_sql(colabirador, capturo, dia);
            }
        }

        private List<Establecimiento_incidencias> Obtener_incidencias(int folio_establecimieto, int diferencia)
        {
            // la conexion a sql
            SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
            SqlDataReader lector;
            List<Establecimiento_incidencias> incidencias = new List<Establecimiento_incidencias>();

            string query = string.Format("exec incidencias_personal_establecimiento {0},{1};", folio_establecimieto,diferencia);
            SqlCommand comando = new SqlCommand(query , conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();

                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        incidencias.Add(
                            new Establecimiento_incidencias()
                            {
                                Folio = int.Parse(lector["folio"].ToString()),
                                Nombre = lector["Nombre"].ToString(),
                                Puesto = lector["puesto"].ToString(),
                                Departatento = lector["departamento"].ToString(),
                                Incidencia = int.Parse(lector["incidencia"].ToString()),
                                Checador = lector["checador"].ToString().ToUpper(),
                                Color = lector["color"].ToString(),
                                Descripcion = lector["descripcion"].ToString(),
                                Dia = lector["dia_1"].ToString(),
                                Total_Puestos = int.Parse(lector["cantidad_de_puesto"].ToString())
                            }
                            );
                    }
                }
            }
            catch {

            }
            conexion_scoi.Close();
            
            return incidencias;
        }

        /*Criterio*/
        public List<Critterio_incidencia> Obtener_criterios() {
            List<Critterio_incidencia> lista = new List<Critterio_incidencia>();
            
            string query = string.Format("select * from incidencia_criterio_asistencia;");
            SqlCommand comando = new SqlCommand(query, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();

                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(
                            new Critterio_incidencia()
                            {
                                Folio = int.Parse(lector["folio"].ToString()),
                                Criterio = lector["criterio"].ToString(),
                                Color = lector["color"].ToString(),
                                Estatus = lector["estatus"].ToString()
                            }
                            );
                    }
                }
            }
            catch
            {

            }
            conexion_scoi.Close();


            return lista;
        }

        /*Guardado*/
        private void Guardado_sql(Colaborador_incidencia colaborador,int capturo,string fecha) {
            string desc = colaborador.Descripcion!=null? colaborador.Descripcion  : "";
            string query = string.Format("exec incidencias_personal_editar {0},'{1}',{2},{3},'{4}','{5}';",
                colaborador.Folio,colaborador.Checador,colaborador.Incidencia,capturo,fecha, desc);
            SqlCommand comando = new SqlCommand(query, conexion_scoi);
            try
            {
                conexion_scoi.Open();
                comando.ExecuteNonQuery();
                conexion_scoi.Close();
            }
            catch {

            }
        }
    }
}