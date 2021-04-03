import React from 'react'
import './Details_Mobile.css'
import Details from './Details'


function Details_Mobile(props){
    return(
        <div className="detailsMobile__details">
            <div>Materials: ${props.totalMaterials.toFixed(2)} </div>
            <div>Labor: ${props.totalLabor.toFixed(2)}</div>
            <div>Other: ${props.totalOther.toFixed(2)} </div>
            <div style={{width: '100px'}}>Tax: </div> 
            <div>Total: {Number(props.totalMaterials+props.totalLabor+props.totalOther).toFixed(2)} </div>
        </div> 
    ) 
}

export default Details_Mobile;