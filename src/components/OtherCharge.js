import React, { useState, useEffect } from 'react'
import './OtherCharge.css'

function OtherCharge(props){
    const [description, setDescription] = useState(props.description);
    const [price, setPrice] = useState(props.price)

    useEffect(() => {
        props.saveItem({index: props.index, otherCharge:{description: description, price:price}, type:'other'})
    }, [description,price])

    // useEffect(() => {
    //     description === '' ? setPrice('') : setPrice(price)
    // },[price])

    useEffect(() => {
        if(description == ''){
            setPrice('')
        }
    },[])

    return(
        <div className="othercharge">
            <input 
                type="text"   
                className="othercharge__description"
                value={description}
                onChange={e => {setDescription(e.target.value)}}
                // rows="2"
            />

            <input
                type="number"
                className="othercharge__price"
                value={price}
                onChange={e => {
                    setPrice(e.target.value);
                    props.calculate({
                        price: price, index: props.index, 
                        otherCharge:{description: description, price:price},
                        type:'other'})}}
                onBlur={e => {setPrice(Number(price).toFixed(2)); props.calculate({price: price, index: props.index, otherCharge:{description: description, price:price}, type:'other'})
            }}
            />
        </div>
    )
}

export default OtherCharge;