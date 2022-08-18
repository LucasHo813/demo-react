import React, { useContext } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import { CartContext } from './CartContext'

export default function Checkout() {

    let {cartItems} = useContext(CartContext)

    let cartEmpty = cartItems.length <= 0 ? true : false

    let grandTotal = cartItems.reduce((total, product)=>{
        return total += product.price * product.quantity
        }, 0)   
        
    const freeShippingPrice = 99

    return (
        <div>
            <Title mainTitle='你的購物車' />
            
            {
                cartEmpty &&
                <div className='container fs-2 mt-5 text-center'>
                    購物車現在沒有商品<br/>
                    <Link to="/">去產品頁看看吧</Link>
                </div>
            }

            {
                !cartEmpty && 
                <div className='container border border-dark px-0 mb-2'>
                        <div className='' id="cartSection">
                            {
                                /* 產品列表 */
                                cartItems.map(product=>(
                                    <div className='d-flex border-bottom border-dark' key={product.id}>
                                        <img src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name}/>
                                        <div className='m-5 fw-bold'>
                                            貸品 : {product.name} <br />
                                            描述 : {product.description} <br />
                                            價格 : ${product.price} <br />
                                            <QuantityBtn productInfo={product}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='m-4 py-2 fs-2 fw-bold' id="checkoutSection">
                            {/* 價錢總數 */}
                                <div>全部貸品總共 :</div>
                                <div>${grandTotal}</div>
                            {
                                /* 免費送貨 */
                                grandTotal >= freeShippingPrice ?
                                <div className='text-success'>免費送貸</div> :
                                <div><span className='text-warning'>滿${freeShippingPrice}免費送貸</span><br/>
                                <span className='text-danger'>還差${freeShippingPrice-grandTotal}</span></div>
                            }
                                <button type="button" className="btn btn-outline-dark fs-4">付款</button>
                        </div>
                </div>
            }
        </div>
    )
}
