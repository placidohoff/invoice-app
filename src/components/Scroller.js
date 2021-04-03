import React from 'react'

const Scroller = (props) => {
    return(
        <div style={{overflowY: 'scroll', border: '1px solid black', marginTop:'20px'}}>
            {props.children}
        </div>
    ) 
}

export default Scroller;