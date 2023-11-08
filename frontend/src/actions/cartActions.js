import axios from 'axios'

import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) =>{

    const {data} = axios.get(`/api/products/${id}`)
  try {
    dispatch({ type: CART_ADD_ITEM,
               payload : {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                counInstock:data.counInstock,
                qty
               }
    
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data ? error.response.data : error.message,
    });
  }
};