using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_precio_competencia;

namespace WebApplication.Manager.Monitor_precio_competencia
{
    public class Obtener_precios_de_competencia_por_producto
    {
        private SqlConnection CONEXION_BMS = new ConexionesSQL().Bms();
        private SqlDataReader LECTOR;

        public List<Modelo_precios_de_competencia_por_producto> Consulta(string producto)
        {
            List<Modelo_precios_de_competencia_por_producto> lista = new List<Modelo_precios_de_competencia_por_producto>();

            string query = string.Format("exec sp_analisis_precios_de_competencia_por_producto '{0}'", producto);

            SqlCommand comando = new SqlCommand(query,CONEXION_BMS);

            CONEXION_BMS.Open();

            LECTOR = comando.ExecuteReader();

            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    lista.Add(new Modelo_precios_de_competencia_por_producto {
                        Fecha = LECTOR["FECHA"].ToString(),
                        Ultimo_Costo = double.Parse(LECTOR["ULTIMO_COSTO"].ToString()),
                        Costo_promedio = double.Parse(LECTOR["COSTO_PROMEDIO"].ToString()),
                        Margen = double.Parse(LECTOR["MARGEN"].ToString()),
                        Margen_meta = double.Parse(LECTOR["MARGEN_META"].ToString()),
                        Izagar = double.Parse(LECTOR["IZAGAR_PRECIO"].ToString()),

                        Bodart = new precios {
                            Normal= double.Parse(LECTOR["BODART_N"].ToString()),
                            Oferta= double.Parse(LECTOR["BODART_O"].ToString())
                        },
                        Ley = new precios
                        {
                            Normal = double.Parse(LECTOR["LEY_PCIO_N"].ToString()),
                            Oferta = double.Parse(LECTOR["LEY_PCIO_O"].ToString())
                        },
                        Lopez = new precios
                        {
                            Normal = double.Parse(LECTOR["LOPEZ_N"].ToString()),
                            Oferta = double.Parse(LECTOR["LOPEZ_O"].ToString())
                        },
                        Mesquitillo = new precios
                        {
                            Normal = double.Parse(LECTOR["MEZQUITILLO_N"].ToString()),
                            Oferta = double.Parse(LECTOR["MEZQUITILLO_O"].ToString())
                        },
                        Soriana = new precios
                        {
                            Normal = double.Parse(LECTOR["SORIANA_N"].ToString()),
                            Oferta = double.Parse(LECTOR["SORIANA_O"].ToString())
                        },
                        Teresita = new precios
                        {
                            Normal = double.Parse(LECTOR["TERESITA_N"].ToString()),
                            Oferta = double.Parse(LECTOR["TERESITA_O"].ToString())
                        },
                    });
                }
            }

            CONEXION_BMS.Close();

            return lista;
        }
    }
}