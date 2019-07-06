using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.comparativo_resultados
{
    public class Resultado : Estado_de_resultados_total
    {
        public int Folio_establecimiento { get; set; }
        public string Establecimiento { get; set; }
        public string Concepto { get; set; }
        public string Clasificacion { get; set; }
        public string Subclasificacion { get; set; }
        public string Movimiento { get; set; }
        public int Semana_del_anio { get; set; }
        public string Mes { get; set; }
        public int Anio { get; set; }
    }
}