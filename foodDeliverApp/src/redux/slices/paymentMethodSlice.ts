import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PaymentMethod = {
  id: string;
  name: string;
  method: string;
  icon: any;
};

interface PaymentMethodsState {
  paymentMethods: PaymentMethod[];
  selectedMethodId: string | null;
}

const initialState: PaymentMethodsState = {
  paymentMethods: [
    { id: '1', method: 'Cash', name: 'Cash', icon: require('../../assets/images/payments/cash.png') },
    { id: '2', method: 'PayPal', name: 'PayPal', icon: require('../../assets/images/payments/paypal.png') },
    { id: '3', method: 'UPI', name: 'Google Pay', icon: require('../../assets/images/payments/gpay.png') },
    { id: '4', method: 'Apple Pay', name: 'Apple Pay', icon: require('../../assets/images/payments/apple.png') },
    { id: '5', method: 'Card', name: '**** **** **** 0895', icon: require('../../assets/images/payments/cash.png') },
    { id: '6', method: 'Card', name: '**** **** **** 2259', icon: require('../../assets/images/payments/master.png') },
  ],
  selectedMethodId: null,
};

const paymentMethodsSlice = createSlice({
  name: 'paymentMethods',
  initialState,
  reducers: {
    setSelectedPaymentMethod: (state, action: PayloadAction<string>) => {
      state.selectedMethodId = action.payload;
    },
    addPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethods.push(action.payload);
    },
    clearSelectedPayment: (state) => {
      state.selectedMethodId = null;
    },
  },
});

export const { setSelectedPaymentMethod, addPaymentMethod, clearSelectedPayment } = paymentMethodsSlice.actions;
export default paymentMethodsSlice.reducer;