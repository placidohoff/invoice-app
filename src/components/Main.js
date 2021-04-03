import React, { useState, useEffect, useRef } from 'react'
import './Main.css'
import { useStateValue } from './StateProvider.js'
import { db } from '../firebase'
import ViewJobs from './ViewJobs.js'
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

function Main(){
    const [{user, jobName, job, docName, username, invoiceNumber, isNew}, dispatch] = useStateValue();
  // const [username, setUsername] = useState(job.username)
    const [totalLabor, setTotalLabor] = useState(job.totalLabor)
  const [totalMaterials, setTotalMaterials] = useState(job.totalMaterials)
  const [totalOther, setTotalOther] = useState(job.totalOther)
  const [tax, setTax] = useState(job.tax)
  const [total, setTotal] = useState(job.total)
  const [jobObject, setJobObject] = useState(job)

  const [materialsList, setMaterialsList] = useState(job.materials)
  const [otherChargesList, setOtherChargesList] = useState(job.otherCharges)
  const [laborList, setLaborList] = useState(job.labor)
  const [headerInfo, setHeaderInfo] = useState(job.headerInfo)
  const [description, setDescription] = useState(job.description)
//   const [login, setLogin] = useState(<Login />) 
  const [invoiceNum, setInvoiceNum] = useState(job.invoiceNumber)
  const history = useHistory();
  const [signatureImage, setSignatureImage] = useState(job.signatureImage)

  let name = jobName; 
  let sig = signatureImage;

  const [footer, setFooter] = useState(
    <Footer 
      totalLabor = {totalLabor}
      totalMaterials = {totalMaterials}
      totalOther = {totalOther}
      tax = {tax}
      total = {total}
      // calculate={calculateTotal}
    />
    )

    useEffect(() => {
      setJobObject({
        headerInfo: headerInfo,
        jobName: jobName,
        labor: laborList,
        materials: materialsList,
        otherCharges: otherChargesList,
        tax: tax,
        total: total,
        totalLabor: totalLabor,
        totalMaterials: totalMaterials,
        totalOther: totalOther,
        username: username,
        description: description,
        signatureImage: sig,
        invoiceNumber: invoiceNum
      })
      console.log(jobObject)

    }, [materialsList, otherChargesList, laborList, headerInfo, description, signatureImage])

    const calculateTotal = (obj) => {
      console.log(obj)
      if(obj.category === 'materials'){
        setTotalMaterials(Number(obj.value))
      }
      else if(obj.category === 'labor'){
        console.log(obj.value)
        setTotalLabor(Number(obj.value))
       
      }
      else if(obj.category === 'other'){
        setTotalOther(Number(obj.value))
        console.log(obj.value)
      }
      
       
      setTotal(Number(totalMaterials + totalLabor + totalOther).toFixed(2))
    }

    const saveInvoice = (obj) => {
      // setJobObject(obj)
      if(obj.type === 'materials'){
        // dispatch({
        //   type: 'SAVE_MATERIALS',
        //   item: {
        //     materials: obj.data
        //   }
        // })
        setMaterialsList(obj.materials)
        console.log(materialsList)
        
      }
      else if(obj.type === 'other'){
        setOtherChargesList(obj.otherCharges)
        console.log(otherChargesList)
      }
      else if(obj.type == 'labor'){
        setLaborList(obj.labor)
        console.log(laborList)
      }
      else if(obj.type == 'header'){
        setHeaderInfo(obj.headerInfo)
        console.log(headerInfo)
      }
      else if(obj.type == 'description'){
        setDescription(obj.description)
        console.log(description)
      }

    
      // console.log(username)
      // console.log(docName)
      // console.log(jobObject)

      
    }
  
    const animate = (flag) => {
      if(flag == true){
        gsap.to('.saveSuccess', {
          display: 'inline',
          y: 10,
          duration: 1,
          yoyoEase:true,
          repeat:0,
          onComplete: animateOut
        })
      }
      else{
        gsap.to('.saveFail', {
          display: 'inline',
          y: 10,
          duration: 1,
          yoyoEase:true,
          repeat:0,
          onComplete: animateOut
        })
      }
    }

    const animateOut = () => {
      gsap.to('.saveSuccess', {
        display: 'none'
      })
      gsap.to('.saveFail', {
        display: 'none'
      })
    }

    const push = () => {
      //const title = prompt("Hello World")
      let title;
      let materialsTotal = 0;
      let laborTotal = 0;
      let othersTotal = 0;

      for(let i = 0; i < materialsList.length; i++){
        materialsTotal += Number(materialsList[i].amount)
        console.log(`MATERIALS: ${materialsTotal}`)
        // setTotalMaterials(materialsTotal)
      }
      for(let i = 0; i < laborList.length; i++){
        // console.log(laborList)
        laborTotal += Number(laborList[i].amount)
        console.log(`LABOR: ${laborTotal}`)
        // setTotalLabor(laborTotal)
      }
      for(let i = 0; i < otherChargesList.length; i++){
        othersTotal += Number(otherChargesList[i].price)
        console.log(`OTHER: ${othersTotal}`)
        // setTotalOther(othersTotal)
      }

      setTotalMaterials(materialsTotal)
      setTotalLabor(laborTotal)
      setTotalOther(othersTotal)

      console.log("YOOOOOOOO.... ", invoiceNumber)

      setJobObject({
        headerInfo: headerInfo,
        jobName: job.jobName,
        labor: laborList,
        materials: materialsList,
        otherCharges: otherChargesList,
        tax: tax,
        total: laborTotal + materialsTotal + othersTotal,
        totalLabor: laborTotal,
        totalMaterials: materialsTotal,
        totalOther: othersTotal,
        username: username,
        description: description,
        invoiceNumber: invoiceNum,
        isNew: false,
        signatureImage: sig
      })
      try{
        db.collection(username).doc(docName).set({
          docName: docName,
          jobData: jobObject,
          jobName: job.jobName,
          username: username

        })
        //console.log(jobObject)
      console.log(`Success? Collection: ${username}, Document: ${docName}, Body: ${headerInfo, jobObject} `)
      console.log(jobObject)
      {animate(true)}
      }catch(err){
        // console.log(`Error? Collection: ${username}, Document: ${docName}, Body: ${headerInfo, jobObject} `)

        console.log(`ERROR: ${err}`)
        console.log(jobObject)

        {animate(false)}
      }
      try{
        if(job.isNew){
          console.log("INVOICE++")
          //alert(isNew)
          db.collection('data').doc('1111').set({
            invoiceNumberCount: invoiceNumber

          })
          dispatch({
            type: 'INVOICE_INCREMENTED'
          })

        }else{
          console.log("JOB NOT NEW")
        }
      }catch(err){
        console.log("INVOICE UPPER ERROR: ", err)
      }
    }

    const getInvoice = (bool) => {
      let num;
      bool  ?
        db.collection('data')
        .onSnapshot(snapshot => {
           setInvoiceNum(snapshot.docs[0].data().invoiceNumberCount + 1)
           //num = snapshot.docs[0].data().invoiceNumberCount + 1

        })
        
      :
        setInvoiceNum(job.invoiceNumber)

      return num;
      
    }

    const loadTotals = () => {
      let materialsTotal = 0;
      let laborTotal = 0;
      let othersTotal = 0;

      for(let i = 0; i < materialsList.length; i++){
        
        materialsTotal += Number(materialsList[i].amount)
        
      }
      for(let i = 0; i < laborList.length; i++){

        laborTotal += Number(laborList[i].amount)

      }
      for(let i = 0; i < otherChargesList.length; i++){
        
        othersTotal += Number(otherChargesList[i].price)
      
      }


    }

    const Button = React.forwardRef((props, ref) => {
      return (
        <React.Fragment>
          <Pdf targetRef={ref} filename={`${docName}.pdf`}>
            {({ toPdf }) => <button style={{width: '60px', marginLeft: '8px'}} onClick={toPdf}><img style={{width: '100%', height: '100%'}} src="https://www.deborahbeers.com/wp-content/uploads/2014/09/pdf-512.png"/></button>}
          </Pdf>
        </React.Fragment>
      );
    });

  let docToPrint = React.createRef();

  const goBack = e => {
    history.push('/jobs')
    // console.log(username)
  }

  const confirmDelete = () => {
    let answer = window.confirm("Are you sure you want to permanetly delete this record?");
    if (answer) {
        try{
            db.collection(username).doc(docName).delete()
                console.log("Document successfully deleted!");
            }catch {
                console.log("Error removing document: ");
        }

        history.push('/jobs')
    }
    else {
        //Do Nothing
    }
    
  }

  const saveSignature = (imageURL) => {
    
    setSignatureImage(imageURL)
    sig = imageURL;
    console.log("GIVE ME A SIGN...", imageURL)

    // dispatch({
    //   type: 'NEW_SIGNATURE',
    //   item: {
    //       signatureImage: imageURL
    //   }
    // })
    console.log("yooooooooo")
  }



    return(
        <div className="main">
        
          {
            job.isNew ? getInvoice('true') : loadTotals()
          }
          {/* {calculateTotal()} */}

          {/*SECTION: PRINT,SAVE,DELETE BUTTONS*/}
          <div className="main__topButtons">
            <div
              className="main__topButtons_inner"
              style={{
                  
              }}
            >
              <div style={{marginRight:'15px'}}>
                <Button ref={docToPrint} />
              </div>
              <div style={{marginRight:'55px'}}> 
                <button
                  onClick={push}
                >
                  <img  style={{width: '45px', height: '45px'}} src="https://cdn2.iconfinder.com/data/icons/web-application-icons-part-2/100/Artboard_73-512.png" />
                  
                </button>
                <div 
                  className="saveSuccess"
                  style={{
                    display: 'none',
                    border: '1px solid yellow',
                    backgroundColor: 'yellow',
                    color: 'black',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    position: 'absolute',
                    padding: '2px'
                  }}  
                >
                  Save Sucessful
                </div>
                <div 
                  className="saveFail"
                  style={{
                    display: 'none',
                    border: '1px solid red',
                    backgroundColor: 'red',
                    color: 'black',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    position: 'absolute',
                    padding: '2px'
                  }}  
                >
                  Save Failed
                </div>
              </div>
              <div>
              <button
                  onClick={confirmDelete}
              >
                  <img  style={{width: '45px', height: '45px'}} src="https://p7.hiclipart.com/preview/514/893/278/computer-icons-multiplication-delete-button.jpg" />
                </button>
              </div>
            </div>
          </div>

          

          {/*SECTION: MAIN CONTAINER FOR DESKTOP */}
          <div className="App"
          ref={docToPrint}
        >
            <div
              ref={docToPrint}
              style={{
                borderRadius: "1px",
                width: "1000px",
                height: "100%",
                // margin: "0 auto",
                padding: "5mm"
                
              }}
            >
            
          
          {console.log(invoiceNumber)}
          <Header 
            job = {job}
            save = {saveInvoice}
            invoiceNum = {invoiceNum}
            docName={docName}
          />
          <br />
          <div className="app__mainBody">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Details 
                calculate = {calculateTotal}
                materials = {materialsList}
                save = {saveInvoice}
              />

              <Signiture 
                signatureImage={signatureImage}
                saveSignature={saveSignature}
              />
              </div>

            <div>
              
              
                <Description 
                  // calculate = {calculateTotal}
                  save = {saveInvoice}
                />
                <OtherCharges 
                  calculate = {calculateTotal}
                  save = {saveInvoice}
                  charges={otherChargesList}
                />
                <Labor 
                  calculate = {calculateTotal}
                  save = {saveInvoice}
                  charges={laborList}
                />
              
              {/* {footer} */}
              <Footer 
                totalLabor = {totalLabor}
                totalMaterials = {totalMaterials}
                totalOther = {totalOther}
                tax = {tax}
                total = {total}
                calculate={calculateTotal}
              />
              
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
          
          {/*SECTION: MAIN CONTAINER FOR MOBILE */}
          <div className="main__mobileContain">
          <Header 
            job = {job}
            save = {saveInvoice}
            invoiceNum = {invoiceNum}
            docName={docName}
          />
          
          <Details_Mobile 
            materials={materialsList}
            totalMaterials={totalMaterials}
            labor={laborList}
            totalLabor={totalLabor}            
            otherCharges={otherChargesList}
            totalOther={totalOther}
          />
          
           <Signature_Mobile
              signatureImage={signatureImage}
              saveSignature={saveSignature}

          /> 
            
          </div>

        </div>
    )
}

export default Main;