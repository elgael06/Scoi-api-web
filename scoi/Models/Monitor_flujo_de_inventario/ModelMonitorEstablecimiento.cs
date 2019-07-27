﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_flujo_de_inventario
{
    public class ModelMonitorEstablecimiento : ModelConceptosInventario
    {
        public ModelMonitorEstablecimiento(List<monitor_flujo_de_inventario_Result> datos):base(datos)
        {
            clasesNombre = new List<string>();
            clases = new List<ModelMonitorClase>();

            foreach ( var dato in datos)
            {
                string clase = dato.clasificacion;
                if (clasesNombre.FindIndex(e=> e== clase) == -1)
                {
                    clasesNombre.Add(clase);
                    clases.Add(new ModelMonitorClase(datos: datos.Where(e => e.clasificacion == clase).ToList())
                    {
                        nombre = clase
                    });
                }
            }
        }
        public string nombre { get; set; }
        public List<string> clasesNombre { get; set; }
        public List<ModelMonitorClase> clases { get; set; }
    }
}