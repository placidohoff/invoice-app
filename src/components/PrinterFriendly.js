import React, { useState, useEffect, useRef } from 'react'
import './Main.css'
import { useStateValue } from './StateProvider.js'

import Description from './Description.js'
import OtherCharges from './OtherCharges.js'
import Labor from './Labor.js'
import Print from './Print.js'
import Signiture from './Signiture.js'

import Details from './Details.js'
import Footer from './Footer.js'
import Header from './Header.js'
import { BrowserRouter as Router, Switch, Route, useHistory, withRouter } from "react-router-dom"
import Pdf from 'react-to-pdf'
import gsap from 'gsap'
import Details_Mobile from './Details_Mobile.js'
import Signature_Mobile from './Signature_Mobile.js'


function PrinterFriendly() {
    const [{user, jobName, job, docName, username, invoiceNumber, isNew}, dispatch] = useStateValue();
    const [jobObject, setJobObject] = useState(job)
    const myFunction = () => {}

    const history = useHistory();

    useEffect(() => {
        window.print();
        // console.log("PRINT")
        // history.push('/jobdetails')
        // console.log('PRINT ',jobObject)
        history.goBack();
        

    },[])

    return(
        <div className=""
          style={{
            marginLeft: '50px'
          }}
        >
          <div
            style={{
            //   borderRadius: "1px",
              width: "100%",
              height: "100%",
              // margin: "0 auto",
              padding: "5mm"
              
            }}
          >
          
        
        
        <Header 
          job = {jobObject}
          save = {myFunction}
        //   invoiceNum = {invoiceNum}
        //   docName={docName}
        />

        {/* {headerComponent} */}

        <br />

        <div className="app__mainBody">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Details 
              calculate = {myFunction}
              materials = {jobObject.materials}
              save = {myFunction}
            />

            {/* {detailsComponent} */}

            <Signiture 
              signatureImage={jobObject.signatureImage}
              saveSignature={myFunction}
              save={myFunction}
              workOrderedBy={jobObject.workOrderedBy}
            />

            {/* {signatureComponent} */}

            </div>

          <div>
            
            
              <Description 
                save = {myFunction}
                description = {jobObject.description}
              />

              {/* {descriptionComponent} */}

              <OtherCharges 
                calculate = {myFunction}
                save = {myFunction}
                charges={jobObject.otherCharges}
              />

              {/* {otherChargesComponent} */}

              <Labor 
                calculate = {myFunction}
                save = {myFunction}
                charges={jobObject.labor}
              />

              {/* {laborComponent} */}
            
            {/* {footer} */}
            <Footer 
              totalLabor = {jobObject.totalLabor}
              totalMaterials = {jobObject.totalMaterials}
              totalOther = {jobObject.totalOther}
              tax = {jobObject.tax}
              total = {jobObject.total}
              calculate={myFunction}
            />

            {/* {footerComponent} */}
            
            {/* <button
              onClick={push}
            >
              Save Invoice
            </button> */}
            
          </div>
          
        </div>
        {/* <Footer /> */}
        </div>
        </div>
        
    )
}

export default PrinterFriendly;