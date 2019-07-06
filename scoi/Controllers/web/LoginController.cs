using api_seguimiento.objetos;
using System;
using System.Web.Mvc;
using WebApplication.Manager.Sesion;

namespace WebApplication.Manager.web
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            String sDate = DateTime.Now.ToString();
            DateTime datevalue = (Convert.ToDateTime(sDate.ToString()));

            String yy = datevalue.Year.ToString();

            ViewBag.error = "";
            ViewBag.anio = yy;
            Session.RemoveAll();

            Session["Anio"] = yy;
            ViewBag.Title = "Login SCOI Grupo Izagar.";
            return View();
        }
        [HttpPost]
        public JsonResult Index(string nombre, string pasword)
        {           
            Login usuario = new IncioSesion().Get(nombre, pasword);
            if (usuario.id_usiario > 0)
            {
                Session["id_usuario"] = usuario.id_usiario.ToString();
                Session["nombre_usuario"] = usuario.nombre;
                Session["nombre_completo_usuario"] = usuario.nombre_completo_usuario;
                Session["id_scoi"] = usuario.id_scoi;
                Session["foto"] = usuario.foto;
                return Json("OK");
            }
            else {
                ViewBag.error = "Error";
                return Json("Error");
            }
        }
    }
}