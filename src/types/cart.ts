
export interface CartItem {
  id: number,
  image: string,
  title: string,
  price: number,
  quantity: number
}


export interface Cart {
  id: number
  userId: number
  date: string
  products: CartItem[]
}
