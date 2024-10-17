import React, { useContext }  from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import List from './List' 
import InputContainer from './InputContainer'
import { DataContext } from '../context/DataContext'

const Home = () => {

const {onDragEnd, lists} = useContext(DataContext)

  return (
    <>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" type="list" direction="horizontal">
                {
                    (provided) => (
                        <div
                        className='border-2 flex'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            {
                                lists.map((list,index) => {
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
    </>
  )
}

export default Home
