using api_seguimiento.Models.comparativo_resultados;
using api_seguimiento.Models.Estado_de_resultados.Periodo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.Estado_de_resultados
{
    public class SemanasAnio
    {

        public List<PeriodoSemanaAnio> Lista_SemanaAnios { get; set; }
        public List<int> Semanas { get; set; }

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