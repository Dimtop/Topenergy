import React, {useEffect} from 'react';

//Componets
import {Grid,Row,Col,IconButton,Icon} from 'rsuite';
import DashboardTile from './DashboardTile';

//Constants
import dashboardOptions from '../../Constants/dashboardOptions';
import '../../Styles/utils/dashboard.style.css'
//Styles
import '../../Styles/main.style.css'

//Libraries
import Cookies from 'js-cookie';

//Helpers
import history from '../../Helpers/history';

export default function Dashboard(){

    useEffect(()=>{
        history.push(location.href)
    })

    return(
        <div className="dashboardContainerWhite" >
 
            <Grid >
                <Row >
                    {
                        dashboardOptions.map(option=>
                            <DashboardTile key={option.label} option={option}/>
                        )
                    }
                    <Col xs={24} md={8}>
                        <IconButton appearance="ghost" icon={<Icon icon="sign-out"/>} onClick={()=>signOut()}>Αποσύνδεση</IconButton>
                    </Col>
                  
                </Row>
            </Grid>
           
          
        </div>
     
    );
}


function signOut(){
    Cookies.remove("auth");
    Cookies.remove("username");
    location.replace("/application")
}