import React, { useState } from 'react'
import InputCard from './InputCard'

const InputContainer = ({listId, type}) => {
    const[show, setShow] = useState(false)
  return (
    <div>
        {
            show ? <InputCard setShow={setShow} listId={listId} type={type} /> : <button onClick={()=>setShow((prev)=>!prev)}>{type==="card" ? "+ Add a card" : "Add list"}</button>
        }
    </div>
  )
}

export default InputContainer
