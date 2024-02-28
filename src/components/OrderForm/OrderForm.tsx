import './order-form.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createOrder, editOrder } from '../../api'
import { getRandomInt } from '../../utils'
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query'
import { OrderType } from '../Order/Order'

export interface formInputsInterface {
  customer: string,
  branch: string,
  source: string,
  order_type: string,
  notes: string,
  id: string,
  _id?: number,
  priority?: 1 | 2 | 3,
  createdAt?: string,
  branch_id?: number,
  customer_id?: number,
  content: string,
  status?: string,
  price?: number
}
export default function OrderForm({ setShowForm, orderDetails }: { setShowForm: Function, orderDetails?: OrderType }) {
  const { register, handleSubmit } = useForm<formInputsInterface>({
    defaultValues: {
      customer: orderDetails?.customer,
      branch: orderDetails?.branch,
      notes: orderDetails?.notes,
      source: orderDetails?.source,
      order_type: orderDetails?.order_type,
      status: orderDetails?.status || 'מבוטל',
      content: orderDetails?.content
    }
  })
  const queryClient = useQueryClient();

  const onEdit: SubmitHandler<formInputsInterface> = async (order: formInputsInterface) => {
    console.log('order details: ', order)
    order.id = orderDetails!.id;
    try {
      await EditOrderMutation(order);
    } catch (err) {
      console.log('err @onEdit: ', err)
    }
  }
  const onCreate: SubmitHandler<formInputsInterface> = async (order) => {
    const statusOptions = ['ממתין לאישור', 'בוצע', 'מאושר', 'מבוטל']

    order.id = crypto.randomUUID();
    order._id = getRandomInt(1, 9999999);
    order.priority = getRandomInt(1, 3) as 1 | 2 | 3;
    order.createdAt = new Date().toLocaleString();
    order.branch_id = getRandomInt(1, 999);
    order.customer_id = getRandomInt(1, 999);
    order.status = statusOptions[getRandomInt(0,4)] || 'מבוטל';
    try {
      await AddOrderMutation(order);
    } catch (err) {
      console.log('err @OrderForm.onSubmit(): ', err);
    }
  }
  const onSubmit: SubmitHandler<formInputsInterface> = (orderDetails) ? onEdit : onCreate;

  const { mutateAsync: EditOrderMutation } = useMutation({
    mutationFn: editOrder,
    onSuccess: () => {
      alert('הזמנה עודכנה בהצלחה')
      setShowForm(false)
      queryClient.invalidateQueries(["orders"] as InvalidateQueryFilters)
    }
  })
  const { mutateAsync: AddOrderMutation } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      alert('הזמנה נוספה בהצלחה')
      setShowForm(false)
      queryClient.invalidateQueries(["orders"] as InvalidateQueryFilters)
    }
  })

  return <div className='form-container'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <button className='close-btn' onClick={() => setShowForm(false)}>X</button>
      <div>
        <input type="text" id="customer" {...register('customer', { required: true })} placeholder='לקוח שם מלא' />
        <label htmlFor="customer">לקוח</label>
      </div>
      <div>
        <input type="text" id="branch" {...register('branch', { required: true })} placeholder='סניף' />
        <label htmlFor="branch">סניף</label>
      </div>
      <div>
        <input type="text" id='source' {...register('source', { required: true })} placeholder='מקור הזמנה' />
        <label htmlFor="source">מקור הזמנה</label>
      </div>
      <div>
        <input type="text" id='order_type' {...register('order_type')} placeholder='סוג הזמנה' />
        <label htmlFor="order_type">סוג הזמנה</label>
      </div>
      <div>
        <input type="text" id='content' {...register('content')} placeholder='תוכן הזמנה' />
        <label htmlFor="content"> תוכן ההזמנה</label>
      </div>
      <div>
        <textarea placeholder='הערות' id="notes" {...register('notes')} cols={30} rows={10}></textarea>
        <label htmlFor="notes">הערות</label>
      </div>
      <button className='submit-btn' type="submit" >סיימתי</button>
    </form>
  </div>
}