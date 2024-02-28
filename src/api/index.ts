import { FormInputsInterface } from "../interfaces"; 
import { z } from "zod";
const URL = 'https://61c2ed619cfb8f0017a3e77d.mockapi.io/contacts'
export async function getOrders() {
  const res =  await (await fetch(URL)).json()
  return res
}

export async function createOrder(req: any) {
  const NewOrderSchema = z.object({
    customer: z.string(),
    branch: z.string(),
    notes: z.string(),
    source: z.string(),
    order_type: z.string(),
    content: z.string(),
    status: z.string()
  })
  try {
    const validatedOrder = NewOrderSchema.safeParse(req)
    console.log('validated order:' , validatedOrder)
    if (!validatedOrder.success)
      throw new Error(validatedOrder.error.message)
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify( validatedOrder.success && validatedOrder.data);

    const res = await fetch(URL, {body, method, headers});
    console.log('res: ', res)
  } catch(err) {
    console.log('err @createOrder: ', err);
  }
}

export async function deleteOrder(id: string) {
  const method = 'DELETE';
  console.log('delete id: ', id)
  const headers = {
    'Content-Type': 'application/json'
  };
  try {
    await fetch(`${URL}/${id}`, {method, headers});
  } catch(err) {
    console.log('err @deleteOrder: ', err)
  }
}

export async function editOrder(orderDetails: FormInputsInterface) {
  const EditOrderSchema = z.object({
    id: z.string(),
    customer: z.string(),
    branch: z.string(),
    notes: z.string(),
    source: z.string(),
    order_type: z.string(),
    content: z.string(),
    status: z.string()
  })
  try {
    const validatedOrder = EditOrderSchema.safeParse(orderDetails)
    if (!validatedOrder.success)
      throw new Error(validatedOrder.error.message);

    const orderId = orderDetails.id;
    const body = JSON.stringify(validatedOrder.data);
    const method = 'PUT';
    const headers = {
      'Content-Type': 'application/json'
    };

    await fetch( `${URL}/${orderId}`, {body, method, headers});
  } catch(err) {
    console.log('err @editOrder(): ',err);
  }
}