import React, { useContext } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { DataContext } from './context/DataContext'

const App = () => {
  const {ranColor} = useContext(DataContext) //className={`${ranColor} bg-no-repeat bg-cover`}
  
  return (
    <div>
      <NavBar />
      <Home />
    </div>
    
  )
}

export default App
