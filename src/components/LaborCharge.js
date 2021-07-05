import React, { useState, useEffect } from 'react'
import './LaborCharge.css'
import { useStateValue } from './StateProvider';

function LaborCharge(props){
    const [{superUser, job}] = useStateValue()
    const [name, setName] = useState(props.name);
    const [hours, setHours] = useState(props.hours)
    const [rate, setRate] = useState(props.rate)
    const [amount, setAmount] = useState(props.amount)

    useEffect(() => {
        props.saveItem({index: props.index, labor:{name: name, hours:hours, rate:rate, amount:amount}, type:'labor'})
    }, [name,hours,rate,amount])

    useEffect(() => {
        name === '' ? setAmount('')  : setAmount(hours * rate)
    },[hours, name, amount, rate])

    useEffect(() => {
        //name == '' ? setHours('')  setRate('') : null
        if(name == ''){
            setHours('')
            setRate('')
            setAmount('')
        }
    },[])

    // useEffect(() => {
    //     if(name === ''){
    //         // setIsActive(false)
    //         setHours('')
    //         setRate('')
    //         setAmount()
    //     }
    // }, [name])

    return(
        <div className="laborcharge">
            <input 
                type="text"   
                className="laborcharge__name"
                value={name}
                onChange={superUser && !job.isFinalized ? e => {setName(e.target.value)} : null}
                
            />
            {/* <br /> */}
            <input
                type="number"
                className="laborcharge__hours"
                value={hours}
                onChange={superUser && !job.isFinalized ? e => {setHours(e.target.value); props.calculate({hours: hours, rate: rate, amount: amount, index: props.index, labor:{name: name, hours:hours, rate:rate, amount:amount}, type: 'labor'})} : null}
                onBlur={superUser && !job.isFinalized ? e => {setHours(Number(hours).toFixed(1)); setAmount(rate * hours); props.calculate({hours: hours, rate: rate, amount: amount, index: props.index, labor:{name: name, hours:hours, rate:rate, amount:amount}, type:'labor' })}: null}
            />
            <input
                type="number"
                className="laborcharge__rate"
                value={rate}
                onChange={superUser && !job.isFinalized ? e => {setRate(e.target.value); props.calculate({hours: hours, rate: rate, amount: amount, index: props.index, labor:{name: name, hours:hours, rate:rate, amount:amount}, type: 'labor'})} : null}
                onBlur={superUser && !job.isFinalized ? e => {setRate(Number(rate).toFixed(1)); setAmount(rate * hours); props.calculate({hours: hours, rate: rate, amount: amount, index: props.index, labor:{name: name, hours:hours, rate:rate, amount:amount}, type: 'labor'})} : null}
            />
            <input
                type="number"
                className="laborcharge__amount"
                //value={Number(amount).toFixed(2)}
                value={amount == ''? '' : Number(amount).toFixed(2)}
                // onChange={e => {setAmount(e.target.value)}}
                // onBlur={e => {setAmount(Number(amount).toFixed(1)); props.calculate({hours: hours, rate: rate, amount: amount, index: props.index})}}
            />
        </div>
    )
}

export default LaborCharge;