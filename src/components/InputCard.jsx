import React from 'react'

const InputCard = ({setShow, type, listId}) => {
  return (
    <div>
      <div>
        <textarea name="" id="" placeholder={type==="card" ? "Enter a title of this card" : "Enter list title"} autoFocus>
        </textarea>
      </div>
      <div>
        <button> {type==="card" ? "Add Card" : "Add title"} </button>
        <button> X </button>
      </div>
    </div>
  )
}

export default InputCard
