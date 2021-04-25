import React, { useState } from 'react'
import './Details_Mobile.css'
import Details from './Details'
import { useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider.js'
import JobItem from './JobItem.js'
import Scroller from './Scroller.js'
import LaborCharge from './LaborCharge.js'
import OtherCharge from './OtherCharge.js'


function Details_Mobile(props){
    const [{user, job,}, dispatch] = useStateValue();
    
    const history = useHistory();
    const [display, setDisplay] = useState('none')

    const classes = 'detailsMobile__materials detailsHide'
    let materialsCSS = 'detailsMobile__materials detailsHide detailsList'
    let laborCSS = 'detailsMobile__labor detailsHide detailsList'
    let otherCSS = 'detailsMobile__other detailsHide detailsList'
    const hidden = 'detailsHide'
    const visible = 'detailsVisible'

    let listMaterials
    let listLabor
    let listOther

    const itemsOtherCharges = useState(props.otherCharges)
    const itemsLabor = useState(props.labor)
    const itemsMaterials = useState(props.materials)

    const [materialsTotal, setMaterialsTotal] = useState(props.totalMaterials)
    const [laborTotal, setLaborTotal] = useState(props.totalLabor)
    const [otherTotal, setOtherTotal] = useState(props.totalOther)

    const saveMaterial = (obj) => {
        itemsMaterials[obj.index] = obj.data
        //console.log(obj.data)
        dispatch({
            type: 'SAVE_MATERIALS',
            item: {
              materials: itemsMaterials
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

    const findTotals = (type) => {
        let totals = []
        if(type === 'materials'){
            for(let i = 0; i < itemsMaterials.length; i++){
                totals.push(itemsMaterials[i].amount)
            }
        }
        else if(type === 'labor'){
            for(let i = 0; i < itemsLabor.length; i++){
                totals.push(itemsLabor[i].amount)
            }
        }
        else if(type === 'other'){
            for(let i = 0; i < itemsOtherCharges.length; i++){
                totals.push(itemsOtherCharges[i].price)
            }
        }
        
        return totals;
    }

    const [arrTotalsMaterials, setArrTotalsMaterials] = useState(findTotals('materials'))
    const [arrTotalsLabor, setArrTotalsLabor] = useState(findTotals('labor'))
    const [arrTotalsOther, setArrTotalsOther] = useState(findTotals('other'))

    const calculateTotal = (obj) => {
        if(obj.type == 'material'){
            arrTotalsMaterials[obj.index] = obj.amount
            let total = 0;
            for(let i = 0; i < arrTotalsMaterials.length; i++){
                console.log(arrTotalsMaterials[i])
                total += Number(arrTotalsMaterials[i])
            }
            setMaterialsTotal(total)

            itemsMaterials[0][obj.index] = obj.material
            console.log(itemsMaterials)
            props.save({type: 'materials', materials: itemsMaterials})

        }    
        else if(obj.type == 'labor'){
            console.log(arrTotalsLabor)
            arrTotalsLabor[obj.index] = obj.amount
            let total = 0;
            for(let i = 0; i < arrTotalsLabor.length; i++){
                if(arrTotalsLabor[i] !== undefined)
                    total += Number(arrTotalsLabor[i])
            }
            console.log('Labor Total:', total, ' ', arrTotalsLabor)
            setLaborTotal(total)

            itemsLabor[0][obj.index] = obj.labor
            props.save({type: 'labor', labor: itemsLabor})

        }    
        else if(obj.type == 'other'){
            arrTotalsOther[obj.index] = obj.price
            let total = 0;
            for(let i = 0; i < arrTotalsOther.length; i++){
                // if(arrTotalsOther[i] !== undefined)
                    total += Number(arrTotalsOther[i])
            }
            setOtherTotal(total)

            itemsOtherCharges[0][obj.index] = obj.otherCharge
            props.save({type: 'other', otherCharges: itemsOtherCharges})
        }    
        
    }

    const saveItem = (obj) => {
        if(obj.type == 'materials'){
            itemsMaterials[obj.index] = obj.material
            props.save({type: 'materials', materials: itemsMaterials})
        }
        else if(obj.type == 'labor'){
            itemsLabor[obj.index] = obj.labor
            props.save({type: 'labor', laborCharges: itemsLabor })
        }
        else if(obj.type == 'other'){
            itemsOtherCharges[obj.index] = obj.otherCharge
            props.save({type: 'other', otherCharges: itemsOtherCharges})

        }
                //console.log(items)
    }

    const open = (type) => {
        let displayItems;

        if(type == 'materials'){
            // history.push({
            //     pathname: '/mobileDetails',
            //     search: '?c=items',  // query string
            //     state: {  // location state
            //     c: 'items', 
            //     },
            // }); 

            // displayItems = document.getElementsByClassName("detailsMobile__materials");
            // displayItems.className = (materialsCSS + ' ' + hidden)

            materialsCSS = "detailsMobile__materials detailsVisible"
            // document.getElementsByClassName("detailsMobile__materials")[0].style.display="none"
            displayItems = document.getElementsByClassName("detailsMobile__materials")
            displayItems[0].className = materialsCSS

            //console.log(displayItems)

            

        }
        else if(type == 'labor'){
            materialsCSS = "detailsMobile__materials detailsHidden"
            listMaterials = document.getElementsByClassName('detailsMobile__materials')
            listMaterials[0].className = materialsCSS

            laborCSS = "detailsMobile__labor detailsVisible"
            listLabor = document.getElementsByClassName('detailsMobile__labor')
            listMaterials[0].className = laborCSS

            otherCSS = "detailsMobile__other detailsHidden"
            listOther = document.getElementsByClassName('detailsMobile__other')
            listOther[0].className = otherCSS 
            // history.push({
            //     pathname: '/mobileDetails',
            //     search: '?c=labor',  // query string
            //     state: {  // location state
            //     c: 'labor', 
            //     },
            // }); 
        }
        else if(type == 'other'){
            materialsCSS = "detailsMobile__materials detailsHidden"
            listMaterials = document.getElementsByClassName('detailsMobile__materials')
            listMaterials[0].className = materialsCSS

            laborCSS = "detailsMobile__labor detailsHidden"
            listLabor = document.getElementsByClassName('detailsMobile__labor')
            listMaterials[0].className = laborCSS

            otherCSS = "detailsMobile__other detailsVisible"
            listOther = document.getElementsByClassName('detailsMobile__other')
            listOther[0].className = otherCSS
            // history.push({
            //     pathname: '/mobileDetails',
            //     search: '?c=other',  // query string
            //     state: {  // location state
            //     c: 'other', 
            //     },
            // }); 
        }
    
    }
    return(
        <div>
            <div className="detailsMobile__details">
                <div style={{width: '400px'}} onClick={() => setDisplay('materials')}>Materials:<br/> ${materialsTotal.toFixed(2)} <br/><span style={{fontSize:'11px', fontWeight:'bold'}}>Click for details</span> </div>
                <div onClick={() => setDisplay('labor')}>Labor: <br /> ${laborTotal.toFixed(2)}<br/><span style={{fontSize:'11px', fontWeight:'bold'}}>Click for details</span></div>
                <div onClick={() => setDisplay('other')}>Other: <br /> ${otherTotal.toFixed(2)}<br/><span style={{fontSize:'11px', fontWeight:'bold'}}>Click for details</span> </div>
                {/* <div style={{width: '100px'}}>Tax: </div> 
                <div>Total: {Number(props.totalMaterials+props.totalLabor+props.totalOther).toFixed(2)} </div> */}
            </div>
            <br />
            <div style={{height:'100px', border:'1px solid black'}}>
            <Scroller>
                {
                    display == 'none' 
                    ?
                    <div></div>
                    :
                    <div></div>

                }
                {
                    display == 'materials'
                    ?
                    <div style={{marginLeft: '550px'}}>
                    <p>Materials</p>
                    {
                        itemsMaterials[0].map((item, index) => (
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
                    </div>
                    :
                    <div></div>
                }
                {
                    display == 'labor'
                    ?
                    <div style={{marginLeft: '550px'}}>
                    <p>Labor</p>
                    {
                        itemsLabor[0].map((item, index) => (
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
                            
                            
                            )
                        )
                    
                    } 
                    </div>
                    :
                    <div></div>
                }
                {
                    display == 'other'
                    ?
                    <div style={{marginLeft: '550px'}}>
                    <p>Other</p>
                    {
                        itemsOtherCharges[0].map((item, index) => (
                            <OtherCharge
                                description={item.description}
                                price={item.price}
                                key={index}
                                calculate={calculateTotal}
                                index={index}
                                saveItem={saveItem}
                            />
                            
                            
                            )
                        )
                    
                    } 
                    </div>
                    :
                    <div></div>
                }
                {/*
                <div className={materialsCSS}>
                    <div style={{marginLeft: '550px'}}>
                    <p>Materials</p>
                    {
                        job.materials.map((item, index) => (
                            <JobItem 
                                qty = {item.qty}
                                material = {item.material}
                                price = {item.price}
                                amount = {item.amount}
                                calculateTotal = {props.calculate}
                                key={index}
                                index={index}
                                saveItem={props.save}
                            />
                            
                            
                            )
                        )
                    
                    } 
                    </div>
                </div>
                <div className={laborCSS}>
                    <div>
                    {
                        job.materials.map((item, index) => (
                            <JobItem 
                                qty = {item.qty}
                                material = {item.material}
                                price = {item.price}
                                amount = {item.amount}
                                calculateTotal = {props.calculate}
                                key={index}
                                index={index}
                                saveItem={props.save}
                            />
                            
                            
                            )
                        )
                    
                    } 
                    </div>
                </div>
                <div className={otherCSS}>
                    <div>
                    {
                        job.materials.map((item, index) => (
                            <JobItem 
                                qty = {item.qty}
                                material = {item.material}
                                price = {item.price}
                                amount = {item.amount}
                                calculateTotal = {props.calculate}
                                key={index}
                                index={index}
                                saveItem={props.save}
                            />
                            
                            
                            )
                        )
                    
                    } 
                    </div>
                </div>
            */}
            </Scroller>
            </div>
        </div>
    ) 
}

export default Details_Mobile;