import './order-list.css';
import { ReactNode, useState } from 'react';
import Order, { OrderType } from '../Order/Order';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from './../../api';
import OrderHeaders from '../OrderHeaders/OrderHeaders';


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
        exapandedOrder && <Order orderDetails={exapandedOrder} isExpanded={true}  setExpandedOrder={setExpandedOrder}/>
      }
      </aside>
      <main className='order-list'>
      <OrderHeaders />
      {
        orders?.map((order:OrderType)  => {
          return <Order key={order.id} setExpandedOrder={setExpandedOrder} isExpanded={false} expandOrderId={exapandedOrder?.id} orderDetails={order} />
        })
      }
      </main>

    </section>
  )}