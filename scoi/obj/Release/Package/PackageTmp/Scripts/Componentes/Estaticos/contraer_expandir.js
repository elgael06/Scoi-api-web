
/**
     Este Componentes es un boton el cual muentra oculta clases
 */
Vue.component('exampleComponent', require('./BotonToggle'));
Vue.component('boton-togle', {
    props: ['identificador'],
    el:"#btn-toggle",
    data() {
        return {
            clase: "glyphicon glyphicon-plus"
        }
    },
    methods: {
        cambio() {
            this.clase = this.clase == "glyphicon glyphicon-minus" ?
                "glyphicon glyphicon-plus" :
                "glyphicon glyphicon-minus";
        },
        ocultarMostrar() {
            let array = this.identificador.split(" ");

            const ocultar_hijos = () => {
                let todos = document.querySelectorAll(`.${array[0]}_1`);
                todos.forEach(e => {
                    e.style.display = "none";
                });
                return "none";
            }
            let clase_ = document.querySelectorAll(`.${array[array.length - 1]}`);
            clase_.forEach(op => {
                let vista = op.style.display;
                op.style.display = vista ? '' : ocultar_hijos();
            })
        },
    },
});
const remplazar_espacios_por_guion_bajo = (e) => {
    let r = "";
    for (let x of e) { r += x != " " ? x : "_" }
    return r;
}   /**/
/**/
const crear_identificador = (clase, sub) => `${remplazar_espacios_por_guion_bajo(clase)}_1 ${remplazar_espacios_por_guion_bajo(clase)}_${remplazar_espacios_por_guion_bajo(sub)}`;
