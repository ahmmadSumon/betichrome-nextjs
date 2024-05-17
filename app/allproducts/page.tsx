"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useCartStore from '../useCartStore';

async function getData() {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='container mx-auto'>
      <h2 className='text-center py-10 text-4xl'>All products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] md:gap-[60]">
        {products.map(product =>  (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md py-5">
            <div className="image-container h-40 relative">
              <Image
                src={product.image}
                alt=''
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="text-lg font-semibold py-5">{product.title}</h3>
            <div className="flex justify-between items-center">
              <p className="text-gray-900 font-bold py-5">${product.price}</p>
            </div>
            <div className="flex justify-between gap-4 flex-col lg:flex-row">
              <Link href={{ pathname: "/singleproduct", query: { id: product.id } }} key={`${product.id}-link1`}>
                <button className="py-1 px-2 rounded bg-green-500 hover:text-white duration-300">
                  View Details
                </button>
              </Link>
              <Link href={{ pathname: "/singleproduct", query: { id: product.id } }} key={`${product.id}-link2`}>
                <button className="py-1 px-2 rounded bg-green-500 hover:text-white duration-300">
                  ADD To Cart
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
