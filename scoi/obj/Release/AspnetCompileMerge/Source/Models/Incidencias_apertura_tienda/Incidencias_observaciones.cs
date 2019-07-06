using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Incidencias_apertura_tienda
{
    public class Incidencias_observaciones
    {
        public int Folio { get; set; }
        public string Pregunta { get; set; }
        public string Observacion { get; set; }
        public string Usuario { get; set; }
        public Incidencia Respuesta {get;set;}
    }
}