using api_seguimiento.Models.Orden_de_compra_interna;
using api_seguimiento.objetos;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace api_seguimiento.Manager.Order_de_compra_interna
{
    public class Detalle_OCI
    {

        public Detalles_OCI Obtener(int folio) {

            SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
            SqlDataReader lector;
            Detalles_OCI procutos = null;


            string query = string.Format("exec orden_de_compra_interna_buscar {0} ;", folio);

            SqlCommand comando = new SqlCommand(query, conexion_scoi);
            conexion_scoi.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    procutos = new Detalles_OCI(int.Parse(lector["folio"].ToString()))
                    {
                        Folio               = int.Parse(lector["folio"].ToString()),
                        Estatus             = lector["status"].ToString(),
                        Establecimiento     = lector["establecimiento_destino"].ToString(),
                        Folio_solicitante   = int.Parse(lector["folio_de_solicitante"].ToString()),
                        Solicitante         = lector["tipo_de_solicitante"].ToString(),
                        Nombre_solicitante  = lector["nombre_de_solicitante"].ToString(),
                        Folio_servicio      = int.Parse(lector["folio_servicio"].ToString()),
                        Servicio            = lector["servicio"].ToString(),
                        Uso_mercancia       = lector["uso_de_mercancia"].ToString()
                    };
                }
            }
            return procutos;
        }
    }
}