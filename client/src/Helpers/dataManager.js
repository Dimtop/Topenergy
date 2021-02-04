exports.fetchUserInfo = (userID)=>{
    return  fetch("/api/users/" + userID,{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        return res.user;
    })
}

exports.fetchAllGlasses = ()=>{
    return  fetch("/api/glasses/all",{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        return res.glasses;
    })
}

exports.fetchReport = (reportID) =>{
    return  fetch("/api/reports/" + reportID,{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        return res.report;
    })
}

exports.fetchAllReports = ()=>{
    return  fetch("/api/reports",{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        return res.reports;
    })
}

exports.fetchReports = (query)=>{
    return  fetch("/api/reports?" + query,{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        return res.reports;
    })
}

exports.fetchGlasses = (query)=>{
    return fetch("/api/glasses?" + query,{
        method:"get"
    })
    .then(res=>res.json())
    .then(res=>{
        return res.glasses;
    })
}