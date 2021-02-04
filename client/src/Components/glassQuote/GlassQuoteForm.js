import React, {useState,useEffect} from 'react';

//Components
import {Grid,Row,Col,Panel,Button,Input, Alert} from 'rsuite';


//Styles
import '../../Styles/glassQuote/glassQuote.style.css'

//Libraries
import Cookies from 'js-cookie';

//Helpers
import history from '../../Helpers/history';

export default function GlassQuoteForm(){
    

    const [quoteText, setQuoteText] = useState("");

    useEffect(()=>{
        history.push(location.href)
    })
    return(

        <>
            <Grid id="glassQuoteFormContainer">
                <Panel header="Καταχώρηση νέου συνδυασμού" bordered>
                    <Row>
                        <Col xs={24}>
                            <p className="labelTextBlue">Γράψτε μας τον συνδυασμό που θέλετε να προστεθεί στην λίστα και θα τον καταχωρήσουμε για εσάς άμεσα.</p>
                            <Input componentClass="textarea" rows={3} onChange={value=>setQuoteText(value)} />
                        </Col>
                        <Col xs={24}>
                            <Button appearance="primary" onClick={()=>postGlassQuote(quoteText)}>Αποστολή</Button>
                        </Col>
                    </Row>
                </Panel>
            </Grid>

        </>
    )
}


async function postGlassQuote(quoteText){

    return await fetch("/api/glassQuotes",{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            user:Cookies.get("userID"),
            quoteText:quoteText
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