using api_seguimiento.Models.Monitor_auditoria_venta;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using WebApplication.Models.Monitor_auditoria_venta;

namespace api_seguimiento.Manager
{
    public class Monitor_obtener_auditorioa_venta
    {
        SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        SqlDataReader lector;

        //Metodos Publicos
        public List<Monitor_clasificador_venta> Clasificadores(string fecha)
        {
            List<Monitor_clasificador_venta> lista = new List<Monitor_clasificador_venta>();

            foreach (MonitorVenta dato in ObtenerSQL(fecha))
            {
                int index = lista.FindIndex(clasificador_ => clasificador_.Nombre == dato.Clasificador);
                if (index == -1)
                {
                    List<MonitorVenta> filtro = ObtenerSQL(fecha).Where(clasificador_ => clasificador_.Clasificador == dato.Clasificador).ToList();
                    lista.Add(new Monitor_clasificador_venta(filtro)
                    {
                        Nombre = dato.Clasificador
                    });
                }
            }

            return lista;
        }
        public Monitor_venta_corte_folio Obtener_corte_por_folio(string folio) => Consulta_Corte_por_folio_SQL(folio);
        public List<monitor_auditoria_ventas_abonos_y_deuda_a_detalle> Obtener_Abono_y_Deudas(int folio) => Abono_y_Deudas_SQL(folio);

        //Metodos Privados
        public List<MonitorVenta> ObtenerSQL(string fecha)
        {
            List<MonitorVenta> lista = new List<MonitorVenta>();

            string query = string.Format("exec monitor_auditoria_ventas '{0}';", fecha);

            SqlCommand comando = new SqlCommand(query, conexion_scoi);
            comando.CommandTimeout = 600;
            conexion_scoi.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    lista.Add(new MonitorVenta()
                    {
                        Clasificador = (string)lector["clasificacion"],
                        Cod_Establecimiento = int.Parse(lector["cod_estab"].ToString()),
                        Nom_establecimiento = (string)lector["establecimiento"],
                        Total = double.Parse(lector["venta"].ToString()),
                        Asignacion = (string)lector["asignacion"],
                        Fecha_venta = (string)lector["fecha_venta"],
                        Fecha_Inicial = (string)lector["fecha_inicial"],
                        Fecha_Liquidacion = (string)lector["fecha_liquidacion"],
                        Corte = (string)lector["corte"],
                        Folio_trabajo_de_Corte = (string)lector["folio_trabajo_de_cortes"],
                        Folio_Banco_Interno = (string)lector["folio_banco_interno"],
                        Pagos = double.Parse(lector["pagos"].ToString()),
                    });
                }
            }

            conexion_scoi.Close();

            return lista;
        }

        private Monitor_venta_corte_folio Consulta_Corte_por_folio_SQL(string folio)
        {
            Monitor_venta_corte_folio corte = new Monitor_venta_corte_folio();

            string comando = string.Format("[monitor_auditoria_ventas_corte_a_detalle] '{0}'", folio);
            SqlCommand query = new SqlCommand(comando, conexion_scoi);

            conexion_scoi.Open();
            lector = query.ExecuteReader();
            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    if (corte.tickets.Count == 0)
                    {
                        corte.detalle = Llenar_detalle_SQL(lector);
                        corte.empleado = Llenar_empeado_SQL(lector);
                        corte.ventas = Totales_corte_SQL(lector);
                    }
                    corte.tickets.Add(Tickets_SQL(lector));

                }
            }
            conexion_scoi.Close();

            return corte;
        }
        private Monitor_venta_detalle_corte Llenar_detalle_SQL(SqlDataReader lector) => new Monitor_venta_detalle_corte()
        {
            folio_corte = (string)lector["folio_corte"],
            asignaciones_en_corte = (string)lector["asignaciones_en_corte"],
            folio_trabajo_de_cortes = (string)lector["folio_trabajo_de_cortes"],
            fecha_de_corte = lector["fecha_de_corte"].ToString(),
            realizo_corte = lector["realizo_corte"].ToString(),
            comentario_auditoria = lector["comentario_auditoria"].ToString(),
            empleado_reviso_en_auditoria = lector["empleado_reviso_en_auditoria"].ToString(),
            cantidad_autorizaciones_por_supervisor = lector["cantidad_autorizaciones_por_supervisor"].ToString(),
            promedio_de_escaneo_de_productos = lector["promedio_de_escaneo_de_productos"].ToString(),

        };
        private Usuario Llenar_empeado_SQL(SqlDataReader lector) => new Usuario()
        {
            folio_establecimiento = int.Parse(lector["folio_establecimiento"].ToString()),
            establecimiento = (string)lector["establecimiento"],
            id_scoi = int.Parse(lector["folio_empleado"].ToString()),
            nombre_completo = (string)lector["nombre"],
            foto = ConvertirImagenByteABase64((byte[])lector["foto"]),
            fecha_ingreso = (string)lector["fecha_de_ingreso"],
            departamento = (string)lector["departamento"],
            puesto = (string)lector["puesto"],
            estatus = (string)lector["estatus_empleado"],
            comentario = lector["comentario"].ToString(),
            antiguedad = lector["antiguedad"].ToString()
        };
        private Monitor_venta_totales Totales_corte_SQL(SqlDataReader lector) => new Monitor_venta_totales()
        {
            importe_retiros_a_cajero = lector["importe_retiros_a_cajero"].ToString(),
            efectivo = lector["efectivo"].ToString(),
            dolares = lector["dolares"].ToString(),
            vales = lector["vales"].ToString(),
            cheques = lector["cheques"].ToString(),
            total_de_vauchers = lector["total_de_vauchers"].ToString(),
            importe_fuente_de_sodas = lector["importe_fuente_de_sodas"].ToString(),
            total_pagos_dinero_electronico = lector["total_pagos_dinero_electronico"].ToString(),
            corte_del_sistema = lector["corte_del_sistema"].ToString(),
            apartados = lector["apartados"].ToString(),
            diferiencia_de_corte = lector["diferiencia_de_corte"].ToString(),
            abonos = lector["abonos"].ToString(),
            diferencia_total = lector["diferencia_total"].ToString(),
            recibo_de_luz = lector["recibo_de_luz"].ToString(),
            tiempo_aire = lector["tiempo_aire"].ToString(),
            deposito_en_caja = lector["deposito_en_caja"].ToString(),
            total_de_retiros_clientes = lector["total_de_retiros_clientes"].ToString(),
            cantidad_de_articulos_diferentes = lector["cantidad_de_articulos_diferentes"].ToString(),
            cantidad_de_tickets = lector["cantidad_de_tickets"].ToString(),
        };
        private Monitor_auditoria_venta_ticket Tickets_SQL(SqlDataReader lector) => new Monitor_auditoria_venta_ticket()
        {
            ticket = lector["ticket"].ToString(),
            afiliacion = lector["afiliacion"].ToString(),
            retiro = lector["retiro"].ToString(),
            importe = double.Parse(lector["importe_pago_tarjeta"].ToString())
        };

        private List<monitor_auditoria_ventas_abonos_y_deuda_a_detalle> Abono_y_Deudas_SQL(int folio)
        {
            List<monitor_auditoria_ventas_abonos_y_deuda_a_detalle> lista = new List<monitor_auditoria_ventas_abonos_y_deuda_a_detalle>();
            string query = string.Format("exec [monitor_auditoria_ventas_abonos_y_deuda_a_detalle] {0};", folio);

            SqlCommand comando = new SqlCommand(query, conexion_scoi);

            conexion_scoi.Open();
            lector = comando.ExecuteReader();
            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    lista.Add(AyDsql(lector));
                }
            }
            conexion_scoi.Close();

            return lista;
        }
        private monitor_auditoria_ventas_abonos_y_deuda_a_detalle AyDsql(SqlDataReader lector) => new monitor_auditoria_ventas_abonos_y_deuda_a_detalle()
        {
            folio_corte = lector["folio_corte"].ToString(),
            fecha_corte = lector["fecha_corte"].ToString(),
            fecha_movimiento = lector["fecha_mov"].ToString(),
            diferencia_corte = double.Parse(lector["diferencia_corte"].ToString()),
            folio_abono = int.Parse(lector["folio_abono"].ToString()),
            abono = double.Parse(lector["abono"].ToString()),
            lista_de_raya_del_abono = int.Parse(lector["lista_de_raya_del_abono"].ToString()),
            parametro = lector["parametro"].ToString()
        };

        private string ConvertirImagenByteABase64(byte[] img) => "data:image/jpeg;base64," + Convert.ToBase64String(img);
    }
}