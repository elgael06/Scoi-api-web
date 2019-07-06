using api_seguimiento.objetos;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace api_seguimiento.Models.Orden_de_compra_interna
{
    public class Detalles_OCI
    {
        public int      Folio               { get; set; }
        public string   Estatus             { get; set; }
        public string   Establecimiento     { get; set; }
        public int      Folio_solicitante   { get; set; }
        public string   Solicitante         { get; set; }
        public string   Nombre_solicitante  { get; set; }
        public int      Folio_servicio      { get; set; }
        public string   Servicio            { get; set; }
        public string   Uso_mercancia       { get; set; }
        public List<Producto_OCI> Productos { get; set; } 

        public Detalles_OCI(int folio) {
            Productos = new List<Producto_OCI>();
            ConsultarProductos(folio);
        }
        private void ConsultarProductos(int folio) {
            
            SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
            SqlDataReader lector;

            string query = string.Format("exec orden_de_compra_interna_buscar_tabla {0} ;", folio);

            SqlCommand comando = new SqlCommand(query, conexion_scoi);
            conexion_scoi.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    Productos.Add(
                    new Producto_OCI() {
                        Descripcion = lector["descripcion_de_producto"].ToString(),
                        Cantidad    = double.Parse(lector["cantidad_solicitada"].ToString()),
                        Unidad      = lector["unidad_solicitada"].ToString()
                    });
                }
            }
        }
    }
}