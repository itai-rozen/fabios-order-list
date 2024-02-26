import { useState, useEffect } from 'react'
import {data} from './data.json'
import './App.css'
import OrderList from './components/OrderList/OrderList'
import Header from './components/Header/Header'

function App() {
  useEffect(() => {
    console.log('data:', data)
  }, [])
  return (
    <div className='app-container'>
      <Header />
      <OrderList />
    </div>
  )
}

export default App
