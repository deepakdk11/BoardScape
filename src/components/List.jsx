import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import InputContainer from "./InputContainer";
import Cards from "./Cards";
import Title from "./Title";

const List = ({ list, index }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div {...provided.dragHandleProps}>
            <Title title={list.title} listId={list.id} />
            <div>
              <Droppable droppableId={list.id} type="task">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {list.cards.map((card, index) => (
                      <Cards card={card} index={index} key={card.id} listId={list.id}  />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <InputContainer listId={list.id} type="card" />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
