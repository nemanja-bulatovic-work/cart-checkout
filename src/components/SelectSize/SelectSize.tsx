import React, {useContext} from 'react'
import {ProductContext} from '../../contexts/ProductContext'

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
}

const SelectSize:React.FC<IProps> = ({product}) => {

    const productContext:any = useContext(ProductContext)
    const {changeProducts} = productContext

    return (
        <div className="product__section__right-size-full">
            <select name="size" onChange={(e) => changeProducts(e, product)}>
                <option selected hidden>{product.size}</option>
                {product.sizes.map((size: string, index:number) => {
                    return(
                        <option key={index} value={size}>{size}</option>
                    )
                })}
            </select>
            <i className="fas fa-angle-down"></i>
        </div>
    )
}

export default SelectSize
