import React from 'react';

//Styles
import '../../Styles/main.style.css'
import '../../Styles/landing/banner.style.css'

//Components

import {Button} from 'rsuite';

export default function Banner(){


    return(
        <>
        <div className="simpleContainerBlue">
            <div>
                <h1 className="titleWhite">Topenergy</h1>
                <p className="textWhite" style={{marginTop:"5rem"}}>by Topcode.</p>
                <Button appearance="ghost" className="whiteButton" onClick={()=>location.replace("/application")}>Είσοδος στην εφαρμογή</Button>
            </div>
        </div>
        </>
    )
}