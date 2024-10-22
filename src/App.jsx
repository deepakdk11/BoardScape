import React, { useContext, useState } from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { DataContext } from './context/DataContext'

const App = () => {
  const {bgColor} = useContext(DataContext)

  return (
    <div className={`${bgColor} bg-no-repeat bg-cover`}>
      <NavBar />
      <Home />
    </div>
    
  )
}

export default App
