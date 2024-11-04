import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import phonepeSdk from 'react-native-phonepe-pg';
import Base64 from 'react-native-base64';
import sha256 from 'sha256';

interface PaymentResult {
  status: 'SUCCESS' | 'FAILURE';
  paymentMethod?: string;
  // Add other properties as needed
}

const usePhonePePayment = () => {
  const [environment, setEnvironment] = useState("SANDBOX");
  const [merchantId, setMerchantId] = useState("PGTESTPAYUAT86");
  const [appId, setAppId] = useState("");
  const [enableLogging, setEnableLogging] = useState(true);
  const SALT_KEY = "96434309-7796-489d-8924-ab56988a6076";
  const SALT_INDEX = 1;

  const { totalPrice } = useSelector((state: RootState) => state.cart);

  const generateTransactionId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `TXN_${timestamp}_${random}`;
  };

  const submitHandler = async (): Promise<PaymentResult> => {
    try {
      await phonepeSdk.init(environment, merchantId, appId, enableLogging);

      const requestBody = {
        merchantId: merchantId,
        merchantTransactionId: generateTransactionId(),
        merchantUserId: "",
        amount: totalPrice * 100,
        mobileNumber: "999999999999",
        callbackUrl: "",
        paymentInstrument: {
          type: "PAY_PAGE"
        }
      };

      const payload = JSON.stringify(requestBody);
      const payload_main = Base64.encode(payload);
      const string = payload_main + "/pg/v1/pay" + SALT_KEY;
      const checksum = sha256(string) + "###" + SALT_INDEX;

      const response = await phonepeSdk.startTransaction(
        payload_main,
        checksum,
        null,
        null
      );

      console.log('PhonePe SDK Response:', response);

      if (response.status === 'SUCCESS') {
        // Alert.alert('Success', 'Payment successful!');
        return { 
          status: 'SUCCESS',
          paymentMethod: response.paymentMethod || 'UPI'
        };
      } else {
        console.error('Payment failed:', response.errorMessage);
        Alert.alert('Payment Failed', 'Please try again.');
        return { status: 'FAILURE' };
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      return { status: 'FAILURE' };
    }
  };

  return { submitHandler };
};

export default usePhonePePayment;