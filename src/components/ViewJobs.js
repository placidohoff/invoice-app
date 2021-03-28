import React, { useEffect, useState } from 'react'
import './ViewJobs.css'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'
import { db } from '../firebase.js'
import { jobData } from './Empty.js'
import JobItem from './JobItem'
import ListJob from './ListJob.js'
import { List } from '@material-ui/core'
import ConfirmBox from './ConfirmBox.js'


function ViewJobs(){
    const [{user, isNew, job}, dispatch] = useStateValue();
    const history = useHistory();
    const [jobsList, setJobsList] = useState([])
    const [num, setNum] = useState(5)

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


    useEffect(() => {
        console.log(`YOOOOOOO: ${job.username}`)
        if(job.username == '' || job.username == undefined){
            // history.push('/login')
        }
        else{
            
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
            
            // dispatch({
            //     type: 'TRACK_INVOICE_NUM',
            //     item: {
            //         invoiceNumber: invoiceNumber
            //     }
            // })
        }
    }, [])

    return(
        <div className="viewjobs">
           <div>Here is a list of the jobs:</div>
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
    
                        
                    // <div className="viewjobs__container">
                    // <span 
                    //     key={Math.random()}
                    //     className="viewjobs__name"
                    //     onClick={e => {
                    //         dispatch({
                    //             type: 'LOAD_JOB',
                    //             item: {
                    //                 jobData: job.jobData,
                    //                 jobName: job.jobName,
                    //                 docName: job.docName,
                    //                 username: name[0],
                    //                 invoiceNumber: job.jobData.invoiceNumber
                                    
                    //             }
                    //         })
                    //         console.log(name[0])
                    //         history.push('/jobdetails')
                    //     }}    
                    //     style={{cursor:'default'}}
                    // >
                    //     {job.docName}
                    // </span>
                    // <br />
                    // <span>{job.jobData.headerInfo.address}</span>
                    // {/* <div className="viewjobs__del">X</div> */}
                    // <br />
                    // <span>Total: $<span>{job.jobData.total}</span></span><span>Materials: $<span>{job.jobData.totalMaterials}</span></span><span>Labor: $<span>{job.jobData.totalLabor}</span></span><span>Other: $<span>{job.jobData.totalOther}</span></span>
                    // </div>
                    
                    )
                }
            })
        :
            <div className="viewjobs__message">
                {/* There are currently 0 Jobs saved here */}
                Loading...
            </div>
        }
        <div
            onClick={e => {
                let doc = prompt("Enter the name for this invoice")
                dispatch({
                    type: 'NEW_JOB',
                    item: {
                        jobData: jobData,
                        jobName: jobData.jobName,
                        doc: doc,
                        username: name[0],
                        invoiceNumber: invoiceNumber + 1
                    }
                })
                //console.log(`YOOOOOOOOOO, ${isNew}`)
                history.push('/jobdetails')
            }}
        >
            New Job
        </div>
        </div>
    )
}

export default ViewJobs