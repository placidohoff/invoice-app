import React, { useEffect, useState } from 'react'
import './ViewJobs.css'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'
import { db } from '../firebase.js'


function ViewJobs(){
    const [{user}, dispatch] = useStateValue();
    const [username, setUsername] = useState(user.split('@'))
    const history = useHistory();
    const [jobsList, setJobsList] = useState([])

    useEffect(() => {
        if(user == ''){
            history.push('/login')
        }
        else{
            db.collection(username[0])
            //.orderBy("timestamp", "asc")
            .onSnapshot(snapshot => {
                
                setJobsList(snapshot.docs.map(doc =>(
                {
                            
                    jobName: doc.data().jobName,
                    jobData: doc.data().jobData,
                    docName: doc.data().docName

                }
                )))
            
            })

        }
    }, [])

    return(
        <div className="viewjobs">
           <div>Here is a list of the jobs</div>
           {
               jobsList.length > 0 ?
               jobsList.map(job => {
                if(job){
                    return(
                    <div 
                        key={Math.random()}
                        className="viewjobs__list"
                        onClick={e => {
                            dispatch({
                                type: 'LOAD_JOB',
                                item: {
                                    jobData: job.jobData,
                                    jobName: job.jobName,
                                    docName: job.docName,
                                    username: username[0]
                                }
                            })
                            console.log(username[0])
                            history.push('/jobdetails')
                        }}    
                        style={{cursor:'default'}}
                    >
                        {job.jobName}
                    </div>
                    )
                }
            })
        :
            <div className="viewjobs__message">
                There are currently 0 Jobs saved here
            </div>
        }
        </div>
    )
}

export default ViewJobs