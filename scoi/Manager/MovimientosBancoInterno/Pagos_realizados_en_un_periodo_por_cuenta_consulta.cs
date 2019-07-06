using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.MovimientosBancoInterno;

namespace WebApplication.Manager.MovimientosBancoInterno
{
    public class Pagos_realizados_en_un_periodo_por_cuenta_consulta
    {
        private SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        private SqlDataReader lector;

        public List<concepto_compra_gasto> orden_de_pago_en_efectivo_reporte_por_periodo(string fechaInicio, string fechaTermino,string cuenta,string concepto) {
            List<Pagos_realizados_en_un_periodo_por_cuenta> resutados = comando_concepto_orden_de_pago_sql(fechaInicio,fechaTermino,cuenta,concepto);
            List<concepto_compra_gasto> lista = new List<concepto_compra_gasto>();

            return lista;
        }
        public List<Pagos_realizados_en_un_periodo_por_cuenta> comando_concepto_orden_de_pago_sql(string fechaInicio, string fechaTermino, string cuenta, string concepto) {
            List<Pagos_realizados_en_un_periodo_por_cuenta> lista = new List<Pagos_realizados_en_un_periodo_por_cuenta>();

            string query = string.Format("exec monitor_movimientos_banco_interno ;",
               fechaInicio,fechaTermino,cuenta,concepto);
            SqlCommand comando = new SqlCommand(query,conexion_scoi);

            conexion_scoi.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    lista.Add(new Pagos_realizados_en_un_periodo_por_cuenta() {
                        cod_estab                               = int.Parse(lector["cod_estab"].ToString()),
                        establecimimiento                       = lector["establecimimiento"].ToString(),
                        concepto_compra_gasto                   = lector["concepto_compra_gasto"].ToString(),
                        numero_de_cuenta                        = int.Parse(lector["numero_de_cuenta"].ToString()),
                        nombre_de_cuenta                        = lector["nombre_de_cuenta"].ToString(),
                        concepto                                = lector["concepto"].ToString(),
                        clasificacion                           = lector["clasificacion"].ToString(),
                        subclasificacion_estado_de_resultados   = lector["subclasificacion_estado_de_resultados"].ToString(),
                        tipo_movimiento_estado_de_resultados    = lector["tipo_movimiento_estado_de_resultados"].ToString(),
                        concepto_orden_de_pago                  = lector["concepto_orden_de_pago"].ToString(),
                        folio_de_pago                           = int.Parse(lector["folio_de_pago"].ToString()),
                        folio_orden_de_gasto                    = int.Parse( lector["folio_orden_de_gasto"].ToString()),
                        folio_corte_caja_chica                  = int.Parse( lector["folio_corte_caja_chica"].ToString()),
                        observaciones                           = lector["observaciones"].ToString(),
                        proveedor                               = lector["proveedor"].ToString(),
                        tipo_proveedor                          = lector["tipo_proveedor"].ToString(),
                        fecha                                   = lector["fecha_pago"].ToString(),
                        semana_del_año                          = int.Parse( lector["semana_del_año_pago"].ToString()),
                        mes                                     = lector["mes_pago"].ToString(),
                        anio                                    = int.Parse( lector["año_pago"].ToString()),
                        cantidad                                = double.Parse( lector["cantidad"].ToString()),
                        solicito                                = lector["solicito"].ToString(),
                        autorizo                                = lector["autorizo"].ToString(),
                        //fecha_inicial = lector["fecha_inicial"].ToString(),
                        //fecha_final = lector["fecha_final"].ToString(),
                        nombre_realizo_pago                     = lector["nombre_realizo_pago"].ToString(),
                        tipo                                    = lector["tipo"].ToString(),
                        forma_de_pago                           = lector["forma_de_pago"].ToString(),
                        tipo_recibe_pago                        = lector["tipo_recibe_pago"].ToString(),
                        folio_beneficiario                      = lector["folio_beneficiario"].ToString(),
                        recibe_pago                             = lector["recibe_pago"].ToString(),
                        folio_cheque                            = lector["folio_cheque"].ToString()
                    });
                }
            }

            conexion_scoi.Close();

            return lista;
        }
    }
}