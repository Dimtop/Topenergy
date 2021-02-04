import React, {useState,useEffect} from 'react';
//Styles
import '../../Styles/main.style.css'
import '../../Styles/reports/report.style.css'
//Components
import {Grid,Row,Col,Panel,Button,Input,DatePicker,InputPicker, Alert,IconButton,Icon} from 'rsuite';
import ReportEmailModal from './ReportEmailModal';
//Helpers
import {fetchGlasses} from '../../Helpers/dataManager';
//Libraries
import download from 'downloadjs';


export default function ReportTile(props){

    const [glass,setGlass] = useState({});
    const [areDataLoaded,setDataLoaded] = useState(false)
    const [toggleModal, setToggleModal] = useState(false);
        
    useEffect(async ()=>{
        await  fetchGlasses("_id=" +  props.report.glass)
        .then(glasses=>{
            setGlass(glasses[0]);
        })
        .then(()=>{
            setDataLoaded(true)
        })
     
      
    },[])
    

    return(
        areDataLoaded?
        <>
            <Col  xs={24} md={8}>
                <Panel className="reportTile" header={props.report._id} bordered>
                    <p className="labelTextBlue">{"Μοναδικός κωδικός ταυτοποίησης: " + props.report.code}</p>
                    <p className="labelTextBlue">{"Συνδυασμός: " + glass.name}</p>
                    <p className="labelTextBlue">{"Ημερομηνία: " + new Date(props.report.date).toDateString()}</p>
              
                    <Row>
                        <Col xs={8}>
                            <IconButton appearance="primary" icon={<Icon icon="file-pdf-o"/>} onClick={()=>reportPDF(props.report)}>PDF</IconButton>
                        </Col>
                        <Col xs={8}>
                            <IconButton appearance="primary" icon={<Icon icon="edit"/>} onClick={()=>location.replace("/application/reports/" + props.report._id)}>Edit</IconButton>
                        </Col>
                        <Col xs={8}>
                            <IconButton appearance="primary" icon={<Icon icon="envelope"/>} onClick={()=>setToggleModal(true)}>Email</IconButton>
                        </Col>
                    </Row>
               
                </Panel>
                
            </Col>
            <ReportEmailModal toggleModal={toggleModal} setToggleModal={setToggleModal} report={props.report}/>
        </>
        :
        <>
        </>
    )
}


async function reportPDF(report){
    return await fetch("/api/reports/" + report._id +"/pdf",{
        method:"post",
        headers:{   
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res.blob())
    .then(res=>download(res,"Δήλωση απόδοσης_" + report._id ))
}