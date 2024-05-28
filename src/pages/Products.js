import React, { useEffect } from 'react';
import ProductPage from '../components/Products';
import { AllProducts } from '../redux/features/product/productThunks';
import { useDispatch } from 'react-redux';
function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllProducts());
  }, []);
  return (
    <div>
      <ProductPage />
    </div>
  );
}

export default Products;
