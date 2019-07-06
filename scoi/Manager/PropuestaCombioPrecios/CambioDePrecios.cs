using api_seguimiento.Manager.Productos_clasificador;
using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using WebApplication.Models.PropuestaCombioPrecios;

namespace WebApplication.Manager.PropuestaCombioPrecios
{
    public class CambioDePrecios
    {
        private SqlConnection CONEXION_SCOI = new ConexionesSQL().Scoi();
        private SqlDataReader LECTOR;

        public CambioDePrecios()
        {

        }
        public List<string> Guardar( List<ModeloGuardadoCambioPrecio> productos)
        {
            int ultimo_folio = ObtenerUltimoFolio();
            int cantidad = 0;
            List<string> mensajes = new List<string>();
            mensajes.Add(string.Format("Guardado...\nFolio:\t{0}",ultimo_folio));
            try
            {
                foreach (ModeloGuardadoCambioPrecio seleccion in productos)
                {
                    try
                    {
                        GuardarEnBaseDatos(folio: ultimo_folio, producto: seleccion);
                        cantidad++;
                    }
                    catch
                    {
                        mensajes.Add(string.Format("Error Al Guardar EL Producto!!! \nCodigo:\t{0}.\nFolio:\t{1}.", seleccion.codigo_producto, ultimo_folio));
                    }
                }
                mensajes[0] = mensajes[0] + string.Format("\nProductos :\t{0}.", cantidad);
            }
            catch (Exception e) {
                mensajes.Add(e.ToString());
            }
            return mensajes;
        }

        public List<ModeloGuardadoCambioPrecio> Consultar(int folio)
        {
            List<ModeloGuardadoCambioPrecio> productos = ObtenerEnBaseDatos(folio: folio);

            foreach ( ModeloGuardadoCambioPrecio producto in productos)
            {
                var p = new Clasificador_obtener_productos().Obtener(producto.codigo_producto, "super V");
                producto.descripcion = p.Descripcion;
            }

            return productos;
        }

        public List<ModeloFiltroFolioCambioPrecio> FiltroFolioCambioPrecio() => ConsultaFolioCambioPrecio();




        private int ObtenerUltimoFolio()
        {
            int folio = 0;

            string query = "exec folio_siguiente_por_transaccion 92;";
            SqlCommand comando = new SqlCommand(query,CONEXION_SCOI);
            CONEXION_SCOI.Open();
            LECTOR = comando.ExecuteReader();
            if (LECTOR.HasRows)
            {
                while(LECTOR.Read())
                    folio =int.Parse(LECTOR["folio"].ToString());
            }
            CONEXION_SCOI.Close();
            return folio;
        }

        private void GuardarEnBaseDatos(int folio, ModeloGuardadoCambioPrecio producto)
        {
            string query = string.Format("insert into cambio_de_precios ("+
    "folio,codigo_producto,precio_venta,precio_venta_nueva,margen_actual,margen_familia,margen_nuevo,costo,volumen,usuario_capturo,usuario_modifico,fecha)"+
                " values({0}, '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', getdate())",
    folio, producto.codigo_producto, producto.precio_venta, producto.precio_venta_nuevo, producto.margen_venta_actual, producto.margen_venta_familia, producto.margen_venta_nuevo,
    producto.costo, producto.volumen,producto.id_usuario, producto.id_usuario);

            SqlCommand comando = new SqlCommand(cmdText: query,connection:CONEXION_SCOI);

            CONEXION_SCOI.Open();
            comando.ExecuteNonQuery();
            CONEXION_SCOI.Close();
        }

        private List<ModeloGuardadoCambioPrecio> ObtenerEnBaseDatos(int folio)
        {
            List<ModeloGuardadoCambioPrecio> lista = new List<ModeloGuardadoCambioPrecio>();

            string query = string.Format("select * from cambio_de_precios where folio={0};",folio);
            SqlCommand comando = new SqlCommand(query, CONEXION_SCOI);
            CONEXION_SCOI.Open();
            LECTOR = comando.ExecuteReader();
            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    lista.Add(new ModeloGuardadoCambioPrecio {
                        codigo_producto= LECTOR["codigo_producto"].ToString(),
                        precio_venta = double.Parse(LECTOR["precio_venta"].ToString()),
                        precio_venta_nuevo = double.Parse(LECTOR["precio_venta_nueva"].ToString()),
                        costo = double.Parse(LECTOR["costo"].ToString()),
                        margen_venta_actual = double.Parse(LECTOR["margen_actual"].ToString()),
                        margen_venta_familia = double.Parse(LECTOR["margen_familia"].ToString()),
                        margen_venta_nuevo = double.Parse(LECTOR["margen_nuevo"].ToString()),
                        volumen = JsonConvert.DeserializeObject( LECTOR["volumen"].ToString()),
                    });
                }
            }
            CONEXION_SCOI.Close();

            return lista;
        }

        private List<ModeloFiltroFolioCambioPrecio> ConsultaFolioCambioPrecio()
        {
            List<ModeloFiltroFolioCambioPrecio> lista = new List<ModeloFiltroFolioCambioPrecio>();

            SqlCommand comando = new SqlCommand(
                cmdText : "select folio,dbo.nombre_empleado(usuario_capturo) empleado,convert(varchar(15), fecha,106)  fecha from cambio_de_precios group by folio,usuario_capturo,fecha;", CONEXION_SCOI);
            CONEXION_SCOI.Open();
            LECTOR = comando.ExecuteReader();
            if (LECTOR.HasRows)
            {
                while (LECTOR.Read())
                {
                    lista.Add(new ModeloFiltroFolioCambioPrecio {
                        Folio = int.Parse(LECTOR["folio"].ToString()),
                        Empleado = LECTOR["empleado"].ToString(),
                        Fecha = LECTOR["fecha"].ToString()
                    });
                }
            }
            CONEXION_SCOI.Close();

            return lista;
        }
    }
}