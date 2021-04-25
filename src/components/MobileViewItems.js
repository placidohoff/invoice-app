import React from 'react'
import { useLocation } from 'react-router-dom';
import { useStateValue } from './StateProvider.js'
import JobItem from './JobItem.js'


function MobileViewItems(){
    const [{user, job,}, dispatch] = useStateValue();

    const location = useLocation();

    const testFunction = location.state.fun;

    // const saveItem = (obj) => {
    //     items[obj.index] = obj.material
    //     props.save({type: 'materials', materials: items})
    //     //console.log(items)
    // }

    // const calculateTotal = (obj) => {
        
    //     totals[obj.index] = obj.amount;
    //     let total = 0;
    //     for(let i = 0; i < totals.length; i++){
    //         total += Number(totals[i])
    //         console.log(total)
    //     }
    //     setTotal(total)
    //     console.log(user)
        
    // }



    const compMaterials = 
    <div>
        {/* {
                job.materials.map((item, index) => (
                    <JobItem 
                        qty = {item.qty}
                        material = {item.material}
                        price = {item.price}
                        amount = {item.amount}
                        //calculateTotal = {calculateTotal}
                        key={index}
                        index={index}
                        //saveItem={saveItem}
                    />
                    
                    
                )
                )
                
            } */}
    </div>

    const compOther = <div>Other</div>

    const compLabor = <div>Labor</div>
    return(
        
        <div className="mobileViewItems">
            {
                location.state.c === 'items' ?
                 compMaterials : null
            }
            {
                location.state.c === 'other' ?
                 compOther : null
            }
            {
                location.state.c === 'labor' ?
                 compLabor : null
            }
            {/* Mobile View Items {location.search} */}
        </div>
    )
}

export default MobileViewItems