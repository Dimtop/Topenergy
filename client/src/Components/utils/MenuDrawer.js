import React, {useState} from 'react';

//Components
import {Drawer} from 'rsuite';
import MenuTile from './MenuTile'
//Constants 
import dashboardOptions from '../../Constants/dashboardOptions';

export default function MenuDrawer(props){


    return(
        <>  
        <Drawer
          size="xs"
          placement="left"
          show={props.toggle}
          onHide={()=>props.toggleMenu(false)}
        >
          <Drawer.Header>
            <Drawer.Title>Μενού</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
          <MenuTile option={{label:"Αρχική",link:"/application/dashboard",icon:"home"}} />
            {
                dashboardOptions.map(option=>{
                    return(
                        <MenuTile key={option.label} option={option} />
                    )
                })
            }
           
          </Drawer.Body>
        </Drawer>
        </>
    )
}