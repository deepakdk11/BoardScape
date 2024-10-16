import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import sample from '../sample'
import List from './List' 
import InputContainer from './InputContainer'

const Home = () => {
    const [items, setItems] = useState(sample.list)
  return (
    <div>
        <DragDropContext>
            <Droppable droppableId='app' type='list' direction='horizontal'>
                {
                    (provided) => (
                        <div
                        ref={provided.innerRef}
                        >
                            {
                                items.map((list,index) => {
                                    return <List key={list.id} list={list} index={index} />
                                })
                            }
                            <div>
                                <InputContainer type="list" />
                            </div>
                          {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </DragDropContext>
    </div>
  )
}

export default Home
