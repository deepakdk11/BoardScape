import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { db, timestamp } from "../firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

export const DataContext = createContext("");

export const DataContextProvider = (props) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "lists"), orderBy("timestamp", "asc"));
    onSnapshot(q, (snapShot) => {
      setLists(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  const addMoreCard = async (title, listId) => {
    if (!title) {
      return;
    }
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };
    const listRef = doc(db, "lists", listId);

    await updateDoc(listRef, {
      cards: arrayUnion(newCard),
    });
  };

  const removeCard = async (index, listId, cardId) => {
    const listRef = doc(db, "lists", listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards.splice(index, 1);
        await updateDoc(listRef, {
          cards: list.cards.filter((card) => card.id !== cardId),
        });
      }
      return list;
    });
  };

  const updateCardTitle = (title, index, listId, cardId) => {
    const listRef = doc(db, "lists", listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards[index].title = title;
        await updateDoc(listRef, {
          cards: list.cards.map((card) => {
            if (card.id === cardId) {
              card.title = title;
              return card;
            }
            return card;
          }),
        });
      }
      return list;
    });
  };

  const addMoreList = async (title) => {
    if (!title) {
      return;
    }
    await addDoc(collection(db, "lists"), {
      title,
      cards: [],
      timestamp,
    });
  };

  const updateListTitle = (title, listId) => {
    const listRef = doc(db, "lists", listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.title = title;
        await updateDoc(listRef, {
          title: title,
        });
      }
      return list;
    });
  };

  const deleteList = async (listId) => {
    await deleteDoc(doc(db, "lists", listId));
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
      const destinationRef = doc(db, "lists", lists[destination.index].id);
      const sourceRef = doc(db, "lists", lists[source.index].id);
      await updateDoc(destinationRef, {
        timestamp: lists[source.index].timestamp,
      });
      await updateDoc(sourceRef, {
        timestamp: lists[destination.index].timestamp,
      });
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const list = lists.find((list) => list.id === source.droppableId);

      const updatedCards = list.cards.map((card, index) => {
        if (index === source.index) {
          return list.cards[destination.index];
        }
        if (index === destination.index) {
          return list.cards[source.index];
        }
        return card;
      });
      const listRef = doc(db, "lists", destination.droppableId);
      await updateDoc(listRef, {
        cards: updatedCards,
      });
    } else {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destinationList = lists.find(
        (list) => list.id === destination.droppableId
      );
      const draggingCard = sourceList.cards.filter(
        (card) => card.id === draggableId
      )[0];

      const sourceListRef = doc(db, "lists", source.droppableId);

      sourceList.cards.splice(source.index, 1);
      await updateDoc(sourceListRef, {
        cards: sourceList.cards,
      });

      const destinationListRef = doc(db, "lists", destination.droppableId);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      await updateDoc(destinationListRef, {
        cards: destinationList.cards,
      });
    }
  };

  const colors = [
    "bg-gradient-to-r from-red-500 to-orange-500",
    "bg-gradient-to-r from-rose-400 to-red-500",
    "bg-gradient-to-r from-pink-500 to-rose-500",
    "bg-gradient-to-r from-amber-200 to-yellow-400",
    "bg-gradient-to-r from-amber-200 to-yellow-500",
    "bg-gradient-to-r from-amber-500 to-pink-500",
    "bg-gradient-to-r from-violet-200 to-pink-200",
    "bg-gradient-to-r from-blue-200 to-cyan-200",
    "bg-gradient-to-r from-teal-200 to-teal-500",
    "bg-gradient-to-r from-lime-400 to-lime-500",
    "bg-gradient-to-r from-teal-400 to-yellow-200",
    "bg-gradient-to-r from-emerald-400 to-cyan-400",
    "bg-gradient-to-r from-indigo-400 to-cyan-400",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-indigo-500 to-blue-500",
    "bg-gradient-to-r from-blue-600 to-violet-600",
    "bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    "bg-gradient-to-r from-fuchsia-600 to-pink-600",
    "bg-gradient-to-r from-fuchsia-600 to-purple-600",
    "bg-gradient-to-r from-fuchsia-500 to-pink-500",
    "bg-gradient-to-r from-violet-500 to-purple-500",
    "bg-gradient-to-r from-violet-600 to-indigo-600",
    "bg-gradient-to-r from-purple-500 to-purple-900",
    "bg-gradient-to-r from-blue-800 to-indigo-900",
    "bg-gradient-to-r from-neutral-300 to-stone-400",
    "bg-gradient-to-r from-stone-500 to-stone-700",
    "bg-gradient-to-r from-slate-300 to-slate-500",
    "bg-gradient-to-r from-emerald-500 to-emerald-900",
    "bg-gradient-to-r from-slate-500 to-slate-800",
    "bg-gradient-to-r from-slate-900 to-slate-700"
  ]

  const [bgColor, setBgColor] = useState(colors[15]);

  const changeBackgroundColor = (color) => {
    setBgColor(color); 
  };

  const contextValue = {
    addMoreCard,
    addMoreList,
    updateListTitle,
    removeCard,
    updateCardTitle,
    deleteList,
    onDragEnd,
    lists,
    setLists,
    colors,
    bgColor,
    changeBackgroundColor
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};
