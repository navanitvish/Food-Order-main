export interface FoodItem {
  label: string;
  image: string;
  name: string;
  description: string;
  ingredients: string[];
  price: string;
  restaurantName: string;
}

export interface Dish {
  image: string;
  name: string;
  _id: string;
  type: string;
}

export interface DishType {
  description: string;
  image: string;
  ingredients: string[];
  label: string;
  name: string;
  price: string;
  restaurantName: string;
  index: number;
}

export interface DishTypeProps {
  description: string;
  image: string;
  ingredients: string[];
  label: string;
  name: string;
  price: string;
  restaurantName: string;
  index: number;
}

//for getting menu
export interface CardMenuResturantDataType {
  _id?: string;
  name?: string;
  address?: string;
  phone?: string;
  owner?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface CardMenuCategoryDataType {
  _id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface CardAllMenuDataType {
  _id?: string;
  restaurantId?: CardMenuResturantDataType;
  name?: string;
  description?: string;
  price?: number;
  category?: CardMenuCategoryDataType;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
  label?: string;
  image?: string;
  ingredients?: string[];
}

export interface CardAllMenuResponseType {
  success?: boolean;
  data?: CardAllMenuDataType[];
}

//getting menuse base on category id
export interface CardMenuByCategoryIdDataType {
  _id?: string;
  restaurantId?: CardMenuResturantDataType;
  name?: string;
  description?: string;
  price?: number;
  category?: CardMenuCategoryDataType;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
  label?: string;
  image?: string;
  ingredients?: string[];
}

export interface CardMenuByCategoryIdResponseType {
  success?: boolean;
  data?: CardMenuByCategoryIdDataType[];
}

//categories
export interface CategoryAllDataType {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryAllResponseType {
  success?: boolean;
  data?: CategoryAllDataType[];
}

//order means user will order dishes
export interface OrderItemData {
  menuItemId?: string;
  price?: number;
  quantity?: number;
}
export interface OrderSendingPostType {
  userId?: string;
  resturent?: string;
  items?: OrderItemData[];
  address?: string;
  totalAmount?: number;
  status?: string;
}

export interface MutationOrderPostType {
  path: string;
  method: "post";
  data: OrderSendingPostType;
}

//singleMenu item data type
export interface SingleItemDataType {
  menuItemId: string;
  price: number;
  quantity: number;
  _id: string;
}
export interface OrderResponseDataType {
  userId: string;
  resturent: string;
  items: SingleItemDataType[];
  address: string;
  totalAmount: number;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface OrderResponse {
  success: boolean;
  message: string;
  data: OrderResponseDataType;
}

//pagination
export interface PaginationProps<T> {
  currentPage: number;
  apiData: T[];
  itemsPerPage: number;
  handleClick: (pageNumber: number) => void;
}
