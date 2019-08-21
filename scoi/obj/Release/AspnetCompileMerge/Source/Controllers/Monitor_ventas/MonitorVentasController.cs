using System.Linq;
using System.Web.Http;
using System.Collections.Generic;
using WebApplication.Models.Monitor_ventas;
using WebApplication.Models.Monitor_flujo_de_inventario;
using WebApplication.Models.Globales;
using System;

namespace WebApplication.Controllers.Monitor_ventas
{
    public class MonitorVentasController : ApiController
    {
        // GET api/<controller>
        public ResultadoVentasTDC Get()
        {
            return new ResultadoVentasTDC();
        }
        [HttpPost]
        [Route("api/resultadosVentasSemanasAnio")]
        public ResultadoVentasTDC resultadosVentasSemanasAnio([FromBody]List<string> semanas)
        {
            return new ResultadoVentasTDC(semanas);
        }
        // POST api/<controller>
        public List<ModeloEstablecimientoVenta> Post([FromBody]modelos_filtros filtros)
        {
            return new ResultadoVentasTDC(filtros).respuesta;
        }
    }
    public class ResultadoVentasTDC
    {
        public ResultadoVentasTDC()
        {
            using (var context = new Entities())
            {
                lista = context.monitor_de_ventas_consulta_sumarizada().ToList();
                respuesta = new List<ModeloEstablecimientoVenta>();
                foreach (var item in from establecimiento in lista
                                     let nombre = establecimiento.establecimiento
                                     where respuesta.FindIndex(e => e.clasificador == nombre) == -1
                                     select new ModeloEstablecimientoVenta(lista.Where(e => e.establecimiento == nombre &&
                                     new Dia(e.dia_semana_actual != "" ?
                                        e.fecha_de_venta_actual :
                                        e.fecha_de_venta_anio_pasado).posicion < hoy.posicion).ToList()))
                {
                    respuesta.Add(item);
                }
                filtros();
            }
        }

        public ResultadoVentasTDC(List<string> semanas_anio)
        {
            using (var context = new Entities())
            {
                lista = context.monitor_de_ventas_consulta_sumarizada().ToList();
                respuesta = new List<ModeloEstablecimientoVenta>();
                foreach (var item in from establecimiento in lista
                                     let nombre = establecimiento.establecimiento
                                     where respuesta.FindIndex(e => e.clasificador == nombre) == -1
                                     select new ModeloEstablecimientoVenta(lista.Where(e => e.establecimiento == nombre &&
                                     new Dia(e.dia_semana_actual != "" ?
                                        e.fecha_de_venta_actual :
                                        e.fecha_de_venta_anio_pasado).posicion < hoy.posicion
                                     //&& semanas_anio.FindIndex(semana => semana == e.semana_actual.ToString() || semana == e.semana_anio_pasado.ToString()) > -1
                                     ).ToList())
                )
                {
                    respuesta.Add(item);
                }
                filtros();
                semanas.Concat(semanas_anio);
            }
        }

        public ResultadoVentasTDC(modelos_filtros filtro)
        {
            using (var context = new Entities())
            {
                lista = context.monitor_de_ventas_consulta_sumarizada().Where(e=> condicionesFiltrado(e, filtro)).ToList();
                respuesta = new List<ModeloEstablecimientoVenta>();
                foreach (var item in from establecimiento in lista
                                     let nombre = establecimiento.establecimiento
                                     where respuesta.FindIndex(e => e.clasificador == nombre) == -1 && nombre != ""
                                     select lista.Where(e => e.establecimiento == nombre &&
                                     new Dia(e.dia_semana_actual != "" ?
                                        e.fecha_de_venta_actual :
                                        e.fecha_de_venta_anio_pasado).posicion < hoy.posicion).ToList())
                {
                    if(item.Count>0 )
                        respuesta.Add(new ModeloEstablecimientoVenta(item));
                }
                filtros();
                //lista = new List<monitor_de_ventas_consulta_sumarizada_Result>();
            }
        }

        bool condicionesFiltrado(monitor_de_ventas_consulta_sumarizada_Result parametros, modelos_filtros filtro)
        {
            try
            {
                return (parametros.establecimiento == filtro.establecimientos || 
                        filtro.establecimientos == "Todos") &&
                    (parametros.dia_semana_anio_pasado == filtro.dia_semana || parametros.dia_semana_actual == filtro.dia_semana ||
                        filtro.dia_semana == "Todos") &&
                    (parametros.categoria == filtro.categorias ||
                        filtro.categorias == "Todos") &&
                    (parametros.semana_actual.ToString() == filtro.semanas || parametros.semana_anio_pasado.ToString() == filtro.semanas ||
                        filtro.semanas == "Todos") &&
                    (parametros.clase == filtro.clases ||
                        filtro.clases == "Todos") &&
                    (parametros.fecha_de_venta_actual == filtro.fechas || parametros.fecha_de_venta_anio_pasado == filtro.fechas ||
                        filtro.fechas == "Todos") &&
                    (parametros.talla == filtro.tallas || 
                        filtro.tallas == "Todos") &&
                    (parametros.tipo_de_venta == filtro.tipo_venta || 
                        filtro.tipo_venta == "Todos") &&
                    (parametros.marca == filtro.marca || 
                        filtro.marca == "Todos") && 
                    (parametros.modelo == filtro.modelos ||
                        filtro.modelos == "Todos") &&
                    (parametros.color == filtro.colores || 
                        filtro.colores == "Todos") &&
                    (parametros.familia == filtro.familias || 
                        filtro.familias == "Todos") &&
                    (parametros.linea == filtro.lineas || 
                        filtro.lineas == "Todos");
            }
            catch (Exception e) {
                return true;
            }
        }

        private void filtros()
        {
            foreach (var dato in lista)
            {
                if (establecimientos.FindIndex(e => e == dato.establecimiento) == -1)
                    establecimientos.Add(dato.establecimiento);

                if (dia_semana.FindIndex(e => e == dato.dia_semana_actual) == -1)
                    dia_semana.Add(dato.dia_semana_actual);

                if (semanas.FindIndex(e => e == dato.semana_actual.ToString()) == -1)
                    semanas.Add(dato.semana_actual.ToString());

                if (fechas.FindIndex(e => e == dato.fecha_de_venta_actual) == -1)
                    fechas.Add(dato.fecha_de_venta_actual);

                if (tipo_venta.FindIndex(e => e == dato.tipo_de_venta) == -1)
                    tipo_venta.Add(dato.tipo_de_venta);

                if (marca.FindIndex(e => e == dato.marca) == -1)
                    marca.Add(dato.marca);

                if (colores.FindIndex(e => e == dato.color) == -1)
                    colores.Add(dato.color);

                if (tallas.FindIndex(e => e == dato.talla) == -1)
                    tallas.Add(dato.talla);

                if (clases.FindIndex(e => e == dato.clase) == -1)
                    clases.Add(dato.clase);

                if (categorias.FindIndex(e => e == dato.categoria) == -1)
                    categorias.Add(dato.categoria);

                if (familias.FindIndex(e => e == dato.familia) == -1)
                    familias.Add(dato.familia);

                if (lineas.FindIndex(e => e == dato.linea) == -1)
                    lineas.Add(dato.linea);

                if (modelos.FindIndex(e => e == dato.modelo) == -1)
                    modelos.Add(dato.modelo);
            }
        }

        private List<monitor_de_ventas_consulta_sumarizada_Result> lista = new List<monitor_de_ventas_consulta_sumarizada_Result>();
        public Dia hoy = new Dia();
        public List<ModeloEstablecimientoVenta> respuesta { get; set; }
        public List<string> establecimientos    = new List<string>() {"Todos"};
        public List<string> dia_semana          = new List<string>() { "Todos" };
        public List<string> semanas             = new List<string>() { "Todos" };
        public List<string> fechas              = new List<string>() { "Todos" };
        public List<string> tipo_venta          = new List<string>() { "Todos" };
        public List<string> marca               = new List<string>() { "Todos" };
        public List<string> modelos             = new List<string>() { "Todos" };
        public List<string> colores             = new List<string>() { "Todos" };
        public List<string> tallas              = new List<string>() { "Todos" };
        public List<string> clases              = new List<string>() { "Todos" };
        public List<string> categorias          = new List<string>() { "Todos" };
        public List<string> familias            = new List<string>() { "Todos" };
        public List<string> lineas              = new List<string>() { "Todos" };
    }

    public class modelos_filtros
    {
        public string establecimientos { get; set;}
        public string dia_semana { get; set;}
        public string semanas { get; set;}
        public string fechas { get; set;}
        public string tipo_venta { get; set;}
        public string marca { get; set;}
        public string modelos { get; set;}
        public string colores { get; set;}
        public string tallas { get; set;}
        public string clases { get; set;}
        public string categorias { get; set;}
        public string familias { get; set;}
        public string lineas { get; set;}
    }
}