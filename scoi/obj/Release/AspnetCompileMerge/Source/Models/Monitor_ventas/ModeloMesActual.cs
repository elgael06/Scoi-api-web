using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_ventas
{
    public class ModeloMesActual
    {
        public ModeloMesActual()
        {
            llenado(DateTime.Now);
        }
        public ModeloMesActual(DateTime fecha)
        {
            llenado(fecha);
        }
        private void llenado(DateTime fecha)
        {
            string[] meses = new string[] { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" };
            int mes = fecha.Month;
            anio = fecha.Year;
            dias_mes = cal.GetDaysInMonth(anio, mes);
            nombre = meses[mes - 1];
            semanas = new List<Semana>() { new Semana {
                text="Todos",
                value="Todos"
            }};
            
            obtenerSemanas();
        }
        private void obtenerSemanas()
        {
            for (int dia = 1; dia <= dias_mes; dia++)
            {
                string semana = cal.GetWeekOfYear(DateTime.Parse(string.Format("{0}/{1}/{2}", dia, nombre, anio)), dfi.CalendarWeekRule, dfi.FirstDayOfWeek).ToString();
                if (semanas.FindIndex(s => s.value == semana) == -1)
                {
                    semanas.Add(new Semana
                    {
                        text = string.Format("Semana {0}.", semana),
                        value = semana
                    });
                }
            }
        }
        static DateTimeFormatInfo dfi = DateTimeFormatInfo.CurrentInfo;
        static Calendar cal = dfi.Calendar;
        public int dias_mes { set; get; }
        public int anio { get; set; }
        public string nombre { get; set; }
        public List<Semana> semanas { get; set; }
    }

    public class Semana
    {
        public string text { get; set; }
        public string value { get; set; }
    }
}