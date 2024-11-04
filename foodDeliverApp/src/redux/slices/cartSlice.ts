import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
interface MenuItem {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
    image: string;
    type: string;
  };
  specialOffer: boolean;
  specialOfferPrice?: number;
  restaurantId: Restaurant;
}

interface Restaurant {
  _id: string;
  name: string;
  image?: string;
  cuisine?: string;
  rating: number;
  openinghour: string;
  address: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface Coupon {
  _id: string;
  couponcode: string;
  percent: number;
  description: string;
  minOrderAmount: number;
  maxDiscountAmount: number;
  expiryDate: string;
  image: string;
  isAll: boolean;
  restaurantId: string;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponDiscount: number;
  totalPrice: number;
  restaurant: Restaurant | null;
  showReplaceCartPopup: boolean;
  itemToAdd: MenuItem | null;
  appliedCoupon: Coupon | null;
}

// Initial state
const initialState: CartState = {
  items: [],
  subtotal: 0,
  deliveryFee: 0,
  discount: 0,
  couponDiscount: 0,
  totalPrice: 0,
  restaurant: null,
  showReplaceCartPopup: false,
  itemToAdd: null,
  appliedCoupon: null,
};

// Helper functions
const calculateCouponDiscount = (subtotal: number, coupon: Coupon | null): number => {
  if (!coupon) return 0;
  if (subtotal < coupon.minOrderAmount) return 0;
  
  const discountAmount = (subtotal * coupon.percent) / 100;
  return Math.min(discountAmount, coupon.maxDiscountAmount);
};

const updateCartTotals = (state: CartState) => {
  // Calculate subtotal
  state.subtotal = state.items.reduce((total, item) => {
    const itemPrice = item.specialOffer && item.specialOfferPrice 
      ? item.specialOfferPrice 
      : item.price;
    return total + itemPrice * item.quantity;
  }, 0);
  
  // Calculate delivery fee
  state.deliveryFee = state.items.length > 0 ? 40 : 0;
  
  // Calculate coupon discount
  state.couponDiscount = calculateCouponDiscount(state.subtotal, state.appliedCoupon);
  
  // Calculate total price including all discounts
  state.totalPrice = state.subtotal + state.deliveryFee - state.discount - state.couponDiscount;
  
  // Ensure total price doesn't go below zero
  state.totalPrice = Math.max(state.totalPrice, 0);
  
  // Reset if cart is empty
  if (state.items.length === 0) {
    state.restaurant = null;
    state.deliveryFee = 0;
    state.appliedCoupon = null;
    state.couponDiscount = 0;
    state.discount = 0;
    state.totalPrice = 0;
  }
};

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<MenuItem>) => {
      if (!state.restaurant || state.restaurant._id === action.payload.restaurantId._id) {
        const existingItem = state.items.find(item => item._id === action.payload._id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        if (!state.restaurant) {
          state.restaurant = action.payload.restaurantId;
        }
        updateCartTotals(state);
      } else {
        state.showReplaceCartPopup = true;
        state.itemToAdd = action.payload;
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(item => item._id === action.payload);
      if (index !== -1) {
        const item = state.items[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
      updateCartTotals(state);
    },

    setAppliedCoupon: (state, action: PayloadAction<Coupon>) => {
      state.appliedCoupon = action.payload;
      updateCartTotals(state);
    },

    clearAppliedCoupon: (state) => {
      state.appliedCoupon = null;
      state.couponDiscount = 0;
      updateCartTotals(state);
    },

    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      updateCartTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      state.itemToAdd = null;
      state.showReplaceCartPopup = false;
      state.appliedCoupon = null;
      state.couponDiscount = 0;
      updateCartTotals(state);
    },

    replaceCart: (state) => {
      if (state.itemToAdd) {
        state.items = [{ ...state.itemToAdd, quantity: 1 }];
        state.restaurant = state.itemToAdd.restaurantId;
        state.showReplaceCartPopup = false;
        state.itemToAdd = null;
        state.appliedCoupon = null;
        state.couponDiscount = 0;
        updateCartTotals(state);
      }
    },

    cancelReplaceCart: (state) => {
      state.showReplaceCartPopup = false;
      state.itemToAdd = null;
    },

    setRestaurant: (state, action: PayloadAction<Restaurant>) => {
      if (state.restaurant && state.restaurant._id !== action.payload._id) {
        // Clear cart if selecting a different restaurant
        state.items = [];
        state.appliedCoupon = null;
        state.couponDiscount = 0;
      }
      state.restaurant = action.payload;
      updateCartTotals(state);
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item._id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i._id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      updateCartTotals(state);
    },

    resetDiscount: (state) => {
      state.discount = 0;
      state.couponDiscount = calculateCouponDiscount(state.subtotal, state.appliedCoupon);
      updateCartTotals(state);
    },
  },
});

// Export actions
export const {
  addItem,
  removeItem,
  updateQuantity,
  setDiscount,
  clearCart,
  replaceCart,
  cancelReplaceCart,
  setAppliedCoupon,
  clearAppliedCoupon,
  setRestaurant,
  resetDiscount,

} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Export types
export type {
  MenuItem,
  Restaurant,
  CartItem,
  CartState,
  Coupon,
};