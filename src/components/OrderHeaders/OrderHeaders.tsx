import { ReactNode } from 'react';
import './order-headers.css'


export default function OrderHeaders({ isExpanded }: { isExpanded: boolean }): ReactNode {
  return (
    <div className={`order-list-headers ${isExpanded && 'expanded'}`}>
      <p></p>
      {
        isExpanded ? <>
          <p>תאריך אספקה</p>
          <p>דחיפות</p>
          <p>סניף</p>
          <p>סוג הזמנה</p>
          <p>מקור ההזמנה</p>
          <p>תאריך יצירה</p>
          <p>שעת יצירה</p>
          <p>הערות</p>
        </> : <>
          <p>הזמנה</p>
          <p>תאריך</p>
          <p>סניף</p>
          <p>סטטוס</p>
          <p>מחיר</p>
        </>
      }


      <p></p>
    </div>
  )
}