using api_seguimiento.Models.comparativo_resultados;
using api_seguimiento.Models.Estado_de_resultados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.comparativo_resultados
{
    public class Totales_y_truputs: Estado_de_resultados_total
    {
        public Estado_de_resultados_total COSTO_DE_VENTAS { get; set; }
        public Estado_de_resultados_total VENTAS_NETAS { get; set; }
        public Estado_de_resultados_total GASTOS_DE_OPERACION { get; set; }
        public Estado_de_resultados_total UTILIDAD_EN_OPERACIONES { get; set; }
        public Estado_de_resultados_total TRUPUT_DE_OPERACION { get; set; }
        public Estado_de_resultados_total UTILIDAD_NETA_OPERACIONES { get; set; }
        public Estado_de_resultados_total TRUPUT_NETA_OPERACIONAL { get; set; }
        public Estado_de_resultados_total IMPUESTOS_ISR { get; set; }
        public Estado_de_resultados_total IMPUESTOS_PTU { get; set; }
        public Estado_de_resultados_total GASTOS_FAMILIA_IZABAL { get; set; }
        public Estado_de_resultados_total TRUPUT_NETA { get; set; }

        public List<Establecimiento_res> lista_establecimientos { get; set; }

        public Totales_y_truputs(List<Establecimiento_res> lista,List<Resultado> movimientos) {

            COSTO_DE_VENTAS             = new Estado_de_resultados_total();
            VENTAS_NETAS                = new Estado_de_resultados_total();
            GASTOS_DE_OPERACION         = new Estado_de_resultados_total();
            TRUPUT_DE_OPERACION         = new Estado_de_resultados_total();
            UTILIDAD_EN_OPERACIONES     = new Estado_de_resultados_total();
            UTILIDAD_NETA_OPERACIONES   = new Estado_de_resultados_total();
            GASTOS_FAMILIA_IZABAL       = new Estado_de_resultados_total();
            TRUPUT_NETA                 = new Estado_de_resultados_total();
            TRUPUT_NETA_OPERACIONAL     = new Estado_de_resultados_total();
            IMPUESTOS_ISR               = new Estado_de_resultados_total();
            IMPUESTOS_PTU               = new Estado_de_resultados_total();

            lista_establecimientos      = new List<Establecimiento_res>();

            Resultados(lista);

        }
        private void Resultados(List<Establecimiento_res> lista)
        {
            foreach (Establecimiento_res establecimiento in lista)
            {
                COSTO_DE_VENTAS.Total_Costo                 += establecimiento.COSTO_DE_VENTAS.Total_Costo;
                COSTO_DE_VENTAS.Total_Precio_venta          += establecimiento.COSTO_DE_VENTAS.Total_Precio_venta;

                VENTAS_NETAS.Total_Costo                    += establecimiento.VENTAS_NETAS.Total_Costo;
                VENTAS_NETAS.Total_Precio_venta             += establecimiento.VENTAS_NETAS.Total_Precio_venta;

                GASTOS_DE_OPERACION.Total_Costo             += establecimiento.GASTOS_DE_OPERACION.Total_Costo;
                GASTOS_DE_OPERACION.Total_Precio_venta      += establecimiento.GASTOS_DE_OPERACION.Total_Precio_venta;

                GASTOS_FAMILIA_IZABAL.Total_Costo           += establecimiento.GASTOS_FAMILIA_IZABAL.Total_Costo;
                GASTOS_FAMILIA_IZABAL.Total_Precio_venta    += establecimiento.GASTOS_FAMILIA_IZABAL.Total_Precio_venta;

                lista_establecimientos.Add(establecimiento);
            }
            CalculoOperaciones();
        }

        private void CalculoOperaciones()
        {

            /*UTILIDADES*/
            UTILIDAD_EN_OPERACIONES.Total_Costo = Redondear_a_dos_decimales(VENTAS_NETAS.Total_Costo + COSTO_DE_VENTAS.Total_Costo);
            UTILIDAD_EN_OPERACIONES.Total_Precio_venta = Redondear_a_dos_decimales(VENTAS_NETAS.Total_Precio_venta + COSTO_DE_VENTAS.Total_Precio_venta);

            UTILIDAD_NETA_OPERACIONES.Total_Costo = Redondear_a_dos_decimales(UTILIDAD_EN_OPERACIONES.Total_Costo + GASTOS_DE_OPERACION.Total_Costo);
            UTILIDAD_NETA_OPERACIONES.Total_Precio_venta = Redondear_a_dos_decimales(UTILIDAD_EN_OPERACIONES.Total_Precio_venta + GASTOS_DE_OPERACION.Total_Precio_venta);

            /*IMPUESTOS*/
            IMPUESTOS_PTU.Total_Costo = Redondear_a_dos_decimales(UTILIDAD_NETA_OPERACIONES.Total_Costo * -0.1);
            IMPUESTOS_PTU.Total_Precio_venta = Redondear_a_dos_decimales(UTILIDAD_NETA_OPERACIONES.Total_Precio_venta * -0.1);

            /*TOTALES*/
            Total_Costo = Redondear_a_dos_decimales(UTILIDAD_EN_OPERACIONES.Total_Costo +
                                                             IMPUESTOS_PTU.Total_Costo +
                                                             IMPUESTOS_ISR.Total_Costo +
                                                             GASTOS_DE_OPERACION.Total_Costo);
            Total_Precio_venta = Redondear_a_dos_decimales(UTILIDAD_EN_OPERACIONES.Total_Precio_venta +
                                                             IMPUESTOS_PTU.Total_Precio_venta +
                                                             IMPUESTOS_ISR.Total_Precio_venta +
                                                             GASTOS_DE_OPERACION.Total_Precio_venta);

            /*TRUPUT*/
            TRUPUT_DE_OPERACION.Total_Costo = ObtenerTruput(UTILIDAD_EN_OPERACIONES.Total_Costo);
            TRUPUT_DE_OPERACION.Total_Precio_venta = ObtenerTruput(UTILIDAD_EN_OPERACIONES.Total_Precio_venta);

            TRUPUT_NETA_OPERACIONAL.Total_Costo = ObtenerTruput(UTILIDAD_NETA_OPERACIONES.Total_Costo);
            TRUPUT_NETA_OPERACIONAL.Total_Precio_venta = ObtenerTruput(UTILIDAD_NETA_OPERACIONES.Total_Precio_venta);

            TRUPUT_NETA.Total_Costo = ObtenerTruput(Total_Costo);
            TRUPUT_NETA.Total_Precio_venta = ObtenerTruput(Total_Precio_venta);

        }
        private double ObtenerTruput(double dato)
        {
            return VENTAS_NETAS.Total_Precio_venta > 0 ? Redondear_a_dos_decimales((dato / VENTAS_NETAS.Total_Precio_venta) * 100) : 0;
        }
        private double Redondear_a_dos_decimales(double dato)
        {
            return Math.Round(dato * 100) / 100;
        }
    }
}