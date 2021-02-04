import React, {useState,useEffect} from 'react';

//Styles
import '../../Styles/main.style.css'
import '../../Styles/reports/report.style.css'
//Components
import {Grid,Row,Col,Panel,Button,Input,DatePicker,InputPicker, Alert} from 'rsuite';
//Helpers
import {fetchAllGlasses} from '../../Helpers/dataManager';
import mapArrayToPickerData from "../../Helpers/mapArrayToPickerData";
import history from '../../Helpers/history';
//Libraries
import Cookies from 'js-cookie';

export default function NewReport(){ 

    const [glasses,setGlasses] = useState([]);
    const [report,setReport] = useState({user:Cookies.get("userID"),code:"",glass:"",date:new Date()})
 
    useEffect(async ()=>{
        history.push(location.href)
        setGlasses(await fetchAllGlasses());

    },[])

    return(

        <>
            <Grid id="newReportContainer">
                <Panel header="Στοιχεία δήλωσης" bordered>
                    <Row>
                        <Col xs={24}>
                            <p className="labelTextBlue">Μοναδικός αριθμός ταυτοποίησης</p>
                            <Input type="text" onChange={value=>setReport({...report,code:value})}/>
                        </Col>
                        <Col xs={24}>
                            <p className="labelTextBlue">Ημερομηνία</p>
                            <DatePicker className="picker" format="DD-MM-YYYY" onChange={value=>setReport({...report,date:value})}/>
                        </Col>
                        <Col xs={24}>
                            <p className="labelTextBlue">Συνδυασμός</p>
                            <InputPicker className="picker" data={mapArrayToPickerData(glasses)} onChange={value=>setReport({...report,glass:value})}/>
                        </Col>
                        <Col xs={24}>
                            <Button appearance="primary" onClick={async()=> await postReport(report)}>Αποθήκευση δήλωσης</Button>
                        </Col>
                    </Row>
                </Panel>
            </Grid>

        </>
    )


}


async function postReport(report){
    return await fetch("/api/reports",{
        method:"post",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(report)
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.error){
            Alert.error(res.error)
            return;
        }
        location.replace("/application/reports/"+ res.report._id );
    })

}