import React, { useState, useEffect } from 'react'
import './OtherCharges.css'
import OtherCharge from './OtherCharge.js'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'

function OtherCharges(props){
    //console.log(props)
    const [{user, jobName, job}, dispatch] = useStateValue();
    const [items, setItems] = useState(props.charges)
    const [total, setTotal] = useState(job.totalOther)
    
    const [label, setLabel] = useState("Total Other:")
    
    const history = useHistory();

    const findTotals = () => {
        let charges = [];
        for(let i = 0; i < items.length; i++){
            charges.push(items[i].price)
        }
        return charges;
    }

    const [totals, setTotals] = useState(findTotals)

    const makeNew = (e) => {
        setItems([...items, {description:'', price:0}])
    }

    const calculateTotal = (obj) => {
        // console.log(obj)
        // setTotal(obj.price)
        totals[obj.index] = Number(obj.price);
        let total = 0;
        for(let i = 0; i < totals.length; i++){
            total += Number(totals[i])
        }
        setTotal(total)
        // console.log(`TOTALS:${totals} `)
        // props.save({type: 'other', otherCharge: obj.otherCharge})

    }

    const saveItem = (obj) => {
        items[obj.index] = obj.otherCharge
        props.save({type: 'other', otherCharges: items})
        //console.log(items)
    }

    useEffect(() => {
        let tot = 0
        for(let i = 0; i < items.length; i++){
            // if(items)
            tot += Number(items[i].price)
            console.log(items[i].price)
        }
        setTotal(Number(tot).toFixed(2))
        props.calculate({category:'other', value:total})

        console.log(`TOTAL ${total}`)

    },[])


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
            {/* <button
                onClick={makeNew}
            >
                Add New
            </button> */}
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
                onChange={
                    props.calculate({category:'other', value:total}),
                    props.save({type: 'other', otherCharges: items})
                }

            />
        </div>
    )
}

export default OtherCharges;