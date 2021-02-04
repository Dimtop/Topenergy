import React from 'react';

//Components
import {IconButton,Icon} from 'rsuite'
//Styles
import '../../Styles/main.style.css'
import '../../Styles/utils/menu.style.css'

export default function MenuButton(props){


    return(
        <Icon icon="bars" id="menuButton" onClick={()=>props.toggleMenu(true)}></Icon>
 
    );
}