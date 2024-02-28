import { ReactNode, useState } from 'react';
import './order.css';
import edit from './../../assets/edit.svg';
import trash from './../../assets/trash.svg';
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder } from '../../api';
import OrderForm from '../OrderForm/OrderForm';
import OrderHeaders from '../OrderHeaders/OrderHeaders';
export interface OrderType {
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
}

export default function Order({ orderDetails, setExpandedOrder, isExpanded }: { orderDetails: OrderType, setExpandedOrder: Function, isExpanded: boolean }): ReactNode {
  const [showForm, setShowForm] = useState<boolean>(false);

  const clientQuery = useQueryClient();
  const { mutateAsync: deleteOrderMutate } = useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: () => {
      alert('deleted succesfully');
      clientQuery.invalidateQueries(['orders'] as InvalidateQueryFilters);
    },
  })

  const formatDate = (date:number) => date
  return (
    <>
      <div className="order-wrapper">
        <div className={`action-btn-container ${isExpanded && 'expanded'}`}>
          <button className='action-btn red-bg' onClick={() => deleteOrderMutate(orderDetails.id)}><img width={15} src={trash} alt='Delete' /></button>
          <button className='action-btn green-bg' onClick={() => setShowForm(true)}><img width={15} src={edit} alt='Edit' /></button>
        </div>
        <label className={`order-container ${isExpanded && 'expanded'}`} >
          {
            isExpanded ? <>
              <div>
                <OrderHeaders isExpanded={true} />
              </div>
              <div>
                <p className="order">{formatDate(orderDetails.date)}</p>
                <p className="order">priority</p>
                <p className='order'>{orderDetails.branch}</p>

                <p className="order">{orderDetails.order_type}</p>
                <p className="order">{orderDetails.source}</p>
                <p className='order'>{orderDetails.createdAt.slice(0, 10)}</p>

                <p className="order">{orderDetails.time}</p>
                <p className="order">{orderDetails.notes}</p>
              </div>
            </> : <>
              <input
                type="checkbox"
                className="order-checkbox"
                onChange={(e) => !!setExpandedOrder && setExpandedOrder((e.target.checked ? orderDetails : undefined))}
              />
              <div className="order customer-container">
                <h5>{orderDetails.customer}</h5>
                <small>{orderDetails._id}</small>
              </div>
              <p className='order'>{orderDetails.createdAt.slice(0, 10)}</p>
              <p className='order'>{orderDetails.branch}</p>
              <p className="order status">{orderDetails.status}</p>
              <p className="order price">231.51</p>
              <p className='order arrow'> ⮜ </p>
            </>
          }
        </label>
      </div>
      {
        showForm && <OrderForm orderDetails={orderDetails} setShowForm={setShowForm} />
      }
    </>
  )

}