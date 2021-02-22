import React, { useState, useEffect } from 'react'
import './OtherCharge.css'

function OtherCharge(props){
    const [description, setDescription] = useState(props.description);
    const [price, setPrice] = useState(props.price)

    useEffect(() => {
        props.saveItem({index: props.index, otherCharge:{description: description, price:price}})
    }, [description,price])

    return(
        <div className="othercharge">
            <textarea 
                type="text"   
                className="othercharge__description"
                value={description}
                onChange={e => {setDescription(e.target.value)}}
                rows="2"
            >
            </textarea>
            <input
                type="number"
                className="othercharge__price"
                value={price}
                onChange={e => {setPrice(e.target.value)}}
                onBlur={e => {setPrice(Number(price).toFixed(2)); props.calculate({price: price, index: props.index})
            }}
            />
        </div>
    )
}

export default OtherCharge;