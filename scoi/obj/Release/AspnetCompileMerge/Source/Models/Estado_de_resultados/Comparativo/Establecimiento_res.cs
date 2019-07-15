using api_seguimiento.Manager.comparativo_resultados;
using api_seguimiento.Models.comparativo_resultados;
using api_seguimiento.Models.Estado_de_resultados.Periodo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Estado_de_resultados
{
    public class Establecimiento_res : ModelConcepto
    {
        public int folio_establecimiento    { get; set; }
        public string establecimiento       { get; set; }

        public  List<PeriodoSemanaAnio> Lista_SemanaAnios = new List<PeriodoSemanaAnio>();
        private List<int> Semanas = new List<int>();
        public List<MovimientoAnio> lista_anios { get;set;}
        public List<Concepto> lista_conceptos { get;set;}
        //CONSTRUCTOR
        public Establecimiento_res(List<Resultado> lista) {
            lista_anios = new OrdenarMovimientos(lista).Lista;
            lista_conceptos = new List<Concepto>(); ;
            //FUNCIONES
            ObtenerSemanasDeAnio(lista);
            Obtener_resultados_concepto(lista);
            TotalesConceptos();
            ResultadosSemanas(lista);
            GastosOperaciones();
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
    }
}