import React, { useState, useContext } from 'react'
import ClickOutComponent from 'react-onclickout'
import { DataContext } from '../context/DataContext'

const Title = ({title, listId}) => {
    const [ show, setShow ] = useState(false)
    const [ option, setOption ] = useState(false)
    const [ newTitle , setNewTitle ] = useState(title)
    const { updateListTitle, deleteList } = useContext(DataContext);

    const handleBlur = () => {
        updateListTitle(newTitle, listId);
        setShow(!show);
      };

  return (
    <>
    {
        show ? (
            <div>
                <input type="text"
                value={newTitle}
                onChange={(e)=>setNewTitle(e.target.value)}
                onBlur={handleBlur}
                onKeyPress={(e) => {
                    if(e.key === "Enter"){
                        handleBlur();
                    }
                    return
                }}
                autoFocus
                />
            </div>
        ) : (
            <div>
                <h1 onClick={() => setShow(prev => !prev)}>{title}</h1>
                <button onClick={()=>setOption(prev => !prev)}>X</button>
                {
                    option && (
                        <ClickOutComponent onClickOut={(e) => {
                            setOption(prev => !prev)
                        }}>
                            <ul>
                                <li onClick={() => {setOption(!option); deleteList(listId)}}>Delete List</li>
                                <li onClick={() => {setOption(!option); setShow(!show)}}>Edit Card Title</li>
                            </ul>
                        </ClickOutComponent>
                    )
                }

            </div>
        )
    }
    </>
  )
}

export default Title
