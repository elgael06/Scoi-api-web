
export default class Embarque {
    constructor() {
        this.folio_pedido = "";
        this.usuario = parseInt(USUARIO.id_scoi);//ID_SCOI
        this.productos = [];
        this.ContruirPedido();
    }
    ContruirPedido() {
        const $pedido = JSON.parse(localStorage["Pedido"]);
        this.productos = this.filtrarProductosEnCero();

        this.getFolio($pedido.Folio);
    }
    getFolio(folio) {
        this.folio_pedido = folio;
    }
    filtrarProductosEnCero() {
        const $lista = JSON.parse(localStorage["Embarque"]);
        return $lista.filter(surtido => surtido.embarque > 0);
    }
}
