import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cart from '../cart/cart'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate()
    const cartData = JSON.parse(localStorage.getItem('productAllData'))

    const sighn_in = () => {
        toast.info("Enter your details", {
            position: toast.POSITION.BOTTOM_CENTER,
            theme: "dark"
        });
    }

    const cart_btn = () => {
        navigate(`/product/cart/${cartData.id}`)
    }

    return (
        <>
            <div className="nav-bg">
                <div className="container">
                    <div className='navbar-flex'>
                        <div>
                            <Link to={`/`} className='nav-logo-link'><h2 className='nav-logo'><span className='nav-logo-span'>F</span>ake <span className='nav-logo-span'>S</span>hop</h2></Link>
                        </div>
                        <div>
                            <ul className='option-flex'>
                                <li>
                                    <Link to={`/`}>All Product</Link>
                                </li>
                                <li>
                                    <Link to='#'>Women</Link>
                                </li>
                                <li>
                                    <Link to='#'>Men</Link>
                                </li>
                                <li>
                                    <Link to='#'>Jewelry</Link>
                                </li>
                                <li>
                                    <Link to='#'>Electronis</Link>
                                </li>
                                <li>
                                    <Link to={`/Userform`}><button className='sighn-in-btn' onClick={sighn_in}>Sighn In</button></Link>
                                </li>
                                <li>
                                    <button type="button" className="btn btn-primary position-relative cart-button" onClick={cart_btn}>
                                        Cart <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">+1 <span className ="visually-hidden">unread messages</span></span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav
