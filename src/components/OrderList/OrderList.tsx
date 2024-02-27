import './order-list.css';
import { ReactNode, useState } from 'react';
import Order, { OrderType } from '../Order/Order';
import { data } from './../../data.json';
import { useQueryClient } from '@tanstack/react-query';


export default function OrderList(): ReactNode {
  const [exapandedOrder, setExpandedOrder] = useState<OrderType|undefined>(undefined)
  const queryClient = useQueryClient();
  return (
    <section className="order-list-container">
      <aside className={`aside ${exapandedOrder && 'expanded-order'}`}>
      { 
        exapandedOrder && <Order orderDetails={exapandedOrder as any} />
      }
      </aside>
      <main className='order-list'>
      {
        data.results.map(order => {
          return <Order key={order.id} setExpandedOrder={setExpandedOrder} orderDetails={order} />
        })
      }
      </main>

    </section>
  )}