import React, {useState} from 'react';

//Styles
import '../../Styles/main.style.css'

//Components
import {Input,Button,Alert} from 'rsuite';

export default function Form(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");

    return( 
        <>
            <div className="simpleContainerWhite">
                <div>
                    <p className="textBlue">Φόρμα εκδήλωσης ενδιαφέροντος</p>
                    
                    <p className="labelTextBlue">Ονοματεπώνυμο</p>
                    <Input type="text" onChange={value=>setName(value)}/>

                    <p className="labelTextBlue">Email</p>
                    <Input type="email" onChange={value=>setEmail(value)}/>

                    <p className="labelTextBlue" >Τηλέφωνο</p>
                    <Input type="text" onChange={value=>setPhone(value)}/>

                    <Button appearance="primary" onClick={async ()=>await sendQuote(name,email,phone)}>Αποστολή</Button>
                </div>
            
            </div>
        </>
    );
}



async function sendQuote(name,email,phone){
    console.log(phone)
    await fetch("/api/quotes",{
        method:"post",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name:name,
            phone:phone,
            email:email,
            date:Date.now()
        })
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