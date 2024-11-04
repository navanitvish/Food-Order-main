
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';
// import Toast from 'react-native-toast-message';
// import 'react-native-get-random-values';

// import AppNavigator from './src/navigation/AppNavigator';
// import { store } from './src/redux/store';
// import ToastComponent from './src/components/common/Toast';
// import CartReplacementModal from './src/screens/common/CartReplacementModal';

// import SessionExpirationModal from './src/components/common/SessionExpirationModal';
// import { SessionProvider, useSession } from './src/context/sessionContext';

// // Wrapper component to use the session context
// const AppContent = () => {
//   const { isSessionExpired } =useSession();

//   return (
//     <>
//       <AppNavigator />
//       <CartReplacementModal />
//       <ToastComponent />
//       <SessionExpirationModal visible={isSessionExpired} />
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <SessionProvider>
//           <AppContent />
//         </SessionProvider>
//       </NavigationContainer>
//       <Toast />
//     </Provider>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import 'react-native-get-random-values';

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/redux/store';
import ToastComponent from './src/components/common/Toast';
import CartReplacementModal from './src/screens/common/CartReplacementModal';
import NetInfo from '@react-native-community/netinfo';
import SessionExpirationModal from './src/components/common/SessionExpirationModal';
import { SessionProvider, useSession } from './src/context/sessionContext';
import { StyleSheet, Text , View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Wrapper component to use the session context
const AppContent = () => {
  const { isSessionExpired } =useSession();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true);
    });
    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.offlineContainer}>
        <Icon name="cloud-offline" size={48} color="#666666" />
        <Text style={styles.offlineText}>No Internet Connection</Text>
        <Text style={styles.offlineSubtext}>
          Please check your connection and try again
        </Text>
      </View>
    );
  }

  return (
    <>
      <AppNavigator />
      <CartReplacementModal />
      <ToastComponent />
      <SessionExpirationModal visible={isSessionExpired} />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SessionProvider>
          <AppContent />
        </SessionProvider>
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  offlineText: {
    fontSize: 20,
    color: '#333333',
    marginTop: 16,
  },
  offlineSubtext: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
});