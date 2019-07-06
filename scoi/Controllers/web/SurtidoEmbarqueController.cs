using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication.Manager.Sesion;

namespace WebApplication.Manager.web
{
    public class SurtidoEmbarqueController : Controller
    {
        public int usuario = 0;
        // GET: SurtidoEmbarque
        public ActionResult Index()
        {

            ViewBag.Title = "Surtido Embarque.";
            return Accesos(44);
        }
        private ActionResult Accesos(int ruta)
        {
            Session["id_usuario"] = Session["id_usuario"] ?? 0;
            usuario = int.Parse(Session["id_usuario"].ToString());

            int acceso = new IncioSesion().AccesoUrl(usuario, ruta);
            if (acceso == 1)
                return View();
            else
                return Redirect("/Home");
        }
    }
}