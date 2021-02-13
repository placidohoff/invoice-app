import React, { useState, useEffect } from 'react'
import './OtherCharges.css'
import OtherCharge from './OtherCharge.js'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'

function OtherCharges(props){
    //console.log(props)
    const [{user, jobName, job}, dispatch] = useStateValue();
    const [items, setItems] = useState(job.otherCharges)
    const [total, setTotal] = useState(job.totalOther)
    const [totals, setTotals] = useState([items[0].price])
    const [label, setLabel] = useState("Total Other:")
        
    const history = useHistory();

    const makeNew = (e) => {
        setItems([...items, {description:'', price:0}])
    }

    const calculateTotal = (obj) => {
        console.log(obj)
        // setTotal(obj.price)
        totals[obj.index] = obj.price;
        let total = 0;
        for(let i = 0; i < totals.length; i++){
            total += Number(totals[i])
        }
        setTotal(total)
        console.log(`TOTALS:${totals} `)

    }

    const saveItem = (obj) => {
        items[obj.index] = obj.otherCharge
        props.save({type: 'other', otherCharges: items})
        //console.log(items)
    }


    return(
        <div className="othercharges">
            <div className="othercharges__header">Other Charges</div>
            {
                items.map((item, index) => (
                    <OtherCharge
                        description={item.description}
                        price={item.price}
                        key={index}
                        calculate={calculateTotal}
                        index={index}
                        saveItem={saveItem}
                    />
                ))
            }
            <button
                onClick={makeNew}
            >
                Add New
            </button>
            <br/><br/>
            <input 
                type="text"
                className="othercharges__totalLabel"
                value={"Total Other:"}
    
            />
            <input 
                type="number"
                className="othercharges__total"
                value={Number(total).toFixed(2)}
                onChange={props.calculate({category:'other', value:total})}

            />
        </div>
    )
}

export default OtherCharges;