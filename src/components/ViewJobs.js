import React, { useEffect, useState } from 'react'
import './ViewJobs.css'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'
import { db } from '../firebase.js'
import { emptyJob } from './Empty.js'
import JobItem from './JobItem'
import ListJob from './ListJob.js'
import { List, setRef } from '@material-ui/core'
import ConfirmBox from './ConfirmBox.js'
import HeaderInfo from './HeaderInfo.js'
import HeadStrip from './HeadStrip.js'


function ViewJobs(){
    const [{user, isNew, job, superUser, loadedUser}, dispatch] = useStateValue();
    const history = useHistory();
    const [jobsList, setJobsList] = useState([])
    const [num, setNum] = useState(5)
    const [noneLoadedMsg, setNoneLoadedMsg] = useState('Loading...')
    const checkUser = () => {
        if(job.username !== ''){
            //alert(job.username)
            return [job.username]
        }
        if(job.username == '' || job.username == undefined){
            history.push('/login')
        }
        else{
            return user.split('@')
        }
    }
    const [name, setName] = useState(checkUser)
    const [invoiceNumber, setInvoiceNumber] = useState(111111)
    const [createNewInvoice, setCreateNewInvoice] = useState(false)

    const [nextOrderNumber, setNextOrderNumber] = useState('')
    const [orderNumber, setOrderNumber] = useState('')
    const [orderDate, setOrderDate] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [jobName, setJobName] = useState('')
    const [phone, setPhone] = useState('')
    const [orderTakenBy, setOrderTakenBy] = useState('')
    const [startDate, setStartDate] = useState('')
    const [type, setType] = useState('daywork')

    const [errorMessage, setErrorMessage] = useState('')

    const changeVal = (val) => {
        console.log('here')
        switch(val.type){
            case 'orderNumber':
                setOrderNumber(val.value)
            break;
            case 'orderDate':
                setOrderDate(val.value)
            break;
            case 'address':
                setAddress(val.value)
            break;
            case 'state':
                setState(val.value)
            break;
            case 'city':
                setCity(val.value)
            break;
            case 'zip':
                setZip(val.value)
            break;
            case 'jobName':
                setJobName(val.value)
            break;
            case 'phone':
                setPhone(val.value)
            break;
            case 'orderTakenBy':
                setOrderTakenBy(val.value)
            break;
            case 'startDate':
                setStartDate(val.value)
            break;
            case 'type':
                setType(val.value)
            break;
        }
    }

    const [space, setSpace] = useState('         ')

    const proceedToInvoice = () => {
        // alert('yo')
        if(orderNumber == '' || orderDate == '' || address == '' || state == '' || city == '' || jobName == '' || phone == '' || orderTakenBy == '' || startDate == ''){
            setErrorMessage('Please fill out all fields')
        }
        else{
            // dispatch({
            //     type: 'NEW_JOB',
            //     item: {
            //         jobData: jobData,
            //         jobName: jobData.jobName,
            //         doc: doc,
            //         username: name[0],
            //         invoiceNumber: invoiceNumber + 1
            //     }
            // })
            dispatch({
                type: 'PROCEED_TO_INVOICE',
                item:{
                    headerInfo:{
                        orderNumber: orderNumber,
                        orderDate: orderDate,
                        address: address,
                        state: state,
                        city: city,
                        zip: zip,
                        jobName: jobName,
                        phone: phone,
                        orderTakenBy: orderTakenBy,
                        startingDate: startDate,
                        type: type,
                        toLineVal: [null,null,null],
                        isToLineSet: [false,false,false]

                    },
                    jobData:{
                        invoiceNumber: invoiceNumber + 1,
                        isFinalized: false,
                        // docName: '',
                        doc: jobName,
                        isNew: true,
                        username: name[0],
                        jobName: jobName,
                        description:job.description,
                        headerInfo: {
                            orderNumber: orderNumber,
                            orderDate: orderDate,
                            address: address,
                            state: state,
                            city: city,
                            zip: zip,
                            jobName: jobName,
                            phone: phone,
                            orderTakenBy: orderTakenBy,
                            startingDate: startDate,
                            type: type,
                            dateCompleted: '',
                            toLineVal: [null,null,null],
                            isToLineSet: [false,false,false]
                        },
                        labor: emptyJob.labor,
                        materials: emptyJob.materials,
                        otherCharges: emptyJob.otherCharges,
                        totalTax: 0,
                        total: 0,
                        totalLabor: 0,
                        totalMaterials: 0,
                        totalOther: 0,
                        signatureImage: null,
                        workOrderedBy: space,
                        cityState: 'RI',
                        taxRate: 7
                    },
                    doc: jobName,
                    
                    invoiceNumber: invoiceNumber + 1
                }
            })
            //AND THEN DISPATCH 'NEW_JOB'
                //DISPATCH NEW JOB FIRST
            history.push('/jobdetails')
        }
    }

    useEffect(() => {
        //console.log(`YOOOOOOO: ${job.username}`)
        if(job.username == '' || job.username == undefined){
            // history.push('/login')
        }
        else{
            
            if(name == 'tester' && !superUser || name == 'seyheng_theng' && !superUser || name == 'choff' && !superUser)
            {
                //NEED A 2ND LAYER OF CHECK TO SEE IF THE 2ND PART OF THE NAME IS INDEED 'RCIELECTRICS.COM'. "LASTNAME VARIABLE?"
                dispatch({
                    type: 'SUPER_USER',
                    item:{
                        email: user
                    }
                    
                })
                history.push('/dashboard')
            }else{

            db.collection(job.username)
            //.orderBy("timestamp", "asc")
            .onSnapshot(snapshot => {
                
                setJobsList(snapshot.docs.map(doc =>(
                {
                            
                    jobName: doc.data().jobName,
                    jobData: doc.data().jobData,
                    docName: doc.data().docName,
                    invoiceNumber: doc.data().invoiceNumber

                }
                )))
            
            })
            db.collection('data')
            .onSnapshot(snapshot => {
                setInvoiceNumber(snapshot.docs[0].data().invoiceNumberCount)

            }
            )
        
            }    

            if(name == 'sample' && superUser){
                setOrderNumber(Number(1000 + (Math.random() * (9999 - 1000))).toFixed(0))
                setOrderDate(`${(new Date()).getMonth()+1}/${(new Date()).getDate()} /${(new Date()).getFullYear()}`)
                setAddress(`${Number(10 + (Math.random() * (999 - 10))).toFixed(0)} Fake St`)
                setState('RI')
                setCity('Providence')
                setZip('02818')
                setJobName(`Sample Job Name #${Number(10 + (Math.random() * 999)).toFixed(0)}`)
                setPhone('401-555-9876')
                setOrderTakenBy('Sample Order Taker')
                setStartDate(`${(new Date()).getMonth()+1}/${(new Date()).getDate() + 7} /${(new Date()).getFullYear()}`)
                //alert(orderNumber)
            }
        }

        setTimeout(() => {
            setNoneLoadedMsg("There are no jobs saved with this email address.")
        }, 1000)
    }, [])

    return(
        <div>
            {
                superUser ?
                <HeadStrip />
                :
                null
            }
        <div 
            className="viewjobs"
            style={{
                display:'flex',
                flexDirection: 'row'
            }}    
        >
            
        <div
            style={{
                width: '350px'
            }}
        >
           <div>Here is a list of the jobs for
               <br/> 
               <div
                    style={{
                        marginTop: '10px'
                    }}
                >
                    {superUser? user : user}:
                </div>
            </div>
           <br />
           {
               jobsList.length > 0 ?
               jobsList.map((job, index) => {
                if(job){
                    return(
                        
                        <ListJob 
                            class={'listjob__'}
                            key={index}
                            code={(String(index))}
                            docName={job.docName}
                            data={job.jobData}
                            invoiceNum={job.jobData.invoiceNumber}
                            popup={<ConfirmBox />}
                            jobName={job.jobData.jobName}
                            signatureImage={job.jobData.signatureImage}
                        />
    
                        
                    
                    )
                }
            })
        :
            <div className="viewjobs__message">
                {/* There are currently 0 Jobs saved here */}
                {noneLoadedMsg}
            </div>
        }
        </div>
        <div 
            style={{
                marginLeft: '35%',
                marginTop: '10px',
                position: 'absolute'
            }}
        >
        {
            superUser 
            ?  
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
            <button
                onClick={e => {
                    // let doc = prompt("Enter the name for this invoice")
                    // dispatch({
                    //     type: 'NEW_JOB',
                    //     item: {
                    //         jobData: jobData,
                    //         jobName: jobData.jobName,
                    //         doc: doc,
                    //         username: name[0],
                    //         invoiceNumber: invoiceNumber + 1
                    //     }
                    // })

                    // history.push('/jobdetails')
                    setCreateNewInvoice(!createNewInvoice)
                    if(name !== 'sample' && !superUser){
                        setErrorMessage('')

                        setOrderNumber('')
                        setOrderDate('')
                        setAddress('')
                        setState('')
                        setCity('')
                        setZip('')
                        setJobName('')
                        setPhone('')
                        setOrderTakenBy('')
                        setStartDate('')
                    }
                    setType('daywork')
                }}

                style={{
                    borderRadius: '5px',
                    marginTop: '20px',
                    padding: '5px',
                    width: '150px'
                }}
            >
                {createNewInvoice ? <span>&#60; Discard</span> : <span>Create New Invoice</span>}
            </button>
            </div>
            :
            <div></div>
        }
        
        {
            superUser
            ?
                createNewInvoice
                ?
                <div style={{marginTop: '15px'}}>
                    {/* <div>Enter Information:</div> */}
                    <HeaderInfo 
                        orderNumber={orderNumber}
                        orderDate={orderDate}
                        address={address}
                        state={state}
                        city={city}
                        zip={zip}
                        jobName={jobName}
                        phone={phone}
                        orderTakenBy={orderTakenBy}
                        startDate={startDate}
                        type={type}
                        changeVal={changeVal}
                    />
                    <div
                        style={{
                            marginTop: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        
                        }}
                    >
                    <button
                        style={{
                            borderRadius: '5px',
                            marginTop: '20px',
                            padding: '5px',
                            width: '150px'
                        }}

                        onClick={proceedToInvoice}
                    >
                        Proceed &gt;
                    </button>
                    
                    </div>
                    <div 
                        style={{
                            marginTop: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        
                        }}
                    >
                        <span 
                            style={{
                                marginTop:'-20px',
                                color: 'red',
                                fontWeight: 'bold'
                            }}
                        >
                            {errorMessage}
                        </span>
                    </div>
                </div>
                :
                null
            :
            null
        }
        
        </div>
        </div>
        </div>
    )
}

export default ViewJobs