using api_seguimiento.Models.Pedido_establecimiento;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.Pedido_establecimiento
{
    public class pedido_envarques_por_establecimiento
    {

        SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        SqlDataReader lector;

        public List<Pedido_embarque> Envarque_por_establecimiento(string establecimineto)
        {
            return Consulta(establecimineto);
        }
        public List<Pedido_Productos_en_embarque> Consulta_Productos(string folio)
        {
            return Consulta_Productos_embarque(folio);
        }

        private List<Pedido_embarque> Consulta(string establecimineto) {
            List<Pedido_embarque> lista = new List<Pedido_embarque>();

            string query = string.Format("exec pedido_filtro_de_pedidos_pendientes_de_surtir '{0}';", establecimineto);

            try
            {
                SqlCommand comando = new SqlCommand(query, conexion_scoi);
                conexion_scoi.Open();

                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        lista.Add(
                            new Pedido_embarque()
                            {
                                Folio           = lector["folio"].ToString(),
                                Usuario_capturo = lector["usuario_captura"].ToString(),
                                Establecimiento = lector["estab"].ToString(),
                                Alterno         = lector["estab_alterno"].ToString(),
                                Elaboraccion    = lector["fecha_elaboracion"].ToString(),
                                Modificacion    = lector["ultima_modificacion"].ToString(),
                                Estatus_surtido = lector["status_surtido"].ToString()
                            });
                    }
                }

                conexion_scoi.Close();
            }
            catch { }

            return lista;
        }
        private List<Pedido_Productos_en_embarque> Consulta_Productos_embarque(string folio ) {
            List<Pedido_Productos_en_embarque> lista = new List<Pedido_Productos_en_embarque>();

            string query = string.Format("exec sp_mobile_select_embarque '{0}';", folio);

            try
            {
                SqlCommand comando = new SqlCommand(query, conexion_scoi);
                conexion_scoi.Open();

                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        double surtodo_ = double.Parse(lector["surtido"].ToString());
                        if (surtodo_ != 0)
                        {
                            lista.Add(
                                new Pedido_Productos_en_embarque()
                                {
                                    id_ped_estab_BMS = lector["id_ped_estab_BMS"].ToString(),
                                    id_inventario = lector["id_inventario"].ToString(),
                                    id_pedido = lector["id_pedido"].ToString(),
                                    cod_prod = lector["cod_prod"].ToString(),
                                    descripcion = lector["descripcion"].ToString(),
                                    disponible = double.Parse(lector["disponible"].ToString()),
                                    pedido = double.Parse(lector["pedido"].ToString()),
                                    pendiente = double.Parse(lector["pendiente"].ToString()),
                                    surtido = surtodo_,
                                    embarque = int.Parse(lector["embarque"].ToString()),
                                    ajuste = double.Parse(lector["ajuste"].ToString()),
                                    partida = int.Parse(lector["partida"].ToString())
                                });
                        }
                    }
                }

                conexion_scoi.Close();
            }
            catch { }

            return lista;
        }
    }
}