using System.Collections.Generic;
using System.Linq;

namespace WebApplication.Models.Accesos
{
    public class Accesos_menus_usuario
    {
        public Accesos_menus_usuario(List<urls_sql> lista)
        {
            foreach (urls_sql dato in lista)
            {
                int index = Sub_menus.FindIndex(e => e.Sub_menus == dato.submenu);
                if (index == -1)
                {
                    List<urls_sql> filtro = lista.Where(e => e.submenu == dato.submenu).ToList();
                    Sub_menus.Add(new Accesos_sub_menus_usuario(filtro) {
                        Sub_menus = dato.submenu,
                        Icon_Sub_menus = dato.icon_submenu,
                    });
                }
            }
        }

        public string Menu { set; get; }
        public string Icon_Menu { set; get; }
        public List<Accesos_sub_menus_usuario> Sub_menus = new List<Accesos_sub_menus_usuario>();
    }
}