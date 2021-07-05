import React from 'react'
import './HeadStrip.css'
import { useStateValue } from './StateProvider.js'


function HeadStrip(){
    const [{user, superUserName}, dispatch] = useStateValue();

    return(
        <div className="headstrip"> 
            <span
                style={{
                    marginLeft: '40px'
                }}
            >
                {superUserName.length ? superUserName[0] : superUserName}
                
            </span>
        </div>
    )
}

export default HeadStrip;