export interface FormInputsInterface {
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
