using api_seguimiento.Models.Productos_clasificador;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.Productos_clasificador
{
    public class Clasificador_obtener_productos
    {
        public Clasificador_producto Obtener(string folio,string establecimiento) {
            return ObtenerProducto(folio, establecimiento);
        }
        Clasificador_producto ObtenerProducto(string folio, string establecimiento) {
            List<Clasificador_producto> lista = new List<Clasificador_producto>();

            SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
            SqlDataReader lector;

            string query = string.Format("exec pedido_busqueda_de_productos_por_establecimiento_y_por_servidor '{0}','{1}';", folio, establecimiento);

            //try
            //{
                SqlCommand comando = new SqlCommand(query, conexion_scoi);
                conexion_scoi.Open();

                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(
                            new Clasificador_producto()
                            {
                                Codigo          = lector["cod_prod"].ToString(),
                                Descripcion     = lector["descripcion"].ToString(),
                                Establecimiento = establecimiento,
                                Costo_promedio  = float.Parse( lector["costo_promedio"].ToString()),
                                Existencia_pz   = float.Parse(lector["existencia"].ToString()),
                                Fecha           = lector["fecha_actual"].ToString(),
                                Precio_venta    = float.Parse(lector["precio_venta"].ToString()),
                                Ultimo_costo    = float.Parse(lector["ultimo_costo"].ToString()),
                                Decimales       = Int16.Parse(lector["decimales"].ToString()),
                                Precio_volumen = (string)lector["precio_volumen"].ToString()
                            });
                    }
                }

                conexion_scoi.Close();
            //}
            //catch { }


            return lista[0];
        }
    }
}