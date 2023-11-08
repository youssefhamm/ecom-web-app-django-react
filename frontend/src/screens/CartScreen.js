import React , { useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Card, Button, Image, ListGroup } from 'react-bootstrap'
import  Message from '../components/Message'
import { addToCart } from '../actions/cartActions'


function Cart() {
   const productId = Number(useParams().id);
   console.log('productId', productId)
   const location = useLocation();
   const qty = location.search ? location.search.split("=")[1]: 1

   const dispatch = useDispatch()

   const cart = useSelector(state => state.cart)
   const {cartItems} = cart
 

   useEffect(() =>{
      if(productId){
        dispatch(addToCart(productId, qty));
      }
   }, [dispatch, productId, qty])
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        
      </Col>

      <Col md={4}></Col>
    </Row>
  );
}

export default Cart