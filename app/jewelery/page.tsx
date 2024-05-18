"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useCartStore from '../useCartStore';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

async function getData(): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables');
  }

  const response = await fetch(`${apiUrl}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

const Jewelery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setProducts(data);
      } catch (error:any) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='container pb-10 mx-auto'>
      <h2 className='text-center mt-20 py-10 text-4xl'>Women's Jewelry</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] md:gap-[60]">
        {products
          .filter(product => product.category === "jewelery")
          .map(product =>  (
            <div key={product.id} className="bg-white p-4 rounded-md shadow-md py-5">
              <div className="image-container h-40 relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-lg font-semibold py-5">{product.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 font-bold py-5">${product.price}</p>
              </div>
              <div className="flex justify-between gap-4 flex-col lg:flex-row">
                <Link href={{ pathname: "/singleproduct", query: { id: product.id.toString() } }} key={`${product.id}-link1`}>
                  <button className="py-1 px-2 rounded bg-green-500 hover:text-white duration-300">
                    View Details
                  </button>
                </Link>
                <Link href={{ pathname: "/singleproduct", query: { id: product.id.toString() } }} key={`${product.id}-link2`}>
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

export default Jewelery;
