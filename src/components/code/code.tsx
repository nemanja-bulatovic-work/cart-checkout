import React, {useState, useContext} from 'react'
import {CartComponentContext} from '../../contexts/CartComponentContext'
import './Code.scss'

interface IProps {
    title: string;
    button: string;
    placeholder: string;
}

const Code:React.FC<IProps> = ({button, title, placeholder}) => {

    const productContext:any = useContext(CartComponentContext)
    const {disabledCode, cartState, dispatch} = productContext

    const [on, setOn] = useState<boolean>(false)
    const [height, setHeight] = useState<string>("0px")
    const [emptyInput, setInput] = useState("")
    const [componentState, updateComponentState] = useState(true)
    
    const toggleOnClick = () => {
        setHeight(on ? `0px` : "220px")
        setOn(!on)
        dispatch({type: "COMPONENT", payload: {disabledCode: !disabledCode}})
        updateComponentState(!componentState)
    }

    return (
        <div style={{opacity: disabledCode && componentState ? .3 : 1, pointerEvents: disabledCode && componentState || cartState ? "none" : "auto"}} className="code">
            <div className="code__visible" onClick={toggleOnClick}>
                <p>{title}</p>
                <i className={on ? "fas fa-angle-down clicked" : "fas fa-angle-down"}></i>
            </div>
            <form style={{maxHeight: `${height}`}} action="#" className="code__visible-form" >
                <input onChange={(e) => setInput(e.target.value)} placeholder={placeholder} type="text"/>
                <input disabled={emptyInput ? false : true} style={{opacity: emptyInput ? 1 : .3}} type="submit" value={button} />
            </form>
        </div>
    )
}

export default Code
