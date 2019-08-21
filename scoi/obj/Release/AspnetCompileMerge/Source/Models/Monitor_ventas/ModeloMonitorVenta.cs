using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas
{
    public class ModeloMonitorVenta
    {
        public ModeloMonitorVenta(List<monitor_de_ventas_consulta_sumarizada_Result> datos)
        {
            int semana_mayor = 0;
            int semana_menor = 0;
            List<monitor_de_ventas_consulta_sumarizada_Result> Semana_actual;
            List<monitor_de_ventas_consulta_sumarizada_Result> Semana_pasada;
            List<monitor_de_ventas_consulta_sumarizada_Result> Semana_anio_pasada;

            semanas_1 = new List<int>();

            foreach (var semana in from filtro in datos
                                   let semana = filtro.semana_actual
                                   where semanas_1.FindIndex(e => e == semana) == -1 && semana != 0 && filtro.fecha_de_venta_actual != "01/01/1900"
                                   select semana)
            {
                semanas_1.Add(semana);
                semana_mayor = semana > semana_menor ? semana : semana_mayor;
                semana_menor = semana_mayor > semana && semana > 0 ? semana : semana_mayor - 1;
            }

            Semana_actual = datos.Where(e => e.semana_actual == semana_mayor).ToList();
            Semana_pasada = datos.Where(e => e.semana_actual == semana_menor).ToList();
            Semana_anio_pasada = datos.Where(e => e.semana_actual == 0).ToList();
            try
            {
                anio_actual = DateTime.Parse(Semana_actual.First().fecha_de_venta_actual).Year != 1900 ?
                    DateTime.Parse(Semana_actual.First().fecha_de_venta_actual).Year :
                    DateTime.Parse(Semana_pasada.First().fecha_de_venta_actual).Year;
                anio_anterior = Semana_anio_pasada.Count > 0 ?
                    DateTime.Parse(Semana_anio_pasada.First().fecha_de_venta_anio_pasado).Year :
                    anio_actual - 1;
            }
            catch {
                anio_actual = DateTime.Now.Year;
                anio_anterior = anio_actual - 1;
            }
            piezas_actual        = Semana_actual.Select(e => e.venta_piezas_actual).Sum();
            piezas_anterior      = Semana_anio_pasada.Select(e => e.venta_piezas_anio_pasado).Sum();
            piezas_semana_pasado = Semana_pasada.Select(e => e.venta_piezas_actual).Sum();

            venta_actual        = Semana_actual.Select(e => e.importe_sin_IVA_actual).Sum();
            venta_anterior      = Semana_anio_pasada.Select(e => e.importe_sin_IVA_anio_pasado ).Sum();
            venta_semana_pasado = Semana_pasada.Select(e => e.importe_sin_IVA_actual).Sum();

            crecimiento_actual_anterior         = (venta_actual - venta_anterior);
            crecimiento_actual_semana_pasado    = (venta_actual - venta_semana_pasado);

            diferencia_actual           = venta_anterior == 0 ?100: redondeoMargen(((venta_actual / venta_anterior) - 1) * 100);
            diferencia_semana_pasador   = venta_semana_pasado == 0 ?100: redondeoMargen(((venta_actual / venta_semana_pasado) - 1) * 100);

            margen_actual        = calcularVentaActual(Semana_actual);
            margen_anterior      = calcularVentaPasado(Semana_anio_pasada);
            margen_semana_pasado = calcularVentaActual(Semana_pasada);

            margen_actual_anterior = margen_actual - margen_anterior;

            Semana_actual       = new List<monitor_de_ventas_consulta_sumarizada_Result>();
            Semana_pasada       = new List<monitor_de_ventas_consulta_sumarizada_Result>();
            Semana_anio_pasada  = new List<monitor_de_ventas_consulta_sumarizada_Result>();
        }

        decimal redondeoMargen(decimal? valor) => Math.Round(decimal.Parse(valor.ToString())* 100) / 100;

        decimal calcularVentaActual(List<monitor_de_ventas_consulta_sumarizada_Result> productos)
        {
            var importe_actual  = decimal.Parse(productos.Select(e => e.importe_actual).Sum().ToString());
            var piezas          = decimal.Parse(productos.Select(e => e.venta_piezas_actual).Sum().ToString());

            return piezas == 0 ? 0 : importe_actual /piezas;
        }

        decimal calcularVentaPasado(List<monitor_de_ventas_consulta_sumarizada_Result> productos)
        {
            var importe_actual  = decimal.Parse(productos.Select(e => e.importe_anio_pasado).Sum().ToString());
            var piezas          = decimal.Parse(productos.Select(e => e.venta_piezas_anio_pasado).Sum().ToString());

            return piezas==0 ? 0 : importe_actual / piezas;
        }

        public string clasificador { get; set; }
        public List<int> semanas_1 { get; set; }
        //public Dictionary< string,int> semanas { get; set; }

        public int anio_actual { get; set; }
        public int anio_anterior { get; set; }

        public Nullable<decimal> crecimiento_actual_anterior { get; set; }
        public Nullable<decimal> crecimiento_actual_semana_pasado { get; set; }

        public Nullable<decimal> diferencia_actual { get; set; }
        public Nullable<decimal> diferencia_semana_pasador { get; set; }

        public Nullable<decimal> piezas_actual { get; set; }
        public Nullable<decimal> piezas_anterior { get; set; }
        public Nullable<decimal> piezas_semana_pasado { get; set; }

        public Nullable<decimal> venta_actual { get; set; }
        public Nullable<decimal> venta_anterior { get; set; }
        public Nullable<decimal> venta_semana_pasado { get; set; }

        public Nullable<decimal> margen_actual { get; set; }
        public Nullable<decimal> margen_anterior { get; set; }
        public Nullable<decimal> margen_semana_pasado { get; set; }

        public Nullable<decimal> margen_actual_anterior { get; set; }
    }
}
