import React, { useState, useEffect } from 'react'
import './Labor.css'
import LaborCharge from './LaborCharge.js'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'

function Labor(props){
    const [{user, jobName, job}, dispatch] = useStateValue();
    const [items, setItems] = useState(job.labor)
    const [total, setTotal] = useState(job.totalLabor)
    
    const [label, setLabel] = useState("Total Labor:")
        
    const history = useHistory();

    const findTotals = () => {
        let amounts = [];
        for(let i = 0; i < items.length; i++){
            amounts.push(items[i].amount)
        }
        return amounts;
    }

    const [totals, setTotals] = useState(findTotals)


    const saveItem = (obj) => {
        items[obj.index] = obj.labor
        props.save({type: 'labor', labor: items})
        //console.log(items)
    }

    const makeNew = (e) => {
        setItems([
            ...items, 
            {
                name:'',
                hours: 0,
                rate: 0,
                amount: 0
                
            }])
    }

    const calculateTotal = (obj) => {
        console.log(obj)
        // setTotal(obj.price)
        // totals[obj.index] = obj.price;
        // let total = 0;
        // for(let i = 0; i < totals.length; i++){
        //     total += Number(totals[i])
        // }
        // setTotal(total)
        totals[obj.index] = obj.rate * obj.hours;
        console.log(totals)
        let total = 0;
        for(let i = 0; i < totals.length; i++){
            total += Number(totals[i])
        }
        setTotal(total)

    }

    useEffect(() => {
        let tot = 0
        for(let i = 0; i < items.length; i++){
            // if(items)
            tot += Number(items[i].amount)
            // console.log(items[i].amount)
        }
        setTotal(Number(tot).toFixed(2))
        props.calculate({category:'labor', value:total})

        // console.log(`TOTAL ${total}`)
    },[])



    return(
        <div className="labor">
            <div className="labor__headers">
                <div className="labor__header labor__name">
                    LABOR
                </div>
                <div className="labor__header labor__hrs">
                    HRS.
                </div>
                <div className="labor__header labor__rate">
                    RATE
                </div>
                <div className="labor__header labor__amount">
                    AMOUNT
                </div>
            </div>
            {
                items.map((item, index) => (
                    <LaborCharge
                        name={item.name}
                        hours={item.hours}
                        rate={item.rate}
                        amount={item.amount}
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
            <br/>
            <input 
                type="text"
                className="labor__totalLabel"
                value={"Total Labor:"}
    
            />
            <input 
                type="number"
                className="labor__total"
                value={Number(total).toFixed(2)}
                onChange={
                    props.calculate({category:'labor', value:total}),
                    props.save({type: 'labor', labor: items})
                }

            />
        </div>
    )
}

export default Labor;