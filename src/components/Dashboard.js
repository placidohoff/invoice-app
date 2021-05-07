import React, { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase.js'



function Dashboard(){
    const [{user, isNew, job, superUser}, dispatch] = useStateValue();
    const [emails, setEmails] = useState([])
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [createNew, setCreateNew] = useState(false)

    const emailIsValid = (str) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
      }

    const passwordIsValid = (str) => {

        return(str.length > 5)
    }

    const create = (e) => {
        e.preventDefault()
        if(!emails.includes(email)){
            if(emailIsValid(email) && passwordIsValid(password)){
            auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //.then() is called after a successful .createUserWit.....(). We log to see it.
                //console.log(auth)
                // document.getElementsByClassName('dashboard__emailList').innerHTML = ''
                // let div = document.getElementsByClassName('dashboard__emailList');
                // while(div.firstChild){
                //     div.removeChild(div.firstChild);
                // }
                
                //setEmails([])

                //if successful, redirect to home.
                if(auth){

                    db.collection('emails').doc(email).set({
                        email: email,
                        username: email.split('@')
            
                    })
                }
            })
            //setEmails([])
            setCreateNew(false)
            console.log(emails)
            }
            else{
                alert('not valid')
            }
            
            
            
        }else{
            alert('nay')
        }
    }

    useEffect(() => {
        let arr = []
        db.collection('emails')
        //.orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
            snapshot.docs.map(doc => (
                //console.log(doc.data().email)
                //setEmails([...emails, doc.data().email])
                //arr.push(doc.data().email)
                !arr.includes(doc.data().email) ? arr.push(doc.data().email) : null
            ))
            // setEmails(snapshot.docs.map(doc =>(
            // {
                        
            //     email: doc.data().email

            // }
            // )))
            setEmails(arr)
            //document.getElementsByClassName("dashboard__emailList").append(emails[emails.length-1]);
        
        })
    },[])

    

    return(
        <div
            style={{display:'flex', flexDirection:'row'}}
        >
        <div>
            {
                emails.map((data, index) => (

                    <div
                        className="dashboard__emailList"
                        key={index}
                        onClick={() => 
                        {
                        
                            dispatch({
                                type: 'LOGIN',
                                item: {
                                    user: data,
                                    username: data.split('@')
                                }
                            })
                            history.push('/jobs');
                        }}
                        style={{
                            border: '1px solid black',
                            padding: '5px',
                            marginBottom: '2px',
                            marginTop: '2px'
                        }}
                    >
                        {data}
                        <br/>
                    </div>
                ))
                

            }
        </div>
        <div>
            <input 
                type="text"
                placeholder="Search"
            />
            <div
                onClick={() => {setCreateNew(!createNew)}}
                style={{
                    marginTop: '8px',
                    border: '1px solid black',
                    borderRadius: '20px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {createNew ? <span>Hide</span> : <span>Create New</span> }
            </div>
            {
                createNew
                ?
            <form>
                
                <input 
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                    type="text"
                    placeholder="email"
                />
                <br />
                
                <input 
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                    type="password"
                    placeholder="password"
                />
                <br />
                <button
                    type="submit"
                    onClick={create}
                    // onClick={createUser}
                >
                    Create
                </button>
            </form>
            :
            <div></div>
        }
        </div>
        </div>
    )
}

export default Dashboard;