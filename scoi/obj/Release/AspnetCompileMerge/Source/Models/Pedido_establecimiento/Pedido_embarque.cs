namespace api_seguimiento.Models.Pedido_establecimiento
{
    public class Pedido_embarque
    {
        public string Folio            { get; set; }
        public string Usuario_capturo  { get; set; }
        public string Establecimiento  { get; set; }
        public string Alterno          { get; set; }
        public string Elaboraccion     { get; set; }
        public string Modificacion     { get; set; }
        public string Estatus_surtido  { get; set; }
    }
}