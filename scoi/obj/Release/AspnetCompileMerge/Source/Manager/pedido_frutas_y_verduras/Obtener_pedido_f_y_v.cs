using api_seguimiento.Models.pedido_frutas_y_verduras;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.pedido_frutas_y_verduras
{

    public class Obtener_pedido_f_y_v
    {
        public static ConexionesSQL sql_izagar = new ConexionesSQL();
        //abre la conexion a sql
        public SqlConnection conexion_scoi = sql_izagar.Scoi();
        public SqlDataReader lector;

        public IList<Categoria_frutas_y_verduras> Lista_Pedido() {
            var lista = new List<Categoria_frutas_y_verduras>();
            SqlCommand comando = new SqlCommand("exec inventarios_parciales_consulta_por_clasificadores	'SUPER V','0','0','= ''00002''','0','0','0';", conexion_scoi);
            try
            {
                conexion_scoi.Open();
                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(new Categoria_frutas_y_verduras()
                        {
                            Codigo_producto = lector["cod_prod"].ToString(),
                            Descripcion = lector["descripcion"].ToString(),
                            Existencia_teorica = double.Parse( lector["exist_piezas"].ToString() )

                        });
                        }
                }
            }
            catch {

            }
            return lista;
        }
    }
}