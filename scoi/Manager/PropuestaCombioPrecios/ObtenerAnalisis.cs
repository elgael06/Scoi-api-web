using api_seguimiento.objetos;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using WebApplication.Models.Monitor_precio_competencia;
using WebApplication.Models.PropuestaCombioPrecios;

namespace WebApplication.Manager.PropuestaCombioPrecios
{
    public class ObtenerAnalisis
    {
        private SqlConnection CONEXION_BMS = new ConexionesSQL().Bms();
        private SqlDataReader LECTOR;

        public List<string> Localizacion = new List<string>();
        public List<string> Pasillo = new List<string>();
        public List<string> Clase = new List<string>();
        public List<string> Categoria = new List<string>();
        public List<string> Familia = new List<string>();
        public List<string> CanastaBasica = new List<string>();
        public List<string> Color = new List<string>();
        public List<string> Marca = new List<string>();
        public List<string> Clasificacion8020 = new List<string>();
        public List<string> zona = new List<string>();

        public List<ModeloProductoCambioPrecios> Productos = new List<ModeloProductoCambioPrecios>();

        public ObtenerAnalisis( string mes ,string filtro ,string anio)
        {
            Localizacion.Add("Todos");
            Pasillo.Add("Todos");
            Clase.Add("Todos");
            Categoria.Add("Todos");
            Familia.Add("Todos");
            CanastaBasica.Add("Todos");
            Color.Add("Todos");
            Marca.Add("Todos");
            Clasificacion8020.Add("Todos");
            zona.Add("Todos");

            Consultar(mes:mes,filtro:filtro,anio:anio);
            Indicadores();
        }

        private void Consultar(string mes, string filtro, string anio)
        {
            string query = string.Format("exec sp_monitor_analisis_precios_de_competencia_propuesta_cambio_precios '{0}','{1}','{2}'  ;", mes, filtro, anio);
            SqlCommand comando = new SqlCommand(cmdText: query, connection:CONEXION_BMS);

            CONEXION_BMS.Open();
            comando.CommandTimeout = 6000;
            LECTOR = comando.ExecuteReader();

            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    Productos.Add(new ModeloProductoCambioPrecios {
                        Codigo = LECTOR["cod_prod"].ToString(),
                        Descripcion = LECTOR["descripcion"].ToString(),

                        Costo_promedio = double.Parse(LECTOR["costo_promedio"].ToString()),
                        Ultimo_costo = double.Parse(LECTOR["ultimo_costo"].ToString()),

                        Precio_venta = double.Parse(LECTOR["precio_de_venta"].ToString()),
                        Precio_venta_nvo = double.Parse(LECTOR["precio_venta_nuevo"].ToString()),
                        Precio_venta_captura = double.Parse(LECTOR["precio_de_venta_captura"].ToString()),
                        Precio_oferta_actual = double.Parse(LECTOR["precio_de_oferta_actual"].ToString()),


                        Margen = double.Parse(LECTOR["margen"].ToString()),
                        Margen_nvo = double.Parse(LECTOR["margen"].ToString()),
                        Margen_familia = double.Parse(LECTOR["margen_meta_familia"].ToString()),
                        Venta_90_dias = double.Parse(LECTOR["venta_ultimos_90_dias"].ToString()),

                        Localizacion = LECTOR["localizacion"].ToString(),
                        Pasillo = LECTOR["pasillo"].ToString(),
                        Clase = LECTOR["clase_producto"].ToString(),
                        Categoria = LECTOR["categoria"].ToString(),
                        Familia = LECTOR["familia"].ToString(),
                        CanastaBasica = LECTOR["canasta_basica"].ToString(),
                        Color = LECTOR["color"].ToString(),
                        Marca = LECTOR["marca"].ToString(),
                        Precios_volumen =  JsonConvert.DeserializeObject(LECTOR["precios_volumen"].ToString()),
                        Clasificacion8020 = LECTOR["clasificacion_8020"].ToString(),
                        zona = LECTOR["zona"].ToString(),

                        Competencias = new ModeloCompetenciaCambioPrecios {
                            Bodart = new precios {
                                Normal = double.Parse(LECTOR["BODART_N"].ToString()),
                                Oferta = double.Parse(LECTOR["BODART_O"].ToString())
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
                        },
                    });
                }
            }

            CONEXION_BMS.Close();
        }

        private void Indicadores()
        {
            foreach (ModeloProductoCambioPrecios producto in Productos)
            {
                //
                EstaEnLista(lista: Localizacion, parametro: producto.Localizacion);
                //
                EstaEnLista(lista: Pasillo, parametro: producto.Pasillo);
                //
                EstaEnLista(lista: Clase, parametro: producto.Clase);
                //
                EstaEnLista(lista: Categoria, parametro: producto.Categoria);
                //
                EstaEnLista(lista: Familia, parametro: producto.Familia);
                //
                EstaEnLista(lista: CanastaBasica, parametro: producto.CanastaBasica);
                //
                EstaEnLista(lista: Color, parametro: producto.Color);
                //
                EstaEnLista(lista: Marca, parametro: producto.Marca);
                //
                EstaEnLista(lista: Clasificacion8020, parametro: producto.Clasificacion8020);
                //
                EstaEnLista(lista: zona, parametro: producto.zona);
            }
        }

        private void EstaEnLista(List<string> lista,string parametro)
        {
            if ( lista.FindIndex(e=>e==parametro) == -1 )
            {
                lista.Add(parametro);
            }
        }

        private string parseoString(string data) {
            string res = "";

            var reg = new Regex("\"tag\"\\s*:\\s*\"([\\w\\d,]*)\"");
            var matches = reg.Matches(data);

            foreach (Match match in matches)
            {
                if (match.Groups.Count <= 1)
                {
                    continue;
                }
                res += match.Groups[1].Value;
                Console.WriteLine(res);
            }

            return res;
        }
    }
}