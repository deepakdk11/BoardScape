import React, { useState } from 'react'
import {Draggable} from 'react-beautiful-dnd'
import TextareaAutosize from 'react-textarea-autosize'

const Cards = ({card, index, listId}) => {
    const [show, setShow] = useState(false);
    const [newTitle, setNewTitle] = useState(card.title)
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
                            typeof='text'
                            onKeyPress={(e)=>{
                                if(e==="Enter"){
                                    
                                }return
                            }}
                            />
                        ) : (
                            <div></div>
                        )}
                    </div>

                </div>
            )
        }

    </Draggable>
  )
}

export default Cards
