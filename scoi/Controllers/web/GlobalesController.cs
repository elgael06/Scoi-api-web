using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication.Manager.Globales;

namespace WebApplication.Manager.web
{
    public class GlobalesController : Controller
    {
        // GET: Globales
        public string Index() => "Datos De Interaccion Globales...";

        public ActionResult CodigoBarrasGrande() => View();

        [HttpPost]
        public JsonResult Combos(string tipo) => Json(new Combos(tipo).Lista_combos);
        [HttpPost]
        public JsonResult Conceptos_de_orden_de_pago() => Json(new conceptos_de_orden_de_pago().Lista_conceptos);
        [HttpPost]
        public JsonResult Tipo_orden_compra_interna() => Json(new tipo_orden_compra_interna().Lista);
        [HttpPost]
        public JsonResult Semana_actual(string fecha) => Json(new Manejos_fechas().Semana_actual(fecha));
    }
}