import React from 'react'
import {Link} from 'react-router-dom'
import styles from './ProductList.module.css'
import { useState, useEffect } from 'react' // React Hook
import Title from './Title'
import QuantityBtn from './QuantityBtn'

export default function ProductList() {

    let [productList, setProductList] = useState([])

    // useEffect
    useEffect(() => {
        //1 : 無第二個參數 , component每次render
        //2 : Dependency Array是空array時 : 只會在第一次網頁render時會觸發
        //3 : Dependency Array是有變數時 : 第一次網頁render時 + 指定的變數改變會觸發
        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
            .then(res => res.json())            
            .then(data => setProductList(data))

        console.log(productList)
    },[]) // <== Dependency Array



    return (
        //React Fragment 簡寫
        <>
            <Title mainTitle="請選擇要購買的水果 v2"/>

            <div>
            {
                productList.map(product => (
                    <React.Fragment key={product.id}>
                        {product.name}<br/> 
                        {product.price}<br/>
                        <Link to={'/product/'+product.id}>
                        <img width='300px' src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name + '圖片'} />
                        </Link><br/>
                        {product.description}<br/>
                        <QuantityBtn productInfo={product}/>
                    </React.Fragment>
                ))
            }
            </div>
        </>
    )
}
