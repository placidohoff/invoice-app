import { useState, useEffect } from 'react'
import './JobItem.css'
import { useStateValue } from './StateProvider.js'


function JobItem(props){
    const [{superUser, job}] = useStateValue()
    const [qty, setQty] = useState(props.qty);
    const [material, setMaterial] = useState(props.material);
    const [price, setPrice] = useState(props.price)
    const [amount, setAmount] = useState(props.amount)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        material === '' ? setAmount('') 
        :
        setAmount((price*qty).toFixed(2))
        
        props.calculateTotal({amount:amount, index: props.index, type: 'material', material:{qty: qty, material:material, price: price, amount:amount}})
        //setPrice((price).toFixed(2))
        //Within this function perhaps I can dispatch to lessen the state changes loop
        props.saveItem({index: props.index, material:{qty: qty, material:material, price: price, amount:amount}, type:'material'})
        
    }, [price, qty, amount])

    useEffect(() => {
        if(material === ''){
            setIsActive(false)
            setQty('')
            setPrice('')
            setAmount('')
        }else{
            setIsActive(true)
        }
    }, [material])

    

    return(
        <div className="jobitem">
            
            <input 
                type="number"   
                className="jobitem__qty"
                value={qty}
                // onClick={console.log('JOB: ', superUser)}
                onChange={superUser && !job.isFinalized ? e => {
                    setQty(e.target.value); 
                    qty === 0 || price === 0 ? setAmount('') : setAmount((price*qty).toFixed(2));
                    props.calculateTotal({amount:amount, index: props.index, type:'material', material:{qty: qty, material:material, price: price, amount:amount}})
                
                } : null}
                onBlur={superUser && !job.isFinalized ? e => {setAmount((price*qty).toFixed(2));
                    props.calculateTotal({amount:amount, index: props.index, type:'material', material:{qty: qty, material:material, price: price, amount:amount}})}: null}

                   
            />
            <input 
                type="text"   
                className="jobitem__material"
                value={material}
                onChange={superUser && !job.isFinalized ? e => {setMaterial(e.target.value)} : null}
            />
            <input 
                type="number"   
                className="jobitem__price"
                value={price}
                onChange={superUser && !job.isFinalized ? 
                    e => {
                    setPrice(e.target.value); 
                    qty === 0 || price === 0 ? setAmount('') : setAmount((price*qty).toFixed(2));

                    amount === '' ? setAmount('') : setAmount((price*qty).toFixed(2));}
                :
                null
                }
                onBlur={superUser && !job.isFinalized ?
                    e => {
                    setPrice(Number(e.target.value).toFixed(2)); 
                    material === '' ? setAmount('') : setAmount((price*qty).toFixed(2));
                    material === '' ? setAmount('') :  props.calculateTotal({amount:amount, index: props.index, type:'material', material:{qty: qty, material:material, price: price, amount:amount}})
            }
            :
            null
            }
            />

            <input 
                type="number"   
                className="jobitem__amount"
                value={amount}
            />
            {/* <br /> */}
        </div>
    )
}

export default JobItem;