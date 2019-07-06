using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using WebApplication.Manager.Accesos;
using WebApplication.Manager.Sesion;

namespace WebApplication.Manager.web
{
    public class UsuariosController : Controller
    {
        public int usuario = 0;

        // GET: Usuarios
        public ActionResult Index()
        {
            return RedirectToAction("Accesos");
        }
        public ActionResult Accesos() {
            ViewBag.Title = "Accesos";
            Session["id_usuario"] = Session["id_usuario"] ?? 0;
            usuario = int.Parse(Session["id_usuario"].ToString());

            int acceso = new IncioSesion().AccesoUrl(usuario, 1);
            if (acceso == 1)
                return View();
            else
                return Redirect("/Home");
        }
        [HttpPost]
        public JsonResult VerificarNombre(string nombre, int id) => Json(new Accesos_Usuario().ComprobarNombreUsuarioWeb(nombre, id));
        [HttpPost]
        public JsonResult CambioPassword(string id, string oldPass, string newPass) => new IncioSesion().Get(id, oldPass).id_usiario > 0 ? Json(new usuarios_acceso().CambioPassword(id, newPass)) :  Json("Error Id!!!");
        [HttpPost]
        public JsonResult RestaurarPassword(string id) => Json(new usuarios_acceso().RestaurarPassword(id));
        [HttpPost]
        public JsonResult NuevoUsuario(string id) => Json(new usuarios_acceso().RestaurarPassword(id));
        [HttpPost]
        public JsonResult ObtenerUsuarioScoi(string id) => Json(new usuarios_acceso().RestaurarPassword(id));
    }
}