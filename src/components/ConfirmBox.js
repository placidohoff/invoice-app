import React from 'react'

function ConfirmBox(props){
    return(
        <div
            className="confirmBox"
            style={{
                border: '1px solid black',
                // display: 'flex',
                // flexDirection: 'row',
                position: 'absolute',
                left: '100px'
                // display: 'hidden'
            }}
        >
            <button>Yes</button>
            <button>No</button>
        </div>
    )
}

export default ConfirmBox;