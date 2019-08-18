using System;
using System.Collections.Generic;

namespace WebApplication.Models.Globales
{
    public class Dia
    {
        public Dia()
        {
            DateTime hoy = DateTime.Now;
            posicion = dias_eng.FindIndex(e => e == hoy.DayOfWeek.ToString().ToUpper());
            dia = dias[posicion];
        }
        public Dia(string fecha)
        {
            DateTime hoy = DateTime.Parse(fecha);
            posicion = dias_eng.FindIndex(e => e == hoy.DayOfWeek.ToString().ToUpper());
            dia = dias[posicion];
        }
        private List<string> dias = new List<string>() { "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO" };
        private List<string> dias_eng = new List<string>() { "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY" };
        public string dia { get; set; }
        public int posicion { get; set; }
    }
}