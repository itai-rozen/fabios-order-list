import { useState, useEffect } from 'react'
import {data} from './data.json'
import './App.css'
import OrderList from './components/OrderList/OrderList'

function App() {
  useEffect(() => {
    console.log('data:', data)
  }, [])
  return (
    <>
      <OrderList />
    </>
  )
}

export default App
