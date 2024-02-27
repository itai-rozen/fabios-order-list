import './order-list.css';
import { ReactNode, useState, useEffect } from 'react';
import Order, { OrderType } from '../Order/Order';
// import { data } from './../../data.json';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from './../../api';


export default function OrderList(): ReactNode {
  const { data: orders, isLoading} = useQuery({
    queryFn: () => getOrders(),
    queryKey: ["orders"]
  })
  const [exapandedOrder, setExpandedOrder] = useState<OrderType|undefined>(undefined)


  return (
    <section className="order-list-container">
      {isLoading && <div>Loading...</div>}
      <aside className={`aside ${exapandedOrder && 'expanded-order'}`}>
      { 
        exapandedOrder && <Order orderDetails={exapandedOrder as any} />
      }
      </aside>
      <main className='order-list'>
      {
        orders?.map((order:OrderType)  => {
          return <Order key={order.id} setExpandedOrder={setExpandedOrder} orderDetails={order} />
        })
      }
      </main>

    </section>
  )}