using api_seguimiento.Models.comparativo_resultados;
using api_seguimiento.Models.Estado_de_resultados;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.comparativo_resultados
{
    public class OrdenarMovimientos
    {
        public int Folio_Establecimiento { get; set; }
        public string Establecimiento { get; set; }
        public List<MovimientoAnio> Lista { get; set; }
        public List<string> Clasificadores { get; set; }
        public List<int> Semanas { get; set; }

        public OrdenarMovimientos(List<Resultado> lista)
        {
            Folio_Establecimiento = lista[0].Folio_establecimiento;
            Establecimiento = lista[0].Establecimiento;
            Lista = new List<MovimientoAnio>();
            Clasificadores = new List<string>();
            Semanas = new List<int>();
            Ordenar(lista);
        }

        private void Ordenar(List<Resultado> lista)
        {
            foreach (Resultado movimiento in lista) {

                int index = Lista.FindIndex(a=> a.Anio == movimiento.Anio.ToString());

                if (index == -1)
                {
                    List<Resultado> r = lista.Where(a => a.Anio == movimiento.Anio ).ToList();
                    Lista.Add(
                        new MovimientoAnio(r) {
                            Anio = movimiento.Anio.ToString()
                        });
                }
                ComprobarClasificador(movimiento.Clasificacion);
                ComprobarSemanaAnio(movimiento.Semana_del_anio);
            }
        }
        private void ComprobarClasificador(string clasificador) {
            int index = Clasificadores.FindIndex(a => a == clasificador);
            if (index == -1) {
                Clasificadores.Add(clasificador);
            }
        }
        private void ComprobarSemanaAnio(int semana) {
            int index = Semanas.FindIndex(a => a == semana);
            if (index == -1)
            {
                Semanas.Add(semana);
            }
        }
    }
}