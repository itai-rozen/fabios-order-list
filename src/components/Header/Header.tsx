import OrderForm from '../OrderForm/OrderForm'
import './header.css'
import { useState } from 'react'

export default function Header() {
  const [showForm, setShowForm] = useState<boolean>(false)
  return <div className='header-container'>
    <button className='add-btn' onClick={() => setShowForm(true)}>הוספת הזמנה +</button>
    <div className="inputs-wrapper">
      <div className='inputs-container'>
        <input type="text" placeholder='free text' />
        <input type="datetime" name="" id="" placeholder='01/02/2024' />
      </div>
      <select name="" aria-placeholder='filter' id=""></select>
    </div>
    {showForm && <OrderForm setShowForm={setShowForm} />}
  </div>
}