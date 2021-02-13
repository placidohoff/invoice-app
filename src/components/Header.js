import { useEffect, useState } from 'react'
import './Header.css'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { useStateValue } from './StateProvider.js'


function Header(props){
    //const [{jobName, job}, dispatch] = useStateValue();
    
    const [jobObject, setJobObject] = useState(props.job)

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

    useEffect(() => {
        props.save({type: 'header', headerInfo:{phone:phone, orderDate:orderDate, orderTakenBy: orderTakenBy, orderNumber:orderNumber, type: type, name: name, address: address, cityState: cityState, phone: phone, startingDate: startingDate}})
        
    }, [phone, orderDate, orderTakenBy, orderNumber, name, jobLocation, phone, startingDate, type])



    return(
        <div className="header">
            <div className="header__title">
                <h1>RCI</h1>
                <h4>Electrical Contractor</h4>
                <p>Tel: (855)644-1748 * (888)55-CALLRCI</p>
                <p>E-mail: us@Quotemyelectrical@gmail.com</p>
                <span>To: _________________________________</span><br />
                <span>_____________________________________</span><br />
                <span>_____________________________________</span><br />
                <span>_____________________________________</span><br />
            </div>
            <div className="header__invoice">
                <h1>JOB INVOICE</h1>
                
                <div className="header__invoiceNumber">
                    No. 019163
                </div>
                <input 
                    type="text" 
                    placeholder="Phone"  
                    value={phoneLabel}
                    onChange={e => {setPhoneLabel(e.target.value); setPhone(e.target.value)}}
                    // onChange={doThis}
                    onBlur={e => {setPhoneLabel(`Phone: ${phone}`); save()}}
                    onClick={e => {setPhoneLabel(phone)}}
         
                />
                <input 
                    type="text" 
                    placeholder="Date of Order"  
                    value={orderDateLabel}
                    onClick = {e => {setOrderDateLabel(orderDate)}}
                    onChange = {e => {setOrderDate(e.target.value); setOrderDateLabel(e.target.value)}}
                    onBlur = {e => {setOrderDateLabel(`Order Date: ${orderDate}`)}}
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Order Taken By" 
                    value = {orderTakenByLabel} 
                    onClick = {e => {setOrderTakenByLabel(orderTakenBy)}}
                    onChange = {e => {setOrderTakenByLabel(e.target.value); setOrderTakenBy(e.target.value)}}
                    onBlur = {e => {setOrderTakenByLabel(`Order Taken By: ${orderTakenBy}`)}}
                />
                <input 
                    type="text" 
                    placeholder="Customer Order Number"
                    value = {orderNumberLabel}
                    onClick = {e => {setOrderNumberLabel(orderNumber)}}
                    onChange = {e => {setOrderNumberLabel(e.target.value); setOrderNumber(e.target.value)}}
                    onBlur = {e => {setOrderNumberLabel(`Order Number: ${orderNumber}`)}}
                />
                <br />
                <Checkbox
                    value="checkedA"
                    inputProps={{ 'aria-label': 'Checkbox A' }}
                    label="lnlnlk"
                    color='default'
                    size="small"
                    checked={type === 'daywork'}
                    onChange={e => {setType('daywork')}}
                />
                <span>Daywork</span>
                <Checkbox
                    value="checkedA"
                    inputProps={{ 'aria-label': 'Checkbox A' }}
                    label="lnlnlk"
                    color='default'
                    size="small"
                    checked={type === 'contract'}
                    onChange={e => {setType('contract')}}
                />
                <span>Contract</span>
                <Checkbox
                    value="checkedA"
                    inputProps={{ 'aria-label': 'Checkbox A' }}
                    label="lnlnlk"
                    color='default'
                    size="small"
                    checked={type === 'extra'}
                    onChange={e => {setType('extra')}}
                    // onClick={e => {type === 'extra'? type = '' : type === 'extra'}}
                    // onClick={handleTypeChange}
                />
                <span>Extra</span>
                <br />
                <input 
                    type="text" 
                    placeholder="Job Name" 
                    className="header__invoiceJobName"
                    value={nameLabel}
                    onClick = {e => {setNameLabel(name)}}
                    onChange = {e => {setNameLabel(e.target.value); setName(e.target.value)}} 
                    onBlur = {e => {setNameLabel(`Job Name:${name}`)}}
 
                />
                <br />
                <input 
                    type="text" 
                    placeholder="Address"  
                    width="300"
                    className="header__invoiceJobName"
                    value = {addressLabel}
                    onClick = {e => {setAddressLabel(address)}}
                    onChange = {e => {setAddressLabel(e.target.value); setAddress(e.target.value)}}
                    onBlur = {e => {setAddressLabel(`Address: ${address}`)}}
                />
                <input 
                    type="text" 
                    placeholder="City,State,ZIP"  
                    width="300"
                    className="header__invoiceJobName"
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
 
                />
                <input 
                    type="text" 
                    placeholder="Starting Date"  
                    value = {startingDateLabel}
                    onClick = {e => {setStartingDateLabel(startingDate)}}
                    onChange = {e => {setStartingDateLabel(e.target.value); setStartingDate(e.target.value)}}
                    onBlur = {e => {setStartingDateLabel(`Starting Date: ${startingDate}`)}}
                />

                
                    

               
            </div>
            
        </div>
    )
}

export default Header;
