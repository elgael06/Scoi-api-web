using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento.Models.Matrices
{
    public class Matrices_conceptos
    {
        public int Folio { set; get; }
        public string Concepto { set; get; }
        public string Estatus { set; get; }
        public string Abreviatura { set; get; }
        public string Fecha { set; get; }
        public string Fecha_modificacion { set; get; }
    }
}