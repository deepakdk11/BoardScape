import React, { useState, useContext } from 'react'
import ClickOutComponent from 'react-onclickout'
import { DataContext } from '../context/DataContext'
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Title = ({title, listId}) => {
    const [ show, setShow ] = useState(false)
    const [ option, setOption ] = useState(false)
    const [ newTitle , setNewTitle ] = useState(title)
    const { updateListTitle, deleteList } = useContext(DataContext);

    const handleBlur = () => {
        updateListTitle(newTitle, listId);
        setShow(!show);
      };

  return (
    <>
    {
        show ? (
            <div>
                <input type="text"
                value={newTitle}
                onChange={(e)=>setNewTitle(e.target.value)}
                onBlur={handleBlur}
                onKeyPress={(e) => {
                    if(e.key === "Enter"){
                        handleBlur();
                    }
                    return
                }}
                autoFocus
                />
            </div>
        ) : (
            <div className='flex justify-between relative text-base font-semibold text-slate-500 px-2'>
                <h1 onClick={() => setShow(prev => !prev)}>{title}</h1>
                <button onClick={()=>setOption(prev => !prev)}><HiOutlineDotsHorizontal /></button>
                {
                    option && (
                        <ClickOutComponent onClickOut={(e) => {
                            setOption(prev => !prev)
                        }}>
                            <ul className='absolute top-5 left-28 py-1 px-2 bg-gray-100 rounded-md text-sm text-black z-10'>
                                <li className='cursor-pointer hover:bg-black/5 p-1 rounded  mb-1' onClick={() => {setOption(!option); deleteList(listId)}}>Delete List</li>
                                <li className='cursor-pointer hover:bg-black/5 p-1 rounded' onClick={() => {setOption(!option); setShow(!show)}}>Edit Card Title</li>
                            </ul>
                        </ClickOutComponent>
                    )
                }

            </div>
        )
    }
    </>
  )
}

export default Title
