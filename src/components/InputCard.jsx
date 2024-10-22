import React, { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext';
import { MdOutlineClose } from "react-icons/md";

const InputCard = ({setShow, type, listId}) => {
  const [ title, setTitle ] = useState("")
  const {addMoreCard, addMoreList} = useContext(DataContext);

  const handleSubmit = () => {
    if(type === "card"){
      addMoreCard(title, listId)
    } else{
      addMoreList(title)
    }
    setShow(false)
    setTitle("")
  }
  return (
    <div className={ type==="card" ? "mt-4":'mx-5 mt-2 pt-3 rounded-md bg-[color:var(--accent-background,#f1f2f4)] p-2'}>
      <div>
        {
          type === "card" ? <textarea className='w-full focus:outline-none drop-shadow pt-2 pl-2 rounded-xl' placeholder='Enter a title or paste a link' autoFocus onChange={(e) => setTitle(e.target.value)}>
        </textarea> : <input className='h-8 w-60 px-2 rounded border border-gray-500 focus:outline-blue-600' type="text" placeholder='Enter list title' onChange={(e) => setTitle(e.target.value)} autoFocus />
        }
        
      </div>
      <div className='mt-2 flex items-center '>
        <button onClick={handleSubmit} className='text-white px-2 py-1 rounded bg-[color:var(--ds-background-brand-bold,#0c66e4)] hover:bg-blue-500'> 
        {type==="card" ? "Add Card" : "Add List"}
        </button>
        <button className='ml-2 hover:bg-black/15 p-1 rounded' onClick={() => setShow(false)}> <MdOutlineClose size={20} className='text-gray-600' /> </button>
      </div>
    </div>
  )
}

export default InputCard
