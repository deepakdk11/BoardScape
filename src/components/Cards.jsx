import React, { useState, useContext } from 'react';
import {Draggable} from 'react-beautiful-dnd';
import { MdDeleteOutline } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';
import { DataContext } from '../context/DataContext';

const Cards = ({card, index, listId}) => {
    const [show, setShow] = useState(false);
    const [newTitle, setNewTitle] = useState(card.title);
    const { removeCard, updateCardTitle } = useContext(DataContext);

    const handleBlur = (cardId) => {
        updateCardTitle(newTitle, index, listId);
        setShow(!show);
    };

  return (
    <Draggable draggableId={card.id} index={index}>
        {
            (provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className=''>
                    <div>
                        {show ? (
                            <TextareaAutosize
                            value={newTitle}
                            onChange={(e)=>setNewTitle(e.target.value)}
                            type='text'
                            onKeyDown={(e)=>{
                                if(e.key ==="Enter"){
                                    handleBlur(card.id);
                                }return
                            }}
                            onBlur={handleBlur}
                            autoFocus
                            />
                        ) : (
                            <div className='flex justify-between items-center text-sm text-gray-600 my-2 bg-white p-2 rounded-md drop-shadow-sm' onClick={() => setShow( (prev) => !prev )}>
                                <p>{card.title}</p>
                                <button onClick={() => {removeCard(index, listId, card.id)}}>
                                    <MdDeleteOutline className='hover:text-red-500' size={20}/>
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
