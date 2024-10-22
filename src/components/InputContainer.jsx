import React, { useState } from "react";
import InputCard from "./InputCard";
import { IoAdd } from "react-icons/io5";

const InputContainer = ({ listId, type }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {show ? (
        <InputCard setShow={setShow} listId={listId} type={type} />
      ) : (
        <button onClick={() => setShow((prev) => !prev)} className={type=== "card" ? " w-full text-base hover:bg-black/15 rounded-md p-1 mt-4" : "flex flex-col bg-white/30 mx-5 w-32 mt-3 px-5 py-2 rounded-xl font-semibold text-white"}>
          {type === "card" ? <span className="flex items-center text-gray-600 text-sm font-semibold"><IoAdd className="mr-2" size={20} /> Add a card</span> : <span className="flex flex-row items-center"><IoAdd className="mr-2" /> Add List</span>}
        </button>
      )}
    </div>
  );
};

export default InputContainer;
