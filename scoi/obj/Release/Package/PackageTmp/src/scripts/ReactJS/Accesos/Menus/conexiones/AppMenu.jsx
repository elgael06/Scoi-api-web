import React, { useState } from 'react';
import SubMenuAcceso from './AppSubMenuAcceso';

const AppMenu  = ({ menu }) => {
    //estados
    const [submenus, setSubmenus] = useState(true);
    //variables
    const { Menu, Icon_Menu, Sub_menus } = menu;

  return (<ul className="nav side-menu" style={{ fontSize: "11px" }}>
        <li>
          <a onClick={() => setSubmenus(!submenus)}><i class={Icon_Menu}></i>
                <strong>{Menu}</strong>
                <span className="fa fa-chevron-down"></span>
            </a>
          {
              submenus || Sub_menus.map(e => <SubMenuAcceso subMenu={e} />)
            }
        </li>
    </ul>);
}

export default AppMenu;