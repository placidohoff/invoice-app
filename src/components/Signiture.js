import React, {useState, useRef} from 'react'
import Popup from 'reactjs-popup'
import SigniturePad from 'react-signature-canvas'
import './Signiture.css'
import { useStateValue } from './StateProvider.js'

function Signiture(props){
    const [{user, jobName,invoiceNumber}, dispatch] = useStateValue();
    const signiture = {
        marginTop: '100px'
    }

    const spaceOrder = '                                                         '
    const spaceSig = '                                                                         '
    const [imageURL, setImageURL] = useState(props.signatureImage)
    const sigCanvas = useRef([])
    const [sigClass, setSigClass] = useState("signitureTriggerPre")

    const saveSig = () => {
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

    return(
        <div style={signiture}>
            <span
                style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginLeft: '20px'
                }}
            >
                Work ordered by
            </span>
            <span style={{
                // textDecoration: 'underline', 
                whiteSpace: 'pre', 
                // width: '200px'
                borderBottom: '1px solid black',
                minWidth: '200px'

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
                        marginLeft: '-10px'
                        // marginTop: '25px'
                    }}
                >
                    Signiture
                </span>
                <div
                    style={{
                        // textDecoration: 'underline', 
                        // whiteSpace: 'pre', 
                        
                        borderBottom: '1px solid black',
                        minWidth: '180px',
                        // border: '1px solid black',
                        height: '55px',
                        marginTop: '-35px'
    
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
                            width: '100%'
                          }}
                        />
                      ) : 

                    spaceSig
                    
                    }
                    <Popup 
                        modal
                        trigger={
                            <div
                                className={sigClass}
                            >
                                
                            </div>}
                        closeOnDocumentClick={true}
                    >
                        {close => 
                        <>
                            <SigniturePad 
                                ref={sigCanvas}
                                canvasProps={{
                                    className: 'signitureCanvas'
                                    // height: '20px',
                                    // border: '1px solid black'
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
            <div
                style={{
                    marginTop: '-20px',
                    marginLeft: '45px'
                }}
            >
            <span 
                style={{
                    fontSize: '9px'

                    
                }}
            >
                I hereby acknowledge the satisfactory completion of the above described work.
            </span>
            </div>
        </div>
    )
}

export default Signiture;


