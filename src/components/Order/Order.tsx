import { ReactNode, useState } from 'react';
import './order.css';
import edit from './../../assets/edit.svg';
import trash from './../../assets/trash.svg';
import refresh from './../../assets/refresh.svg';
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder } from '../../api';
import OrderForm from '../OrderForm/OrderForm';
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
  price: number,
  content: string,
}

export default function Order({ orderDetails, setExpandedOrder, isExpanded, expandOrderId }: { orderDetails: OrderType, setExpandedOrder: Function, isExpanded: boolean, expandOrderId?: string | undefined }): ReactNode {
  const [showForm, setShowForm] = useState<boolean>(false);
  const clientQuery = useQueryClient();
  const { mutateAsync: deleteOrderMutate } = useMutation({
    mutationFn: (orderId: string) => deleteOrder(orderId),
    onSuccess: () => {
      alert('deleted succesfully');
      clientQuery.invalidateQueries(['orders'] as InvalidateQueryFilters);
    },
  })

  const formatDate = (date: number) => date;
  const getStatusColor = (status: string): string => {
    if (status === 'ממתין לאישור')
      return 'await-approve';
    if (status === 'בוצע')
      return 'completed';
    if (status === 'מאושר')
      return 'approved';
    if (status === 'מבוטל')
      return 'cancelled';
    return '';
  }
  return (
    <>
      <div className="order-wrapper">
        <div className={`action-btn-container no-mobile ${isExpanded && 'expanded'}`}>
          <button className='action-btn red-bg' onClick={() => deleteOrderMutate(orderDetails.id)}><img width={15} src={trash} alt='Delete' /></button>
          <button className='action-btn green-bg' onClick={() => setShowForm(true)}><img width={15} src={edit} alt='Edit' /></button>
        </div>
        <label className={`order-container ${isExpanded && 'expanded'}`} >
          {
            isExpanded ? <>
              <div className="mobile-expanded-header only-mobile">
                <div>

                  <input
                    type="checkbox"
                    className="order-checkbox no-mobile"
                    id="order-mobile-checkbox"
                    checked={isExpanded}
                    onChange={(e) => setExpandedOrder((e.target.checked ? orderDetails : undefined))}
                  />
                  <label className='order-checkbox-label only-mobile'
                    htmlFor="order-mobile-checkbox" >
                    {'➔'}
                  </label>
                  <button className="add-btn">שמור שינויים</button>
                </div>
                <div>
                  <h4>{orderDetails.content}</h4>
                  <button className='refresh-btn'><img src={refresh} alt="refresh" width={15} /></button>
                </div>
                <div className="mobile-expanded-item-list">
                  <p>רשימת פריטים</p>
                  <p style={{borderBottom: '2px solid #AFD9B4'}}>פרטי הזמנה</p>
                </div>
              </div>
              <div className='expanded-order-headers'>
                <p>תאריך אספקה</p>
                <p>דחיפות</p>
                <p>סניף</p>
                <p>סוג הזמנה</p>
                <p>מקור ההזמנה</p>
                <p>תאריך יצירה</p>
                <p>שעת יצירה</p>
                <p>הערות</p>
              </div>
              <div>
                <p className="order">{formatDate(orderDetails.date)}</p>
                <p className="order">priority</p>
                <p className='order'>{orderDetails.branch}</p>
                <p className="order">{orderDetails.order_type}</p>
                <p className="order">{orderDetails.source}</p>
                <p className='order'>{orderDetails.createdAt.slice(0, 10)}</p>
                <p className="order">{orderDetails.createdAt.slice(11, 19)}</p>
                <p className="order">{orderDetails.notes}</p>
              </div>
            </> : <>
              <input
                type="checkbox"
                className="order-checkbox"
                checked={!!expandOrderId && (expandOrderId === orderDetails.id)}
                onChange={(e) => setExpandedOrder((e.target.checked ? orderDetails : undefined))}
              />
              <div className="order customer-container no-mobile">
                <h5>{orderDetails.customer}</h5>
                <small>{orderDetails._id}</small>
              </div>
              <p className='order date'>{orderDetails.createdAt.slice(0, 10)}</p>
              <p className='order no-mobile'>{orderDetails.branch}</p>
              <p className={`order status ${getStatusColor(orderDetails.status)}`}>{orderDetails.status}</p>
              <p className="order price">{orderDetails.price}₪</p>
              <p className="order id only-mobile">{orderDetails._id}</p>
              <p className="order content only-mobile">{orderDetails.content || ''}</p>
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