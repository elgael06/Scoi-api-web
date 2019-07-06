using System.Collections.Generic;

namespace WebApplication.Models.Accesos
{
    public class Accesos_sub_menus_usuario
    {
        public Accesos_sub_menus_usuario(List<urls_sql> lista)
        {
            foreach (urls_sql dato in lista)
            {
                Accesos.Add(new Accesos_url_usuario()
                {
                    Folio_acceso = dato.folio_acceso,
                    Nombre = dato.acceso,
                    Url = dato.url,
                    Estatus = dato.estatus,
                });
            }
        }
        public string Sub_menus { get; set; }
        public string Icon_Sub_menus { set; get; }
        public List<Accesos_url_usuario> Accesos = new List<Accesos_url_usuario>();
    }
}