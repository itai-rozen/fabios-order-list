import './order-list.css'
import { ReactNode } from 'react'
import Order from '../Order/Order'
import {data} from './../../data.json'
export default function OrderList():ReactNode {
  
  return (
    <main className='order-list-container'>
      {
        data.results.map(order => {
          return <Order orderDetails={order} />
        })
      }
    </main>
  )}