import React, {useState} from 'react'
import { Checkbox } from '@material-ui/core'
import { useStateValue } from './StateProvider.js'

import './TaxModule.css'

 
function TaxModule(props){

    const [{user, jobName,invoiceNumber,job, superUser}, dispatch] = useStateValue();
    const [state, setState] = useState('RI')
    const [cityState, setCityState] = useState(job.cityState)
    const [taxRate, setTaxRate] = useState(job.taxRate)
    // const [taxRateLabel, setTaxRateLabel] = useState(0)
    const [taxRateLabel, setTaxRateLabel] = useState(`${Number(taxRate).toFixed(2)}%`)

    const push = (flag) => {
        if(flag == 'RI' || flag == 'MA'){
            dispatch({
                type: 'SET_TAX',
                item:{
                    cityState: cityState,
                    taxRate: 0.07
                }
            })
        }
        else{
        dispatch({
            type: 'SET_TAX',
            item:{
                cityState: cityState,
                taxRate: (taxRate/100)
            }
        })
    }
    }

    return(
        <div className='taxmodule'>
            <div>
                RI Tax 
                <input 
                    type="checkbox" 
                    checked={cityState === 'RI'} 
                    size="small"
                    onChange={superUser && !job.isFinalized ? e => {props.adjustTaxRate({taxRate:0.07, state:'RI'}); setCityState('RI');} : null}
                ></input>

            </div>
            <div>
                MA Tax 
                <input 
                    type="checkbox" 
                    checked={cityState === 'MA'} 
                    size="small"
                    onChange={superUser && !job.isFinalized ? e => {props.adjustTaxRate({taxRate:0.06, state:'MA'}); setCityState('MA'); } : null}
                ></input>

            </div>
            <div>
               Other 
                <input 
                    type="checkbox" 
                    checked={cityState !== 'RI' && cityState !== 'MA'} 
                    size="small"
                    onChange={superUser && !job.isFinalized ? e => {setCityState(''); props.adjustTaxRate(({taxRate:(taxRate/100), state: cityState})); } : null}
                ></input>

            </div> 
            {
                cityState !== 'RI' && cityState !== 'MA' ?
                <div
                    style={{
                        display: 'flex',
                        flexDirection:'column',
                        marginLeft: '-35px',
                        width: '80px'
                    }}
                >
                    <input 
                        type="text"
                        placeholder="city/state"
                        value={cityState}
                        onChange={superUser && !job.isFinalized ? e => {setCityState(e.target.value)} : null}
                        // onBlur={superUser && !job.isFinalized ? e => {props.adjustTaxRate(({taxRate:(taxRate/100), state: cityState}))} : null }
                        style={{
                            width: '100px'
                            // marginLeft:'-30px'
                        }}
                    />
                    <input 
                        type="text"
                        placeholder="rate/percentage"
                        value={taxRateLabel}
                        onClick={superUser && !job.isFinalized ? e => {setTaxRateLabel(taxRate)} : null}
                        onChange={superUser && !job.isFinalized ? e => {setTaxRateLabel(e.target.value); setTaxRate(e.target.value)} : null}
                        onBlur={superUser && !job.isFinalized ? e => {setTaxRateLabel(`${taxRate}%`); props.adjustTaxRate(({taxRate:(taxRate/100), state: cityState}))} : null}
                        style={{
                            width: '100px',
                            marginTop:'1px'
                        }}
                    />
                    {/* 
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
                    */}
                </div>
                :
                null
            }
        </div>
    )
}

export default TaxModule