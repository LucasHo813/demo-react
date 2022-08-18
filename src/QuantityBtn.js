import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { CartContext } from './CartContext'

export default function QuantityBtn({productInfo}) {
    
    const {cartItems, setCartItems} = useContext(CartContext)

    //購物車內有冇該產品
    let productIndexInCart = cartItems.findIndex((element) => {
        return element.id === productInfo.id
    })
    //findIndex
    //如果係購物車內找到該件產品 => 返回索引位置
    //該件產品沒有被加入過去購物車 => 返回 -1

    let [numInCart, setNumInCart] = useState(
        (productIndexInCart===-1) ? 0 : cartItems[productIndexInCart].quantity
    )

    const handleAdd = () => {

        if(productIndexInCart === -1) 
        {
            //購物車本身沒有 , 在cartItems array中加個新element (object)
            setCartItems([
                {
                    id: productInfo.id,
                    name: productInfo.name,
                    image: productInfo.image,
                    price: productInfo.price,
                    description: productInfo.description,
                    quantity: 1
                }, ...cartItems])
        } else 
        {
            //購物車有該產品 , 只加個quantity
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity++
            setCartItems(newCartArray)
        }

        setNumInCart(numInCart + 1)
    }

    const handleSubtract = () => {

        if(cartItems[productIndexInCart].quantity === 1) {
            //購物車中只剩下一件的話 , remove object
            let newCartArray = [...cartItems]
                newCartArray.splice(productIndexInCart,1)
                setCartItems(newCartArray)
        } else {
            //購物車有該產品 , 只減個quantity
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity--
            setCartItems(newCartArray)
        }

        setNumInCart(numInCart - 1)
    }

    return (
        <div>
            {
                (numInCart === 0) ?
                <div className="btn btn-info" onClick={handleAdd}>加入購物車</div> :
                <div>
                    <span>數量 : {numInCart}件</span> <br />
                    <span className="btn btn-sm btn-info mx-1" onClick={handleSubtract}>-</span>
                    <span className="btn btn-sm btn-info mx-1" onClick={handleAdd}>+</span>
                </div>
            }
        </div>
    ) 
}
