
const EfectoCargar = ({ estatus }) => {
    const visible = estatus == 1 ? "flex" : "none";
    return (
        <div id="pantalla_carga"
            style={{
                display: visible,
                position: "fixed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(242, 242, 242, 0.79)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                fontSize: "40px"
            }}>
            <label id="pantalla_carga1">
                <i className="fa fa-spinner rotate" ></i>
                <strong style={{ fontSize: "20px" }}> Cargando...</strong><br />
            </label>
        </div>
    )
}