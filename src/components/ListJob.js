import React, { useEffect, useState } from 'react'
import './ListJob.css'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'
import { db } from '../firebase.js'
import ConfirmBox from './ConfirmBox.js'
import classNames from 'classnames'

function ListItem(props){
    const [{user, isNew, job, superUser, superUserName}, dispatch] = useStateValue();
    const history = useHistory();

    const [total, setTotal] = useState(0)
    const [totalMaterials, setTotalMaterials] = useState(0)
    const [totalLabor, setTotalLabor] = useState(0)
    const [totalOther, setTotalOther] = useState(0)
    const [visible, setVisible] = useState(true)
    const delBoxClasses = classNames('listjob__confirmBox', `key:${props.code}`)
    const popup = props.popup;
    // const [popup, setPopUp] = useState(props.popup)

    const loadTotals = () => {
        let materialsTotal = 0;
        let laborTotal = 0;
        let othersTotal = 0;
  
        for(let i = 0; i < props.data.materials.length; i++){
          materialsTotal += Number(props.data.materials[i].amount)
        }
        for(let i = 0; i < props.data.labor.length; i++){
          laborTotal += Number(props.data.labor[i].amount)

        }
        for(let i = 0; i < props.data.otherCharges.length; i++){
          othersTotal += Number(props.data.otherCharges[i].price)
        }
  
        setTotalMaterials(materialsTotal)
        setTotalLabor(laborTotal)
        setTotalOther(othersTotal)

        setTotal(materialsTotal + totalLabor + othersTotal)
  
      }

    const confirmDelete = () => {
        let answer = window.confirm("Are you sure you want to permanetly delete this record?");
        if (answer) {
            try{
                db.collection(job.username).doc(props.docName).delete()
                    console.log("Document successfully deleted!");
                }catch {
                    console.log("Error removing document: ");
                }
        }
        else {
            //Do Nothing
        }
        
    }

      useEffect(() => {
        //   popup.className=
        loadTotals()
        // setPopUp(document.querySelector('listjob__confirmHidden' + props.code))
      }, [])

    return(
        <div className='listjob'
            
        >
            <div
                className="listjob__body"
                onClick={e => {
                    dispatch({
                        type: 'LOAD_JOB',
                        item: {
                            jobData: props.data,
                            jobName: props.jobName,
                            docName: props.docName,
                            username: job.username,
                            invoiceNumber: props.invoiceNum,
                            signatureImage: props.signatureImage,
                            isSuperUser: superUser,
                            superUserName: superUserName
                        }
                    })
                    // console.log(name[0])
                    history.push('/jobdetails')
                }} 
            >
            
            <span 
                key={Math.random()}
                className="viewjobs__name"
                       
                        style={{
                            cursor:'default',
                            fontWeight: 'bold'
                        }}
            >
                        {props.docName}
            </span>
                    <br />
            <div
                style={{
                    marginTop: '5px',
                    marginLeft: '5px',
                    marginBottom: '10px'
                }}
            >
                 {props.data.headerInfo.address}, {props.data.headerInfo.city}, {props.data.headerInfo.state}
            </div>
                    {/* <div className="viewjobs__del">X</div> */}
                    
                    
                    
                    <span>
                        Materials: $<span>{Number(totalMaterials).toFixed(2)}</span>
                    </span>
                    <br/>
                    <span>
                        Labor: $<span>{Number(totalLabor).toFixed(2)}</span>
                    </span>
                    <br/>
                    <span>
                        Other: $<span>{Number(totalOther).toFixed(2)}</span>
                    </span>    
                    <br />
                    <div
                        style={{
                            marginTop: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Total: $<span>{Number(totalMaterials + totalLabor + totalOther).toFixed(2)}</span>
                    </div>
                    
                    <div
                        style={{
                            marginTop: '5px',
                            marginLeft: '5px'
                        }}
                    >
                        Invoice Number: {props.invoiceNum}
                    </div>        
            </div>
            
            <div
                className="listjob__delete"
                onClick={e => (
                    // try{
                    // db.collection(job.username).doc(props.docName).delete()
                    //     console.log("Document successfully deleted!");
                    // }catch {
                    //     console.log("Error removing document: ");
                    // }
                    confirmDelete()
                )
                }
                style={{
                    cursor: 'pointer'
                }}
            >
                X
            </div>
            <div
            key={Math.random()}
            className={'listjob__confirmHidden'}
            style={{
            
            }}
            
        >
            {/* <button>Yes</button>
            <button>No</button> */}
            {popup}
        </div>
        </div>
    )
}

export default ListItem;