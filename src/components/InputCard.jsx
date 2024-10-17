import React, { useContext, useState } from 'react'
import { DataContext } from '../context/DataContext';

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
    <div>
      <div>
        <textarea name="" id="" placeholder={type==="card" ? "Enter a title of this card" : "Enter list title"} autoFocus onChange={(e) => setTitle(e.target.value)}>
        </textarea>
      </div>
      <div>
        <button onClick={handleSubmit}> {type==="card" ? "Add Card" : "Add title"} </button>
        <button> X </button>
      </div>
    </div>
  )
}

export default InputCard
