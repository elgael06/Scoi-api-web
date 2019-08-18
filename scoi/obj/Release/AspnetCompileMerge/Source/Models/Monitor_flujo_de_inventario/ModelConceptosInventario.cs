using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication.Models.Monitor_flujo_de_inventario
{
    public class ModelConceptosInventario
    {
        public ModelConceptosInventario(List<monitor_flujo_de_inventario_Result> datos)
        {
            Llenado(datos: datos);
            inventario_final_real = inventario_inicial + compras + ventas_netas + movimientos_internos + loteos_y_mermas + transferencias + recepciones + aumento_inventario;
            inventario_diferencia = inventario_inicial - inventario_final_real;
        }
        private void Llenado(List<monitor_flujo_de_inventario_Result> datos)
        {
            inventario_inicial      = (double)datos.Where(e => e.clasificacion.Contains("INVENTARIO INICIAL")).Select(e => e.costo).Sum();
            compras                 = (double)datos.Where(e => e.clasificacion.Contains("COMPRAS")).Select(e => e.costo).Sum();
            ventas_netas            = (double)datos.Where(e => e.concepto.Contains("VENTAS NETAS")).Select(e => e.costo).Sum();
            movimientos_internos    = (double)datos.Where(e => e.clasificacion == "DISMINUCIONES DE INVENTARIO" ||
               e.clasificacion.Contains("MERMA") ||
                 !e.clasificacion.Contains("DESJUGUE")  ||
                 !e.clasificacion.Contains("LIMPIEZA")  ||
                 !e.clasificacion.Contains("PROCESOS")  //MERMAS NO PROCESOS
            ).Select(e => e.costo).Sum();
            loteos_y_mermas         = (double)datos.Where(e => e.clasificacion.Contains("MERMA") &&
                ( e.clasificacion.Contains("DESJUGUE") ||
                  e.clasificacion.Contains("LIMPIEZA") ||
                  e.clasificacion.Contains("PROCESOS") )
            ).Select(e=>e.costo).Sum();
            transferencias          = (double)datos.Where(e => e.clasificacion.Contains("TRANSFERENCIAS")).Select(e => e.costo).Sum();
            recepciones             = (double)datos.Where(e => e.clasificacion.Contains("RECEPCIONES")).Select(e => e.costo).Sum();
            aumento_inventario      = (double)datos.Where(e => e.clasificacion.Contains("AUMENTOS DE INVENTARIO")).Select(e => e.costo).Sum();
        }

        public double inventario_inicial { get; set; }
        public double compras { get; set; }
        public double ventas_netas { get; set; }
        public double movimientos_internos { get; set; }
        public double loteos_y_mermas { get; set; }
        public double transferencias { get; set; }
        public double recepciones { get; set; }
        public double aumento_inventario { get; set; }
        public double inventario_final_real { get; set; }
        public double inventario_final { get; set; }
        public double inventario_diferencia { get; set; }
    }    
}
