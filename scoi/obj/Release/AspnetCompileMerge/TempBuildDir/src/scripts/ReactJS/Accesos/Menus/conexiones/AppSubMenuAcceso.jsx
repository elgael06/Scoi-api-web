import React, { useState } from 'react';

const SubMenuAcceso = ({ subMenu }) => {
    //estados
    const [acceso, setAcceso] = useState(true);
    //variables
    const { Sub_menus, Icon_Sub_menus, Accesos } = subMenu;

    return (<ul className="nav child_menu" style={{display:"block"}}>
        <li>
            <a onClick={() => setAcceso(!acceso)}>
                <i className={Icon_Sub_menus}></i>
                <label> {Sub_menus}</label>
                <span className="fa fa-chevron-down"></span>
            </a>
            <ul className="nav child_menu" style={{ display: "block" }}>
                {
                   acceso || Accesos.map(e => <li > <a href={`/${e.Url}`}>{e.Nombre}</a></li>)
                }
            </ul>
        </li>
    </ul>);
}

export default SubMenuAcceso;