import {ImageSourcePropType} from 'react-native';

export type Order = {
  id: string;
  orderId: string;
  price: number;
  status: 'active' | 'complete' | 'cancel';
  imageUrl: any;
  rating: number;
  address:any,
  coupon:any,
  totalAmount:number;

};

export type FilterType =
  | 'all'
  | 'active'
  | 'complete'
  | 'cancel'
  |'pending'
  | 1
  | 2
  | 3
  | 4
  | 5;




export interface AddOn {
    name: string;
    price: number;
  }
  
  export interface CartItem {
    id: string;
    name: string;
    image: any;
    newPrice: any;
    oldPrice: any;
    quantity: number;
    addOns: {   name: string;
      price: number;}[];
    type: any;
    description: any;
    dietry: any;
    dishtype: any;
    ingredient: any;
    rating: any;
    restaurantId: any;
    price:number;
    discountedPrice?:number;
    originalPrice?:any

  }
  
  export interface CartState {
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    discount: number;
    totalPrice: number;
  }