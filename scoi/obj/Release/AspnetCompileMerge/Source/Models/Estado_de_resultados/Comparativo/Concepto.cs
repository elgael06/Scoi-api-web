
using api_seguimiento.Models.Estado_de_resultados.Periodo;
using System.Collections.Generic;
using System.Linq;

namespace api_seguimiento.Models.comparativo_resultados
{
    public class Concepto:Estado_de_resultados_total
    {
        public string concepto { get; set; }

        public List<Clasificador>       Lista_clasificadores    { get; set; }
        public List<PeriodoSemanaAnio>  Lista_SemanaAnios       { get; set; }
        public List<int>                Semanas                 { get; set; }

        public Estado_de_resultados_total Ventas_netas                  { get; set; }
        public Estado_de_resultados_total Costo_ventas                  { get; set; }
        public Estado_de_resultados_total Utilidad_en_operacion         { get; set; }
        public Estado_de_resultados_total Gastos_de_operacion           { get; set; }
        public Estado_de_resultados_total Utilidad_neta_operacion       { get; set; }
        public Estado_de_resultados_total Ingresos_no_operacionales     { get; set; }
        public Estado_de_resultados_total Utilidad_antes_de_impuestos   { get; set; }
        public Estado_de_resultados_total Utilidad_neta                 { get; set; }
        public Estado_de_resultados_total Gastos_especiales             { get; set; }
        public Estado_de_resultados_total Gastos_de_venta               { get; set; }
        public Estado_de_resultados_total Gastos_de_administracion      { get; set; }

        //CONSTRUCTOR
        public Concepto(List<Resultado> lista, List<int> semanas)
        {
            //LISTA
            Lista_SemanaAnios       = new List<PeriodoSemanaAnio>();
            Semanas                 = new List<int>(semanas);
            Lista_clasificadores    = new List<Clasificador>();
            //FUNCIONES
            Obtener_clasificadores(lista);
            ResultadosSemanas(lista);
        }
        //METODOS
        private void Obtener_clasificadores(List<Resultado> lista)
        {
            foreach (Resultado concepto in lista )
            {
                var index = Lista_clasificadores.FindIndex(e => e.clasificador == concepto.Clasificacion);

                if (index == -1)
                {
                    List<Resultado> lista_auxiliar = lista.Where(e => e.Clasificacion == concepto.Clasificacion).ToList();

                    Lista_clasificadores.Add(
                        new Clasificador(lista_auxiliar, Semanas)
                    {
                        clasificador = concepto.Clasificacion
                    });
                }
            }
            Obtener_totales();
        }
        public void Obtener_totales()
        {
            List<Clasificador> lista = new List<Clasificador>();
            foreach (Clasificador clasificador in Lista_clasificadores) {

                int index = lista.FindIndex(a => a.clasificador == clasificador.clasificador);
                if (index == -1) {

                    lista.Add(clasificador);

                    List<Clasificador> total = Lista_clasificadores.Where( i => i.clasificador == clasificador.clasificador).ToList();

                    switch (clasificador.clasificador.ToUpper()) {
                                                
                        case "COSTO DE VENTAS":
                            Costo_ventas = resultado_total_clasificadores(total);
                            break;
                        case "UTILIDAD EN OPERACIONES":
                            Utilidad_en_operacion = resultado_total_clasificadores(total);
                            break;
                        case "GASTOS DE OPERACIONES":
                            Gastos_de_operacion = resultado_total_clasificadores(total);
                            break;
                        case "GASTOS DE VENTA":
                            Gastos_de_venta = resultado_total_clasificadores(total);
                            break;
                        case "UTILIDAD NETA OPERACIONES":
                            Utilidad_neta_operacion = resultado_total_clasificadores(total);
                            break;
                        case "INGRESOS NO OPERACIONALES":
                            Ingresos_no_operacionales = resultado_total_clasificadores(total);
                            break;
                        case "UTILIDAD ANTES DE IMPUESTOS":
                            Utilidad_antes_de_impuestos = resultado_total_clasificadores(total);
                            break;
                        case "UTILIDAD NETA":
                            Utilidad_neta = resultado_total_clasificadores(total);
                            break;
                        case "GASTOS FAMILIA IZABAL":
                            Gastos_especiales = resultado_total_clasificadores(total);
                            break;
                        case "GASTOS DE ADMINISTRACION":
                            Gastos_de_administracion = resultado_total_clasificadores(total);
                            break;
                        default:
                            Ventas_netas = resultado_total_clasificadores(total);
                            break;
                    }
                }
            }
        }
        private Estado_de_resultados_total resultado_total_clasificadores(List<Clasificador> total) {

            Estado_de_resultados_total resultados = new Estado_de_resultados_total();

            foreach (Estado_de_resultados_total i in total) {
                resultados.Total_Costo = i.Total_Costo;
                resultados.Total_Precio_venta = i.Total_Precio_venta;
                resultados_totales(i);
            }

            return resultados;
        }
        private void resultados_totales(Estado_de_resultados_total total) {
            Total_Costo += total.Total_Costo;
            Total_Precio_venta += total.Total_Precio_venta;
        }
        private void ResultadosSemanas(List<Resultado> lista)
        {
            foreach (int semana in Semanas)
            {
                int indice = Lista_SemanaAnios.FindIndex(e => e.Semana == semana);
                if (indice == -1)
                {
                    List<Resultado> filtro = lista.Where(e => e.Semana_del_anio == semana).ToList();
                    Lista_SemanaAnios.Add(new PeriodoSemanaAnio(semana, filtro));
                }
            }
        }
    }
}