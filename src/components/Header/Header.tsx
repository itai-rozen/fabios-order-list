import OrderForm from '../OrderForm/OrderForm'
import './header.css'
import { useState } from 'react'

export default function Header() {
  const [showForm, setShowForm] = useState<boolean>(false)
  return <div className='header-container'>
    <div className="btn-container">
      <button onClick={() => setShowForm(true)}>add order +</button>
    </div>
    <div className="inputs-container">
      <input type="text" placeholder='free text' />
      <input type="datetime" name="" id="" placeholder='01/02/2024' />
      <select name="" aria-placeholder='filter' id=""></select>
    </div>
    {showForm && <OrderForm setShowForm={setShowForm} />}
  </div>
}