using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication.Manager.Sesion;

namespace WebApplication.Manager.Orden_de_compra_interna
{
    public class GastosController : Controller
    {
        public int usuario = 0;
        // GET: Gastos
        public ActionResult Index()
        {
            return Redirect("/Home");
        }
        public ActionResult OrdenGastos() {
            return Accesos(1);
        }
        public ActionResult OrdenCompraInterna()
        {
            return Accesos(1);
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