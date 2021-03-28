import { useEffect, useState } from 'react'
import './Header.css'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { useStateValue } from './StateProvider.js'


function Header(props){
    const [{jobName, job, invoiceNumber}, dispatch] = useStateValue();
    
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
    
    const [cityState, setCityState] = useState(jobObject.headerInfo.cityState)
    const [cityStateLabel, setCityStateLabel] = useState(`City,State,zip: ${cityState}`)

    const [startingDate, setStartingDate] = useState(jobObject.headerInfo.startingDate)
    const [startingDateLabel, setStartingDateLabel] = useState(`Starting Date: ${startingDate}`)
    
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
        minWidth: '200px',
        // height: '40px',
        marginBottom: '3px'
    }

    const spacer = () => {
        return '          '
    }
    // const [smallSpace, setSmallSpace] = useState(&nbsp;)

    useEffect(() => {
        props.save({type: 'header', headerInfo:{phone:phone, orderDate:orderDate, orderTakenBy: orderTakenBy, orderNumber:orderNumber, type: type, name: name, address: address, cityState: cityState, phone: phone, startingDate: startingDate}})
        
    }, [phone, orderDate, orderTakenBy, orderNumber, name, jobLocation, phone, startingDate, type])

    useEffect(() => {
        console.log(isNew)
    })



    return(
        <div className="header">
            <div className="header__title">
                <h1>RCI</h1>
                <h4>Electrical Contractor</h4>
                <p>Tel: (855)644-1748 * (888)55-CALLRCI</p>
                <p>E-mail: us@Quotemyelectrical@gmail.com</p>
                <div style={{display:'flex', flexDirection:'row', whiteSpace: 'pre'}}><span>To:</span><div style={lineStyle}>{blank}</div></div><br />
                <div style={{display:'flex', flexDirection:'row', whiteSpace: 'pre'}}><span>{'    '}</span><div style={lineStyle}>{blankk}</div></div><br />
                <div style={{display:'flex', flexDirection:'row', whiteSpace: 'pre'}}><span>{'    '}</span><div style={lineStyle}>{blankk}</div></div><br />
                {/* <span style={lineStyle}>{blankk}</span><br />
                <span style={lineStyle}>{blankk}</span><br />
                <span style={lineStyle}>{blankk}</span><br /> */}


                {/* <span>To: _________________________________</span><br />
                <span>_____________________________________</span><br />
                <span>_____________________________________</span><br /> 
                <span>_____________________________________</span><br /> */}
            </div>
            <div className="header__invoice">
                <h1
                    style={{marginLeft: '25%'}}
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
                    onChange={e => {setPhoneLabel(e.target.value); setPhone(e.target.value)}}
                    // onChange={doThis}
                    onBlur={e => {setPhoneLabel(`Phone: ${phone}`); save()}}
                    onClick={e => {setPhoneLabel(phone)}}
                    className="header__phoneBox"

         
                />
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
                <input 
                    type="text" 
                    placeholder="Customer Order Number"
                    value = {orderNumberLabel}
                    onClick = {e => {setOrderNumberLabel(orderNumber)}}
                    onChange = {e => {setOrderNumberLabel(e.target.value); setOrderNumber(e.target.value)}}
                    onBlur = {e => {setOrderNumberLabel(`Order Number: ${orderNumber}`)}}
                    className="header__orderNumber"
                    style={{width: '170px'}}
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
                <input 
                    type="text" 
                    placeholder="City,State,ZIP"  
                    width="300"
                    className="header__cityState"
                    value = {cityStateLabel}
                    onClick = {e => {setCityStateLabel(cityState)}}
                    onChange = {e => {setCityStateLabel(e.target.value); setCityState(e.target.value)}}
                    onBlur = {e => {setCityStateLabel(`City,State,ZIP: ${cityState}`)}}
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Job Phone" 
                    value = {jobPhoneLabel}
                    onClick = {e => {setJobPhoneLabel(jobPhone)}}
                    onChange = {e => {setJobPhoneLabel(e.target.value); setPhone(e.target.value)}}
                    onBlur = {e => {setJobPhoneLabel(`Phone: ${jobPhone}`)}}                  
                    // className="header__invoiceOrderDateBox"

                />
                <input 
                    type="text" 
                    placeholder="Starting Date"  
                    value = {startingDateLabel}
                    onClick = {e => {setStartingDateLabel(startingDate)}}
                    onChange = {e => {setStartingDateLabel(e.target.value); setStartingDate(e.target.value)}}
                    onBlur = {e => {setStartingDateLabel(`Starting Date: ${startingDate}`)}}
                    className="header__startDate"
                />

                
                    

               
            </div>
            
        </div>
    )
}

export default Header;
