import React,{useState} from 'react';

//Styles
import '../../Styles/main.style.css'

//Components
import {Grid,Col,Row,Input,Button, Alert} from 'rsuite';

//Libraries
import Cookies from 'js-cookie';


export default function LoginForm(){


    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    return(
        <>
        <div className="simpleContainerWhite">
        <Grid fluid>
            <Row>
                <Col xs={24}>
                    
                    <p className="labelTextBlue">Username</p>
                    <Input type="text" onChange={value=>setUsername(value)} />
                </Col>
                <Col xs={24}>
                    
                    <p className="labelTextBlue">Κωδικός</p>
                    <Input type="password" onChange={value=>setPassword(value)}/>
           
                </Col>

                <Col xs={24}>
                    
                    <Button appearance="primary" onClick={()=>postUserLogin(username,password)}>Σύνδεση</Button>
                </Col>
            </Row>
        </Grid>
        </div>
      
    </>
    )
}


function postUserLogin(username,password){
    return fetch("/api/users/login",{
        headers:{
            "Accept" :"application/json",
            "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify({
            username:username,
            password:password
        })
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.error){
            Alert.error(res.error)
            return;
        }
        else{
            Cookies.set("auth",1);
            Cookies.set("username",res.user.username);
            Cookies.set("userID",res.user._id);
            location.replace("/application/dashboard")
        }
    })
}