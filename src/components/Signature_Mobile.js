import React, {useState, useRef} from 'react'
import './SignatureMobile.css'
import Popup from 'reactjs-popup'
import SigniturePad from 'react-signature-canvas'
import './Signiture.css'
import { useStateValue } from './StateProvider.js'



function Signature_Mobile(props){

const [{user, jobName,invoiceNumber}, dispatch] = useStateValue();
const spaceOrder = '                                         '
const spaceSig = '                                                                         '
const signiture = {
        marginTop: '100px'
    }

const [imageURL, setImageURL] = useState(props.signatureImage)
const sigCanvas = useRef([])

const [sigClass, setSigClass] = useState("sigMobileTriggerPre")

const saveSig = () => {
    console.log(sigCanvas.current)
    // sigCanvas.current.style.backgroundColor = "white"
    // sigCanvas.current.props.backgroundColor = "white"
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
    setSigClass("signitureTriggerPost")
    props.saveSignature(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
    console.log(sigCanvas)
    document.getElementById("closeSigBn").click();
    // sigCanvas.close();
    dispatch({
        type: 'NEW_SIGNATURE',
        item: {
            signatureImage: sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        }
    })
}

const clearSig = () => {
    sigCanvas.current.clear()
}

const padStyle = {
    width: '220px',
    height: '50px',
    // border: '1px solid black',
    marginTop: '-50px',
    cursor: "crosshair",
    zIndex: '10',
    // backgroundColor: 'red',
    position: 'absolute' ,
    // marginLeft: '-50px'

}

const makeBackgroundDark = () => {
    //alert('hello')
    console.log('make dark')
}
    return(
        <div className="signatureMobile"
        
    
        style={signiture}>
            <span
                style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginLeft: '-20px'
                    // cursor: "crosshair"
                }}
            >
                Work ordered by:
            </span>
            <span style={{
                // textDecoration: 'underline', 
                whiteSpace: 'pre', 
                // width: '200px'
                borderBottom: '1px solid black',
                minWidth: '250px'
                // marginLeft: '-20px'

                }}
            >
                    { spaceOrder }
            </span>
            <br />
            <div 
                style={{
                    marginTop: '55px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                <span
                    style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        marginLeft: '-20px'
                        // marginTop: '25px'
                    }}
                >
                    Signiture:
                </span>
                <div
                    style={{
                        // textDecoration: 'underline', 
                        // whiteSpace: 'pre', 
                        
                        borderBottom: '1px solid black',
                        minWidth: '180px',
                        // border: '1px solid black',
                        // height: '55px',
                        marginTop: '-35px',
                        // cursor: "crosshair"
                        
    
                    }}
                >
                    {
                    imageURL ? (
                        <img
                          src={imageURL}
                          alt="my signiture"
                          style={{
                            display: 'block',
                            margin: '0 auto',
                            // border: '1px solid black',
                            width: '90%',
                            zIndex: '-10',
                            backgroundColor:'white'
                            // color: 'red'
                          }}
                        />
                      ) : 

                    spaceSig
                    
                    }
                    <Popup 
                        modal
                        trigger={
                            <div
                                style={padStyle}
                                // className={sigClass}
                                // style={{
                                //     width: '200px',
                                //     height: '50px',
                                //     border: '1px solid black'
                                // }}
                                onClick={e =>  (console.log('hello'))}
                            >

                            </div>
                            
                            // <button>TEST</button>
                            }
                        closeOnDocumentClick={false}
                    >
                        {close => (
                        <>
                            <SigniturePad 
                                ref={sigCanvas}
                                backgroundColor='#f0f0f0'

                                canvasProps={{
                                    className: 'sigMobileCanvas',
                                    // height: '20px',
                                    // border: '2px solid black',
                                    width: '300px',
                                    height: '75px',
                                    marginLeft: '-50px'
                                    // marginLeft:'500px'
                                }} 
                            />
                            <br />
                            <div className="sigMobilePadButtons">
                                <button style={{marginLeft: '-300px'}} onClick={clearSig}>Clear</button>
                                <button onClick={saveSig}>Save</button>
                                <button onClick={close} id="closeSigBn">Close</button>
                            </div>
                            {/* <button onClick={close}>Save</button> */}
                            {/* <button onClick={close}>Close</button> 
                            <button>Save</button> */}
                            
                            </>
                        )} 
                    {/* {
                    imageURL ? (
                        <img
                          src={imageURL}
                          alt="my signiture"
                          style={{
                            display: 'block',
                            margin: '0 auto',
                            border: '1px solid black',
                            width: '150px'
                          }}
                        />
                      ) : 

                    spaceSig
                    
                    } */}
                </Popup>
                </div>
                </div>
            </div>
            <br />
        </div>
    )
}

export default Signature_Mobile;