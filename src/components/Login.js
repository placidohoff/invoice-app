import React, {useState, useEffect} from 'react'
import './Login.css'
import { auth } from '../firebase.js'
import { useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider.js'




function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [{user}, dispatch] = useStateValue();
    const history = useHistory();

    useEffect(() => {
        dispatch({
            type: 'LOGOUT'
        })    
        
    }, [])

    const loginUser = (e) => {
        e.preventDefault();
    
        if(email == '' || password == ''){
            setUserError(true)
            setErrorMessage('Please fill out both fields')
        }
        else{
            auth
            .signInWithEmailAndPassword(email, password)
            //'auth' is returnedS onSuccess:
            .then(auth => { 
                dispatch({
                    type: 'LOGIN',
                    item: {
                        user: email
                    }
                })
                history.push('/jobs');
            })
            .catch(
                error =>{ 
                    //alert(error.message)
                    setUserError(true)
                    setErrorMessage("The login was unsuccessful")
                }
            )
        }
    }


    return(
        <div className="login">
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
                    onClick={loginUser}
                >
                    Login
                </button>
                <button
                    type="submit"
                    // onClick={createUser}
                >
                    Create
                </button>
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

export default Login;