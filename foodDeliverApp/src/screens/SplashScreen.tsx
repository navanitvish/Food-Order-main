import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, colors } from '../styles/globalStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        
        if (userToken) {
          navigation.replace('MainTabs');
        } else {
          navigation.replace('Onboarding');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        navigation.replace('Onboarding');
      }
    };

    // Set a timeout for 3.5 seconds before checking login status
    const timer = setTimeout(() => {
      checkLoginStatus();
    }, 3500);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default SplashScreen;