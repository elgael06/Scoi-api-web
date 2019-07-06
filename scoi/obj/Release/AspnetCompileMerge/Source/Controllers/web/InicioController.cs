using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Manager
{
    public class HomeController : Controller
    {
        public int usuario = 0;
        public ActionResult Index()
        {
            Session["id_usuario"] = Session["id_usuario"] ?? 0;
            usuario = int.Parse(Session["id_usuario"].ToString());

            if (usuario>0)
                return View();
            else
                return Redirect("login");
        }
    }
}
