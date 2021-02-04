import React, {useState,useEffect} from 'react';
//Styles
import '../../Styles/main.style.css'
import '../../Styles/reports/report.style.css'
//Components
import {Grid,Row} from 'rsuite';
import ReportTile from './ReportTile';
import ReportFilters from './ReportFilters'
//Helpers
import {fetchReports} from '../../Helpers/dataManager';
import history from '../../Helpers/history';
//Libraries
import Cookies from 'js-cookie';


export default function Reports(){

    const [reports,setReports] = useState([]);
    const [filteredReports,setFilteredReports] = useState([]);

    useEffect(async ()=>{
        history.push(location.href)
        setReports(await fetchReports("user=" + Cookies.get("userID")  ));
        setFilteredReports(await fetchReports("user=" + Cookies.get("userID")  ));
    },[])

    return(
        <>
            <ReportFilters reports={reports} setFilteredReports={setFilteredReports} filterReports={filterReports}/>
            <Grid id="reportContainer">
                <Row>
                {
                    filteredReports.reverse().map(report=>{
                        return(
                            <ReportTile key={report._id} report={report}/>
                        )
                    })
                }
                </Row>
            </Grid>
        </>

    );
}


function filterReports(reports,setFilteredReports,filters){
    if(filters.code){
        reports = reports.filter(report=>report.code == filters.code);
    }
    if(filters.glass){
        reports = reports.filter(report => report.glass == filters.glass);
    }
    if(filters.date){
        reports = reports.filter(report=>{
            return new Date(report.date).toDateString() == new  Date(filters.date).toDateString()

        })
    }

    setFilteredReports(reports.reverse())
}