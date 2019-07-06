using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.monitor_orden_compra_interna;

namespace WebApplication.Manager.monitor_orden_compra_interna
{
    public class Manager_monitor_orden_compra_interna
    {
        private SqlConnection CONEXION_SCOI = new ConexionesSQL().Scoi();
        private SqlDataReader LECTOR;

        public List<ModeloOrdenCI> Obtener(string f1, string f2, string tipo_orden, string estatus, string tipo_recibe, int recibe, int establecimiento, string cod_prod) {
            List<ModeloOrdenCI> lista = new List<ModeloOrdenCI>();
            List<Modelo_monitor_orden_compra_interna> consulta = Consultar(f1,f2,tipo_orden,estatus,tipo_recibe,recibe,establecimiento,cod_prod);

            foreach (Modelo_monitor_orden_compra_interna orden in consulta)
            {
                if (lista.FindIndex(e=> orden.folio_scoi_oci == e.Folio)==-1)
                {
                    lista.Add(new ModeloOrdenCI {

                        Folio = orden.folio_scoi_oci,
                        Folio_BMS = orden.folio_bms,
                        Folio_servicio = orden.folio_servicio,
                        Folio_establecimiento_solicita = orden.cod_estab,
                        Establecimiento_solicita = orden.establecimiento_solicito,
                        Establecimiento_surte = orden.establecimiento_surte,
                        Fecha_mod = orden.fecha_ultima_modificacion,
                        Semana_anio = orden.semana_del_anio,
                        Anio = orden.anio,
                        Mes = orden.mes,
                        Tipo = orden.tipo_orden_compra_interna,
                        Estatus = orden.estatus,

                        Productos = ListaProductos(Productos:consulta.Where(e => orden.folio_scoi_oci == e.folio_scoi_oci).ToList()),
                        Detalle = new ModeloDescripcionCI {
                            Solicito = orden.persona_solicito_oci,
                            Tipo_solicitante = orden.tipo_de_solicitante,
                            Elaboro = orden.empleado_elaboro_oci,
                            Autorizo = orden.empleado_autorizo_oci,
                            Surtio = orden.empleado_surtio_oci,
                            Id_recoge = orden.usuario_recoge,
                            Recoge = orden.persona_recoge_mercancia,
                            Tipo_recoge = orden.tipo_persona_recoge,
                            Uso_mercancia = orden.uso_de_mercancia
                        },
                    });
                }
            }

            return lista;
        }

        private List<ModeloProductoCI> ListaProductos( List<Modelo_monitor_orden_compra_interna> Productos)
        {
            List<ModeloProductoCI> lista = new List<ModeloProductoCI>();
            foreach (Modelo_monitor_orden_compra_interna item in Productos)
            {
                lista.Add(new ModeloProductoCI {
                    Codigo = item.cod_prod,
                    Descripcion = item.descripcion,
                    Cantida = item.cantidad,
                    Abrebiatura = item.abreviatura,
                    Ultimo_costo = item.ultimo_costo,
                    Costo_promedio = item.costo_promedio,
                    Precio_venta = item.precio_venta,
                    Total = item.Total
                });
            }
            return lista;
        }

        private List<Modelo_monitor_orden_compra_interna> Consultar(string f1,string f2,string tipo_orden,string estatus,string tipo_recibe,int recibe ,int establecimiento, string cod_prod)
        {
            List<Modelo_monitor_orden_compra_interna> lista = new List<Modelo_monitor_orden_compra_interna>();
            string query = string.Format("exec monitor_orden_compra_interna '{0}','{1}','{2}','{3}','{4}',{5},{6},'{7}';",
                f1,f2, tipo_orden, estatus, tipo_recibe,recibe, establecimiento, cod_prod);
            SqlCommand comando = new SqlCommand(query,CONEXION_SCOI);

            CONEXION_SCOI.Open();

            LECTOR = comando.ExecuteReader();
            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    lista.Add(new Modelo_monitor_orden_compra_interna {
                        tipo_orden_compra_interna = LECTOR["tipo_orden_compra_interna"].ToString(),
                        cod_estab = int.Parse( LECTOR["cod_estab"].ToString()),
                        establecimiento_solicito = LECTOR["establecimiento_solicito"].ToString(),
                        folio_scoi_oci = int.Parse(LECTOR["folio_scoi_oci"].ToString()),
                        fecha_ultima_modificacion = LECTOR["fecha_ultima_modificacion"].ToString(),
                        semana_del_anio = int.Parse(LECTOR["semana_del_año"].ToString()),
                        mes  = LECTOR["mes"].ToString(),
                        anio = int.Parse(LECTOR["año"].ToString()),
                        estatus = LECTOR["estatus"].ToString(),
                        folio_bms = LECTOR["folio_bms"].ToString(),
                        establecimiento_surte = LECTOR["establecimiento_surte"].ToString(),
                        folio_servicio = int.Parse(LECTOR["folio_servicio"].ToString()),
                        persona_solicito_oci = LECTOR["persona_solicito_oci"].ToString(),
                        tipo_de_solicitante = LECTOR["tipo_de_solicitante"].ToString(),
                        uso_de_mercancia = LECTOR["uso_de_mercancia"].ToString(),
                        cod_prod = LECTOR["cod_prod"].ToString(),
                        descripcion = LECTOR["descripcion"].ToString(),
                        cantidad = double.Parse(LECTOR["cantidad"].ToString()),
                        abreviatura = LECTOR["abreviatura"].ToString(),
                        ultimo_costo = double.Parse(LECTOR["ultimo_costo"].ToString()),
                        costo_promedio = double.Parse(LECTOR["costo_promedio"].ToString()),
                        precio_venta = double.Parse(LECTOR["precio_venta"].ToString()),
                        Total = double.Parse(LECTOR["Total"].ToString()),
                        empleado_elaboro_oci = LECTOR["empleado_elaboro_oci"].ToString(),
                        empleado_autorizo_oci = LECTOR["empleado_autorizo_oci"].ToString(),
                        usuario_recoge = LECTOR["usuario_recoge"].ToString(),
                        empleado_surtio_oci = LECTOR["empleado_surtio_oci"].ToString(),
                        persona_recoge_mercancia = LECTOR["persona_recoge_mercancia"].ToString(),
                        tipo_persona_recoge = LECTOR["tipo_persona_recoge"].ToString(),
                    });
                }
            }

            CONEXION_SCOI.Close();

            return lista;
        }
    }
}