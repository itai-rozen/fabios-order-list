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
  priority?: 1|2|3,
  createdAt?: string,
  branch_id?: number,
  customer_id?: number,
  status?: string
}
export default function OrderForm({ setShowForm, orderDetails }: { setShowForm: Function, orderDetails?: OrderType }) {

  const {register, handleSubmit} = useForm<formInputsInterface>({
    defaultValues: {
      customer: orderDetails?.customer,
      branch: orderDetails?.branch,
      notes: orderDetails?.notes,
      source: orderDetails?.source,
      order_type: orderDetails?.order_type
    }
  })
  const queryClient = useQueryClient();

  const onEdit: SubmitHandler<formInputsInterface> = async (order: formInputsInterface) => {
    console.log('order details: ', orderDetails)
    order.id = orderDetails!.id;
    try {
      await EditOrderMutation(order);
    } catch(err) {
      console.log('err @onEdit: ', err)
    }
  }
  const onCreate: SubmitHandler<formInputsInterface> = async (order) => {
    order.id = crypto.randomUUID();
    order._id = getRandomInt(1, 9999999);
    order.priority = getRandomInt(1, 3) as 1|2|3;
    order.createdAt = new Date().toLocaleString();
    order.branch_id = getRandomInt(1, 999);
    order.customer_id = getRandomInt(1, 999);
    order.status = 'pending';
    try {
      await AddOrderMutation(order);
    } catch(err) {
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
    <button onClick={() => setShowForm(false)}>X</button>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">
        לקוח
        <input type="text"  {...register('customer', { required: true}) }  placeholder='לקוח שם מלא' />
      </label>
      <label htmlFor="">
        סניף
        <input type="text" {...register('branch', { required: true}) }  placeholder='סניף' />
      </label>
      <label htmlFor="">
        מקור הזמנה
        <input type="text" {...register('source', { required: true})}  placeholder='מקור הזמנה' />
      </label>
      <label htmlFor="">
        סוג הזמנה
        <input type="text" {...register('order_type')}  placeholder='סוג הזמנה' />
      </label>
      <label htmlFor="">
        הערות
        <textarea placeholder='הערות' {...register('notes')} cols={30} rows={10}></textarea>
      </label>
      <input type="submit" value="Submit" />
    </form>
  </div>
}