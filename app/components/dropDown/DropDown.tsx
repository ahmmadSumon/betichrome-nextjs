"use client"
import React, { useState } from 'react';
import '../dropDown/dropDown.css';
import { IoIosArrowDropdown } from "react-icons/io"; 
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Link from "next/link";

const DropDown = ({ placeholder, data }: any) => {
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const [dropIndex, setDropIndex] = useState(0);
  const [dropItem, setDropItem] = useState(placeholder);
  const [listData, setListData] = useState(data);
  const [listData2, setListData2] = useState(data);

  const openDrop = () => {
    setIsOpenDrop(!isOpenDrop);
  };

  const closeDrop = (index: number, name: string) => {
    setIsOpenDrop(false);
    setDropIndex(index);
    setDropItem(name);
  };

  const filterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyWord = e.target.value.toLowerCase();
    const list = listData2.filter((item: any) => item.name.toLowerCase().includes(keyWord));
    const uniqueList = list.filter((item, index) => list.findIndex(i => i.name === item.name) === index);
    setListData(uniqueList);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpenDrop(false)}>
      <div className="selectDrop position-relative ">
        <span className='flex justify-between items-center gap-2' onClick={openDrop}>
          {dropItem.length > 14 ? dropItem.substr(0, 14) + '...' : dropItem} <IoIosArrowDropdown />
        </span>
        {isOpenDrop && 
          <div className='selectDropSec'>
            <input type="text" onChange={filterData} />
            <ul className='dropResults'>
              <li key={0} onClick={() => closeDrop(0, placeholder)} className={`${dropIndex === 0 ? 'active' : ''}`}>
                {placeholder}
              </li>
              {listData.map((item: any, index: number) => (
                <li key={index + 1} onClick={() => closeDrop(index + 1, item.name)} className={`${dropIndex === index + 1 ? 'active' : ''}`}>
                  <Link href={item.link}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>  
    </ClickAwayListener>
  );
};

export default DropDown;
