"use client"
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { ImCart } from "react-icons/im";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import logo from "../../public/asset/logo/beti.png";
import Link from "next/link";
import useCartStore from "../useCartStore"; // Import useCartStore
import DropDown from "../components/dropDown/DropDown"; // Import the DropDown component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const items = useCartStore((state) => state.items);
  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      if (!isTop) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`w-full h-20 lg:h-28 border-b-[1px]  border-gray-500 text-black fixed top-0 bg-white z-50 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href='/'>
            <Image className="w-[230px] h-auto" src={logo} alt="" />
          </Link>
        </div>

        <div className="lg:hidden flex gap-5">
          <Link href='/cart'>
            <div className="relative">
              <ImCart className="text-xl" />
              <span className=" w-4 h-4 bg-yellow-600 text-white rounded-full absolute left-1 -top-3 text-xs flex items-center justify-center">
                {items.length}
              </span>
            </div>
          </Link>
          <FiMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
        </div>

        <ul className="hidden lg:flex items-center gap-8 uppercase text-sm font-semibold">
          <Link href='/'>
            <li className="navbarLi">Home</li>
          </Link>
          <DropDown placeholder="Pages" data={[
    { name: "Mens", link: "/mens" },
    { name: "Womens", link: "/womens" },
    { name: "Jewelery", link: "/jewelery" },
    { name: "Electronics", link: "/electronics" }
  ]} />
          <li className="navbarLi">Services</li>
          <a href='https://port-folio-next-js-lime.vercel.app/' target='_blank' rel='noopener noreferrer' className='navbarLi'>Portfolio</a>
          <li className="navbarLi">Blog</li>
          <Link href='/about'>
            <li className="navbarLi">About Shop</li>
          </Link>
        </ul>

        <div className="hidden lg:flex gap-8 items-center">
          <BsSearch className="text-xl hover:text-hoverColor" />
          <div className="relative">
            <Link href='/cart'>
              <ImCart className="text-xl" />
              <span className="w-4 h-4 bg-yellow-600 text-white rounded-full absolute left-2 -top-3 text-xs flex items-center justify-center">
                {items.length}
              </span>
            </Link>
          </div>
          <button className="w-48 h-14 bg-green-500 text-black uppercase text-sm font-semibold rounded-md hover:bg-darkRed hover:text-white duration-300">
            Account
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute z-10 left-0 top-20 w-full bg-white shadow-lg border-t-[1px] border-gray-500 text-black">
            <ul className="max-w-screen-2xl mx-auto px-4 py-2 uppercase text-sm font-semibold">
              <Link href='/'>
                <li className="navbarLi">Home</li>
              </Link>
              <DropDown placeholder="Pages"  data={[
    { name: "Mens", link: "/mens" },
    { name: "Womens", link: "/womens" },
    { name: "Jewelery", link: "/jewelery" },
    { name: "Electronics", link: "/electronics" }
  ]}  />
              <li className="navbarLi">Services</li>
              <a href='https://port-folio-next-js-lime.vercel.app/' target='_blank' rel='noopener noreferrer' className='navbarLi'>Portfolio</a>
              <li className="navbarLi">Blog</li>
              <Link href='/about'>
                <li className="navbarLi">About Shop</li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
