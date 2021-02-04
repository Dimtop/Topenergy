import React from 'react';

//Components
import {Col,Icon,IconButton} from 'rsuite';

//Styles
import '../../Styles/utils/dashboard.style.css'

export default function DashboardTile(props){

    return(
        <Col xs={24} md={8}>
            <IconButton  appearance="primary" icon={<Icon icon={props.option.icon}/>} onClick={()=>location.replace(props.option.link)}>{props.option.label}</IconButton>
        </Col>
        
    )
}