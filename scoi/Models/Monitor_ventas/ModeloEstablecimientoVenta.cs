using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication.Models.Monitor_flujo_de_inventario;

namespace WebApplication.Models.Monitor_ventas
{
    public class ModeloEstablecimientoVenta : ModeloMonitorVenta
    {
        public ModeloEstablecimientoVenta(List<monitor_de_ventas_consulta_sumarizada_Result> datos) :base(datos)
        {
            codigo_establecimiento = datos.Count>0 ?
                datos.First().cod_estab : 0;
            clasificador = datos.Count > 0 ?
                datos.First().establecimiento : "";

            foreach (var filtro in from dia in datos
                                   let nombre = dia.dia_semana_actual
                                   let pasado = dia.dia_semana_anio_pasado
                                   let d = nombre != "" ? nombre : pasado
                                   where Dias.FindIndex(e => e.clasificador == d) == -1
                                   select datos.Where(e => e.dia_semana_actual == d || e.dia_semana_anio_pasado == d).ToList())
            {
                if(filtro.Count>0)
                    Dias.Add(new ModeloDiaVenta(filtro));
            }
        }

        public int codigo_establecimiento { get; set; }
        public List<ModeloDiaVenta> Dias = new List<ModeloDiaVenta>();
    }
}