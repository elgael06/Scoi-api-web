using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.objetos
{
    public class Etapa_matriz
    {
        public int folio_matriz;
        public string matriz;
        public int orden_etapa;
        public int folio_etapa;
        public string etapa;
        public string aplicado;
    }
    public class Unidad_de_inspeccion_por_etapa
    {
        public int folio;
        public string unidad_de_inspeccion;
        public int muestra_sugerida;
        public IEnumerable<string> respuestas;
        public string consepto;
        public string r;
    }
}