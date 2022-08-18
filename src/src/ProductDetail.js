import React from 'react'
import {useParams, Link} from "react-router-dom"
import Title from './Title';
import QuantityBtn from './QuantityBtn'
import { useState, useEffect } from 'react';

export default function ProductDetail() {

    let params = useParams()
    let [productDetail, setProductDetail] = useState(null)

    useEffect(() => {
        //1 : 無第二個參數 , component每次render
        //2 : Dependency Array是空array時 : 只會在第一次網頁render時會觸發
        //3 : Dependency Array是有變數時 : 第一次網頁render時 + 指定的變數改變會觸發
        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
            .then(res => res.json())            
            .then(data => {
                let productInfo = data.find((element) => {
                    return element.id === parseInt(params.id)
                })
                    setProductDetail(productInfo)
                })
    },[]) // <== Dependency Array
    
    return (
        <>
            {
                productDetail &&
                <div className="text-center mb-4">
                    <Title mainTitle={productDetail.name+'產品資料'} />       
                    <img src={process.env.PUBLIC_URL+'/img/'+productDetail.image} alt={productDetail.name + '圖片'} />
                    <p>名稱 : {productDetail.name}</p>
                    <p>價格 : ${productDetail.price}</p>
                    <p>{productDetail.description}</p>
                    <QuantityBtn productInfo={productDetail}/>
                </div>
            }

            <Link className="d-block w-25 mx-auto text-center fs-5 text-decoration-none" to={"/"}>
                回到產品列表
            </Link>
        </>
    )
}
