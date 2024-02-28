import { ReactNode } from 'react';
import './order-headers.css'


export default function OrderHeaders(): ReactNode {
  return (
    <div className='order-list-headers no-mobile'>
      <p></p>
      <p>הזמנה</p>
      <p>תאריך</p>
      <p>סניף</p>
      <p>סטטוס</p>
      <p>מחיר</p>
      <p></p>
    </div>
)}