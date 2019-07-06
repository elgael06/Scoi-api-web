using api_seguimiento.Models.Orden_de_compra_interna;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.Orden_de_compra_interna
{
    public class Autorizacion_Estatus_OCI
    {
        public string Actualizar(Autirizacion_OCI autirizacion)
        {
            SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
            List<Detalles_OCI> procutos = new List<Detalles_OCI>();

            string query = string.Format("exec orden_de_compra_interna_autorizacion {0},'{1}',{2},'{3}','{4}';",
                autirizacion.Folio, autirizacion.Estatus, autirizacion.Usiario, autirizacion.Pc, autirizacion.Ip);
            try{
                SqlCommand comando = new SqlCommand(query, conexion_scoi);
                conexion_scoi.Open();
                comando.ExecuteNonQuery();
                conexion_scoi.Close();
            }
            catch{
                return "Error Al Guardar!!!";
            }
            return "Guardado...";
        }
    }
}