import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import InputContainer from "./InputContainer";
import Cards from "./Cards";
import Title from "./Title";

const List = ({ list, index }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef} className="">
          <div {...provided.dragHandleProps} className="mx-5 mt-3 rounded-xl p-2 border-2 w-64 bg-[color:var(--accent-background,#f1f2f4)]">
            <Title title={list.title} listId={list.id} />
            <div>
              <Droppable droppableId={list.id} type="task">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-5">
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
