using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication.Models.Ordenes_de_pago_en_efectivo;

namespace WebApplication.Manager.Ordenes_de_pago_en_efectivo
{
    public class Obtener_beneficiarios
    {
        private SqlConnection CONEXION_SCOI = new ConexionesSQL().Scoi();
        private SqlDataReader LECTOR;

        public List<Beneficiario> Lista_beneficiarios = new List<Beneficiario>();

        public Obtener_beneficiarios(string tipo)
        {
            Obtener_beneficiarios_por_tipo(tipo);
        }
        private void Obtener_beneficiarios_por_tipo(string tipo)
        {
            if (tipo == "0")
            {
                Obtener_empleados();
                Obtener_proveedores();
            }
            else if (tipo == "Empleado")
                Obtener_empleados();
            else if (tipo == "Proveedor")
                Obtener_proveedores();
        }
        private void Obtener_empleados()
        {
            string query = "select folio,nombre,ap_paterno,ap_materno from tb_empleado with(nolock);";
            string folio = "folio";
            Obtener_beneficiario(query, folio);
        }
        private void Obtener_proveedores()
        {
            string query = "select * from tb_proveedores;";
            string folio = "folio_proveedor";
            Obtener_beneficiario(query,folio);
        }
        private void Obtener_beneficiario(string query,string folio)
        {
            SqlCommand comando = new SqlCommand(query, CONEXION_SCOI);
            CONEXION_SCOI.Open();
            LECTOR = comando.ExecuteReader();
            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    Lista_beneficiarios.Add(new Beneficiario()
                    {
                        Folio = int.Parse(LECTOR[folio].ToString()),
                        Nombre = string.Format("{0} {1} {2}",
                        LECTOR["nombre"].ToString(), LECTOR["ap_paterno"].ToString(), LECTOR["ap_materno"].ToString())
                    });
                }
            }
            CONEXION_SCOI.Close();
        }
    }
}