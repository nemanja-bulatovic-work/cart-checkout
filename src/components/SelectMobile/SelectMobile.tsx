import React, {useContext} from 'react'
import SelectColor from '../SelectColor/SelectColor'
import SelectSize from '../SelectSize/SelectSize'
import SelectQuantity from '../SelectQuantity/SelectQuantity'
import {CartComponentContext} from '../../contexts/CartComponentContext'
import './SelectMobile.scss'

interface IProps {
    product: {
        name: string,
        size: string,
        price: string,
        color: string,
        colorName: string, 
        quantity: string,
        id: number,
        colors: string[]
        sizes: string[],
        quantities: number[]
        image: string;
    };
    review: boolean,
    handleChange: any,
    handleChangeColor: any, 
}

const SelectMobile:React.FC<IProps> = ({ product, review, handleChange, handleChangeColor}) => {

    const productContext:any = useContext(CartComponentContext)
    const {dispatch} = productContext
    
    const handleButton = () => {
        dispatch({type: "COMPONENT", payload: {cartState: false}})
        dispatch({type: "COMPONENT", payload: {productState: true}})
    }

    return (
        <React.Fragment>
                <div className={`${review ? `review` : `product`}__section__left-bottom-select`}>
                    <div className={`${review ? `review` : `product`}__section__left-bottom-select-color`}>
                        <p>Color</p>
                        <SelectColor product={product} handleChangeColor={handleChangeColor}/>
                    </div>
                    <div className={`${review ? `review` : `product`}__section__left-bottom-select-size`}>
                        <p>Size</p>
                        <SelectSize product={product} handleChange={handleChange}/>
                    </div>
                    <div className={`${review ? `review` : `product`}__section__left-bottom-select-quantity`}>
                        <p>Quantity</p>
                        <SelectQuantity product={product} handleChange={handleChange}/>
                    </div>
                </div>
                <div className="product__section__left-bottom-button">
                    <button onClick={handleButton}>Update Bag</button>
                </div>
        </React.Fragment>
    )
}

export default SelectMobile
