import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header.js'
import Details from './components/Details.js'
import Footer from './components/Footer.js'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from './components/Login.js'
import ViewJobs from './components/ViewJobs.js'
import Description from './components/Description.js'
import OtherCharges from './components/OtherCharges.js'
import Labor from './components/Labor.js'
import Print from './components/Print.js'
import { TextareaAutosize } from '@material-ui/core';
import { useStateValue } from './components/StateProvider.js'
import { db } from './firebase'

function App() {
  const [{user, jobName, job, docName, username}, dispatch] = useStateValue();
  // const [username, setUsername] = useState(job.username)
  const [totalLabor, setTotalLabor] = useState(job.totalLabor)
  const [totalMaterials, setTotalMaterials] = useState(job.totalMaterials)
  const [totalOther, setTotalOther] = useState(job.totalOther)
  const [tax, setTax] = useState(job.tax)
  const [total, setTotal] = useState(job.total)
  const [jobObject, setJobObject] = useState(job)

  const [materialsList, setMaterialsList] = useState(job.materials)
  const [otherChargesList, setOtherChargesList] = useState(job.OtherCharges)
  const [laborList, setLaborList] = useState(job.labor)
  const [headerInfo, setHeaderInfo] = useState(job.headerInfo)
  const [description, setDescription] = useState(job.description)

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
        description: description
      })
      console.log(jobObject)

    }, [materialsList, otherChargesList, laborList, headerInfo, description])

    const calculateTotal = (obj) => {
      if(obj.category === 'materials'){
        setTotalMaterials(obj.value)
      }
      else if(obj.category === 'labor'){
        setTotalLabor(obj.value)
        dispatch({
          type:'SAVE_OTHERS',
          item: {

          }
        })
      }
      else if(obj.category === 'other'){
        setTotalOther(obj.value)
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

    const push = () => {
      // dispatch({

      // })
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
        description: description
      })
      try{
        db.collection(username).doc(docName).set({
          docName: docName,
          jobData: jobObject,
          jobName: jobName,
          username: username

        })
        console.log(jobObject)
      }catch(err){
        // alert('error')
        console.log(`ERROR: ${err}`)
        console.log(user)
        console.log(username)
      }
    }

  return (
    <Router>
    <div className="app">
      <Switch>
        <Route path="/login">
          <Login />
          
        </Route>

        <Route path="/jobs">
          <ViewJobs />
          
        </Route>

        <Route path="/print">
          <Print />
        </Route>

        <Route path="/">
          <Header 
            job = {job}
            save = {saveInvoice}
          />
          <br />
          <div className="app__mainBody">
            <Details 
              calculate = {calculateTotal}
              materials = {materialsList}
              save = {saveInvoice}
            />
            <div>
              <Description 
                // calculate = {calculateTotal}
                save = {saveInvoice}
              />
              <OtherCharges 
                calculate = {calculateTotal}
                save = {saveInvoice}
              />
              <Labor 
                calculate = {calculateTotal}
                save = {saveInvoice}
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
              <button
                onClick={push}
              >
                Save Invoice
              </button>
            </div>
          </div>
          {/* <Footer /> */}
        </Route>
      

      </Switch>
    </div>
    </Router>
  );
}

export default App;
