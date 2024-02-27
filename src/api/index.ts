import { formInputsInterface } from "../components/OrderForm/OrderForm";

const URL = 'https://61c2ed619cfb8f0017a3e77d.mockapi.io/contacts'
export async function getOrders() {
  const res =   await (await fetch(URL)).json()
  return res
}

export async function createOrder(req: any) {
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify(req);
  try {
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

export async function editOrder(orderDetails: formInputsInterface) {
  const orderId = orderDetails.id;
  const body = JSON.stringify(orderDetails);
  const method = 'PUT';
  const headers = {
    'Content-Type': 'application/json'
  };
  try {
    await fetch( `${URL}/${orderId}`, {body, method, headers});
  } catch(err) {
    console.log('err @editOrder(): ',err);
  }
}