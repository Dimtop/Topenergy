import React from 'react';

//Components
import {IconButton,Icon} from 'rsuite'

export default function MenuTile(props){


    return(
       
        <IconButton appearance="primary" icon={<Icon icon={props.option.icon}/>} onClick={()=>location.replace(props.option.link)}>{props.option.label}</IconButton>
 
    )
}