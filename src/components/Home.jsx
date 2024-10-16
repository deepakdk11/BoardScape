import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import sample from '../sample'
import List from './List' 
import InputContainer from './InputContainer'
import {v4 as uuid} from 'uuid'
import {db, timeStamp} from '../firebase';
import { addDoc, arrayUnion, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import StoreApi from '../DataContext/StoreApi'

const Home = () => {

    const [items, setItems] = useState(sample.list);

    const addNewCards = async (title, listId) => {
        if(!title){
            return
        }
        const newCardId = uuid();
        const newCard = {
            id:newCardId,
            title
        }
        const listRef = doc(db, "list", listId);
        await updateDoc(listRef, {
            cards:arrayUnion(newCard)
        })
    }

    const removeList = (index, listId, cardId) =>{
        const listRef = doc(db," lists", listId)
        items.forEach(async(list) => {
           if(list.id === listId){
            list.cards.splice(index, 1)
            await updateDoc(listRef, {
                cards:list.cards.filter((card) => card.id !== cardId)
            })
           }
           return list;
        })

    }

    const addNewTitle = (title , index, cardId, listId) => {
        const listRef = doc(db," lists", listId)
        items.forEach( async(list) => {
            if(list.id === listId){
                list.cards[index].title = title;
                await updateDoc(listRef, {
                   cards : list.cards.map((card) => {
                    if(card.id === cardId){
                        card.title = title;
                        return card
                    }
                    return card
                   })
                })
            }
            return list
        })
    }

    const updateNewTilte = (title, listId) => {
        const listRef = doc(db," lists", listId);

        items.forEach(async(list) => {
            if(list.id===listId){
                list.title = title;
                await updateDoc(listRef ,{
                    title:title
                })
            }
            return list
        })
    }

    const addMoreList = async(title) => {
        if(!title){
            return
        }
        await addDoc(collection(db, "list"), {
            title,
            card:[],
            timeStamp
        })
    }

    const deleteList = async(listId) => {
        await deleteDoc(doc(db," lists", listId))
    }

    const onDragEnd = async(result) => {
        const {destination, source, droppableId, type} = result;
        if(!destination){
            return
        }
        if(type === "list"){
            const destinationRef = doc(db, "list", items[destination.index].id);
            const sourceRef = doc(db, "list", items[source.index].id)

            await updateDoc(destinationRef,{
            timeStamp : items[source.index].timeStamp
        })

        await updateDoc(sourceRefRef,{
            timeStamp : items[destination.index].timeStamp
        })
        return
        }
        if(source.droppableId === destination.droppableId){
            const list = items.find((list) => list.id===source.droppableId);

            const updateCards = items.cards.map((card, index) => {
                if(index===source.index){
                    return list.cards[destination.index]
                }
                if(index===destination.index){
                    return list.cards[source.index]
                }
                return card;
            })
            const listRef = doc(db, "list", destination.droppableId);
            await updateDoc(listRef, {
                cards: updateCards
            })
        }else {
                const sourceList = items.find((list) => list.id === source.droppableId);
                const destinationList = items.find((list) => list.id === destination.droppableId);
                const draggingCard = sourceList.cards.filter((card) => card.id === droppableId)[0];
                const sourceListRef = doc(db, "list", source.droppableId);
                sourceList.cards.splice(source.index, 1)

                await updateDoc(sourceListRef, {
                    cards: sourceList.cards
                })

                const destinationListRef = doc(db, "list", destination.droppableId)
                destinationList.cards.splice(destination.index, 0 , draggingCard)

                await updateDoc(destinationListRef, {
                    cards: destinationListRef.cards
                })
            }
            
        

        
    }



  return (
    <StoreApi.Provider
    value={{
        addNewCards,
        removeList,
        addNewTitle,
        updateNewTilte,
        addMoreList,
        deleteList
    }}
    >
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='app' type='list' direction='horizontal'>
                {
                    (provided) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
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
    </StoreApi.Provider>
  )
}

export default Home
