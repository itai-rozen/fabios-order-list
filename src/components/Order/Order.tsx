import { ReactNode, useState } from 'react'
import './order.css'
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder } from '../../api';
export interface OrderType {
  orderDetails: {
    createdAt: string,
    customer: string,
    userName: string,
    notes: string,
    branch: string,
    customer_id: number,
    date: number,
    priority: number,
    branch_id: number,
    source: string,
    status: string,
    _id: number,
    id: string,
    time: string,
    order_type: string,
  },
  setExpandedOrder?: Function,
}

export default function Order({orderDetails, setExpandedOrder }:  OrderType): ReactNode {
  const [expand, setExpand] = useState<boolean>(false)
  const clientQuery = useQueryClient();
  const { mutateAsync: deleteOrderMutate } = useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: () => {
      alert('deleted succesfully')
      clientQuery.invalidateQueries(['orders'] as InvalidateQueryFilters)
    },
  }) 
  return <label className={`order-container ${expand && 'expanded'}`}>
      <button onClick={() => deleteOrderMutate(orderDetails.id)}>X</button>
      <input type="checkbox" name="" id="" onChange={(e) => !!setExpandedOrder && setExpandedOrder( (e.target.checked ? orderDetails : undefined) )} />
      <div className="order customer-container">
        <h5>{orderDetails.customer}</h5>
        <small>{orderDetails.id}</small>
      </div>
      <p className='order'>{orderDetails.createdAt}</p>
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