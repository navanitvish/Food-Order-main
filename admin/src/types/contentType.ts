import { Dispatch, SetStateAction } from "react";

export interface ApiPaginationValues {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
export interface ApiStoreWiseReportPaginationValues {
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  limit: number;
}

//user form data update data
export interface UserType {
  name: string;
  mobileNo: string;
  rDate: string;
  location: string;
  city: string;
  country: string;
  role: string;
}

// export interface FoodItem {
//   label: string;
//   imageSrc: string;
//   name: string;
//   description: string;
//   ingredients: string[];
//   price: string;
//   restaurantName: string;
// }

//get dish
export interface Dish {
  image: string;
  dishName: string;
  id: string;
  type: string;
}

export interface DishType {
  description: string;
  imageSrc: string;
  ingredients: string[];
  label: string;
  name: string;
  price: string;
  restaurantName: string;
  index: number;
}

// export interface DishTypeProps {
//   description: string;
//   imageSrc: string;
//   ingredients: string[];
//   label: string;
//   name: string;
//   price: string;
//   restaurantName: string;
// }

export interface FoodItem {
  label: string;
  image: string;
  name: string;
  description: string;
  ingredients: string[];
  price: string;
  restaurantName: string;
}

// export interface Restaurant {
//   name: string;
//   address: string;
//   rating: number;
//   openingHours: string;
//   contact: number;
//   cuisineType: string;
//   menuItems: number; // Placeholder for the number of menu items

// }

export interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

export interface Order {
  orderId: string;
  userId: string;
  restaurantName: string;
  customerName: string;
  customerAddress: string;
  customerContact: string;
  orderItems: OrderItem[];
  totalPrice: string;
  orderStatus: string;
  orderDate: string;
}

export interface RegistrationDate {
  date: string;
}

//user data get

export type ListUserProfileHeadingItem = {
  heading: string;
  key: string;
};

export interface LocationData {
  address: string;
  city: string;
  country: string;
  state: string;
  userId: string;
  zipCode: string;
  _id: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
  dob: string;
  gender: string;
  lastLogin: string;
  isVerified: boolean;
  resetPasswordLink: string;
  otp: string;
  otpexpire: string;
  location: LocationData;
  avatar: string;
  role: string;
  resetLink: string;
  registrationDate: string;
  createdAt: string;
  status: string;
  isSelfRegistered: boolean;
  address: string;
}
export interface UserCreatSendingData {
  name: string;
  email: string;
  role: string;
}

export interface UserResponseData {
  data: UserData[];
  pagination: ApiPaginationValues;
}
export interface UserProfileResponseData {
  data: UserData;
}

export interface MutationObjectUserType {
  path: string;
  condition: "creat" | "update";
  data: UserCreatSendingData;
}

//user state types
export interface UserProfileType {
  isOpen?: boolean;
  userProfile?: UserData;
}

//order get data

export interface AditionalOption {
  name: string;
  price: number;
  _id: string;
}

export interface MenuItemId {
  name: string;
  price: string;
  _id: string;
  // "nutritionalInfo": string[],
  favorites: string[];
  restaurantId: {
    _id: string;
    name: string;
    address: string;
    rating: number;
  };
  dishtype: string;
  image: string;
  description: string;
  category: string;
  dietry: string;
  ingredient: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  rating: number;
  additionalOption: AditionalOption[];
  label: string;
  specialOffer: boolean;
  specialOfferPrice: number;
}

export interface ItemData {
  menuItemId: MenuItemId;
  quantity: number;
  // name: string;

  price: number;

  image: string;

  star: number;
  totalprice: number;
}
export interface UserId {
  name: string;
  avatar: string;
  email: number;
  _id: string;
}

export interface ResturantTypeData {
  _id: string;
  name: string;
  address: string;
  phone: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderData {
  _id: string;
  orderId: string;
  deliveredBy: string;
  userId: UserId;
  items: ItemData[];
  totalAmount: number;
  status: string;
  restaurant: ResturantTypeData;
  coupon: {
    couponcode: {
      type: string;
    };
    percent: {
      type: number;
    };
    category: {
      type: string;
    };
  };
  orderStatus: string;
  deliveredAt: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  averageRating: string;
}

export interface OrderResponseData {
  data: OrderData[];
  pagination: ApiPaginationValues;
}

//for update order by resturant
export interface SingleOrderResponseData {
  data: OrderData;
}

export interface OrderUpdateDataSend {
  orderStatus: string;
}

export interface MutationObjectOrderUpdateType {
  path: string;

  data: OrderUpdateDataSend;
}

//resturant  data

// interface Owner {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   mobile: string;
//   isVerified: boolean;
//   otp: string;
//   role: string;
//   registrationDate: string;
//   resetPasswordLink: string;
// }

//getting and for profile
export interface RestaurantData {
  _id: string;
  name: string;
  address: string;
  contact: number;
  menuitem: number;

  openinghour: string;
  rating: number;
  description: string;
  image: string;
  cuisine: string;
  owner?: string;
  // owner?: Owner;
  createdAt: string;
  updatedAt: string;
  resturantCategory: CategoryData;
  recomended: boolean;
  selfPickup: boolean;
  openingTime: string;
  closingTime: string;
  type: string;
  location: {
    type: "Point";
    coordinates: [number, number]; //longitude , latitude
  };
}

export interface RestaurantResponseData {
  data: RestaurantData[];
  pagination: ApiPaginationValues;
}
export interface RestaurantResponseSingleData {
  data: RestaurantData;
}
export interface RestaurantResponseDataProfile {
  data: RestaurantData;
}

//Resturant form state type
export interface Restaurant {
  name: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number]; //longitude , latitude
  };
  rating: number;
  openingHours: string;
  contact: number;
  cuisineType: string;
  menuItems: number;
  description: string;
  owner: string;
  image: string;
  recomended: boolean;
  selfPickup: boolean;
  openingTime: string;
  closingTime: string;
  multiImage: string[];
  resturantCategory: {
    name: string;
    id: string;
  };
  type: string;
}

export interface DropDown {
  cuisineType: boolean;
}

//Resturant Post/Put Send Data Type
export interface ResturantSendingPostType {
  name: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number]; //longitude , latitude
  };
  rating: number;
  openinghour: string;
  contact: number;
  cuisine: string;
  menuitem: number;
  description: string;
  owner: string;
  image: string[];
  recomended: boolean;
  selfPickup: boolean;
  openingTime: string;
  closingTime: string;
  resturantCategory: string;
  type: string;
}

export interface MutationObjectResturantType {
  path: string;
  condition: "creat" | "update";
  data: ResturantSendingPostType;
}

export interface ResturantPostResponseDataType {
  address: string;
  contact: number;
  createdAt: string;
  cuisine: string;
  description: string;
  menuitem: number;
  name: string;
  openinghour: string;
  owner: string;
  rating: number;
  updatedAt: string;
  _id: string;
}

export interface ResturantPostResponseType {
  success?: boolean;
  message?: string;
  data?: ResturantPostResponseDataType;
}

//post

//delet
export interface RestaurantDelet {
  path: string;
}

export interface RestaurantDeletObject {
  deletObj: RestaurantDelet;
}

//Menue/Dish Types

//this type for get method types for menu/dish
//getting same for resturant profile getting items
export interface ResturantDataInMenu {
  address: string;
  createdAt: string;
  name: string;
  owner: string;
  phone: string;
  updatedAt: string;
  _id: string;
}

export interface AdditionalOptionType {
  name: string;
  price: number;
}
export interface MenuData {
  _id: string;
  restaurantId: ResturantDataInMenu;
  name: string;
  description: string;
  price: number;
  category: CategoryData;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  label: string;
  dietry: string;
  ingredient: string;
  image: string;
  specialOffer: boolean;
  recommended: boolean;
  specialOfferPrice: number;
  additionalOption: AdditionalOptionType[];
}

//this types for post and put method type for menu/dish

export interface AditionalOptionSendPost {
  name: string;
  price: number;
}
export interface DishSendingPostType {
  restaurantId: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  label: string;
  dietry: string;
  ingredient: string;
  available: boolean;
  recommended: boolean;
  specialOffer: boolean;
  specialOfferPrice: number;
  additionalOption: AditionalOptionSendPost[];
}

export interface MutationObjectDishType {
  path: string;
  condition: "creat" | "update";
  data: DishSendingPostType;
}
export interface MutationObjectBannerType {
  path: string;
  condition: "creat" | "update";
  data: FormBanner;
}
export interface DishPostResponseDataType {
  available: boolean;
  category: string;
  createdAt: string;
  description: string;
  dietry: string;
  image: string;

  ingredient: string;
  label: string;
  name: string;
  price: number;
  restaurantId: string;
  updatedAt: string;
  _id: string;
}
export interface BannerPostResponseDataType {
  createdAt: string;
  description: string;
  image: string;
  name: string;
  updatedAt: string;
  _id: string;
}
export interface DishPostResponseType {
  success?: boolean;
  message?: string;
  data?: DishPostResponseDataType;
}
export interface BannerPostResponseType {
  success?: boolean;
  message?: string;
  data?: BannerPostResponseDataType;
}
//dish form state type
export interface DishUni {
  name: string;
  id: string;
}
export interface FormDishType {
  description: string;
  imageSrc: string;
  ingredients: string[];
  label: string;
  dietaryRestriction: string;
  name: string;
  price: number;
  restaurant: DishUni;
  category: DishUni;
  image: string;
  available: boolean;
  specialOffer: boolean;
  recommended: boolean;
  specialOfferPrice: number;
  additionalOption: AdditionalOptionType[];
}

export interface FormBanner {
  description: string;
  restaurantId: string;
  name: string;
  image: string;
}
export interface BannerDishType {
  description: string;
  imageSrc: string;
  name: string;
  image: string;
}
export type FormDishArrayFields = "ingredients";

// export interface CategorySendingPostType {
//   name: string;
//   image: string;
// }
// export interface MutationObjectCategoryType {
//   path: string;
//   condition: "creat" | "update";
//   data: CategorySendingPostType;
// }

export interface MenuDataResponse {
  data: MenuData[];
  pagination: ApiPaginationValues;
}
export interface SingleMenuDataResponse {
  data: MenuData;
}

export interface ReviewDataResponse {
  data: ReviewData[];
}
export interface ReviewData {
  _id: string;
  menuId: MenuData;
  star: number;
  userId: UserId;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
export interface bannerData {
  _id: string;
  name: string;
  image: string;
  restaurantId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// export interface ResturantMenuDataResponse {
//   resturantMenueData: MenuData[];
// }

//Category get data Types
export interface CategoryData {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponseData {
  data: CategoryData[];
  pagination: ApiPaginationValues;
}

//single Category get data type
export interface SingleCategoryData {
  _id: string;

  name: string;

  createdAt: string;
  updatedAt: string;
}

export interface SingleCategoryResponseData {
  data: SingleCategoryData;
}

//delet respose category type

//response data

//providing props data for delet api
export interface CategoryDelet {
  path: string;
  methodApi: string;
}

export interface CategoryDeletObject {
  deletObj: CategoryDelet;
}

//update or creat category
//response data for creat
//response data fro update

//providing props data for creat api
export interface CreatCategoryObject {
  name: string;
  type: string;
}
//providing props data for update api
export interface CreatCategoryObject {
  name: string;
  type: string;
}

//category
export interface CategoryFormState {
  creat: boolean;
  updateId: string;
  updateData: CategoryData | null; // Adjust this type based on the actual structure of updateData
}

//this for category form state
export interface FormCategoryStateType {
  categoryName: string;
  imageSrc: string;
  image: string;
}

//this types for post and put method type for Category

export interface CategorySendingPostType {
  name: string;
  image: string;
}
export interface MutationObjectCategoryType {
  path: string;
  condition: "creat" | "update";
  data: CategorySendingPostType;
}

export interface CategoryPostResponseDataType {
  name: string;
  image: string;
  _id: string;
}

export interface CategoryPostResponseType {
  success?: boolean;
  message?: string;
  data?: CategoryPostResponseDataType;
}

//for delete operation
//state type
export interface DeleteStateType {
  delet: boolean;
  deletElementId: string;
}
//delet response type
export interface DeletElementData {
  success: boolean;
  message: string;
}

//delete sending data type
export interface UniDelet {
  path: string;
}

export interface PaginationProps {
  currentPage: number;
  // apiData: T[];
  // itemsPerPage: number;
  handleClick: (pageNumber: number) => void;
  tabletotalPages: number;
  totalItems: number;
}

export interface SideBarPropsType {
  isOpen: {
    large: boolean;
    small: boolean;
  };
  onToggleSidebarLarge: () => void;
  onToggleSidebarSmall: () => void;
}

//header
export interface HeaderProps {
  onToggleSidebarSmall: () => void;
  isOpen: {
    large: boolean;
    small: boolean;
  };
}

export interface UploadImageFunction {
  (
    folderName: string,
    file: File,
    setProgressStatus: Dispatch<SetStateAction<number | null>>
  ): Promise<string>;
}

//coupon

export interface CouponPostDataType {
  couponcode: string;
  percent: number;
  category: string;
  image: string;
  description: string;
  restaurantId: string;
  minOrderAmount: number;
  maxDiscountAmount: number;
  expiryDate: string;
  upto: number;
}
export interface CouponPostGetDataType {
  couponcode: string;
  percent: number;
  category: string;
  image: string;
  description: string;
  restaurantId: RestaurantData;
  minOrderAmount: number;
  maxDiscountAmount: number;
  expiryDate: string;
  upto: number;
}

export interface CouponGetType extends CouponPostGetDataType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface SinglCouponGetType extends CouponPostDataType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// export interface CategorySendingPostType {
//   name: string;
//   image: string;
// }
// export interface MutationObjectCategoryType {
//   path: string;
//   condition: "creat" | "update";
//   data: CategorySendingPostType;
// }
export interface MutationObjectCouponType {
  path: string;
  condition: "creat" | "update";
  data: CouponPostDataType;
}
