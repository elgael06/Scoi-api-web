

/*Efectos De Toggle */
/*****************************************************************/
class BotonTogle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clase: "glyphicon glyphicon-plus"
        }
        this.change = this.cambio.bind(this);
    }
    cambio() {
        let { clase } = this.state;
        let { identificador, poicion } = this.props;
        const dato = clase == "glyphicon glyphicon-minus" ?
            "glyphicon glyphicon-plus" :
            "glyphicon glyphicon-minus";
        this.setState({ clase: dato });
        ocultarMostrar(identificador, poicion);
    }
    render() {
        let { clase } = this.state;
        return (<i className={clase}
            onClick={this.change}>
        </i>);
    }
}
/*****************************************************************/
/*efecto ocultar/mostrar operaciones a detalle establecimiento*/
/**/
const ocultarMostrar = (dato, poicion) => {
    let array = dato.split(" ");

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
}   /**/
/**/
const remplazar_espacios_por_guion_bajo = (e) => {
    let r = "";
    for (let x of e) { r += x != " " ? x : "_" }
    return r;
}   /**/
/**/
const crear_identificador = (clase, sub) => `${remplazar_espacios_por_guion_bajo(clase)}_1 ${remplazar_espacios_por_guion_bajo(clase)}_${remplazar_espacios_por_guion_bajo(sub)}`;
/**/