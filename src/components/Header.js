import { useEffect, useState } from 'react'
import './Header.css'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { useStateValue } from './StateProvider.js'
import Scroller from './Scroller.js'

function Header(props){
    const [{jobName, job, invoiceNumber, superUser, user}, dispatch] = useStateValue();
    
    const [jobObject, setJobObject] = useState(props.job)

    const [isNew, setIsNew] = useState(props.job.isNew)

    const [phone, setPhone] = useState(jobObject.headerInfo.phone)
    const [phoneLabel, setPhoneLabel] = useState(`Phone: ${phone}`)
    
    const [orderDate, setOrderDate] = useState(jobObject.headerInfo.orderDate)
    const [orderDateLabel, setOrderDateLabel] = useState(`Order Date: ${orderDate}`)
    
    const [orderTakenBy, setOrderTakenBy] = useState(jobObject.headerInfo.orderTakenBy)
    const [orderTakenByLabel, setOrderTakenByLabel] = useState(`Order Taken By: ${orderTakenBy}`)
    
    const [orderNumber, setOrderNumber] = useState(jobObject.headerInfo.orderNumber)
    const [orderNumberLabel, setOrderNumberLabel] = useState(`Order Number: ${orderNumber}`)
    
    const [type, setType] = useState(jobObject.headerInfo.type)
    
    const [name, setName] = useState(jobObject.jobName)
    const [nameLabel, setNameLabel] = useState(`Job Name: ${name}`)
    
    const [jobLocation, setJobLocation] = useState(jobObject.headerInfo.jobLocation)
    const [jobLocationLabel, setJobLocationLabel] = useState(`Job Location: ${jobLocation}`)
   
    const [address, setAddress] = useState(jobObject.headerInfo.address)
    const [addressLabel, setAddressLabel] = useState(`Address: ${address}`)

    const [jobPhone, setJobPhone] = useState(jobObject.headerInfo.jobPhone)
    const [jobPhoneLabel, setJobPhoneLabel] = useState(`Phone: ${jobPhone}`)
    
    // const [cityState, setCityState] = useState(jobObject.headerInfo.cityState)
    // const [cityStateLabel, setCityStateLabel] = useState(`City,State,zip: ${cityState}`)

    const [startingDate, setStartingDate] = useState(jobObject.headerInfo.startingDate)
    const [startingDateLabel, setStartingDateLabel] = useState(`Starting Date: ${startingDate}`)
    
    const [completionDate, setCompletionDate] = useState(jobObject.headerInfo.dateCompleted)
    const [completionDateLabel, setCompletionDateLabel] = useState(`Date of Completion: ${completionDate}`)
    
    const [state, setState] = useState(jobObject.headerInfo.state)
    const [stateLabel, setStateLabel] = useState(`State: ${state}`)
    
    const [city, setCity] = useState(jobObject.headerInfo.city)
    const [cityLabel, setCityLabel] = useState(`City: ${city}`)
    
    const [zip, setZip] = useState(jobObject.headerInfo.zip)
    const [zipLabel, setZipLabel] = useState(`Zip: ${zip}`)
    
    const [isToLinesSet, setIsToLinesSet] = useState(jobObject.headerInfo.isToLineSet)
    const [toLineValue, setToLineValue] = useState(jobObject.headerInfo.toLineVal)

    //const [invoiceNum, setInvoiceNum] = useState(invoiceNum)

    const save = () => {
        //console.log("Hello")
        setJobObject({
                jobName: props.job.jobName,
                headerInfo:{
                    phone: phone,
                    dateOfOrder: orderDate,
                    orderTakenBy: orderTakenBy,
                    customerOrderNumber: orderNumber,
                    type:type,
                    jobLocation: jobLocation,
                    jobPhone: phone,
                    startingDate: startingDate,
                },
                description: props.job.description,
                materials: props.job.materials,
                otherCharges: props.job.otherCharges,
                labor: props.job.otherCharges,
                totalLabor: props.job.totalLabor,
                totalMaterials: props.job.totalMaterials,
                totalOther: props.job.totalOther,
                tax: props.job.tax,
                total: props.job.total
        })

        //props.save(jobObject)
    }

    const handleTypeChange = e => {

    }

    const blank = '                                                                  '
    const blankk = '                                                                       '

    const lineStyle = {
        // textDecoration: 'underline', 
        whiteSpace: 'pre', 
        // width: '200px'
        borderBottom: '1px solid black',
        minWidth: '300px',
        // height: '40px',
        marginBottom: '3px',
        fontWeight: 'bold'
    }

    const spacer = () => {
        return '          '
    }
    // const [smallSpace, setSmallSpace] = useState(&nbsp;)

    useEffect(() => {
        props.save({type: 'header', headerInfo:{phone:phone, orderDate:orderDate, orderTakenBy: orderTakenBy, orderNumber:orderNumber, type: type, name: name, address: address, city:city, state:state, zip:zip, phone: phone, startingDate: startingDate, toLineVal: toLineValue, isToLineSet: isToLinesSet}})
        
    }, [phone, orderDate, orderTakenBy, orderNumber, name, jobLocation, phone, startingDate, type, toLineValue, isToLinesSet])

    // useEffect(() => {
    //     //console.log(isNew)
    //     //alert(toLineValue)
    //     console.log("HEADER!!!! ",jobObject)
    // })



    return(
        <div className="header">
            <div className="header__title">
                {
                    user == 'sample@portfolio.com' && superUser ?
                    <h1 className="header__rci">SAMPLE</h1>
                    :   
                    <h1 className="header__rci">RCI</h1>
                }   
                {
                    user == 'sample@portfolio.com' && superUser ?
                    <h4 className="header__rciSub">SAMPLE BUSINESS NAME</h4>
                    :
                    <h4 className="header__rciSub">ELECTRICAL CONTRACTOR</h4>
                }
                {
                    user == 'sample@portfolio.com' && superUser ?
                    <p>Tel: (401)555-6789 * (401)555-6789</p>
                    :
                    <p>Tel: (855)644-1748 * (888)55-CALLRCI</p>
                }
                {
                    user == 'sample@portfolio.com' && superUser ?
                    <p>E-mail: sampleportfolio@none.com</p>
                    :
                    <p>E-mail: Quotemyelectrical@gmail.com</p>
                }
                {isToLinesSet[0] ? 
                <div style={{display:'flex', flexDirection:'row', whiteSpace: 'pre'}}>
                    <span>To: &nbsp;</span>
                    <div
                    onClick={
                        () => {
                            if(superUser){
                                let name = prompt("")
                                
                                if(name == '' || name === null)
                                        setIsToLinesSet([false, isToLinesSet[1], isToLinesSet[2]])
                                    else{
                                        setToLineValue([name, toLineValue[1], toLineValue[2]])
                                        setIsToLinesSet([true, isToLinesSet[1], isToLinesSet[2]])
                                        // dispatch({
                                        //     type: 'TO_LINE_SET',
                                        //     item:{
                                        //         val: [name, toLineValue[1], toLineValue[2]],
                                        //         val2: [true, isToLinesSet[1], isToLinesSet[2]]
                                        //     }
                                        // })
                                    }
                            }
                            

                        }
                                                    
                        }
                     style={lineStyle}>{toLineValue[0]}</div>
                </div>
                :
                <div 
                onClick={
                    () => {
                        if(superUser){
                            let name = prompt("")
                            if(name == '' || name === null)
                                setIsToLinesSet([false, isToLinesSet[1], isToLinesSet[2]])
                            else{
                                setToLineValue([name, toLineValue[1], toLineValue[2]])
                                setIsToLinesSet([true, isToLinesSet[1], isToLinesSet[2]])
                                // dispatch({
                                //     type: 'TO_LINE_SET',
                                //     item:{
                                //         val: [name, toLineValue[1], toLineValue[2]],
                                //         val2: [true, isToLinesSet[1], isToLinesSet[2]]
                                //     }
                                // })
                            }
                        }
                        
                }
                
                }
                style={{display:'flex', flexDirection:'row', whiteSpace: 'pre'}}>
                    <span>To: &nbsp;</span>
                    <div style={lineStyle}>{toLineValue[0]}</div>
                </div>
                }
                <br />
                {isToLinesSet[1] ?
                <div 
                onClick={
                    () => {
                        if(superUser){
                            let name = prompt("")
                            if(name == '' || name === null)
                                setIsToLinesSet([isToLinesSet[0], false, isToLinesSet[2]])
                            else{
                                setToLineValue([toLineValue[0], name, toLineValue[2]])
                                setIsToLinesSet([isToLinesSet[0], true, isToLinesSet[2]])
                                // dispatch({
                                //     type: 'TO_LINE_SET',
                                //     item:{
                                //         val: [toLineValue[0], name, toLineValue[2]],
                                //         val2: [isToLinesSet[0], true, isToLinesSet[2]]
                                //     }
                                // })
                            }
                        }
                        
                    }
                }
                style={{display:'flex', flexDirection:'row', whiteSpace: 'pre'}}>
                    <span>{'    '}</span><div style={lineStyle}>{'   ' + toLineValue[1]}</div>
                </div> 
                : 
                <div 
                onClick={
                    () => {
                        if(superUser){
                            let name = prompt("")
                            if(name == '' || name === null)
                                setIsToLinesSet([isToLinesSet[0], false, isToLinesSet[2]])
                            else{
                                setToLineValue([toLineValue[0], name, toLineValue[2]])
                                setIsToLinesSet([isToLinesSet[0], true, isToLinesSet[2]])
                                // dispatch({
                                //     type: 'TO_LINE_SET',
                                //     item:{
                                //         val: [toLineValue[0], name, toLineValue[2]],
                                //         val2: [isToLinesSet[0], true, isToLinesSet[2]]
                                //     }
                                // })
                                    
                            }  
                        }
                                          
                    }
                }
                style={{display:'flex', flexDirection:'row', whiteSpace: 'pre'}}>
                    <span>{'    '}</span><div style={lineStyle}>{toLineValue[1]}</div>
                </div>
                }
                <br />
                
                {isToLinesSet[2] ?
                <div 
                onClick={
                    () => {
                        if(superUser){
                            let name = prompt("")
                            if(name == '' || name === null)
                                setIsToLinesSet([isToLinesSet[0], isToLinesSet[1], false])
                            else{
                                setToLineValue([toLineValue[0], toLineValue[1], name])
                                setIsToLinesSet([isToLinesSet[0], isToLinesSet[1], true])
                                // dispatch({
                                //     type: 'TO_LINE_SET',
                                //     item:{
                                //         val: [toLineValue[0], toLineValue[1], name],
                                //         val2: [isToLinesSet[0], isToLinesSet[1], true]
                                //     }
                                // })
                            } 
                        }
                        
                                   
                    }
                }
                style={{display:'flex', flexDirection:'row', whiteSpace: 'pre'}}>
                    <span>{'    '}</span><div style={lineStyle}>{toLineValue[2]}</div>
                </div> 
                : 
                <div 
                onClick={
                    () => {
                        if(superUser){
                            let name = prompt("")
                            if(name == '' || name === null)
                                setIsToLinesSet([isToLinesSet[0], isToLinesSet[1], false])
                            else{
                                setToLineValue([toLineValue[0], toLineValue[1], name])
                                setIsToLinesSet([isToLinesSet[0], isToLinesSet[1], true])
                                // dispatch({
                                //     type: 'TO_LINE_SET',
                                //     item:{
                                //         val: [toLineValue[0], toLineValue[1], name],
                                //         val2: [isToLinesSet[0], isToLinesSet[1], true]
                                //     }
                                // })
                            }  
                        }
                                               
                 }
                }
                style={{display:'flex', flexDirection:'row', whiteSpace: 'pre'}}>
                    <span>{'    '}</span><div style={lineStyle}>{toLineValue[2]}</div>
                </div>
                }                {/* <span style={lineStyle}>{blankk}</span><br />
                <span style={lineStyle}>{blankk}</span><br />
                <span style={lineStyle}>{blankk}</span><br /> */}


                {/* <span>To: _________________________________</span><br />
                <span>_____________________________________</span><br />
                <span>_____________________________________</span><br /> 
                <span>_____________________________________</span><br /> */}
            </div>
            <div className="header__invoice">
                <h1
                    style={{marginLeft: '20%'}}
                    className="header__invoiceTop"
                >
                    JOB INVOICE
                </h1>
                
                <div className="header__invoiceNumber">
                    No. {invoiceNumber}
                </div>
                <input 
                    type="text" 
                    placeholder="Phone"  
                    value={phoneLabel}
                    onChange={superUser && !job.isFinalized ? e => {setPhoneLabel(e.target.value); setPhone(e.target.value)} : null}
                    onBlur={superUser && !job.isFinalized ? e => {setPhoneLabel(`Phone: ${phone}`); save()} : null}
                    onClick={superUser && !job.isFinalized ? e => {setPhoneLabel(phone); console.log(job)} : null}
                    className="header__phoneBox"

         
                />
                <input 
                    type="text" 
                    placeholder="Date of Order"  
                    value={orderDateLabel}
                    onClick = {superUser && !job.isFinalized ? e => {setOrderDateLabel(orderDate)} : null}
                    onChange = {superUser && !job.isFinalized ? e => {setOrderDate(e.target.value); setOrderDateLabel(e.target.value)} : null}
                    onBlur = {superUser && !job.isFinalized ? e => {setOrderDateLabel(`Order Date: ${orderDate}`)} : null}
                    className="header__invoiceOrderDateBox"
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Order Taken By" 
                    value = {orderTakenByLabel} 
                    onClick = {superUser && !job.isFinalized ? e => {setOrderTakenByLabel(orderTakenBy)} : null}
                    onChange = {superUser && !job.isFinalized ? e => {setOrderTakenByLabel(e.target.value); setOrderTakenBy(e.target.value)} : null}
                    onBlur = {superUser && !job.isFinalized ? e => {setOrderTakenByLabel(`Order Taken By: ${orderTakenBy}`)} : null}
                    className="header__orderTakenByBox"
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Customer Order Number"
                    value = {orderNumberLabel}
                    onClick = {superUser && !job.isFinalized ? e => {setOrderNumberLabel(orderNumber)} : null}
                    onChange = {superUser && !job.isFinalized ? e => {setOrderNumberLabel(e.target.value); setOrderNumber(e.target.value)} : null}
                    onBlur = {superUser && !job.isFinalized ? e => {setOrderNumberLabel(`Order Number: ${orderNumber}`)} : null}
                    className="header__orderNumber"
                    style={{width: '345px'}}
                />
                <br />
                <div
                    style={{
                        marginBottom: '-15px',
                        marginTop: '5px',
                        marginLeft: '20px'
                    }}
                >
                    <input 
                        type="checkbox" 
                        checked={type === 'daywork'} 
                        size="small"
                        onChange={superUser && !job.isFinalized ? e => {setType('daywork')} : null}>
                    </input>
                    <span style={{marginRight:'10px'}}>Daywork</span>
                    <input 
                        type="checkbox" 
                        checked={type === 'contract'} 
                        size="small"
                        onChange={superUser && !job.isFinalized ? e => {setType('contract')} : null}>
                    </input>
                    <span style={{marginRight:'10px'}}>Contract</span>
                    <input 
                        type="checkbox" 
                        checked={type === 'extra'} 
                        size="small"
                        onChange={superUser && !job.isFinalized ? e => {setType('extra')} : null}>
                    </input>
                    <span>Extra</span>
                </div>
                <br />
                <input 
                    style={{marginTop: '-20px'}}
                    type="text" 
                    placeholder="Job Name" 
                    className="header__invoiceJobName"
                    value={nameLabel}
                    onClick = {superUser && !job.isFinalized ? e => {setNameLabel(name)} : null}
                    onChange = {superUser && !job.isFinalized ? e => {setNameLabel(e.target.value); setName(e.target.value)} : null} 
                    onBlur = {superUser && !job.isFinalized ? e => {setNameLabel(`Job Name: ${name}`)} : null}
 
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Address"  
                    width="300"
                    className="header__address"
                    value = {addressLabel}
                    onClick = {superUser && !job.isFinalized ? e => {setAddressLabel(address)} : null}
                    onChange = {superUser && !job.isFinalized ?e => {setAddressLabel(e.target.value); setAddress(e.target.value)} : null}
                    onBlur = {superUser && !job.isFinalized ? e => {setAddressLabel(`Address: ${address}`)} : null}
                />
                <br />
                <div
                    style={{
                        display:'flex',
                        flexDirection:'row',
                        marginTop: '3px'
                    }}
                >
                    <input 
                        type="text" 
                        placeholder="City"  
                        // width="200"
                        // className="header__cityState"
                        style={{width:'155px'}}
                        value = {city}
                        onClick = {superUser && !job.isFinalized ? e => {setCityLabel(city)} : null}
                        onChange = {superUser && !job.isFinalized ? e => {setCityLabel(e.target.value); setCity(e.target.value)} : null}
                        onBlur = {superUser && !job.isFinalized ? e => {setCityLabel(`City: ${city}`)} : null}
                    />
                    <input 
                        type="text" 
                        placeholder="State"  
                        // width="200"
                        // className="header__cityState"
                        style={{width:'60px', borderLeft:'none'}}
                        value = {state}
                        onClick = {superUser && !job.isFinalized ? e => {setStateLabel(state)} : null}
                        onChange = {superUser && !job.isFinalized ? e => {setStateLabel(e.target.value); setState(e.target.value)} : null}
                        onBlur = {superUser && !job.isFinalized ? e => {setStateLabel(`State: ${state}`)} : null}
                    />
                    <input 
                        type="text" 
                        placeholder="Zip"  
                        // width="200"
                        // className="header__cityState"
                        style={{width:'120px', borderLeft: 'none'}}
                        value = {zip}
                        onClick = {superUser && !job.isFinalized ? e => {setZipLabel(zip)} : null}
                        onChange = {superUser && !job.isFinalized ? e => {setZipLabel(e.target.value); setZip(e.target.value)} : null}
                        onBlur = {superUser && !job.isFinalized ? e => {setZipLabel(`Zip Code: ${zip}`)} : null}
                    />
                </div>
                {/* <br/> */}
                <div
                    style={{
                        marginTop: '0px'
                    }}
                >
                <input 
                    type="text" 
                    placeholder="Starting Date:"  
                    value = {startingDateLabel}
                    onClick = {superUser && !job.isFinalized ? e => {setStartingDateLabel(startingDate); console.log(superUser)} : null}
                    onChange = {superUser && !job.isFinalized ? e => {setStartingDateLabel(e.target.value); setStartingDate(e.target.value)} : null}
                    onBlur = {superUser && !job.isFinalized ? e => {setStartingDateLabel(`Starting Date: ${startingDate}`)} : null}
                    className="header__startDate"
                    style={{borderLeft: '1px solid black'}}
                />
                <input 
                    type="text" 
                    placeholder="Date of Completion"  
                    value = {completionDateLabel}
                    onClick = {superUser && !job.isFinalized ? e => {setCompletionDateLabel(completionDate)} : null}
                    onChange = {superUser && !job.isFinalized ? e => {setCompletionDateLabel(e.target.value); setCompletionDate(e.target.value)} : null}
                    onBlur = {superUser && !job.isFinalized ? e => {setCompletionDateLabel(`Finish Date: ${completionDate}`)} : null}
                    className="header__completeDate"
                    style={{borderLeft: "none", width:''}}
                />
                </div>

                
                    

               

            </div>
            
            <div className="header__mobile">
                
                {/* <Scroller> */}
                <div className="header__mobile__invoice">
                    <h1
                    style={{marginLeft: '25%'}}
                >
                    INVOICE
                </h1>
                
                <div className="header__invoiceNumber">
                    No. {invoiceNumber} 
                </div>

                <div className="header__docname">
                    {props.docName}
                </div>

                <input 
                    style={{marginTop: '-20px'}}
                    type="text" 
                    placeholder="Job Name" 
                    className="header__invoiceJobName"
                    value={nameLabel}
                    onClick = {e => {setNameLabel(name)}}
                    onChange = {e => {setNameLabel(e.target.value); setName(e.target.value)}} 
                    onBlur = {e => {setNameLabel(`Job Name: ${name}`)}}
 
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Address"  
                    width="300"
                    className="header__address"
                    value = {addressLabel}
                    onClick = {e => {setAddressLabel(address)}}
                    onChange = {e => {setAddressLabel(e.target.value); setAddress(e.target.value)}}
                    onBlur = {e => {setAddressLabel(`Address: ${address}`)}}
                />
                <br />
                {/* <input 
                    type="text" 
                    placeholder="City,State,ZIP"  
                    width="300"
                    className="header__cityState"
                    value = {cityStateLabel}
                    onClick = {e => {setCityStateLabel(cityState)}}
                    onChange = {e => {setCityStateLabel(e.target.value); setCityState(e.target.value)}}
                    onBlur = {e => {setCityStateLabel(`City,State,ZIP: ${cityState}`)}}
                />
                <br /> */}
                <input 
                    type="text" 
                    placeholder="Job Phone" 
                    value = {jobPhoneLabel}
                    onClick = {e => {setJobPhoneLabel(jobPhone)}}
                    onChange = {e => {setJobPhoneLabel(e.target.value); setPhone(e.target.value)}}
                    onBlur = {e => {setJobPhoneLabel(`Phone: ${jobPhone}`)}}                  
                    // className="header__invoiceOrderDateBox"

                />
                <br/>
                <input 
                    type="text" 
                    placeholder="Starting Date"  
                    value = {startingDateLabel}
                    onClick = {e => {setStartingDateLabel(startingDate)}}
                    onChange = {e => {setStartingDateLabel(e.target.value); setStartingDate(e.target.value)}}
                    onBlur = {e => {setStartingDateLabel(`Starting Date: ${startingDate}`)}}
                    className="header__startDate"
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Phone"  
                    value={phoneLabel}
                    onChange={e => {setPhoneLabel(e.target.value); setPhone(e.target.value)}}
                    // onChange={doThis}
                    onBlur={e => {setPhoneLabel(`Phone: ${phone}`); save()}}
                    onClick={e => {setPhoneLabel(phone)}}
                    className="header__phoneBox"

         
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Date of Order"  
                    value={orderDateLabel}
                    onClick = {e => {setOrderDateLabel(orderDate)}}
                    onChange = {e => {setOrderDate(e.target.value); setOrderDateLabel(e.target.value)}}
                    onBlur = {e => {setOrderDateLabel(`Order Date: ${orderDate}`)}}
                    className="header__invoiceOrderDateBox"
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Order Taken By" 
                    value = {orderTakenByLabel} 
                    onClick = {e => {setOrderTakenByLabel(orderTakenBy)}}
                    onChange = {e => {setOrderTakenByLabel(e.target.value); setOrderTakenBy(e.target.value)}}
                    onBlur = {e => {setOrderTakenByLabel(`Order Taken By: ${orderTakenBy}`)}}
                    className="header__orderTakenByBox"
                />
                <br/>
                <input 
                    type="text" 
                    placeholder="Customer Order Number"
                    value = {orderNumberLabel}
                    onClick = {e => {setOrderNumberLabel(orderNumber)}}
                    onChange = {e => {setOrderNumberLabel(e.target.value); setOrderNumber(e.target.value)}}
                    onBlur = {e => {setOrderNumberLabel(`Order Number: ${orderNumber}`)}}
                    className="header__orderNumber"
                    // style={{width: '170px'}}
                />
                <br />
                <div
                    style={{
                        marginBottom: '-15px',
                        marginTop: '5px',
                        marginLeft: '20px'
                    }}
                >
                    <input 
                        type="checkbox" 
                        checked={type === 'daywork'} 
                        size="small"
                        onChange={e => {setType('daywork')}}>
                    </input>
                    <span style={{marginRight:'10px'}}>Daywork</span>
                    <input 
                        type="checkbox" 
                        checked={type === 'contract'} 
                        size="small"
                        onChange={e => {setType('contract')}}>
                    </input>
                    <span style={{marginRight:'10px'}}>Contract</span>
                    <input 
                        type="checkbox" 
                        checked={type === 'extra'} 
                        size="small"
                        onChange={e => {setType('extra')}}>
                    </input>
                    <span>Extra</span>
                </div>
                <br />
                {/* <div className="header__mobile__details">
                    <div>Materials: </div>
                    <div>Labor: </div>
                    <div>Other: </div>
                    <div>Tax: </div> 
                    <div>Total: </div>
                </div> */}
                </div>

                
                {/* </Scroller> */}
                
            </div>
        </div>
    )
}

export default Header;
