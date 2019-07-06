using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Manejador_usuarios
{
    public class Manejador_usuarios
    {
        public int id_usuario { get; set; }
        public string nombre_usuario { get; set; }
        public string nombrecompleto_usuario { get; set; }
        public string email_usuario { get; set; }
        public int id_scoi { get; set; }
        public string foto { get; set; }
    }
}