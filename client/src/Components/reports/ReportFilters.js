import React, {useState,useEffect} from 'react';

//Styles
import '../../Styles/main.style.css'
import '../../Styles/reports/report.style.css'

//Components
import {Grid,Row,Col,Button,Panel,Input,InputPicker,DatePicker} from 'rsuite'

//Helpers
import {fetchAllGlasses} from '../../Helpers/dataManager';
import mapArrayToPickerData from '../../Helpers/mapArrayToPickerData'

export default function ReportFilters(props){

    const [glasses,setGlasses] = useState([])
    const [filters,setFilters] = useState({})

    useEffect(async ()=>{
        setGlasses(await fetchAllGlasses());
    },[])

    return(
        <>
            <Grid id="reportFiltersContainer">
                <Panel header="Φίλτρα" bordered>
                    <Row>
                        <Col xs={24}>
                            <p className="labelTextBlue">Μοναδικός αριθμός ταυτοποίησης</p>
                            <Input type="text" onChange={(value)=>setFilters({...filters,code:value})}/>
                        </Col>
                        <Col xs={24}>
                            <p className="labelTextBlue">Συνδυασμός</p>
                            <InputPicker className="picker" data={mapArrayToPickerData(glasses)} onChange={(value)=>setFilters({...filters,glass:value})}/>
                        </Col>
                        <Col xs={24}>
                            <p className="labelTextBlue">Ημερομηνία</p>
                            <DatePicker className="picker" onChange={(value)=>setFilters({...filters,date:value})}/>
                        </Col>
                        <Col xs={12}>
                            <Button appearance="primary" onClick={()=>props.filterReports(props.reports,props.setFilteredReports,filters)}>Εφαρμογή</Button>
                        </Col>
                        <Col xs={12}>
                            <Button appearance="ghost" onClick={()=>location.reload()}>Επαναφορά</Button>
                        </Col>
                    </Row>
                </Panel>
            </Grid>
        </>
    );
}