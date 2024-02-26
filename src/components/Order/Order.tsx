import { ReactNode, useState } from 'react'
import './order.css'
export interface OrderType {
  orderDetails: {
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
  },
  setExpandedOrder?: Function,
}

export default function Order({orderDetails, setExpandedOrder }:  OrderType): ReactNode {
  const [expand, setExpand] = useState<boolean>(false)
  return <label className={`order-container ${expand && 'expanded'}`}>
      <input type="checkbox" name="" id="" onChange={(e) => !!setExpandedOrder && setExpandedOrder( (e.target.checked ? orderDetails : undefined) )} />
      <div className="order customer-container">
        <h5>{orderDetails.customer}</h5>
        <small>{orderDetails.id}</small>
      </div>
      <p className='order'>{orderDetails.updated_at}</p>
      <p className='order'>{orderDetails.branch}</p>
      <p className="order status">{orderDetails.status}</p>
      <p className="order price">231.51</p>
      <p className='order arrow'> ⮜ </p>
      { expand && <>
        <p className="order">priority</p>
        <p className="order">{orderDetails.order_type}</p>
        <p className="order">{orderDetails.source}</p>
        <p className="order">{orderDetails.date}</p>
        <p className="order">{orderDetails.time}</p>
        <p className="order">{orderDetails.notes}</p>
      </>}
  </label>
}