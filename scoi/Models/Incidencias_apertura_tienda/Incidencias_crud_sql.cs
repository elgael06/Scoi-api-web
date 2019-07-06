using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Incidencias_apertura_tienda
{
    public class Incidencias_crud_sql
    {
        public int folio { get; set; }
        public string cuestionario { get; set; }
        public int posicion { get; set; }
        public string pregunta { get; set; }
        public string observaciones { get; set; }
        public string Usuario { get; set; }
        public int solucion { get; set; }
        public string tipo_solucion { get; set; }

    }
}

/**
  t.folio
				,cuestionario
				,posicion
				,pregunta
				,UPPER(RTRIM(observaciones)) as observaciones
				,usuario
				,solucion 
				,sol.tipo_solucion
     */
