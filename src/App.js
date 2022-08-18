import React from 'react'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ProductList from './ProductList';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import {CartContext} from './CartContext';
import {useState} from 'react';
import ViewCount from './ViewCount';

function App() {

    const [cartItems, setCartItems] = useState([])

    return (
        <BrowserRouter>

            <CartContext.Provider value={{cartItems, setCartItems}}>

            <nav className="sticky-top navbar navbar-expand-sm bg-secondary justify-content-center">
                <Link className="text-dark fs-3 fw-bold ms-2 px-1 text-decoration-none border border-info rounded bg-info" to='/'>
                    首頁
                </Link>
                <Link className="text-dark fs-3 fw-bold ms-2 px-1 text-decoration-none border border-info rounded bg-info" to='/checkout'>
                    購物車
                </Link>
            </nav>

            <Routes>
                <Route path="/" element={<ProductList/>} />
                <Route path="/checkout" element={<Checkout/>} />
                
                <Route path="/product" element={<ProductDetail/>}>
                    <Route path=":id" element={<ProductDetail/>} />
                </Route>
                
                <Route path="*" element={<p>找不到頁面</p>}/>
            </Routes>

            </CartContext.Provider>

            < ViewCount />

        </BrowserRouter>
    )
}


export default App;
