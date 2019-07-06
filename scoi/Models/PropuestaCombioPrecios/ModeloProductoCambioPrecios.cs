using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace WebApplication.Models.PropuestaCombioPrecios
{
    public class ModeloProductoCambioPrecios
    {
        public string Codigo         { get; set; }
        public string Descripcion    { get; set; }

        public double Costo_promedio { get; set; }
        public double Ultimo_costo   { get; set; }

        public double Precio_venta           { get; set; }
        public double Precio_venta_nvo       { get; set; }
        public double Precio_venta_captura   { get; set; }
        public double Precio_oferta_actual   { get; set; }

        public double Margen         { get; set; }
        public double Margen_nvo     { get; set; }
        public double Margen_familia { get; set; }
        public double Venta_90_dias { get; set; }

        public dynamic Precios_volumen { get; set; }

        public ModeloCompetenciaCambioPrecios Competencias = new ModeloCompetenciaCambioPrecios();

        public string Localizacion  { get; set; }
        public string Pasillo       { get; set; }
        public string Clase         { get; set; }
        public string Categoria     { get; set; }
        public string Familia       { get; set; }
        public string CanastaBasica { get; set; }
        public string Color         { get; set; }
        public string Marca         { get; set; }
        public string Clasificacion8020 { get; set; }

        public bool Estatus = false;
    }
}

/*
 cod_prod
descripcion
costo_promedio
ultimo_costo
precio_de_venta
margen
margen_meta_familia
precio_venta_nuevo
margen_nuevo

     */

/*
 localizacion
pasillo
clase_producto
categoria
familia
canasta_basica
color
clasificacion_8020
marca

     */
