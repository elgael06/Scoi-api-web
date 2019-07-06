using System;
using System.Collections.Generic;
using System.Web.Http;
using WebApplication.Manager.Accesos;
using WebApplication.Models.Accesos;

namespace WebApplication.Manager.Accesos
{
    public class Accesos_urlController : ApiController
    {
        // GET api/<controller>/5
        public List<Accesos_menus_usuario> Get(int id)=> new Accesos_Usuario().Obtener_Urls_accesos(id,1);

        public List<Accesos_menus_usuario> Post(int id)=> new Accesos_Usuario().Obtener_Urls_accesos(id, 0);

        public string Post(int id_usuario ,[FromBody] List<Accesos_url_usuario> accesos)=> new Accesos_Usuario().Actualizar_accesos_usuarios(id_usuario, accesos);
    }
}