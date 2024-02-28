import OrderForm from '../OrderForm/OrderForm';
import './header.css';
import { useState } from 'react';
import close from './../../assets/close.svg';
import search from './../../assets/search.svg';
import filter from './../../assets/filter.svg';
import calendar from './../../assets/calendar.svg';
import settings from './../../assets/settings.svg';
import arrowDown from './../../assets/arrowDown.svg';
import threeDots from './../../assets/threeDots.svg';


export default function Header() {
  const [showForm, setShowForm] = useState<boolean>(false)
  return <>
  <div className='mobile-header-wrapper only-mobile'>
    <div className="mobile-header-container only-mobile">
      <div className="mobile-dots"><img src={threeDots} alt="mobile menu" width={15} /></div>
      <div className="mobile-tab green">כל ההזמנות</div>
      <div className="mobile-tab">ספקים</div>
      <div className="mobile-tab">ליקוט</div>
    </div>
    <div className="input-container">
        <img src={settings} alt="settings" width={15} />
        <input type="text" placeholder='28.02.24 - 28.02.24' />
        <img src={calendar} alt="calendar" width={15} />
    </div>
  </div>
  <div className='header-container no-mobile'>
    <div>
      <button className='add-btn' onClick={() => setShowForm(true)}>הוספת הזמנה +</button>
      <p></p>
    </div>
    <div className="inputs-wrapper">
      <div className='inputs-container'>
        <div className="input-container">
          <img src={settings} alt="settings" width={15} />
          <input type="text" placeholder='חיפוש חופשי...' />
          <img src={search} alt="search" width={15} />

        </div>
        <div className="input-container">
          <img src={close} alt="close" width={15} />
          <input type="text" placeholder='01/02/2024' />
          <img src={calendar} alt="calendar" width={15} />
        </div>
      </div>
      <div className="input-container" style={{width: '50%', justifyContent: 'space-between', paddingRight: '13px'}}>
        <p style={{borderRight: '1px solid var(--light-color)', height: '100%', lineHeight:'2.5', paddingRight: '0.5em'}}><img src={arrowDown} alt="arrow down" width={15} /></p>
        <p style={{width: '90%',textAlign: 'right', paddingRight: '1em'}}>סינון</p>
        <p><img src={filter} alt="filter" width={15} /></p>
      </div>
    </div>
    {showForm && <OrderForm setShowForm={setShowForm} />}
  </div>
  </>
}