import React, {useState,useEffect} from 'react';

//Styles
import '../../Styles/main.style.css'
import '../../Styles/account/info.style.css'
//Components
import {Grid,Row,Col,Panel,Button,Input,Alert} from 'rsuite';

//Helpers
import {fetchUserInfo} from '../../Helpers/dataManager';
import history from '../../Helpers/history';
//Libraries
import Cookies from 'js-cookie';

export default function Info(){


    const [user,setUser] = useState({name:"",address:"",ceYear:"",logo:null});

    useEffect(async ()=>{
        history.push(location.href)
        setUser(await fetchUserInfo(Cookies.get("userID")));
    },[])

    return(

        <>
            <Grid id="userInfoContainer">
                <Panel header="Στοιχεία χρήστη" bordered>
                    <Row>
                        <Col xs={24}>
                            <p className="labelTextBlue">Όνομα</p>
                            <Input type="text" value={user.name} onChange={value=>setUser({...user,name:value})} disabled/>
                        </Col>
                        <Col xs={24}>
                            <p className="labelTextBlue">Διεύθυνση</p>
                            <Input type="text" value={user.address} onChange={value=>setUser({...user,address:value})} disabled/>
                        </Col>
                        <Col xs={24}>
                            <p className="labelTextBlue">Έτος σήμνασης CE</p>
                            <Input type="text" value={user.ceYear} onChange={value=>setUser({...user,ceYear:value})} disabled/>
                        </Col>
                        <Col xs={24}>
                            <p className="labelTextBlue">Λογότυπο</p>
                            <input type="file" onChange={e=>setUser({...user,logo:e.target.files[0]})} disabled/>
                        </Col>
                        <Col xs={24}>
                            <Button appearance="primary" onClick={()=> updateUser(user)} disabled>Ενημέρωση</Button>
                        </Col>
                    </Row>
                </Panel>
            </Grid>
        </>
    )
}

async function updateUser(user){
    var formData = new FormData();

    formData.append("user",JSON.stringify({name:user.name,address:user.address,ceYear:user.ceYear}))
    formData.append("logo",user.logo)

    await fetch("/api/users/" + Cookies.get("userID"),{
        method:"put",
        body:formData
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.error){
            Alert.error(res.error)
            return;
        }
        location.reload();
    })
}