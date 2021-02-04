import React, {useState} from 'react';

//Styles

import '../../Styles/utils/appBar.style.css'
//Components
import {Grid,Col,Row} from 'rsuite';
import MenuButton from './MenuButton';
import MenuDrawer from './MenuDrawer';
import { set } from 'js-cookie';

export default function AppBar(){
    
    const [toggle,setToggle] = useState(false);

    return(
        <>
        <Grid id="appBarContainer">
            <Row>
                <Col xs={24}>
                    <p className="appBarText" onClick={()=>location.replace("/")}>Topenergy</p>
                    <p className="appBarTextSmall">Application Area</p>
                </Col>
                <Col xs={24} className="centerAlign">
                 <MenuButton toggleMenu={setToggle}/>
                </Col>
            </Row>
        </Grid> 
        <MenuDrawer toggle={toggle} toggleMenu={setToggle}/>
        </>
    )
}