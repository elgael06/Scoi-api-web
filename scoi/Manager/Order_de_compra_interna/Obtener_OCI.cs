using api_seguimiento.Models.Orden_de_compra_interna;
using api_seguimiento.objetos;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace api_seguimiento.Manager.Order_de_compra_interna
{
    public class Obtener_OCI
    {

        public List<Orden_OCI> Obtener(string estatus)
        {
            SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
            SqlDataReader lector;
            List<Orden_OCI> Ordenes = new List<Orden_OCI>();

            string query = string.Format("exec orden_de_compra_interna_filtro '{0}' ;", estatus);

            SqlCommand comando = new SqlCommand(query, conexion_scoi);
            conexion_scoi.Open();
            lector = comando.ExecuteReader();

            if (lector.HasRows)
            {
                while (lector.Read())
                {
                    Ordenes.Add(
                    new Orden_OCI()
                    {
                      Folio                 = int.Parse(lector["folio"].ToString()),
                      Uso_mercancia         = lector["uso_de_mercancia"].ToString(),
                      Tipo_solicitante      = lector["tipo_de_solicitante"].ToString(),
                      Nombre_solicitante    = lector["nombre_de_solicitante"].ToString(),
                      Fecha                 = lector["fecha"].ToString(),
                      Establecimiento       = lector["establecimiento_destino"].ToString(),
                      Estatus               = lector["status"].ToString(),
                      Fecha_autorizacion    = lector["fecha_autorizacion"].ToString(),
                      Usuario_autorizo      = lector["usuario_autorizo"].ToString()
                    });
                }
            }
            return Ordenes;
        }

    }
}