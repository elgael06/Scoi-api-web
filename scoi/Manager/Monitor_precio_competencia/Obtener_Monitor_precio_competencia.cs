using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_precio_competencia;

namespace WebApplication.Manager.Monitor_precio_competencia
{
    public class Obtener_Monitor_precio_competencia
    {
        private SqlConnection CONEXION_BMS = new ConexionesSQL().Bms();
        private SqlDataReader LECTOR;
        public List<Model_pasillo> pasillos = new List<Model_pasillo>();
        public Modelo_pasillo_productos pasillo_8020 ;
        public int Total_productos { get; set; }
        public string errores { get; set; }

        public Obtener_Monitor_precio_competencia( string mes, string filtro ,string anio)
        {
            Ordenar_por_pasillo(mes, filtro, anio);
            //Consultar_datos(mes, filtro);
            //PruebaConexion();
        }
        private void Ordenar_por_pasillo(string mes, string filtro,string anio)
        {
            List<Model_monitor_precio_competencia> analisis = Consultar_datos(mes, filtro, anio);
            Total_productos = analisis.Count();

            pasillo_8020 = new Modelo_pasillo_productos(analisis.Where(e => e.clasificacion_8020 == "8020").ToList())
            {
                Pasillo = "8020"
            };

            foreach (Model_monitor_precio_competencia producto in analisis)
            {
                if (pasillos.FindIndex(p => p.Pasillo == producto.pasillo) == -1)
                {
                    pasillos.Add(new Model_pasillo(analisis.Where(p => p.pasillo == producto.pasillo).ToList())
                    {
                        Pasillo = producto.pasillo,
                    });
                }
            }
        }
        private List<Model_monitor_precio_competencia> Consultar_datos(string mes, string filtro,string anio)
        {
        List<Model_monitor_precio_competencia> datos = new List<Model_monitor_precio_competencia>();
        string query =  string.Format("exec sp_analisis_precios_de_competencia_mensual '{0}','{1}','{2}';",
                mes,filtro, anio);
        SqlCommand command = new SqlCommand(query,CONEXION_BMS);
            try
            {
                CONEXION_BMS.Open();
                command.CommandTimeout = 6000;
                LECTOR = command.ExecuteReader();

                if (LECTOR.HasRows)
                {
                    while (LECTOR.Read())
                    {
                        try
                        {
                            datos.Add(new Model_monitor_precio_competencia
                            {
                                familia = LECTOR["familia"].ToString(),
                                categoria = LECTOR["categoria"].ToString(),
                                clase_producto = LECTOR["clase_producto"].ToString(),
                                cod_prod = LECTOR["cod_prod"].ToString(),
                                descripcion = LECTOR["descripcion"].ToString(),
                                localizacion = LECTOR["localizacion"].ToString(),
                                pasillo = LECTOR["pasillo"].ToString(),
                                clasificacion_8020 = LECTOR["clasificacion_8020"].ToString(),
                                talla = LECTOR["talla"].ToString(),
                                Color = LECTOR["Color"].ToString(),
                                fecha = LECTOR["fecha"].ToString(),


                                precio_de_venta_captura = double.Parse(LECTOR["precio_de_venta_captura"].ToString()),
                                costo_promedio = double.Parse(LECTOR["costo_promedio"].ToString()),
                                ultimo_costo = double.Parse(LECTOR["ultimo_costo"].ToString()),
                                precio_de_venta = double.Parse(LECTOR["precio_de_venta"].ToString()),
                                precio_de_oferta_actual = double.Parse(LECTOR["precio_de_oferta_actual"].ToString()),

                                margen = double.Parse(LECTOR["margen"].ToString()),
                                margen_meta_familia = double.Parse(LECTOR["margen_meta_familia"].ToString()),
                                venta_ultimos_90_dias = double.Parse(LECTOR["venta_ultimos_90_dias"].ToString()),

                                LEY_PCIO_N = double.Parse(LECTOR["LEY_PCIO_N"].ToString()),
                                LEY_PCIO_O = double.Parse(LECTOR["LEY_PCIO_O"].ToString()),
                                SORIANA_N = double.Parse(LECTOR["SORIANA_N"].ToString()),
                                SORIANA_O = double.Parse(LECTOR["SORIANA_O"].ToString()),
                                TERESITA_N = double.Parse(LECTOR["TERESITA_N"].ToString()),
                                TERESITA_O = double.Parse(LECTOR["TERESITA_O"].ToString()),
                                BODART_N = double.Parse(LECTOR["BODART_N"].ToString()),
                                BODART_O = double.Parse(LECTOR["BODART_O"].ToString()),
                                MEZQUITILLO_N = double.Parse(LECTOR["MEZQUITILLO_N"].ToString()),
                                MEZQUITILLO_O = double.Parse(LECTOR["MEZQUITILLO_O"].ToString()),
                                LOPEZ_N = double.Parse(LECTOR["LOPEZ_N"].ToString()),
                                LOPEZ_O = double.Parse(LECTOR["LOPEZ_O"].ToString())
                            });
                        }
                        catch (Exception e)
                        {
                            errores = (string)LECTOR["familia"]+ " "+(string)LECTOR["familia"] + e.ToString();
                        }
                    }
                }
            }
            catch (Exception e) {
                errores = e.ToString();
            }
            CONEXION_BMS.Close();
            Total_productos = datos.Count();
            return datos;
        }
        private void PruebaConexion()
        {
            try
            {
                CONEXION_BMS.Open();
                Console.WriteLine("Funciona...");
                errores = "Conecto";
            }
            catch (Exception e)
            {
                errores = e.ToString();

            }
            CONEXION_BMS.Close();
        }
    }
}