using api_seguimiento.objetos;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace WebApplication.Manager.Globales
{
    public class conceptos_de_orden_de_pago
    {
        private SqlConnection CONEXION_SCOI = new ConexionesSQL().Scoi();
        private SqlDataReader LECTOR;

        public List<string> Lista_conceptos = new List<string>();

        public conceptos_de_orden_de_pago()
        {
            ObtenerConceptos_SQL();
        }
        private void ObtenerConceptos_SQL()
        {
            Lista_conceptos.Add("Todos");
            SqlCommand comando = new SqlCommand("select concepto_orden_de_pago from tb_conceptos_de_orden_de_pago order by concepto_orden_de_pago;", CONEXION_SCOI);

            CONEXION_SCOI.Open();
            LECTOR = comando.ExecuteReader();
            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    Lista_conceptos.Add(LECTOR["concepto_orden_de_pago"].ToString());
                }
            }

            CONEXION_SCOI.Close();
        }
    }
}