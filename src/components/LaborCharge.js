import React, { useState, useEffect } from 'react'
import './LaborCharge.css'

function LaborCharge(props){
    const [name, setName] = useState(props.name);
    const [hours, setHours] = useState(props.hours)
    const [rate, setRate] = useState(props.rate)
    const [amount, setAmount] = useState(props.amount)

    useEffect(() => {
        props.saveItem({index: props.index, labor:{name: name, hours:hours, rate:rate, amount:amount}})
    }, [name,hours,rate])

    return(
        <div className="laborcharge">
            <input 
                type="text"   
                className="laborcharge__name"
                value={name}
                onChange={e => {setName(e.target.value)}}
                
            />
            <input
                type="number"
                className="laborcharge__hours"
                value={hours}
                onChange={e => {setHours(e.target.value)}}
                onBlur={e => {setHours(Number(hours).toFixed(1)); setAmount(rate * hours); props.calculate({hours: hours, rate: rate, amount: amount, index: props.index})}}
            />
            <input
                type="number"
                className="laborcharge__rate"
                value={rate}
                onChange={e => {setRate(e.target.value)}}
                onBlur={e => {setRate(Number(rate).toFixed(1)); setAmount(rate*hours); props.calculate({hours: hours, rate: rate, amount: amount, index: props.index})}}
            />
            <input
                type="number"
                className="laborcharge__amount"
                value={Number(amount).toFixed(2)}
                // onChange={e => {setAmount(e.target.value)}}
                // onBlur={e => {setAmount(Number(amount).toFixed(1)); props.calculate({hours: hours, rate: rate, amount: amount, index: props.index})}}
            />
        </div>
    )
}

export default LaborCharge;