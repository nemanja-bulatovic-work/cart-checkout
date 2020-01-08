import React, {createContext, useState, useEffect, useReducer} from 'react'
import {ValueReducer} from '../reducers/ValueReducer'
import {fetchUsers} from '../service/Service'

export const ProductContext = createContext({})

export const ProductContextProvider = (props:any) => {

    let itemsValue = 0

    const checkValue = 10

    const [cartCheckValue, dispatch] = useReducer(ValueReducer, checkValue)

    let [products, updateProducts] = useState([]);

    useEffect( () => {
        fetchUsers('https://private-1c29a1-products156.apiary-mock.com/products')
        .then((data:any) => {
           return data.products
        }).then((products:any) => {
            updateProducts(products)
        })
    }, [])

    const changeProducts = (productId: number, productData: any ) => {
        const newProducts: any = products.map((product: any) => product.id === productId ? productData : product);
        updateProducts(newProducts);
    }

    const deleteProduct = (productId: number) => {
        const newProducts = products.filter((product: any) => product.id !== productId)
        updateProducts(newProducts);
    }

    {products.map( (product: any) => {
        itemsValue += product.quantity * product.price
    })}

    const value = itemsValue + cartCheckValue
 
    const shipValue = (550 - itemsValue)

    let values = {
        itemsValue,
        shipValue,
        cartCheckValue,
        value,
        checkValue,
        taxValue: {gst:  3.01, pst:  1.99}
    }

    return (
        <ProductContext.Provider value={{products, values, dispatch, changeProducts, deleteProduct}}>
            {props.children}
        </ProductContext.Provider>
    )
}