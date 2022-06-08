import axios from 'axios'
import React, { useEffect, useState } from 'react'
import loader from '../../assets/loder2.gif'
import {
    getAllProductData,
    selectProduct
} from "../counter/counterSlice"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const CartPage = () => {

    const [cartData, setCartData] = useState()
    const [productData, setProductData] = useState()

    //...login data....
    const userData = JSON.parse(localStorage.getItem('userLogin'))
    console.log('userData ---> ', userData);

    useEffect(() => {
        apiAllData()
    }, [])

    //.....cart api data....
    const apiAllData = async () => {
        try {
            const payload = await axios.get(`${process.env.REACT_APP_CARTDATA}/carts`)
            if (payload.status == 200) {
                console.log("apiAllData ---> ", payload.data);

                payload.data.filter((data) => {
                    if (data.userId == userData.id) {
                        console.log(data, "=====");
                        setCartData(data)
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log("Stat cartData --->", cartData);



    // ....product slice data...

    const dispatch = useDispatch()
    const ProductAlldata = useSelector(selectProduct)

    useEffect(() => {
        dispatch(getAllProductData());
    },[])

    console.log("ProductAlldata ---> ",ProductAlldata);


    //....... productdata and cart data ----- filter.....
    // console.log(cartData.products,"------cartData.products");
    function producFilter() {
        ProductAlldata.filter((data) => {
            if (data.id == cartData.products.productId) {
                console.log("product filter ---> ",data);
            }
        })
    }

    useEffect(() => {
        producFilter() 
    },[])



    return (
        <>
            {
               cartData == undefined ? 
               <img src={loader} className='loder-img2'/> :
               <div>
                   <p>hello</p>
               </div> 
            }
        </>
    )
}

export default CartPage
