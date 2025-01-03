import React, { useContext, useState } from "react";
import { BiLogoSlack } from "react-icons/bi";
import { DataContext } from "../context/DataContext";
import Colors from "./Colors";
import { IoMdColorPalette } from "react-icons/io";

const NavBar = ({bgColor}) => {
  const [show, setShow] = useState(false)
  const {ranColor} = useContext(DataContext)
  return (
    <div className="flex items-center justify-between px-1 py-1 border-gray-300 bg-black/20">
      <div className="flex items-center">
        <BiLogoSlack size={25} className="mr-2 text-white" />
        <h1 className="text-xl font-bold text-white">BoardScape</h1>
      </div>
      <div className="flex items-center px-2 py-1 ">
        <div className="items-center hidden px-1 py-1 mr-2 border border-gray-400 rounded-md lg:flex w-52 bg-white/10 ">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            role="presentation"
            className="mr-2 text-white"
          >
            <path
              fill="currentcolor"
              fillRule="evenodd"
              d="m16.436 15.085 3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406M10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"
            ></path>
          </svg>
          <input
            className="w-40 bg-transparent placeholder:text-white focus:outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
        <p className="mr-3 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M6.59 17.83a2 2 0 0 0 2.83 0L6.59 15a2 2 0 0 0 0 2.83m4.79-12.35A5.04 5.04 0 0 1 14.95 4c.97 0 1.95.28 2.79.84q.03-.04.07-.07a1.01 1.01 0 1 1 1.35 1.49 5.05 5.05 0 0 1-.64 6.36l-.72.73c-.78.78-1.81 2.21-2.31 3.21l-1.51 3.02c-.25.5-.77.58-1.17.19l-8.56-8.55c-.4-.4-.31-.92.19-1.17l3.02-1.51c.99-.49 2.42-1.53 3.21-2.31zm2.74 9.63c.52-.97 1.57-2.4 2.35-3.18l.73-.73a3.05 3.05 0 0 0 .39-3.83c-.19-.29-.72-.77-.86-.86A3.04 3.04 0 0 0 15.05 6c-.8 0-1.57.31-2.16.89l-.95.95c-.78.79-2.22 1.82-3.2 2.31L7 11.02l6.07 6.07z"
            ></path>
          </svg>
        </p>
        <p className="hidden mr-3 text-white lg:block">
          <svg
            width="24"
            height="24"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 12C2 6.47667 6.47667 2 12 2C17.5233 2 22 6.47667 22 12C22 17.5233 17.5233 22 12 22C6.47667 22 2 17.5233 2 12ZM4 12C4 16.4188 7.58124 20 12 20C16.4188 20 20 16.4188 20 12C20 7.58124 16.4188 4 12 4C7.58124 4 4 7.58124 4 12ZM8 10C7.99999 7.48383 10.3214 5.51108 12.9389 6.10713C14.3829 6.43513 15.5569 7.60513 15.8899 9.04813C16.3809 11.1771 15.1719 13.0911 13.3589 13.7471C13.1549 13.8201 13.0099 14.0021 13.0099 14.2191V14.0001C13.0099 14.5521 12.5629 15.0001 12.0099 15.0001C11.4579 15.0001 11.0099 14.5521 11.0099 14.0001V12.9871C11.0179 12.4411 11.4599 12.0001 11.9999 12.0001C13.1029 12.0001 13.9999 11.1021 13.9999 10.0001C13.9999 8.89713 13.1029 8.00013 11.9999 8.00013C10.8959 8.00013 9.99935 8.92313 10.0004 10.0271C9.98522 10.5666 9.54291 11 9 11C8.47773 11 8.04856 10.599 8.00385 10.0882C8.00385 10.0882 8 10.0297 8 10ZM12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17C13 17.552 12.552 18 12 18Z"
              fill="currentColor"
            ></path>
          </svg>
        </p>
        <div className="cursor-pointer" onClick={()=>setShow(prev => !prev)}>
          <IoMdColorPalette  size={25} color="white"/>
          {show ? <Colors show={show} /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
