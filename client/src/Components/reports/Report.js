import React, {useState,useEffect} from 'react';

//Styles
import '../../Styles/main.style.css'
import '../../Styles/reports/report.style.css'
//Components
import {Grid,Row,Col,Panel,Button,Input,DatePicker,InputPicker, Alert} from 'rsuite';
//Helpers
import {fetchAllGlasses,fetchReport} from '../../Helpers/dataManager';
import mapArrayToPickerData from "../../Helpers/mapArrayToPickerData";
import history from '../../Helpers/history';

export default function Report(){ 

    const [glasses,setGlasses] = useState([]);
    const [report,setReport] = useState({code:"",date:new Date(),glass:""})
    useEffect(async ()=>{
        history.push(location.href)
        var reportIDIndex = location.href.split("/").indexOf("reports") + 1;
        var reportID = location.href.split("/")[reportIDIndex];

        setGlasses(await fetchAllGlasses());
        setReport(await fetchReport(reportID));
    },[])

    return(

        <>
            <Grid id="newReportContainer">
                <Panel header="Στοιχεία δήλωσης" bordered>
                    <Row>
                        <Col xs={24}>
                            <p className="labelTextBlue">Μοναδικός αριθμός ταυτοποίησης</p>
                            <Input type="text" value={report.code} onChange={value=>setReport({...report,code:value})}/>
                        </Col>
                        <Col xs={24}>
                            <p className="labelTextBlue">Ημερομηνία</p>
                            <DatePicker className="picker" value={new Date(report.date)} format="DD-MM-YYYY" onChange={value=>setReport({...report,date:value})}/>
                        </Col>
                        <Col xs={24}>
                            <p className="labelTextBlue">Συνδυασμός</p>
                            <InputPicker className="picker"  data={mapArrayToPickerData(glasses)} value={report.glass} onChange={value=>setReport({...report,glass:value})}/>
                        </Col>
                        <Col xs={24}>
                            <Button appearance="primary" onClick={async()=>await updateReport(report)}>Ενημέρωση δήλωσης</Button>
                        </Col>
                    </Row>
                </Panel>
            </Grid>

        </>
    )


}

async function updateReport(report){

    await fetch("/api/reports/" + report._id,{
        method:"put",
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
        location.reload();
    })
}


