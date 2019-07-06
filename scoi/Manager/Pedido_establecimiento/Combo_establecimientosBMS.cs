using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace api_seguimiento.Manager.Pedido_establecimiento
{
    public class Combo_establecimientosBMS
    {
        public List<Establecimiento> Obtener() {
            return ObtenerSQL("westablecimientosBMS");
        }

        private List<Establecimiento> ObtenerSQL(string filtro)
        {
            SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
            SqlDataReader lector;

            List<Establecimiento> combo = new List<Establecimiento>();
            string query = string.Format("exec combos '{0}';", filtro);
            try
            {
                SqlCommand comando = new SqlCommand(query,conexion_scoi);
                conexion_scoi.Open();

                lector = comando.ExecuteReader();
                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        combo.Add(
                            new Establecimiento() {
                                folio= int.Parse(lector["cod_estab"].ToString()),
                                nombre = lector["establecimiento"].ToString(),
                                estatus = lector["estatus"].ToString()
                            });
                    }
                }

                conexion_scoi.Close();
            }
            catch {}

            return combo;
        }
    }
}