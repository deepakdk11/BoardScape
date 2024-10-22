import React, { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext'

const Colors = ({show}) => {
    const {colors} = useContext(DataContext);
    const {id} = useParams()
    const color = colors.find((color) => color.id === Number(id))

  return (
    <div className='fixed border right-1 h-fit top-14'>
      {show ?
            <ul className=" grid grid-cols-2 gap-5 top-16 h-96 bg-white p-3 right-10 overflow-scroll">
              {
                colors.map((color, index) => (
                  <li key={index} className={`${color} py-12 px-20  bg-red-700 rounded-lg cursor-pointer`} >

                  </li>
                ))
              }
           </ul> : <></>
          }
    </div>
  )
}

export default Colors
