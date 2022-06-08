import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import loder from '../../assets/loder2.gif'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../navbar/nav'


const ProductData = () => {

  const { id } = useParams()
  const [productDatas, setProductDatas] = useState()
  const [count, setCount] = useState(1)
  useEffect(() => {
    getAllProductData()
  }, [])

  const getAllProductData = async () => {
    try {
      const payload = await axios.get(`${process.env.REACT_APP_ENDPOINT}/products/${id}`)
      if (payload.status == 200) {
        console.log(payload.data, "-----payload-data");
        setProductDatas(payload.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(productDatas, "...stat");



  const navigateion = useNavigate();

  const cartbtn = () => {
    localStorage.getItem('userLogin') == null ? navigateion(`/Userform`) : navigateion(`/product/cart/${id}`);
    localStorage.setItem('productAllData', JSON.stringify(productDatas));
    localStorage.setItem('count', JSON.stringify(count));
  }

  const increment = () => { 
    setCount(count + 1);
  }

  const decrement = () => {
    setCount(count - 1);
  }

  
  // const toast = toast.success('your order succes')
  return (
    <>
    <Nav/>
      {
        productDatas == undefined ?
          <img src={loder} className='loder-img2' /> :
          <div className=''>
            <div className="container page-position">
              <div className="row ">

                {/* ....image.... */}
                <div className="col product-main-border">
                  <img src={productDatas.image} className='one-product-img' />
                </div>

                {/* ....product----data..... */}
                <div className="col product-main-border">
                  <div className='product-main-text'>
                    <h1 className='product-title'>{productDatas.title}</h1>
                    <h2 className='product-price-tage text-pos'>
                      <a className='product-price'>${productDatas.price}</a>
                    </h2>
                    <h3 className='product-category text-pos'>{productDatas.category}</h3>
                    <p className='product-desc text-pos'>{productDatas.description}</p>

                    {/* inc-dec---button--- */}
                    <div className='btn-group-toggle'>
                      <button onClick={decrement} className='increment-value'>-</button>
                      <input type="text" value={count} onChange={e => count(e.target.value)} className='increment-box' />
                      <button onClick={increment} className='increment-value'>+</button>
                    </div>

                    {/* ....cart---button.... */}
                    <div>
                      <button className='cart-btn-dec' onClick={cartbtn}>Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>

            </div>
          </div>
      }
    </>
  )
}

export default ProductData
