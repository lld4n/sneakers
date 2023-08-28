export type ItemFromAPI = {
  id: string;
  title: string;
  price: number;
  images: string[];
  sizes: number[];
  description: string;
  brand: string;
};

export type cartItem = {
  id: number;
  image: string;
  title: string;
  price: number;
  size: number;
};

export interface cartState {
  cart: cartItem[];
  fullname: string;
  phone: string;
  subtotal: number;
}
