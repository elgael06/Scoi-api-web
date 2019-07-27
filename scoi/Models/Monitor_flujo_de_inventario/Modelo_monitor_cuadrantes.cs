using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_cuadrantes
{
    public class Modelo_monitor_cuadrantes
    {
        public int folio_colaborador { get; set; }
        public int folio { get; set; }
        public string nombre_colaborador { get; set; }
        public string estatus_colaborador { get; set; }
        public int folio_turno { get; set; }
        public string turno { get; set; }
        public int folio_cuadrante { get; set; }
        public string nombre_cuadrante { get; set; }
        public int folio_establecimiento { get; set; }
        public string establecimiento { get; set; }
        public int folio_puesto { get; set; }
        public string puesto { get; set; }
        public int folio_puesto_reporta { get; set; }
        public string puesto_reporta { get; set; }
        public int folio_departamento { get; set; }
        public string departamento { get; set; }
        public int folio_actividad { get; set; }
        public string actividad { get; set; }
        public string respuesta { get; set; }
        public string observacion { get; set; }
        public int folio_aspecto { get; set; }
        public string aspecto { get; set; }
        public int valor_respuesta { get; set; }
        public int semana_del_año { get; set; }
        public int dia_semana { get; set; }
        public string mes { get; set; }
        public int anio { get; set; }
        public string fecha { get; set; }
        public int folio_usuario_capturo { get; set; }
        public string tipo_actividad { get; set; }
        public string Tolerancia { get; set; }
    }
}