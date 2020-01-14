import React, { createContext, useState, useEffect, useReducer } from 'react';
import { ValueReducer } from '../reducers/ValueReducer';
import { fetchProducts } from '../service/Service';
import IProduct from '../interfaces/Interfaces';

export const ProductContext = createContext({});

export const ProductContextProvider = (props: any) => {
  let itemsValue = 0;
  const checkValue = 10;
  const [cartCheckValue, dispatch] = useReducer(ValueReducer, checkValue);
  const [products, updateProducts] = useState([]);

  useEffect(() => {
    fetchProducts('https://private-1c29a1-products156.apiary-mock.com/products')
      .then((data: any) => {
        return data.products;
      })
      .then((items: any) => {
        updateProducts(items);
      });
  }, []);

  const changeProducts = (
    e: React.ChangeEvent<HTMLInputElement>,
    productValue: IProduct
  ) => {
    const newProduct = {
      ...productValue,
      [e.target.name]: e.target.value,
    };
    const newProducts: any = products.map((product: IProduct) =>
      product.id === newProduct.id ? newProduct : product
    );
    updateProducts(newProducts);
  };

  const deleteProduct = (productId: number) => {
    const newProducts = products.filter(
      (product: IProduct) => product.id !== productId
    );
    updateProducts(newProducts);
  };

  {
    products.map((product: any) => {
      itemsValue += product.quantity * product.price;
    });
  }

  const value = itemsValue + cartCheckValue;
  const shipValue = 550 - itemsValue;

  const values = {
    itemsValue,
    shipValue,
    cartCheckValue,
    value,
    checkValue,
    taxValue: { gst: 3.01, pst: 1.99 },
  };

  return (
    <ProductContext.Provider
      value={{ products, values, dispatch, changeProducts, deleteProduct }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
