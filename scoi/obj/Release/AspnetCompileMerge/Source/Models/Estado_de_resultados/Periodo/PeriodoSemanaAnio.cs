using api_seguimiento.Models.comparativo_resultados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Estado_de_resultados.Periodo
{
    public class PeriodoSemanaAnio : Estado_de_resultados_total
    {
        public int Semana { get; set; }
        public Estado_de_resultados_total UTILIDAD_EN_OPERACION { get; set; }
        public Estado_de_resultados_total TRUPUT_DE_OPERACION { get; set; }
        public Estado_de_resultados_total UTILIDAD_NETA_OPERACIONAL { get; set; }
        public Estado_de_resultados_total TRUPUT_NETA_OPERACIONAL { get; set; }
        public Estado_de_resultados_total IMPUESTOS_ISR { get; set; }
        public Estado_de_resultados_total IMPUESTOS_PTU { get; set; }


        public PeriodoSemanaAnio(int semana,List<Resultado> lista_movimientos) {
            Semana= semana;

            ObtenerTotales(lista_movimientos);
            UTILIDAD_EN_OPERACION     = ObtenerOperacionesSemana(lista_movimientos);
            TRUPUT_DE_OPERACION       = ObenerTruputOperacional(UTILIDAD_EN_OPERACION);
            UTILIDAD_NETA_OPERACIONAL = Obtener_neta_operacional_semana(lista_movimientos);
            TRUPUT_NETA_OPERACIONAL   = ObenerTruputOperacional(UTILIDAD_NETA_OPERACIONAL);
            IMPUESTOS_ISR             = new Estado_de_resultados_total();
            IMPUESTOS_PTU             = new Estado_de_resultados_total()
            {
                Total_Costo = Redondear_a_dos_decimales(UTILIDAD_NETA_OPERACIONAL.Total_Costo * -0.1),
                Total_Precio_venta = Redondear_a_dos_decimales(UTILIDAD_NETA_OPERACIONAL.Total_Precio_venta * -0.1)
            };
        }
        private void ObtenerTotales(List<Resultado> lista_movimientos)
        {
            foreach (Resultado movimineto in lista_movimientos)
            {
                Total_Costo += movimineto.Total_Costo;
                Total_Precio_venta += movimineto.Total_Precio_venta;
            }
        }
        private Estado_de_resultados_total ObtenerOperacionesSemana(List<Resultado> lista)
        {
            Estado_de_resultados_total Ventas_netas = new Estado_de_resultados_total();
            Estado_de_resultados_total costo_netas = new Estado_de_resultados_total();
            
            foreach (Resultado e in lista.Where(e => e.Concepto == "VENTAS NETAS").ToList())
            {
                Ventas_netas.Total_Costo += e.Total_Costo;
                Ventas_netas.Total_Precio_venta += e.Total_Precio_venta;
            }
            foreach (Resultado e in lista.Where(e => e.Concepto == "COSTO DE VENTAS").ToList())
            {
                costo_netas.Total_Costo += e.Total_Costo;
                costo_netas.Total_Precio_venta += e.Total_Precio_venta;
            }

            return new Estado_de_resultados_total
            {
                Total_Costo = Redondear_a_dos_decimales(Ventas_netas.Total_Costo + costo_netas.Total_Costo),
                Total_Precio_venta = Redondear_a_dos_decimales(Ventas_netas.Total_Precio_venta + costo_netas.Total_Precio_venta)
            };
        }
        private Estado_de_resultados_total Obtener_neta_operacional_semana(List<Resultado> lista) {
            Estado_de_resultados_total gatos_de_oeracion = new Estado_de_resultados_total();

            foreach (Resultado e in lista.Where(e => e.Concepto == "GASTOS DE OPERACION").ToList())
            {
                gatos_de_oeracion.Total_Costo += e.Total_Costo;
                gatos_de_oeracion.Total_Precio_venta += e.Total_Precio_venta;
            }

            return new Estado_de_resultados_total
            {
                Total_Costo = Redondear_a_dos_decimales(UTILIDAD_EN_OPERACION.Total_Costo + gatos_de_oeracion.Total_Costo),
                Total_Precio_venta = Redondear_a_dos_decimales(UTILIDAD_EN_OPERACION.Total_Precio_venta+ gatos_de_oeracion.Total_Precio_venta)
            };
        }
        private Estado_de_resultados_total ObenerTruputOperacional(Estado_de_resultados_total utiliad ) {

            return new Estado_de_resultados_total
            {
                Total_Costo = Redondear_a_dos_decimales(utiliad.Total_Costo /  Total_Costo),
                Total_Precio_venta = Redondear_a_dos_decimales(utiliad.Total_Precio_venta / Total_Precio_venta)
            };
        }


        private double Redondear_a_dos_decimales(double dato)=> Math.Round(dato * 100) / 100;
    }
}