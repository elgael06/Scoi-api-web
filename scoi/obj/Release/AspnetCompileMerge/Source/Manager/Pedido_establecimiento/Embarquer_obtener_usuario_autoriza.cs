using api_seguimiento.objetos;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using WebApplication.Models.Pedido_establecimiento;

namespace WebApplication.Manager.Pedido_establecimiento
{
    public class Embarquer_obtener_usuario_autoriza
    {
        SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
        SqlDataReader lector;

        public Usuario_autiriza_embarque Consultar(string folio_usuario, string pedido, string embarque, ModelEmbarquePedidoSolicitud Embarque)
        {
            Usuario_autiriza_embarque usuario = new Usuario_autiriza_embarque();
            string query = string.Format("exec surtido_embarquer_obtener_usuario_autiriza '{0}';", folio_usuario);
            SqlCommand comand = new SqlCommand(query, conexion_scoi);

            conexion_scoi.Open();
            lector = comand.ExecuteReader();
            try
            {
                if (lector.HasRows)
                {
                    lector.Read();
                    usuario.Folio = int.Parse(lector["folio"].ToString());
                    usuario.Nombre = lector["nombre"].ToString();
                    usuario.Id_puesto = int.Parse(lector["id_puesto"].ToString());
                    usuario.Puesto = lector["puesto"].ToString();
                }
                conexion_scoi.Close();
            }
            catch (Exception e)
            {
                usuario.Respuesta = e.ToString();
            }
            if (usuario.Folio > 0)
            {
                usuario.Respuesta = Guardar_registro(usuario, pedido, embarque, Embarque);
            }
            else
            {
                usuario.Respuesta = "Usuario No Autorizado !!!";
            }
            return usuario;
        }
        /*
            GUARDADO  DE REGISTRO DE EMBARQUE Y RESPALDO DE EMBARQUE. 
        */
        private string Guardar_registro(Usuario_autiriza_embarque usuario, string pedido, string embarque, ModelEmbarquePedidoSolicitud Embarque)
        {
            string respuesta = "Sin Guardar";
            string query = string.Format("insert into surtido_embarque_registro_autorizacion (folio_usuario_autorizo,id_puesto,pedido,embarque )" +
                " values({0},{1},'{2}','{3}');",
              usuario.Folio, usuario.Id_puesto, pedido, embarque);
            if (Embarque.productos.Count > 0)
            {
                SqlCommand commando = new SqlCommand(query, conexion_scoi);
                try
                {
                    conexion_scoi.Open();
                    commando.ExecuteNonQuery();
                    conexion_scoi.Close();
                    respuesta += " Respaldado ";

                }
                catch (Exception e)
                {
                    return respuesta + e.ToString();
                }
                var actualizar_pedido = ActualizarPedido(Embarque);
                if (actualizar_pedido)
                {
                    ActualizarPedidoBms(Embarque);
                }
                return actualizar_pedido ? "Listo" : respuesta + " Error a Actualizar.";
            }
            return "Sin Productos A Guardar";
        }
        /*
            METODOS PARA ACTUALIZAR EL EMBARQUE DE PRODUCTOS EN TABLAS DE INVENTARIOS Y GESTION DE PEDIDOS. 
        */
        private bool ActualizarPedido(ModelEmbarquePedidoSolicitud pedido)
        {
            short pedido_consecutivo = ConcecutivoPedido(folio: pedido.folio_pedido);
            short i = 1;

            foreach (ModelEmbarquePedidoItem producto in pedido.productos)
            {
                string folio_concecutivo = Convert.ToString(pedido_consecutivo + 1);
                try
                {
                    Actualizar_producto_tabla_Pedido(value: producto, concecutivo: folio_concecutivo, partida: i, usuario: Convert.ToString(pedido.usuario));
                    i++;
                    Actualizar_inventario_de_gestion_de_pedidos(id_inventario: Convert.ToString(producto.id_inventario), surtido: (producto.surtido - producto.embarque));
                }
                catch (Exception e) { }
            }

            return i > 1;
        }

        private static short ConcecutivoPedido(string folio)
        {
            SqlConnection conexion_scoi = new ConexionesSQL().Scoi();
            SqlDataReader lector;

            string query = string.Format("sp_mobile_modificar_folio_pedido '{0}'", folio);
            short consecutivo = 0;


            SqlCommand comando = new SqlCommand(query, conexion_scoi);
            conexion_scoi.Open();
            try
            {
                lector = comando.ExecuteReader();
                if (lector.Read())
                {
                    consecutivo = lector.GetInt16(0);
                }
            }
            catch (Exception e)
            {
                consecutivo = 0;
            }
            return consecutivo;
        }

        private void Actualizar_producto_tabla_Pedido(ModelEmbarquePedidoItem value, string concecutivo, short partida, string usuario)
        {
            string query = string.Format("sp_mobile_actualizar_producto_tabla_Pedido '{0}','{1}','{2}','{3}','{4}','{5}','{6}'",
                concecutivo, value.disponible, value.embarque, value.pendiente, value.ajuste, usuario, partida, value.id_pedido);

            SqlCommand comando = new SqlCommand(query, conexion_scoi)
            {
                CommandTimeout = 50000
            };
            conexion_scoi.Open();
            comando.ExecuteNonQuery();
            conexion_scoi.Close();
        }

        private void Actualizar_inventario_de_gestion_de_pedidos(string id_inventario, double surtido)
        {
            double existencia = Existencia_inventario_de_gestion_de_pedidos(id_inventario: id_inventario);
            string queryUpdate = string.Format("update tb_inventario_de_gestion_de_pedidos set fecha_ultima_modificacion=GETDATE(),status='M', existencia_actual={0} where id ={1};",
                (existencia + surtido), id_inventario);

            SqlCommand comando = new SqlCommand(queryUpdate, conexion_scoi)
            {
                CommandTimeout = 50000
            };

            conexion_scoi.Open();
            comando.ExecuteNonQuery();
            conexion_scoi.Close();

        }

        private double Existencia_inventario_de_gestion_de_pedidos(string id_inventario)
        {
            double res = 0;
            string query = string.Format("select existencia_actual from tb_inventario_de_gestion_de_pedidos where id ={0};", id_inventario);
            SqlCommand comando = new SqlCommand(query, conexion_scoi);
            conexion_scoi.Open();
            lector = comando.ExecuteReader();
            lector.Read();
            res = (double)lector["existencia_actual"];
            conexion_scoi.Close();
            return res;
        }

        /*
            ACTUALIZAR PEDIDOS DE ESTABLECIMIENTOS BMS
        */
        public async void ActualizarPedidoBms(ModelEmbarquePedidoSolicitud pedido)
        {
            short pedido_consecutivo = ConcecutivoPedido(pedido.folio_pedido);
            using (var context = new BMSIZAGAREntities1())
            {
                short partida = 1;
                context.Configuration.AutoDetectChangesEnabled = false;
                List<mpedestab> pedido_insertar = new List<mpedestab>();
                foreach (var prod in pedido.productos)
                {
                    var productosBmsBD = context.mpedestab.Where(x => x.id == prod.id_ped_estab_BMS).SingleOrDefault();
                    mpedestab productosBMS = new mpedestab {
                        //Agregar parametros 
                    };
                    if (prod.embarque == 0 && productosBmsBD.cantidad_surtida == 0)
                    {
                        productosBmsBD.cantidad_surtida = productosBmsBD.cantidad_pedida;
                    }
                    //Checar si existe el empleado
                    if (productosBmsBD != null)
                    {
                        if (prod.embarque > 0)
                        {
                            float importe = (float)productosBmsBD.cantidad_pedida > 0 ? ((float)productosBmsBD.importe / (float)productosBmsBD.cantidad_pedida) : 0;
                            float iva = (float)productosBmsBD.cantidad_pedida > 0 ? ((float)productosBmsBD.iva / (float)productosBmsBD.cantidad_pedida) : 0;
                            float ieps = (float)productosBmsBD.cantidad_pedida > 0 ? ((float)productosBmsBD.ieps / (float)productosBmsBD.cantidad_pedida) : 0;
                            float costo = (float)productosBmsBD.cantidad_pedida > 0 ? ((float)productosBmsBD.costo / (float)productosBmsBD.cantidad_pedida) : 0;
                            float volumen = (float)productosBmsBD.volumen > 0 ? ((float)productosBmsBD.volumen / (float)productosBmsBD.cantidad_pedida) : 0;

                            //update
                            productosBmsBD.folio = Convert.ToString(pedido_consecutivo + 1) + pedido.folio_pedido;

                            productosBmsBD.cantidad_pedida = (decimal)prod.embarque;
                            productosBmsBD.cantidad_autorizada = (decimal)prod.embarque;
                            productosBmsBD.importe = (decimal)importe;
                            productosBmsBD.iva = (decimal)iva;
                            productosBmsBD.ieps = (decimal)ieps;
                            productosBmsBD.costo = (decimal)costo;
                            productosBmsBD.partida = partida;
                            productosBmsBD.cantidad_surtida = 0;
                            productosBmsBD.volumen = (decimal)volumen;
                            partida++;
                            //pedido_insertar.Add(productosBmsBD);
                        }
                    }
                }
                //context.BulkUpdate(pedido_insertar);
                //context.BulkSaveChangesAsync();
                //resultadoUpdate = await context.SaveChangesAsync();
                if (await context.SaveChangesAsync() > 0)
                {
                    agregarPedido(pedido_consecutivo, pedido.folio_pedido);
                }
            }
        }

        public bool agregarPedido(short pedido_consecutivo, string folioPedido)
        {
            string folioPedidoNuevo = Convert.ToString(pedido_consecutivo + 1) + folioPedido;

            using (var context = new BMSIZAGAREntities1())
            {
                //INSTANCIAR EL OBJETOS PEDESTAB PARA CREAR EL NUEVO PEDIDO EN EL
                pedestab pedEstabNuevo = new pedestab();

                //SELECT DEL PEDIDO ORIGEN PARA MODIFICAR LOS TOTALES Y CANTIDADES DEL MISMO Y TOMAR LA IFORMACION BASE PARA GENERAR EL PEDIDO NUEVO
                var pedEstabOrigen = context.pedestab.Where(x => x.folio == folioPedido).SingleOrDefault();

                //SELECT DE LOS PRODUCTOS DEL PEDIDO  ORIGINAL (SE ARA EL CALCULO DE LOS IMPORTES A PARTIR DE ESTA INFO)
                List<mpedestab> prodEnPedidoOrigen = context.mpedestab.Where(x => x.folio == folioPedido).ToList();

                //SELECT DE LOS PRODUCTOS DEL PEDIDO  NUEVO (SE ARA EL CALCULO A PARTIR DE ESTA INFO)
                List<mpedestab> productosEnPedidoNuevoBmsBD = context.mpedestab.Where(x => x.folio == folioPedidoNuevo).ToList();

                //RECALCULAR LOS IMPORTES PARA EL PEDIDO ORIGEN
                var importeOrigen = (from x in prodEnPedidoOrigen select x.importe).Sum();
                var ivaOrigen = (from x in prodEnPedidoOrigen select x.iva).Sum();
                var iepsOrigen = (from x in prodEnPedidoOrigen select x.ieps).Sum();
                var costoOrigen = (from x in prodEnPedidoOrigen select x.costo).Sum();
                var piezasOrigen = (from x in prodEnPedidoOrigen select x.cantidad_pedida).Sum();
                var volumenOrigen = (from x in prodEnPedidoOrigen select x.volumen).Sum();

                //MODIFICAR LOS IMPORTES Y STATUS DE SURTIDO
                pedEstabOrigen.importe = importeOrigen;
                pedEstabOrigen.iva = ivaOrigen;
                pedEstabOrigen.ieps = iepsOrigen;
                pedEstabOrigen.costo = costoOrigen;
                pedEstabOrigen.piezas = piezasOrigen;
                pedEstabOrigen.volumen = volumenOrigen;

                ////ARMAR EL NUEVO PEDIDO
                pedEstabNuevo.folio = folioPedidoNuevo;
                pedEstabNuevo.transaccion = pedEstabOrigen.transaccion;
                pedEstabNuevo.fecha = pedEstabOrigen.fecha;
                //(CALCULAR IMPORTES DE NUEVO PEDIDO)
                pedEstabNuevo.importe = (from x in productosEnPedidoNuevoBmsBD select x.importe).Sum();
                pedEstabNuevo.iva = (from x in productosEnPedidoNuevoBmsBD select x.iva).Sum();
                pedEstabNuevo.ieps = (from x in productosEnPedidoNuevoBmsBD select x.ieps).Sum();
                pedEstabNuevo.costo = (from x in productosEnPedidoNuevoBmsBD select x.costo).Sum();
                pedEstabNuevo.piezas = (from x in productosEnPedidoNuevoBmsBD select x.cantidad_pedida).Sum();
                pedEstabNuevo.volumen = (from x in productosEnPedidoNuevoBmsBD select x.volumen).Sum();

                pedEstabNuevo.unidades = pedEstabOrigen.unidades;
                pedEstabNuevo.peso = pedEstabOrigen.peso;
                pedEstabNuevo.fecha_elaboracion = pedEstabOrigen.fecha_elaboracion;
                pedEstabNuevo.fecha_entrega = pedEstabOrigen.fecha_entrega;
                pedEstabNuevo.fecha_autorizacion = pedEstabOrigen.fecha_autorizacion;
                pedEstabNuevo.fecha_cancelacion = pedEstabOrigen.fecha_cancelacion;
                pedEstabNuevo.fecha_expiracion = pedEstabOrigen.fecha_expiracion;
                pedEstabNuevo.usuario_captura = pedEstabOrigen.usuario_captura;
                pedEstabNuevo.usuario_autorizacion = pedEstabOrigen.usuario_autorizacion;
                pedEstabNuevo.usuario_cancelacion = pedEstabOrigen.usuario_cancelacion;
                pedEstabNuevo.back_order = pedEstabOrigen.back_order;
                pedEstabNuevo.recoge_mercancia = pedEstabOrigen.recoge_mercancia;
                pedEstabNuevo.pedido_establecimiento = pedEstabOrigen.pedido_establecimiento;
                pedEstabNuevo.cod_estab = pedEstabOrigen.cod_estab;
                pedEstabNuevo.cod_estab_alterno = pedEstabOrigen.cod_estab_alterno;
                pedEstabNuevo.paquete_mercancia = pedEstabOrigen.paquete_mercancia;
                pedEstabNuevo.notas = pedEstabOrigen.notas;
                pedEstabNuevo.status_surtido = pedEstabOrigen.status_surtido;
                pedEstabNuevo.status = pedEstabOrigen.status;
                pedEstabNuevo.ultima_modificacion = pedEstabOrigen.ultima_modificacion;
                pedEstabNuevo.recepcion_transferencia_automatica = pedEstabOrigen.recepcion_transferencia_automatica;
                pedEstabNuevo.embarque = pedEstabOrigen.embarque;
                pedEstabNuevo.orden_embarque = pedEstabOrigen.orden_embarque;
                pedEstabNuevo.razon_transferencia = pedEstabOrigen.razon_transferencia;
                pedEstabNuevo.solicita = pedEstabOrigen.solicita;
                pedEstabNuevo.recibe = pedEstabOrigen.recibe;

                //especificar que es la columna rowguid (de no especificarse la tomara como null)
                pedEstabNuevo.rowguid = Guid.NewGuid();

                //AGREGAR NUEVO PEDIDO AL CONTEXT
                context.pedestab.Add(pedEstabNuevo);

                return context.SaveChanges() > 0;

            }
        }

        public bool agregarPedidoFast(short pedido_consecutivo, string folioPedido)
        {
            bool respuesta = false;
            using (var context = new BMSIZAGAREntities1())
            {


            }
            
            return respuesta;
        }
    }
}

