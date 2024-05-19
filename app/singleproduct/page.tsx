"use client";

import React, { useEffect, useState } from 'react';
import { getSingleProduct, Product } from '../helper';
import useCartStore, { Item } from '../useCartStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

interface SearchParams {
  id?: string;
}

interface SingleProductProps {
  searchParams: SearchParams;
}

const SingleProduct: React.FC<SingleProductProps> = ({ searchParams }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const addItemToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const idString = searchParams?.id;
        if (idString) {
          const id = Number(idString);
          const fetchedProduct = await getSingleProduct(id);
          setProduct(fetchedProduct);
          console.log('Fetched Product:', fetchedProduct); // Console log the fetched product
        } else {
          console.error('Product ID is not provided.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [searchParams]);

  const handleAddToCart = () => {
    if (
      (product?.category === "men's clothing" || product?.category === "women's clothing") &&
      !selectedSize
    ) {
      setErrorMessage('Please select a size for this item.');
      return;
    }

    if (product) {
      const productToAdd: Item = { 
        id: product.id.toString(), 
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: selectedSize || null
      };
      addItemToCart(productToAdd);
      setSuccessMessage('Product added to cart.');
    }
  };

  const handleBuyToCart = () => {
    if (
      (product?.category === "men's clothing" || product?.category === "women's clothing") &&
      !selectedSize
    ) {
      setErrorMessage('Please select a size for this item.');
      return;
    }

    if (product) {
      const productToAdd: Item = { 
        id: product.id.toString(), 
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: selectedSize || null
      };
      addItemToCart(productToAdd);
      setSuccessMessage('Product added to cart.');
      router.push('/cart');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-40">
      <div className="row grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
        <div className="max-w-md col-md-6 flex items-center justify-center">
          <Image src={product.image} alt="product image" width={400} height={400} />
        </div>
        <div className="max-w-xl col-md-6 p-5">
          <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-lg font-bold text-indigo-600 mb-4">
            Price: ${product.price ? product.price.toFixed(2) : 'N/A'}
          </p>
          {["men's clothing", "women's clothing"].includes(product.category) && (
            <div className="flex space-x-4 mb-4">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className={`btn ${selectedSize === size ? 'bg-blue-500' : 'bg-gray-300'} px-2 py-1 rounded-xl text-white`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div className="flex space-x-4">
            <button className="btn bg-green-500 px-2 py-1 rounded-xl text-white" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn bg-violet-500 px-2 py-1 rounded-xl text-white" onClick={handleBuyToCart}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
