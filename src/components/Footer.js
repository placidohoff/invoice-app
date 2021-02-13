import './Footer.css'

function Footer(props){
    // console.log(props)
    return(
        <div className="footer">
            <input 
                type="text"
                className="footer__materialsLabel"
                value={"Total Materials"}
            />
            <input 
                type="number"
                className="footer__materialsTotal"
                value={Number(props.totalMaterials).toFixed(2)}
            />
            <br/>
            <input 
                type="text"
                className="footer__otherLabel"
                value={"Total Other"}
            />
            <input 
                type="number"
                className="footer__otherTotal"
                value={Number(props.totalOther).toFixed(2)}
            />
            <br />
            <div className="footer__bottom">
                <input 
                    type="text"
                    className="footer__thankyou"
                    value="Thankyou"
                />
                <div>
                <input 
                    type="text"
                    className="footer__blank"
                    value={""}
                />
                <br />
                <input 
                    type="text"
                    className="footer__taxLabel"
                    value={"Tax:"}
                />
                <input 
                
                />
                <br/>
                <input 
                    type="text"
                    className="footer__totalLabel"
                    value={"TOTAL:"}
                />
                <input 
                    type="number"
                    className="footer__total"
                    value={Number(props.total).toFixed(2)}
                />
            </div>
            </div>
        </div>
    )
}

export default Footer;