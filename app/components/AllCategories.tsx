"use client"
import React, { useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import img1 from "../../public/asset/carousel/3.jpg";
import img2 from "../../public/asset/carousel/6.jpg";
import img3 from "../../public/asset/carousel/8.jpg";
import img4 from "../../public/asset/carousel/6.jpg";
import img5 from "../../public/asset/carousel/10.jpg";

interface Category {
  name: string;
  image: StaticImageData;
  link: string;
}

const categories: Category[] = [
  { name: 'Mens', image: img1, link: '/mens' },
  { name: 'Womens', image: img2, link: '/womens' },
  { name: 'Electronics', image: img3, link: '/electronics' },
  { name: 'Jewelery', image: img4, link: '/jewelery' },
  { name: 'Kids', image: img5, link: '' },
];

const AllCategories = () => {
  const loopCategories = [...categories, ...categories];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'running';
    }
  };

  return (
    <div className="flex justify-center items-center py-7" style={{ whiteSpace: 'nowrap', overflowX: 'hidden', overflowY: 'hidden', position: 'relative', zIndex: 10 }}>
      <div 
        className="flex top-0 left-0 cursor-pointer" 
        style={{ animation: 'scroll 20s linear infinite', width: '100%' }}
        ref={containerRef}
      >
        {loopCategories.map((category, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 box-container cursor-pointer" 
            style={{ minWidth: '300px', marginRight: '20px', position: 'relative', zIndex: 0 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={category.link}>
              <div className={`box ${isHovered ? 'hovered' : ''}`}>
                <div className="flex justify-center items-center">
                  <Image src={category.image} alt={category.name} width={250} height={200} />
                </div>
                <p className="text-center mt-2">{category.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .box-container {
          transition: transform 0.3s;
        }

        .box-container:hover {
          transform: scale(1.1);
        }

        .box {
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .box:hover {
          transform: translateY(-10px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .hovered {
          transform: translateY(-10px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default AllCategories;
