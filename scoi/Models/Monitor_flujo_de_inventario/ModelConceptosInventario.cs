using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Monitor_flujo_de_inventario
{
    public class ModelConceptosInventario
    {
        public ModelConceptosInventario(List<monitor_flujo_de_inventario_Result> datos)
        {
            Llenado(datos: datos);
            inventario_final = inventario_inicial + compras + ventas_netas + movimientos_internos + loteos_y_mermas + transferencias + recepciones + aumento_inventario;

        }
        private void Llenado(List<monitor_flujo_de_inventario_Result> datos)
        {
            inventario_inicial      = (double)datos.Where(e=>e.clasificacion == "INVENTARIO INICIAL").Select(e=>e.costo).Sum();
            compras                 = (double)datos.Where(e=>e.clasificacion == "COMPRAS").Select(e=>e.costo).Sum();
            ventas_netas            = (double)datos.Where(e=>e.clasificacion == "VENTAS").Select(e=>e.costo).Sum()
                                    + (double)datos.Where(e => e.clasificacion == "COSTO DE VENTAS").Select(e => e.costo).Sum();
            movimientos_internos    = (double)datos.Where(e=>e.clasificacion == "DISMINUCIONES DE INVENTARIO").Select(e=>e.costo).Sum();
            loteos_y_mermas         = (double)datos.Where(e=>e.clasificacion == "LOTEOS").Select(e=>e.costo).Sum();
            transferencias          = (double)datos.Where(e=>e.clasificacion == "TRANSFERENCIAS A OTROS ESTABLECIMIENTOS").Select(e=>e.costo).Sum();
            recepciones             = (double)datos.Where(e=>e.clasificacion == "RECEPCIONES DE OTROS ESTABLECIMIENTOS").Select(e=>e.costo).Sum();
            aumento_inventario      = (double)datos.Where(e=>e.clasificacion == "AUMENTOS DE INVENTARIO").Select(e=>e.costo).Sum();
        }
        private double calculo(double[] parametros) => parametros.Sum();


        public double inventario_inicial { get; set; }
        public double compras { get; set; }
        public double ventas_netas { get; set; }
        public double movimientos_internos { get; set; }
        public double loteos_y_mermas { get; set; }
        public double transferencias { get; set; }
        public double recepciones { get; set; }
        public double aumento_inventario { get; set; }
        public double inventario_final { get; set; }
    }    
}
/*
            "AUMENTOS DE INVENTARIO",
            "DISMINUCIONES DE INVENTARIO",
            "COSTO DE VENTAS",
            "MERMA OPERATIVA",
            "GASTOS C ADMINISTRACION GENERAL",
            "GASTOS DE ADMINISTRACION FERREAUTO",
            "GASTOS DE ADMINISTRACION GENERAL",
            "GASTOS DE ADMINISTRACION RETAIL",
            "GASTOS DE VENTA"
     */
