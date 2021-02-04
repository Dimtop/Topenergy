import React, {useState,useEffect} from 'react';

//Components
import {Modal,Button,Input,Alert} from 'rsuite'


export default function ReportEmailModal(props){

    const [email,setEmail]  = useState("");

    return(

        <>
       <Modal backdrop={true} size="xs" show={props.toggleModal} onHide={()=>props.setToggleModal(false)}>
          <Modal.Header>
            <Modal.Title>Αποστολή δήλωσης με email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input type="email" onChange={value=>setEmail(value)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button appearance="primary" onClick={()=>reportEmail(props.report,email)}>Αποστολή</Button>
          </Modal.Footer>
        </Modal>

        </>
    )
}



async function reportEmail(report,email){

    return await fetch("/api/reports/" + report._id +"/email",{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email
        })
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.error){
            Alert.error(res.error)
            return
        }
        location.reload();
    })
}