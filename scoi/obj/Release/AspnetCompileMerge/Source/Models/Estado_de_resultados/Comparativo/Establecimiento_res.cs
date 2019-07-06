using api_seguimiento.Manager.comparativo_resultados;
using api_seguimiento.Models.comparativo_resultados;
using api_seguimiento.Models.Estado_de_resultados.Periodo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Estado_de_resultados
{
    public class Establecimiento_res : Estado_de_resultados_total
    {
        public int folio_establecimiento    { get; set; }
        public string establecimiento       { get; set; }

        public Estado_de_resultados_total COSTO_DE_VENTAS           { get; set; }
        public Estado_de_resultados_total VENTAS_NETAS              { get; set; }
        public Estado_de_resultados_total GASTOS_DE_OPERACION       { get; set; }
        public Estado_de_resultados_total UTILIDAD_EN_OPERACIONES   { get; set; }
        public Estado_de_resultados_total TRUPUT_DE_OPERACION       { get; set; }
        public Estado_de_resultados_total UTILIDAD_NETA_OPERACIONES { get; set; }
        public Estado_de_resultados_total TRUPUT_NETA_OPERACIONAL   { get; set; }
        public Estado_de_resultados_total IMPUESTOS_ISR             { get; set; }
        public Estado_de_resultados_total IMPUESTOS_PTU             { get; set; }
        public Estado_de_resultados_total GASTOS_FAMILIA_IZABAL     { get; set; }
        public Estado_de_resultados_total TRUPUT_NETA               { get; set; }

        public  List<PeriodoSemanaAnio>  Lista_SemanaAnios   { get; set; }
        private List<int>                Semanas             { get; set; }
        public  OrdenarMovimientos       Ordern              { get; set; }
        public  List<Concepto>           lista_conceptos     { get; set; }
        //CONSTRUCTOR
        public Establecimiento_res(List<Resultado> lista) {
            //LISTA
            lista_conceptos     = new List<Concepto>();
            Lista_SemanaAnios   = new List<PeriodoSemanaAnio>();
            Semanas             = new List<int>();
            Ordern              = new OrdenarMovimientos(lista);
            //TOTALES
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
            //FUNCIONES
            ObtenerSemanasDeAnio(lista);
            Obtener_resultados_concepto(lista);
            TotalesConceptos();
            ResultadosSemanas(lista);
        }
        //METODOS PRIVADOS
        private void Obtener_resultados_concepto(List<Resultado> lista)
        {
            foreach (Resultado concepto in lista)
            {
                var index = lista_conceptos.FindIndex(a => a.concepto == concepto.Concepto);
                if (index == -1)
                {
                    List<Resultado> lista_auxiliar = lista.Where(a => a.Concepto == concepto.Concepto).ToList();

                    lista_conceptos.Add(new Concepto(lista_auxiliar, Semanas)
                    {
                        concepto = concepto.Concepto
                    });
                }
            }
        }
        private void TotalesConceptos() {
            lista_conceptos.ForEach(
                conceptos => {
                    switch (conceptos.concepto) {
                        case "COSTO DE VENTAS":
                            COSTO_DE_VENTAS.Total_Costo = Redondear_a_dos_decimales(conceptos.Total_Costo);
                            COSTO_DE_VENTAS.Total_Precio_venta = Redondear_a_dos_decimales(conceptos.Total_Precio_venta);
                            break;
                        case "GASTOS DE OPERACION":
                            GASTOS_DE_OPERACION.Total_Costo = Redondear_a_dos_decimales(conceptos.Total_Costo);
                            GASTOS_DE_OPERACION.Total_Precio_venta = Redondear_a_dos_decimales(conceptos.Total_Precio_venta);
                            break;
                        case "RETIROS UTILIDAD":
                            GASTOS_FAMILIA_IZABAL.Total_Costo = Redondear_a_dos_decimales(conceptos.Total_Costo);
                            GASTOS_FAMILIA_IZABAL.Total_Precio_venta = Redondear_a_dos_decimales(conceptos.Total_Precio_venta);
                            break;
                        case "VENTAS NETAS":
                            VENTAS_NETAS.Total_Costo = Redondear_a_dos_decimales(conceptos.Total_Costo);
                            VENTAS_NETAS.Total_Precio_venta = Redondear_a_dos_decimales(conceptos.Total_Precio_venta);
                            break;
                    }                   
                });
            CalculoOperaciones();
        }
        private void CalculoOperaciones() {

            /*UTILIDADES*/
            UTILIDAD_EN_OPERACIONES.Total_Costo          = Redondear_a_dos_decimales(VENTAS_NETAS.Total_Costo + COSTO_DE_VENTAS.Total_Costo);
            UTILIDAD_EN_OPERACIONES.Total_Precio_venta   = Redondear_a_dos_decimales(VENTAS_NETAS.Total_Precio_venta + COSTO_DE_VENTAS.Total_Precio_venta);

            UTILIDAD_NETA_OPERACIONES.Total_Costo        = Redondear_a_dos_decimales(UTILIDAD_EN_OPERACIONES.Total_Costo + GASTOS_DE_OPERACION.Total_Costo);
            UTILIDAD_NETA_OPERACIONES.Total_Precio_venta = Redondear_a_dos_decimales(UTILIDAD_EN_OPERACIONES.Total_Precio_venta + GASTOS_DE_OPERACION.Total_Precio_venta);

            /*IMPUESTOS*/
            IMPUESTOS_PTU.Total_Costo = Redondear_a_dos_decimales(UTILIDAD_NETA_OPERACIONES.Total_Costo * -0.1);
            IMPUESTOS_PTU.Total_Precio_venta = Redondear_a_dos_decimales(UTILIDAD_NETA_OPERACIONES.Total_Precio_venta * -0.1);

            /*TOTALES*/
            Total_Costo         = Redondear_a_dos_decimales( UTILIDAD_EN_OPERACIONES.Total_Costo + 
                                                             IMPUESTOS_PTU.Total_Costo + 
                                                             IMPUESTOS_ISR.Total_Costo + 
                                                             GASTOS_FAMILIA_IZABAL.Total_Costo +
                                                             GASTOS_DE_OPERACION.Total_Costo);
            Total_Precio_venta  = Redondear_a_dos_decimales( UTILIDAD_EN_OPERACIONES.Total_Precio_venta +
                                                             IMPUESTOS_PTU.Total_Precio_venta + 
                                                             IMPUESTOS_ISR.Total_Precio_venta + 
                                                             GASTOS_FAMILIA_IZABAL.Total_Precio_venta +
                                                             GASTOS_DE_OPERACION.Total_Precio_venta);

            /*TRUPUT*/
            TRUPUT_DE_OPERACION.Total_Costo             = ObtenerTruput(UTILIDAD_EN_OPERACIONES.Total_Costo);
            TRUPUT_DE_OPERACION.Total_Precio_venta      = ObtenerTruput(UTILIDAD_EN_OPERACIONES.Total_Precio_venta); 

            TRUPUT_NETA_OPERACIONAL.Total_Costo         = ObtenerTruput(UTILIDAD_NETA_OPERACIONES.Total_Costo);
            TRUPUT_NETA_OPERACIONAL.Total_Precio_venta  = ObtenerTruput(UTILIDAD_NETA_OPERACIONES.Total_Precio_venta); 

            TRUPUT_NETA.Total_Costo                     = ObtenerTruput(Total_Costo); 
            TRUPUT_NETA.Total_Precio_venta              = ObtenerTruput(Total_Precio_venta);
            
        }
        private double ObtenerTruput(double dato) => VENTAS_NETAS.Total_Precio_venta > 0 ? Redondear_a_dos_decimales((dato / VENTAS_NETAS.Total_Precio_venta) * 100) : 0;
        private void ObtenerSemanasDeAnio(List<Resultado> moviminetos)
        {
            List<int> auxiliar = new List<int>();
            foreach (Resultado movimiento in moviminetos)
            {
                int indice = Semanas.FindIndex(e => e == movimiento.Semana_del_anio);
                if (indice == -1)
                    Semanas.Add(movimiento.Semana_del_anio);
            }
        }
        private void ResultadosSemanas(List<Resultado> lista) {
            foreach (int semana in Semanas)
            {
                int indice = Lista_SemanaAnios.FindIndex(e=>e.Semana==semana);
                if (indice == -1)
                {
                    List<Resultado> filtro = lista.Where(e => e.Semana_del_anio == semana).ToList();

                    Lista_SemanaAnios.Add(new PeriodoSemanaAnio(semana, filtro));
                }
            }
        }
        private double Redondear_a_dos_decimales(double dato) => Math.Round(dato * 100) / 100;
    }
}