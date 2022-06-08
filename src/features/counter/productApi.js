import axios from "axios"

export function getProducts () {
    return axios.get(`${process.env.REACT_APP_ENDPOINT}/products`)
}

export function getuserData() {
    return new Promise((resolve) =>
    setTimeout(() => resolve((axios.get(`${process.env.REACT_APP_USERDATA}/users`))),2000) 
    )
}

export function getCartData() {
    return axios.get(`${process.env.REACT_APP_CARTDATA}/carts`)
}