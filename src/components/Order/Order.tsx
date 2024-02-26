import { useState } from 'react'
import { JSX } from 'react'
export interface OrderType {
  id: number,
  date: string,
  time: string,
  notes: string,
  prediction: boolean,
  branch: string,
  branch_id: number,
  order_type: string|null,
  event_id: number|null,
  recurrence: number,
  customer: string,
  customer_id: number,
  num_of_guests: number|null,
  source: string,
  created_at: string,
  updated_at: string,
  status: string
}

export default function Order({orderDetails}: { orderDetails: OrderType}):JSX.Element {
  return <div className='order-container'>
      <p className="order customer-container">
        <h5>{orderDetails.customer}</h5>
        <small>{orderDetails.id}</small>
      </p>
      <p className='order'>{orderDetails.updated_at}</p>
      <p className='order'>{orderDetails.branch}</p>
      <p className="order status">{orderDetails.status}</p>
      <p className="order price">231.51</p>
  </div>
}