import { useState, useEffect } from 'react';
import './Details.css'
import JobItem from './JobItem.js'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'


function Details(props){
    // const [items, setItems] = useState([
    //     {
    //         qty: 1,
    //         material: '',
    //         price: 0,
    //         amount: 0
    //     }]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    //     )

    useEffect(() => {
        if(user === '' ){
            history.push('/login')
        }
    }, [])



        const [{user, jobName, job, username}, dispatch] = useStateValue();
        const [items, setItems] = useState(job.materials)
        const [total, setTotal] = useState(job.totalMaterials)
        const [totals, setTotals] = useState([items[0].amount])
        

        const history = useHistory();

        const saveMaterial = (obj) => {
            items[obj.index] = obj.data
            //console.log(obj.data)
            dispatch({
                type: 'SAVE_MATERIALS',
                item: {
                  materials: items
                }
              })
            // props.save({
            //     type: 'materials',
            //     item: {
            //         data: obj.data
            //     }
            // })
            // //console.log(items)
        }

        function makeNew(){
            setItems([...items, {
                qty: 1,
                material: '',
                price: 0,
                amount: 0
            }])
        }

        const saveItem = (obj) => {
            items[obj.index] = obj.material
            props.save({type: 'materials', materials: items})
            //console.log(items)
        }

        const calculateTotal = (obj) => {
            //alert(amount)
            //setTotal(Number(total) + Number(amount))
            // console.log(`Total: ${total}`)
            // console.log(`Amount: ${amount}`)
            // console.log(Number(amount) + Number(total))
            // for(let i = 0; i < items.length; i++){
            //     setTotal(0 + Number(items.amount))
            //     console.log(items)
            // }
            //items[0].amount = amount;
            //setTotal(Number(amount))
            //setTotal(obj.amount)
            totals[obj.index] = obj.amount;
            let total = 0;
            for(let i = 0; i < totals.length; i++){
                total += Number(totals[i])
                console.log(total)
            }
            setTotal(total)
            console.log(user)
            // setTotal(total)
            // items.forEach(item => {
            //     setTotal(total + item.amount)
            // })
        }

        useEffect(() => {
            console.log(username, jobName)
            
        }, [])

    return(
        <div className="details">
            <br /><br />
            <div className="details__headers">
                <div className="details__header details__qty">
                    QTY.
                </div>
                <div className="details__header details__material">
                    MATERIAL
                </div>
                <div className="details__header details__price">
                    PRICE
                </div>
                <div className="details__header details__amount">
                    AMOUNT
                </div>
            </div>

            {
                items.map((item, index) => (
                    <JobItem 
                        qty = {item.qty}
                        material = {item.material}
                        price = {item.price}
                        amount = {item.amount}
                        calculateTotal = {calculateTotal}
                        key={index}
                        index={index}
                        saveItem={saveItem}
                    />
                    
                    
                )
                )
                
            }
            

            <button onClick={makeNew}>Add New</button>
            <br /><br />
            <div className="details__bottom">
            <input 
                type="text"
                placeholder="Date Completed"
                className="details__dateCompleted"
            />
            <div className="details__totalMaterialsLabel">Total Materials:</div>
            <input 
                type="text"
                className="details__totalMaterialsBox"
                value={Number((total)).toFixed(2)}
                onChange={
                    props.calculate({category:'materials', value:total}),
                    //saveMaterial()
                    // props.save(items)
                    // console.log('yoooooo')
                    props.save({type:"materials", materials:items})
                }
            />
            </div>
        </div>
    )
}

export default Details;