const $MI_URL = `${window.location.protocol}//${window.location.hostname}`;
const $URL_API = $MI_URL + ":90/api/"
const $URL_API_IZA = $MI_URL + ":180/api/"

//conexiones
const Obtener_producto_por_codigo_de_barras = (codigo) =>{
    mostrar_modal(true);
    fetch(`${$URL_API}Productos_clasificador_por_folio?folio=${codigo}&establecimineto=super v`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify("super v")
    })
    .then(e => {
        e.json().then(res =>agregar_campos_a_etiqueta(res))
    })
    .catch(err => console.error("Error=>", err));
}

//metodos 
const cambio_barcode = (codigo) => {
    JsBarcode("#barcode",codigo, {format: "codabar", height: 23, fontSize: 12, font: "Arial Black",width: 3.59}).render();
}
const agregar_campos_a_etiqueta = (value) =>{
    //alert(value.Codigo);
    if (value.Codigo != undefined) {
        const descripcion = document.querySelector("#descripcion_producto");
        const costo = document.querySelector("#costo_producto");

        descripcion.textContent = value.Descripcion;
        costo.textContent = moneyFormat(value.Precio_venta);

        cambio_barcode(value.Codigo);
    }
    else alert("Codigo De Producto Inexistente o no Reconocido...");

    mostrar_modal(false);
}
const fecha_caducidad=()=>{
    const date = new Date();
    const dia = document.querySelector("#fecha");
    let year = date.getFullYear();
    let month = (2 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    dia.textContent = day + '/' + month;
}
const moneyFormat = (numero_) => {

    const decimal_con_cero = (i) => i > 9 || i.search(0) > -1 ? i : i + "0";
    const mayora_a_mil = (numero) => new Intl.NumberFormat('es-MX').format(numero);

    const numero_string = numero_.toString();
    const decimal = numero_string.split(".").length > 1 ? decimal_con_cero(numero_string.split(".")[1]) : "00";
    const unidades = numero_string.split(".").length > 0 ? mayora_a_mil(numero_string.split(".")[0]) : "0";

    return `$${unidades}.${decimal}`;
}
function redondeo(numero) {
    return Math.round(numero * 100) / 100;
}

//eventos
const on_pedir_codigo_de_producto = (e) => {
    const codigo = document.querySelector("#codigo_producto");
    Obtener_producto_por_codigo_de_barras(codigo.value);
    codigo.value = "";
    codigo.appendChild
    e.preventDefault();
}
const mostrar_modal = (s) => document.querySelector("#modal_load").style.display = s ? "flex" : "none" || null;

const imprimir_canvas_etiqueta=()=> {
    mostrar_modal(true);
    html2canvas(document.querySelector("#etiqueta")).then(canvas => {
        canvas.style.width = "100%";
        canvas.style.height = "40%";

        console.log(canvas.outerHTML)
       //var printWin = window.open(canvas.toDataURL('imagejpeg', 1.0), 'Barcode', 'top=200,left=200,toolbars=no,scrollbars=no,status=no,resizable=no');
       // printWin.focus();
       // printWin.print();
        //printWin.close();
        var printWin = window.open("", 'Barcode', 'width=350,height=170,top=200,left=200,toolbars=no,scrollbars=no,status=no,resizable=no');
        printWin.document.body.style.height="500px"
        printWin.document.body.append(canvas);
        printWin.document.close();
        printWin.focus();
        printWin.print();
        //printWin.close();
        window.location.reload()
        mostrar_modal(false);
    });
}
const imprimir_html_etiqueta = () => {
    console.log("HTML");
    barras = document.querySelector("#barcode");
    etiqueta = document.querySelector("#etiqueta");
    console.log(barras)
    console.log(etiqueta.innerHTML)

    var printWin = window.open("", 'Barcode', 'width=350,height=170,top=200,left=200,toolbars=no,scrollbars=no,status=no,resizable=no');
    var styles = document.createElement("link");

    styles.rel="stylesheet";
    styles.href = "res/css/crear_barcode/main.css";

    //printWin.headers.innerHTML = '<link rel="stylesheet" href="res/css/crear_barcode/main.css?1" />';
    printWin.document.head.append(styles);
    printWin.document.body.append(etiqueta);
    printWin.document.close();
    printWin.focus();
    printWin.print();
   // printWin.close();
    window.location.reload()
}

if (location.protocol != "http:")
    location.protocol = "http:";

//Init
(function(){
    mostrar_modal(true);
    setTimeout(() =>mostrar_modal(false),1000);

    const btn_buscar = document.querySelector("#btn_buscar_barcode");
    const btn_imprimir = document.querySelector("#btn_imprimir");
    //const btn_imprimir_2 = document.querySelector("#btn_imprimir_2");

    fecha_caducidad();
    btn_buscar.addEventListener("click", on_pedir_codigo_de_producto);
    btn_imprimir.addEventListener("click", imprimir_canvas_etiqueta);
    //btn_imprimir_2.addEventListener("click", imprimir_html_etiqueta);

    cambio_barcode("00000");
}());
