using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.Ordenes_de_pago_en_efectivo;

namespace WebApplication.Manager.Ordenes_de_pago_en_efectivo
{
    public class Monitor_obtener_pagos_en_efectivo
    {
        private SqlConnection CONEXION_SCOI = new ConexionesSQL().Scoi();
        private SqlDataReader LECTOR;

        public List<Modelo_ordenes_de_pago_en_efectivo> Lista = new List<Modelo_ordenes_de_pago_en_efectivo>();
        public string consulta = "";

        public Monitor_obtener_pagos_en_efectivo(Filtro_pagos filtro ) {
            Lista = new List<Modelo_ordenes_de_pago_en_efectivo>();
            Obtener_pagos_SQL(filtro);
        }
        private void Obtener_pagos_SQL(Filtro_pagos filtro)
        {
            string beneficiario = filtro.beneficiario.Length>0 ? filtro.beneficiario : " ";
            string query = string.Format("exec monitor_movimientos_ordenes_de_pago_en_efectivo '{0}','{1}','{2}','{3}','{4}','{5}' ,'{6}';",
               filtro.f1,filtro.f2,filtro.cuenta,filtro.concepto_compra_o_gasto,filtro.tipo_beneficiario, beneficiario, filtro.concepto_orden_pago );
            consulta = query;
            SqlCommand comando = new SqlCommand(query,CONEXION_SCOI);
            CONEXION_SCOI.Open();

            LECTOR = comando.ExecuteReader();

            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    Lista.Add(new Modelo_ordenes_de_pago_en_efectivo() {
                        cod_estab                               = int.Parse(LECTOR["cod_estab"].ToString()),
                        establecimimiento                       = LECTOR["establecimimiento"].ToString(),
                        concepto_compra_gasto                   = LECTOR["concepto_compra_gasto"].ToString(),
                        numero_de_cuenta                        = int.Parse(LECTOR["numero_de_cuenta"].ToString()),
                        nombre_de_cuenta                        = LECTOR["nombre_de_cuenta"].ToString(),
                        concepto                                = LECTOR["concepto"].ToString(),
                        clasificacion                           = LECTOR["clasificacion"].ToString(),
                        subclasificacion_estado_de_resultados   = LECTOR["subclasificacion_estado_de_resultados"].ToString(),
                        tipo_movimiento_estado_de_resultados    = LECTOR["tipo_movimiento_estado_de_resultados"].ToString(),
                        concepto_orden_de_pago                  = LECTOR["concepto_orden_de_pago"].ToString(),
                        folio_de_pago                           = int.Parse(LECTOR["folio_de_pago"].ToString()),
                        folio_orden_de_gasto                    = int.Parse(LECTOR["folio_orden_de_gasto"].ToString()),
                        folio_corte_caja_chica                  = int.Parse(LECTOR["folio_corte_caja_chica"].ToString()),
                        observaciones                           = LECTOR["observaciones"].ToString(),
                        proveedor                               = LECTOR["proveedor"].ToString(),
                        tipo_proveedor                          = LECTOR["tipo_proveedor"].ToString(),
                        cantidad                                = double.Parse(LECTOR["cantidad"].ToString()),
                        solicito                                = LECTOR["solicito"].ToString(),
                        autorizo                                = LECTOR["autorizo"].ToString(),
                        nombre_realizo_pago                     = LECTOR["nombre_realizo_pago"].ToString(),
                        tipo                                    = LECTOR["tipo"].ToString(),
                        forma_de_pago                           = LECTOR["forma_de_pago"].ToString(),
                        fecha_pago                              = LECTOR["fecha_pago"].ToString(),
                        semana_del_anio_pago                    = int.Parse(LECTOR["semana_del_año_pago"].ToString()),
                        mes_pago                                = LECTOR["mes_pago"].ToString(),
                        anio_pago                               = int.Parse(LECTOR["año_pago"].ToString()),
                        tipo_recibe_pago                        = LECTOR["tipo_recibe_pago"].ToString(),
                        folio_beneficiario                      = int.Parse(LECTOR["folio_beneficiario"].ToString()),
                        recibe_pago                             = LECTOR["recibe_pago"].ToString(),
                        folio_cheque                            = int.Parse(LECTOR["folio_cheque"].ToString()),
                        tipo_beneficiario                       = LECTOR["tipo_beneficiario"].ToString(),
                    });
                }
            }
            CONEXION_SCOI.Close();
        }
    }
}