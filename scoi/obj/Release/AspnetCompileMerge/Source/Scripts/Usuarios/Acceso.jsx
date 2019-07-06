
class AppAcceso extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seleccion: {},
            Lista_usuarios: [],
            Accesos_url: [],
            filtro_tabla:"",
            cargando:1
        };

        setTimeout(() => this.cargar(0), 1000);
        this.obtener_usuarios();
        this.evAccesos = this.on_acceso.bind(this);
        this.evEdicion = this.on_edicion.bind(this);
        this.evActivar = this.on_activar.bind(this);
        this.evGuardar = this.on_guardar_accesos.bind(this);

        //edicion Usuario
        this.evNombreCompleto = this.on_NombreCompleto.bind(this);
        this.on_NombreCorto = this.on_NombreCorto.bind(this);
        this.on_Email_usuario = this.on_Email_usuario.bind(this);
        this.on_Id_usuario = this.on_Id_usuario.bind(this);
    }
    //eventos
    on_filtro_tabla(event) {
        let filtro = event.target.value;
        this.setState({ filtro_tabla: filtro });
    }
    on_acceso(seleccion) {
        this.setState({ seleccion:seleccion });
        document.querySelector("#modal_edicion_url").style.display = "flex";
        
        this.obtener_accesos_usuario(seleccion.id_usuario);
    }
    on_edicion(seleccion) {
        let Usuario = {
            email_usuario: seleccion.email_usuario,
            foto:seleccion.foto,
            id_scoi: seleccion.id_scoi,
            id_usuario: seleccion.id_usuario,
            nombre_usuario:seleccion.nombre_usuario,
            nombrecompleto_usuario:seleccion.nombrecompleto_usuario
        }
        this.setState({ seleccion: Usuario });
        document.querySelector("#modal_edicion").style.display = "flex";
    }
    on_activar(estatus) {
        const { Accesos_url } = this.state;
       let Estatus = estatus.Estatus.search("C") > -1 ? "V" : "C";
        Accesos_url.forEach(e => {
            e.Sub_menus.forEach(f => {
               let index = f.Accesos.findIndex(g => g.Folio_acceso == estatus.Folio_acceso);
                if (index > -1) {
                    f.Accesos[index].Estatus = Estatus;
                    console.log(index);
                }
            })
        });
        this.setState({ Accesos_url: Accesos_url});
    }
    on_guardar_accesos() {
        const { Accesos_url } = this.state;
        let lista_Accesos = [];

        Accesos_url.forEach(e => {
            e.Sub_menus.forEach(f => {
                lista_Accesos = lista_Accesos.concat(f.Accesos);
            })
        });
        console.log("Accesos=>", lista_Accesos);
        this.Actualizar_accesos(lista_Accesos);
    }

    on_NombreCompleto(event) {
        const Usuario = this.state.seleccion;
        Usuario.nombrecompleto_usuario = event.target.value;
        this.setState({seleccion:Usuario});
    }
    on_NombreCorto(event) {
        const Usuario = this.state.seleccion;
        Usuario.nombre_usuario = event.target.value;
        this.setState({ seleccion: Usuario });
    }
    on_Email_usuario(event) {
        const Usuario = this.state.seleccion;
        Usuario.email_usuario = event.target.value;
        this.setState({ seleccion: Usuario });
    }
    on_Id_usuario(event) {
        const Usuario = this.state.seleccion;
        Usuario.id_scoi = event.target.value;
        this.setState({ seleccion: Usuario });
    }
    on_guardar_datos_usuario() {
        const { seleccion } = this.state;
        this.guardar(seleccion);
    }
    //metodos
    llenar_Lista_usuarios(lista) {
        this.setState({ Lista_usuarios: lista.length > 0 ? lista : [] });
        this.cargar(0);
    }
    seleccionar_accesos_usuario(seleccion) {
        this.setState({ Accesos_url: seleccion.length > 0 ? seleccion : [] });
        this.cargar(0);
    }
    accesos_guardados(res) {
        if (res == "OK") {
            this.setState({ Accesos_url: [], seleccion: {} });
            document.querySelector("#modal_edicion_url").style.display = "none";
            mostrar_mensaje("Guardado..", "alert-success");
        } else {
            alert(res);
            mostrar_mensaje("Error!!!" ,"alert-warning");
        }
        this.cargar(0);
    }
    cargar(estado) {
        this.setState({ cargando:estado });
    }
    Usuario_guardado() {
        this.obtener_usuarios();
        document.querySelector("#modal_edicion").style.display = "none";
        mostrar_mensaje("Guardado..", "alert-success");
        this.setState({ seleccion: {}});
        this.cargar(0);
    }
    //conexiones
    obtener_usuarios() {
        this.cargar(1);
        fetch(`/api/Usuarios_web`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json().then(res => this.llenar_Lista_usuarios(res)).catch(err => console.error("error Json=>", err)))
            .catch();
    }
    obtener_accesos_usuario(id) {
        this.cargar(1);
        fetch(`/api/Accesos_url?id=${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json().then(res => this.seleccionar_accesos_usuario(res)).catch(err => console.error("error Json=>", err)))
            .catch(err=>console.err("Error=>",err));
    }
    Actualizar_accesos(accesos) {
        const { seleccion } = this.state;
        this.cargar(1);
        fetch(`/api/Accesos_url?id_usuario=${seleccion.id_usuario}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accesos)
        })
            .then(r => r.json().then(res => this.accesos_guardados(res)).catch(err => console.error("error Json=>", err)))
            .catch(err => console.err("Error=>", err));
    }
    guardar(Usuario) {
        this.cargar(1);
        fetch(`/api/Usuarios_web`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Usuario)
        })
            .then(r => r.json().then(res => res ? this.Usuario_guardado() : mostrar_mensaje("Error Guardado...", "alert-warning")).catch(err => console.error("error Json=>", err)))
            .catch();
    }
    render() {
        const { seleccion,Lista_usuarios, Accesos_url, filtro_tabla, cargando } = this.state;
        const lista_filtro = Lista_usuarios.filter(e => e.id_scoi.toString().search(filtro_tabla) > -1 || e.nombre_usuario.toString().toUpperCase().search(filtro_tabla.toUpperCase()) > -1 || e.nombrecompleto_usuario.toString().toUpperCase().search(filtro_tabla.toUpperCase()) > -1);
        return (<div className="panel panel-default">
           
            <div className="panel-body">
                <div>
                    <strong>Filtro</strong>
                    <input className="form-control"
                        type="text"
                        value={filtro_tabla}
                        placeholder="Filtro De Usuarios..."
                        onChange={e => this.on_filtro_tabla(e)}
                    />
                </div>
                <ListaUsuarios
                    Lista={lista_filtro}
                    evAccesos={this.evAccesos}
                    evEdicion={this.evEdicion}
                />
                <ModalEdicion
                    usuario={seleccion}
                    evNombreCompleto={this.evNombreCompleto}
                    evNombre={this.on_NombreCorto}
                    evEmail={this.on_Email_usuario}
                    evFoilioSCOI={this.on_Id_usuario}
                    guardar={() => this.on_guardar_datos_usuario()}
                />
                <ModalEdicionUrls
                    usuario={seleccion}
                    urls={Accesos_url}
                    evActivar={this.evActivar}
                    evGuardar={this.evGuardar}
                />
                <EfectoCargar
                    estatus={cargando}
                />
            </div>
        </div>);
    }
}

const ListaUsuarios = ({ Lista ,evAccesos,evEdicion }) => {
    const DatosUsuarios = ({ usuario }) => {
        const { id_usuario, nombre_usuario, nombrecompleto_usuario, email_usuario, id_scoi, foto } = usuario;
        return (<tr>
            <td>{id_usuario}</td>
            <td>{nombre_usuario}</td>
            <td>{nombrecompleto_usuario}</td>
            <td>{email_usuario}</td>
            <td>{id_scoi}</td>
            <td><i className="btn btn-primary " onClick={() => evEdicion(usuario)}>Editar. <span className="glyphicon glyphicon-edit"></span></i></td>
            <td><i className="btn btn-success " onClick={() => evAccesos(usuario)}>Accesos. <span className="glyphicon glyphicon-lock"></span></i></td>
        </tr>);
    }
    return (<div id="contenedor_tabla_usuarios">
        <table className="table table-striped">
            <thead >
                <tr className="info">
                    <th>Folio</th>
                    <th>Nombre</th>
                    <th>Nombre Completo</th>
                    <th>Correo</th>
                    <th>SCOI</th>
                    <th colSpan="2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    Lista.length > 0 ? Lista.map(e => <DatosUsuarios usuario={e} /> ):<p>Sin Datos A Mostrar...</p>
                }
            </tbody>
        </table>
    </div>);
}

const ModalEdicion = ({ usuario, evNombreCompleto, evNombre,evEmail,evFoilioSCOI ,guardar}) => {
    const { id_usuario,id_scoi, nombre_usuario, email_usuario } = usuario;

    return (<div className="modal" id="modal_edicion">
        <div className="panel panel-primary animate">
            <div className="panel-heading">
                <i className="close fa fa-close" onClick={() => document.querySelector("#modal_edicion").style.display = "none"}></i>
                <strong className="glyphicon glyphicon-edit"> Edicion Usuario.</strong>
            </div>
            <div className="panel-body">
                <VistaUsuario
                    usuario={usuario}
                    edicion={true}
                    evNombre={evNombreCompleto}
                /><div>
                    <div className="id_usuario">
                        <strong>Folio SCOI</strong>
                        <label>
                            <input type="text" onChange={evFoilioSCOI} value={id_scoi} />
                        </label>
                    </div>
                    <div className="nombre_usuario">
                        <strong>Nombre</strong>
                        <label>{
                            <input type="text" onChange={evNombre} value={nombre_usuario} />
                        }</label>
                    </div>
                    <BtnComprobarNombre
                        id={id_usuario}
                        nombre={nombre_usuario}
                    />
                    <div className="nombre_usuario">
                        <strong>Correo</strong>
                        <label>{
                            <input
                                type="text"
                                onChange={evEmail}
                                value={email_usuario}
                            />
                        }</label>
                    </div>
                    <span onClick={() => restaurar_password(id_scoi)}
                        style={{ float: "right", fontSize: "18px", marginTop: "20px" }}
                        className="btn btn-warning fa fa-history">
                        Restaurar Contraseña.
                    </span>
                </div>
                <PieDeModal
                    guardar={guardar}
                    cerrar={"modal_edicion"}
                />
            </div>
        </div>
    </div>);
}

const ModalEdicionUrls = ({ usuario, urls, evActivar,evGuardar }) => {

    const CrearMenus = ({ accesos }) => {
        const Menu = ({ menu }) => {
            const { Menu, Icon_Menu, Sub_menus} = menu;
            return ([<tr className="success">
                <td><i className={Icon_Menu}> </i> <strong> {Menu} </strong></td>
                <td></td>
            </tr>,
                Sub_menus.map(e=> <SubMenu sub_menu={e} />)]);
        }
        const SubMenu = ({ sub_menu }) => {
            const { Sub_menus, Icon_Sub_menus, Accesos } = sub_menu;
            return ([<tr className="active">
                <td >
                    <strong>
                        <i style={{ marginLeft: "10px" }} className={Icon_Sub_menus}></i> {Sub_menus}
                    </strong>
                </td>
                <td></td>
            </tr>,
                <Acceso acceso={Accesos} />]);
        }
        const Acceso = ({ acceso }) => {
            let respuesta = (r) => r.search("C") > -1 ? "danger fa fa-toggle-off" : "success fa fa-toggle-on";
            return acceso.map(e => <tr>
                <td> <p style={{ marginLeft: "20px" }}> {e.Nombre} </p></td>
                <td><i style={{ borderRadius: "20px" }} onClick={() => evActivar(e)} className={`btn btn-${respuesta(e.Estatus)}`}></i></td>
            </tr>);
        }
        return (<table className="table">
            <tbody>
                {
                    accesos.map(e => <Menu menu={e} /> )
                }
            </tbody>
        </table>);
    }
    return (<div className="modal" id="modal_edicion_url">
        <div className="panel panel-success animate">
            <div className="panel-heading">
                <i className="close fa fa-close" onClick={() => document.querySelector("#modal_edicion_url").style.display = "none"}></i>
                <strong className="glyphicon glyphicon-lock"> Edicion Accesos Usuario.</strong>
            </div>
            <div className="panel-body">
                <VistaUsuario
                    usuario={usuario}
                />
                <h5>Listas Del Urls</h5>
                <div id="container_accesos_url">
                    {
                        urls.length > 0 ? <CrearMenus accesos={urls} />:<h4>Sin Accesos A Mostrar...</h4>
                    }
                </div>
                <PieDeModal
                    cerrar={"modal_edicion_url"}
                    guardar={evGuardar}
                />
            </div>
        </div>
    </div>);
}

const VistaUsuario = ({ usuario,edicion,evNombre }) => {
    const { id_usuario, nombrecompleto_usuario, foto } = usuario;
    return (<div className="view_usuario">
        <img src={foto} alt="Foto" className="img-thumbnail" />
        <div className="id_usuario">
            <strong>Folio</strong>
            <label>{id_usuario}</label>
        </div>
        <div className="nombre_usuario">
            <strong>Nombre</strong>
            <label>{
                edicion ? <input type="text" onChange={evNombre} value={nombrecompleto_usuario} /> : nombrecompleto_usuario
            }</label>
        </div>
    </div>);
}
const PieDeModal = ({ guardar,cerrar}) => {
    return (<div className="panel-footer">
        <i className="btn btn-success fa fa-save" onClick={guardar}> Guardar.</i>
        <i className="btn btn-default fa fa-close" onClick={() => document.querySelector(`#${cerrar}`).style.display = "none"}> Salir.</i>
    </div>);
}

const restaurar_password = (id) => {
    fetch(`RestaurarPassword?id=${id}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(r => r.json().then(res => mostrar_mensaje(`Nuevo Password : ${res}.`, "alert-success")).catch(err => console.error("error Json=>", err)))
        .catch();
}

class BuscarUsuario extends React.Component {

    render() {
        return (<div>

        </div>);
    }
}

class BtnComprobarNombre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            estado: "",
            enviando: 0
        }
        this.conexion = this.conexion.bind(this);
    }
    estado() {
        const { estado } = this.state;
        let clase = estado == "V" ? 'success fa fa-check' : (estado == "C" ? 'danger fa fa-close' :'default fa fa-external-link');
        return `btn btn-${clase}`;
    }
    cambio(res) {
        this.setState({ estado: res, enviando: 0 });
    }
    conexion() {
        const { nombre,id } = this.props;
        this.setState({ enviando:1});
        fetch(`VerificarNombre?nombre=${nombre}&id=${id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nombre)
        })
            .then(e => e.json().then(res => this.cambio(res)))
            .catch(err=>console.error("Error=>",err));
    }
    render() {
        return (<i className={this.estado()}
            onClick={this.conexion}
        >
           <span> Comprobar Nombre</span>
        </i>);
    }
}
ReactDOM.render(<AppAcceso />, document.querySelector("#root"));

