import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataContextProvider } from './context/DataContext.jsx'
import React from 'react'

createRoot(document.getElementById('root')).render(
   <DataContextProvider>
      <App />
   </DataContextProvider>
   
)
