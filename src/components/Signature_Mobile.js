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
    // sigCanvas.backgroundColor
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
    border: '1px solid black',
    marginTop: '-80px',
    cursor: "crosshair",
    zIndex: '10',
    backgroundColor: 'red',
    position: 'absolute' 

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
                            >
                               
                            </div>
                            // <button>TEST</button>
                            }
                        closeOnDocumentClick={true}
                    >
                        {close => 
                        <>
                            <SigniturePad 
                                ref={sigCanvas}
                                backgroundColor='gray'
                                canvasProps={{
                                    className: 'signitureCanvas',
                                    // height: '20px',
                                    border: '2px solid black',
                                    width: '200px',
                                    height: '75px',
                                    backgroundColor: 'purple'
                                    // marginLeft:'500px'
                                }} 
                            />
                            <br />
                            <button onClick={clearSig}>Clear</button>
                            <button onClick={saveSig}>Save</button>
                            <button onClick={close} id="closeSigBn">Close</button>
                            {/* <button onClick={close}>Save</button> */}
                            {/* <button onClick={close}>Close</button> 
                            <button>Save</button> */}
                            
                            </>
                        } 
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