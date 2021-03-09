import React from 'react'

function Signiture(){
    const signiture = {
        marginTop: '100px'
    }

    const spaceOrder = '                                                         '
    const spaceSig = '                                                                         '

    return(
        <div style={signiture}>
            <span
                style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginLeft: '20px'
                }}
            >
                Work ordered by
            </span>
            <span style={{
                // textDecoration: 'underline', 
                whiteSpace: 'pre', 
                // width: '200px'
                borderBottom: '1px solid black',
                minWidth: '200px'

                }}
            >
                    {spaceOrder}
            </span>
            <br />
            <div 
                style={{
                    marginTop: '15px'
                }}
            >
                <span
                    style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        marginLeft: '-10px'
                        // marginTop: '25px'
                    }}
                >
                    Signiture
                </span>
                <span
                    style={{
                        // textDecoration: 'underline', 
                        whiteSpace: 'pre', 
                        // width: '200px'
                        borderBottom: '1px solid black',
                        minWidth: '200px'
                    }}
                >
                    {spaceSig}
                </span>
            </div>
            <br />
            <div
                style={{
                    marginTop: '-20px',
                    marginLeft: '45px'
                }}
            >
            <span 
                style={{
                    fontSize: '9px'

                    
                }}
            >
                I hereby acknowledge the satisfactory completion of the above described work.
            </span>
            </div>
        </div>
    )
}

export default Signiture;


