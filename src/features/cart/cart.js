import React, { useEffect, useState } from 'react'
import loard from '../../assets/loder2.gif'
import { Link } from 'react-router-dom'
import { FaTrash,FaOpencart } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from '../navbar/nav'
import {
  getAllProductData,
  selectProduct,
} from '../counter/counterSlice'
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {

  const productSate = useSelector(selectProduct)
  const productDispatch = useDispatch();

  useEffect(() => {
    productDispatch(getAllProductData())
  },[])

  const navigate = useNavigate()
  const productData = JSON.parse(localStorage.getItem('productAllData'))
  const count = JSON.parse(localStorage.getItem('count'))
  const price = (productData.price * count)
  const discount = 88
  const Delivery = 150

  const total_amount = (((price - discount) + Delivery).toFixed(2))
  console.log(price.toFixed(2), '--->price');
  console.log(total_amount, "===hello");



  const Editbutton = () => {
    navigate(`/product/${productData.id}`)
  }

  const add_product = () => {
    navigate(`/`)
    toast.info("🦄 Add New Product In Cart !", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  }

  const place_order = () => {
    toast.success("Success Order !", {
      position: toast.POSITION.TOP_RIGHT
    });
  }


  const Remove_btn = () => {
    localStorage.removeItem('productAllData')
  }
  // console.log(product,'-----> stat');
  return (
    <>
    <Nav/>
      {
        productData == undefined ?
          <img src={loard} /> :
          <div className='cart-background'>
            <div className="container">
              <div className="row">
                <div className="col-8 right-side">
                  <div className="row">
                    <div className='col'>
                      <h2 className='my-cart-text'>My Cart Page</h2>
                    </div>
                  </div>
                  <div className='product-pos'>
                    <div className="row">
                      <div className="col-3">
                        <img src={productData.image} className='cart-product-img' />
                      </div>
                      <div className="col-8">
                        <h4 className='cart-product-title'>{productData.title}</h4>
                        <p className='cart-desc'>{productData.description}</p>
                        <h3 className='cart-product-price'>${productData.price}</h3>
                        <div className='cart-btn'>
                          <button className='cart-edit-btn' onClick={Editbutton}>Edit</button>
                          <button className='cart-remove-btn' onClick={Remove_btn}>Remove <FaTrash /></button>
                        </div>
                        <div><button className='cart-add-product-btn' onClick={add_product}>+ add Product</button></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* .....right-side... */}

                <div className="col-4">
                  <div className="row">
                    <div className="col">
                      <div>
                        <p className='cart-right-side-step'><span className='cart'>Cart</span> ---------- Delivery ---------- Payment</p>
                      </div>
                    </div>
                  </div>
                  <div className='amount-pos'>
                    <div className="row">
                      <div className="col-6">
                        <h3 className='price-deteils-text'>Price Deteils</h3>
                        <span className='total-Bag'>Bag Total</span> <br />
                        <span className='total-Bag'>Totle Qty</span> <br />
                        <span className='total-Bag'>Bag Discount</span> <br />
                        <span className='total-Bag'>Delivery</span> <br /><br />
                        <span className='total-amount-text'>Totle Amount</span>
                      </div>
                      <div className="col-6">
                        <h5 className='amount-head'>Amount</h5>
                        <span className='total-Bag'>$ {productData.price}</span> <br />
                        <span className='total-Bag'>{count}</span> <br />
                        <span className='total-Bag'>Rs. {discount}</span> <br />
                        <span className='total-Bag'>Rs. {Delivery}</span> <br /><br />
                        <span className='total-amount-num'>$ {total_amount}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <button className='place-order-btn' onClick={place_order}>Place Order <FaOpencart/></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Cart
