import React from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const { height } = Dimensions.get('window');

// Calculate top position based on device type and dimensions
const getTopPosition = () => {
  const isIOS = Platform.OS === 'ios';
  const topPadding = isIOS ? 20 : (StatusBar.currentHeight ?? 0) + 11;
  return Math.max(topPadding, height * 0.045); // Ensure it's at least 10% from the top
};

const toastConfig = {
  success: (props:any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        marginTop: getTopPosition(),
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 12
      }}
    />
  ),
  error: (props:any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: 'red',
        marginTop: getTopPosition(),
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 12
      }}
    />
  )
};

const ToastComponent = () => {
  return (
    <Toast 
      config={toastConfig}
      topOffset={getTopPosition()}
    />
  );
};

export default ToastComponent;