import React, {useState, useEffect} from 'react'
import './Login.css'
import { auth } from '../firebase.js'
import { useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider.js'
import { db } from '../firebase.js'



function SampleLogIn(){
    const [email, setEmail] = useState('sample@portfolio.com');
    const [password, setPassword] = useState('123456');
    const [userError, setUserError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [{user}, dispatch] = useStateValue();
    const history = useHistory();

    useEffect(() => {
        dispatch({
            type: 'LOGOUT'
        })    
        
    }, [])

    const login = (e) => {
        e.preventDefault();
    
            auth
                .signInWithEmailAndPassword(email, password)
                //'auth' is returnedS onSuccess:
                .then(auth => { 
                    dispatch({
                        type: 'SAMPLE',
                        item: {
                            user: email,
                            username: email.split('@'),
                            email: email
                        }
                    })
                    history.push('/jobs');
                })
    }

    const createUser = (e) => {
        e.preventDefault();

        if(email == '' || password == ''){
            setUserError(true)
            setErrorMessage('Please fill out both fields')
        }
        else{
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            //.then() is called after a successful .createUserWit.....(). We log to see it.
            console.log(auth)

            //if successful, redirect to home.
            if(auth){

                db.collection('emails').doc(email).set({
                    email: email,
                    username: email.split('@')
          
                  })

                dispatch({
                    type: 'LOGIN',
                    item: {
                        user: email,
                        username: email.split('@')
                    }
                })
                history.push('/jobs');
            }
        })
        .catch(
            error => {
                //alert(error.message)
                console.log(error)
                setUserError(true)
                setErrorMessage('Error, create/login was unsucessful')
            }
            
        )
        }
    }



    return(
        <div className="login"
            style={{}}
        >
            <form>
                
                {/* <input 
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
                /> */}
                <h3
                    style={{
                        textAlign: 'center'
                    }}
                >Welcome to this sample web application used for invoicing construction jobs. 
                    <br/><br/>This appliciation was built and is maintined by 
                    <br/><br/>Placido Hoff</h3>
                <br />
                <div
                    style={{
                        
                        marginLeft: '35%'
                    }}
                >
                    <button
                        type="submit"
                        onClick={login}
                        style={{
                            width: '180px',
                            height: '30px',
                            fontWeight: 'bold',
                            marginTop: '5px',
                            backgroundColor: 'gold'
                            
                            
                        }}
                    >
                        CLICK HERE
                    </button>
                    
                </div>
            </form>
            {
                userError
                ?
                <div className="login__error">Error: {errorMessage} </div>
                :
                <></>
            }
            {/* <div className="login__bottom">
                <p>*No need to use your actual email address. Treat it as a username to login to this specific application</p>
            </div> */}
        </div>
    )
}

export default SampleLogIn;