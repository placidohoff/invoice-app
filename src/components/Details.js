import { useState, useEffect } from 'react';
import './Details.css'
import JobItem from './JobItem.js'
import { useStateValue } from './StateProvider.js'
import { useHistory } from 'react-router-dom'
import TaxModule from './TaxModule.js'


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
        const [items, setItems] = useState(props.materials)
        const [total, setTotal] = useState(job.totalMaterials)
        const [totals, setTotals] = useState([items[0].amount])
        // const [tax, setTax] = useState(job.taxRate)
        const [taxRate, setTaxRate] = useState(0.07)
        const [totalTax, setTotalTax] = useState(total * taxRate)
        const [cityState, setCityState] = useState(job.cityState)

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
            
            totals[obj.index] = obj.amount;
            let total = 0;
            for(let i = 0; i < totals.length; i++){
                total += Number(totals[i])
                // console.log(total)
            }
            //total += (total*taxRate)
            setTotal(total)
            setTotalTax(total*taxRate)
            
            // console.log(user)
            
        }

        const adjustTaxRate = (obj) => {
            //  setTaxRate(obj.taxRate)
            //alert(obj.key)
            setTaxRate(obj.taxRate)
            setTotalTax(total*obj.taxRate)
            setCityState(obj.state)

            dispatch({
                type: 'SET_TAX',
                item:{
                    cityState: obj.state,
                    taxRate: obj.taxRate
                }
            })
            //props.calculate({category:'materials', materials:total, taxAmount:totalTax})
            //console.log(taxRate)
        }

        const changeState = (place) => {

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

            <TaxModule 
                adjustTaxRate={adjustTaxRate}
            />
            

            {/* <button onClick={makeNew}>Add New</button> */}
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
                value={Number((total + totalTax)).toFixed(2)}
                onChange={
                    props.calculate({category:'materials', materials:total, taxAmount:totalTax}),
                    
                    props.save({type:"materials", materials:items, cityState: cityState, taxRate: (taxRate * 100)})
                }
            />
            </div>
        </div>
    )
}

export default Details;