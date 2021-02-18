import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import App from '../App.js'
import Login from './Login.js'
import Header from "./Header.js";

export default function PrinterWrapper({ children }) {
    const linkToPrint = () => {
        return (
          
            <button>Click To PrintOF Body</button>
    
        )
    }
    const componentRef = useRef();
    return (
        <>
            <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
            <div ref={componentRef}>
                {children}
            </div>
        </>
    );
}