using System.Web.Mvc;
using WebApplication.Manager.Incidencias_personal;
using WebApplication.Manager.Monitor_cuadrantes;
using WebApplication.Manager.monitor_orden_compra_interna;
using WebApplication.Manager.Monitor_precio_competencia;
using WebApplication.Manager.MovimientosBancoInterno;
using WebApplication.Manager.Sesion;

namespace WebApplication.Manager.web
{
    public class IndicadoresController : Controller
    {
         public int usuario = 0;
        // GET: Indicadores
        public ActionResult Index() => Accesos(16);
        public ActionResult EstadosDeResultados() => Accesos(17);
        public ActionResult AuditoriaVenta() => Accesos(46);
        public ActionResult Matrices() => Accesos(18);
        public ActionResult CuestionariosApertura() => Accesos(19);
        public ActionResult CuestionariosServicios() => Accesos(21);
        public ActionResult PreciosCompetencia() => Accesos(22);
        public ActionResult Cuadrantes() => Accesos(23);
        public ActionResult CuadrantesPorEstablecimiento() => Accesos(24);
        public ActionResult OrdenesDePagoEnEfectivo() => Accesos(47);
        public ActionResult MovimientosBancoInterno() => Accesos(25);
        public ActionResult ReporteIncidenciasFecha() => Accesos(48);
        public ActionResult MonitorOrdenCompraInterna() => Accesos(54);
        public ActionResult MonitorEmbarques() => Accesos(56);
        public ActionResult AnalisisCamiboPrecios() => Accesos(57);


        //httpRequest
        public JsonResult concepto_orden_de_pago()=>Json(new Pagos_realizados_en_un_periodo_por_cuenta_consulta().comando_concepto_orden_de_pago_sql("", "", "", ""), JsonRequestBehavior.AllowGet);
        public JsonResult ObtenerReporteIncidenciasFecha(string inicio, string termino) => Json( new Reporte_incidencias_por_fecha().ObtenerReporte(inicio, termino), JsonRequestBehavior.AllowGet);
        [HttpPost]
        public ActionResult ObtenerMonitorOrdenCompraInterna(string f1, string f2, string tipo_orden, string estatus, string tipo_recibe, int recibe, int establecimiento, string cod_prod) => Json(new Manager_monitor_orden_compra_interna().Obtener(f1,f2,tipo_orden,estatus,tipo_recibe,recibe,establecimiento,cod_prod), JsonRequestBehavior.AllowGet);
        [HttpPost]
        public JsonResult Cuadrantes_reporte_para_monitor_general(string fi, string ff, string establecimiento) => Json(new Obtener_monitor_cuadrantes(fi, ff, establecimiento));
        //[HttpPost]
        public JsonResult Monitor_analisis_precios_competencias(string filtro) => Json(new Obtener_Monitor_precio_competencia("", filtro,""), JsonRequestBehavior.AllowGet);
        private ActionResult Accesos(int ruta) {
            Session["id_usuario"] = Session["id_usuario"] ?? 0;
            usuario = int.Parse(Session["id_usuario"].ToString());

            int acceso = new IncioSesion().AccesoUrl(usuario, ruta);
            if (acceso == 1)
                return View();
            else
                return Redirect("/Home");
        }

        //metodos web
    }
}