import React from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import ProductList from '@/app/_componet/ProductList';

async function ProductCategory({ params }) {
  const productList = await GlobalApi.getOnceCategory(params.categoryName);
  return (
    <ProductList productList={productList} />
  )
}

export default ProductCategory