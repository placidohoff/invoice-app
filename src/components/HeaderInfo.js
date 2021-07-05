import React from 'react'
import './HeaderInfo.css'

function HeaderInfo(props){
    return(
        <div>
            <form>
                <div className="headerinfo__inputContainer" style={{marginBottom: '10px'}}>
                    <div className="headerinfo__labelWrap">
                        <span style={{float: 'right'}}>Order Number:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px'}}>
                        <input type="text" value={props.orderNumber}  onChange={e => {props.changeVal({type:'orderNumber', value:e.target.value})}} />
                    </div>
                </div> 
                <br/>
                {/* <br/> */}
                <div className="headerinfo__inputContainer" style={{marginTop: '2px'}}>
                    <div className="headerinfo__labelWrap">
                        <span style={{float: 'right'}}>Order Date:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px'}}>
                        <input value={props.orderDate} onChange={e => {props.changeVal({type:'orderDate', value: e.target.value })}} type="text" />
                    </div>
                </div> 
                <br/>
                <div className="headerinfo__inputContainer">
                    <div className="headerinfo__labelWrap">
                        <span style={{float: 'right'}}>Address:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px'}}>
                        <input value={props.address} onChange={e => {props.changeVal({type:'address', value: e.target.value })}} type="text" />

                    </div>
                </div> 
                <br/>
                <div className="headerinfo__inputContainer">
                    <div className="headerinfo__labelWrap">
                        <span style={{float: 'right'}}>State:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px', width:'175px'}}>
                        <input type="text" value={props.state} onChange={e => {props.changeVal({type:'state', value: e.target.value })}} style={{width:'50px'}} />
                    </div>
                </div> 
                <br/>
                <div className="headerinfo__inputContainer">
                    <div className="headerinfo__labelWrap">
                        <span style={{float: 'right'}}>City:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px', width:'175px'}}>
                        <input value={props.city} onChange={e => {props.changeVal({type:'city', value: e.target.value })}} type="text" />
                    </div>
                </div> 
                <br/>
                <div className="headerinfo__inputContainer">
                    <div className="headerinfo__labelWrap">
                        <span style={{float: 'right'}}>Zip:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px', width:'175px'}}>
                        <input value={props.zip} onChange={e => {props.changeVal({type:'zip', value: e.target.value })}} type="text" />
                    </div>
                </div> 
                <br/>
                <div className="headerinfo__inputContainer">
                    <div className="headerinfo__labelWrap">
                        <span style={{float: 'right'}}>Job Name:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px', width:'175px'}}>
                        <input value={props.jobName} onChange={e => {props.changeVal({type:'jobName', value: e.target.value })}} type="text" />
                    </div>
                </div> 
                <br/>                
                <div className="headerinfo__inputContainer">
                    <div className="headerinfo__labelWrap">
                        <span style={{float: 'right'}}>Phone:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px', width:'175px'}}>
                        <input value={props.phone} onChange={e => {props.changeVal({type:'phone', value: e.target.value })}} type="text" />
                    </div>
                </div> 
                <br/>                
                <div className="headerinfo__inputContainer">
                    <div className="headerinfo__labelWrap" style={{width:'110px'}}>
                        <span style={{ float:'right',fontSize:'15px'}}>Order Taken By:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px', width:'175px'}}>
                        <input value={props.orderTakenBy} onChange={e => {props.changeVal({type:'orderTakenBy', value: e.target.value })}} type="text" />
                    </div>
                </div> 
                <br/>                              
                <div className="headerinfo__inputContainer">
                    <div className="headerinfo__labelWrap" style={{width:'110px'}}>
                        <span style={{ float:'right'}}>Starting Date:</span>
                    </div>
                    <div style={{float: 'right', marginTop: '-23px', width:'175px'}}>
                        <input value={props.startDate} onChange={e => {props.changeVal({type:'startDate', value: e.target.value })}} type="text" />
                    </div>
                </div> 
                <br/>                              
                
                <div
                    style={{
                        marginBottom: '-15px',
                        marginTop: '5px',
                        marginLeft: '20px'
                    }}
                >
                    <input 
                        type="checkbox" 
                        checked={props.type === 'daywork'} 
                        size="small"
                        //onChange={e => {setType('daywork')}}
                        onChange={e => {props.changeVal({type:'type', value: 'daywork' })}}
                    >
                    </input>
                    <span style={{marginRight:'10px'}}>Daywork</span>
                    <input 
                        type="checkbox" 
                        checked={props.type === 'contract'} 
                        size="small"
                        // onChange={e => {setType('contract')}}
                        onChange={e => {props.changeVal({type:'type', value: 'contract' })}}
                    >
                    </input>
                    <span style={{marginRight:'10px'}}>Contract</span>
                    <input 
                        type="checkbox" 
                        checked={props.type === 'extra'} 
                        size="small"
                        // onChange={e => {setType('extra')}}
                        onChange={e => {props.changeVal({type:'type', value: 'extra' })}}
                    >
                    </input>
                    <span>Extra</span>
                </div>
                
            </form>
        </div>
    )
}

export default HeaderInfo