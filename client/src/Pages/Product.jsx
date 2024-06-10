import React, { useState, useEffect } from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { useParams } from 'react-router-dom'

import axios from "axios";

const Product = () => {

  const [product, setProduct] = useState([]);
  const { productId } = useParams();
  console.log(productId)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${apiUrl}/products/${productId}`, {});
        console.log(setProduct(res.data))

      } catch (err) {
        console.log(err.response.data)
      }
    };
    fetchData();
  }, [productId]);


  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}

export default Product
