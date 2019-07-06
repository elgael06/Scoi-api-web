using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Incidencias_personal
{
    public class Critterio_incidencia
    {
        public int Folio { get; set; }
        public string Criterio { get; set; }
        public string Estatus { get; set; }
        public string Color { get; set; }

    }
}