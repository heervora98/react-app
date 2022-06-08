import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import loader from '../../assets/loder2.gif'
import "./counter.css"
import { Link } from 'react-router-dom';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  getAllProductData,
  selectStatus,
  selectProduct,
} from './counterSlice';
import styles from './Counter.module.css';
// import { Link } from 'react-bootstrap/lib/navbar';
// import {Link} from 'react-bootstrap';
export function Counter() {
  const status = useSelector(selectStatus)
  const products = useSelector(selectProduct)
  useEffect(() => {
    dispatch(getAllProductData())
  }, [])
  useEffect(() => {
    console.log(status, '---status')
    console.log(products, '--products')
  }, [products, status])

  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <>
      {
        status ?
          <img src={loader} className='loder-img'/> :
          <div>
            {
              products.length > 0 ?
                <div className='product-wrapper'>
                  {products.map((product) => {
                    const { id, title, image, price, category } = product;
                    return (
                      <div key={id} className='main-div'>
                        <Link to={`/product/${id}`}>
                          <div>
                            <div className='product-card'>
                              <div className='main-container'>
                                <img src={image} className='images' />
                              </div>
                              <div className='card-body'>
                                <div className='card-title-fix'>
                                  <p className='card-title'>{title}</p>
                                </div>
                                <p className='price'>$ {price}</p>
                                <p className='card-Text'>{category}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
                : "No Product Found"
            }
          </div>
      }
    </>
  );
}
