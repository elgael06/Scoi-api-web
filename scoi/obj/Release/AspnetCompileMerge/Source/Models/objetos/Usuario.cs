using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_seguimiento
{
    public class Usuario
    {
        public int id_scoi;
        public string nombre_completo;
        public string foto;
        public int folio_establecimiento;
        public string establecimiento;
        public string departamento;
        public string puesto;
        public string escolaridad;
        public string turno;
        public string horario;
        public string estatus;
        public string fecha_ingreso { get; set; }
        public string comentario { get; set; }
        public string antiguedad { get; set; }
    }
}