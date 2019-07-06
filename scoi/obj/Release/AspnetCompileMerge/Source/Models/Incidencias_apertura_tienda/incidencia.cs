using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Incidencias_apertura_tienda
{
    public class Incidencia
    {
        public int Folio { get; set; }
        public string Tipo { get; set; }

        public Incidencia(int f,string t) {
            Folio = f;
            Tipo = t;
        }
    }
}