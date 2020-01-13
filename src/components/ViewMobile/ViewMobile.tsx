import React, {useContext} from 'react';
import {CartComponentContext} from '../../contexts/CartComponentContext';
import {ProductContext} from '../../contexts/ProductContext';
import IProduct from '../../interfaces/Interfaces';
import './ViewMobile.scss';

interface IProps {
    product: IProduct;
    review: boolean;
    productState: boolean;
    updateProductState: any;
}

const ViewMobile: React.FC<IProps> = ({product, review, productState, updateProductState}: IProps): any => {

    const cartContext: any = useContext(CartComponentContext);
    const productContext: any = useContext(ProductContext);
    const {deleteProduct} = productContext;
    const {dispatch} = cartContext;
    const handleState = (): any => {
        dispatch({type: 'COMPONENT', payload: {cartState: true}});
        updateProductState((false));
    };

    return (
        <div className={`${review ? `review__` : ``}name__viewMobile`}>
            <div className={productState ? `${review ? `review__` : ``}name__mobile-data-mob` : `${review ? `review__` : ``}name__viewMobile`} >
                <p className={`${review ? `review` : `name`}__mobile-data-text`}>{product.color} - Size {product.size} - Quantity {product.quantity}</p>
            </div>
            <div className={productState ? `${review ? `review__` : ``}name__mobile-nav` : `${review ? `review__` : ``}name__mobile-nav-mob`}>
                <button onClick={handleState} className="name__mobile-nav-edit">Edit</button>
                <button onClick={(): any => deleteProduct(product.id)} className="name__mobile-nav-remove">Remove</button>
            </div>
        </div>
    );
};

export default ViewMobile;
