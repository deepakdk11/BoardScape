import React, { useState } from 'react'
import {Draggable} from 'react-beautiful-dnd'
import { MdDeleteOutline } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize'

const Cards = ({card, index, listId}) => {
    const [show, setShow] = useState(false);
    const [newTitle, setNewTitle] = useState(card.title)
    const handleBlur = () => {
        setShow((prev) => !prev)
    }
  return (
    <Draggable draggableId={card.id} index={index}>
        {
            (provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <div>
                        {show ? (
                            <TextareaAutosize
                            value={newTitle}
                            onChange={(e)=>setNewTitle(e.target.value)}
                            type='text'
                            onKeyPress={(e)=>{
                                if(e==="Enter"){
                                    handleBlur(card.id)
                                }return
                            }}
                            onBlur={handleBlur}
                            />
                        ) : (
                            <div onClick={() => setShow( (prev) => !prev )}>
                                <p>{card.title}</p>
                                <button>
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            )
        }

    </Draggable>
  )
}

export default Cards
