import { useState, useEffect } from 'react'
import './JobItem.css'

function JobItem(props){

    const [qty, setQty] = useState(props.qty);
    const [material, setMaterial] = useState(props.material);
    const [price, setPrice] = useState(props.price)
    const [amount, setAmount] = useState(props.amount)

    useEffect(() => {
        setAmount((price*qty).toFixed(2))
        props.calculateTotal({amount:amount, index: props.index})
        //setPrice((price).toFixed(2))
        //Within this function perhaps I can dispatch to lessen the state changes loop
        props.saveItem({index: props.index, material:{qty: qty, material:material, price: price, amount:amount}})
        
    }, [price, qty, amount])

    

    return(
        <div className="jobitem">
            
            <input 
                type="number"   
                className="jobitem__qty"
                value={qty}
                onChange={e => {setQty(e.target.value); setAmount((price*qty).toFixed(2));
                    props.calculateTotal({amount:amount, index: props.index})
                
                }}
                onBlur={e => {setPrice(Number(e.target.value).toFixed(2)); setAmount((price*qty).toFixed(2));
                    props.calculateTotal({amount:amount, index: props.index})}}

                   
            />
            <input 
                type="text"   
                className="jobitem__material"
                value={material}
                onChange={e => {setMaterial(e.target.value)}}
            />
            <input 
                type="number"   
                className="jobitem__price"
                value={price}
                onChange={e => {setPrice(e.target.value); setAmount(price*qty)}}
                onBlur={e => {setPrice(Number(e.target.value).toFixed(2)); setAmount((price*qty).toFixed(2));
                    props.calculateTotal({amount:amount, index: props.index})
            }}
            />
            <input 
                type="number"   
                className="jobitem__amount"
                value={amount}
                // onChange={props.saveMaterial({
                //     index: props.index,
                //     data: {
                //         qty: qty,
                //         material: material,
                //         price: price,
                //         amount: amount
                //     }
                // })}
                // onChange={props.save()}
            />
            
        </div>
    )
}

export default JobItem;