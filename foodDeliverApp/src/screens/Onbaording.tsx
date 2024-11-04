import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { globalStyles, colors } from '../styles/globalStyles';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const handleSetupLocation = () => {
    // Handle location setup logic here
    console.log('Setting up location');
  };

  const handleLogin = () => {
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Order from top & favourite restaurants</Text>
      <Text style={styles.description}>Ready to see top restaurant to order?</Text>
      <TouchableOpacity
        style={[globalStyles.button, styles.button]}
        onPress={handleSetupLocation}>
        <Text style={globalStyles.buttonText}>SETUP YOUR LOCATION</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>
          Have an account? <Text style={styles.loginHighlight}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    ...globalStyles.title,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    ...globalStyles.subtitle,
    textAlign: 'center',
    marginBottom: 40,
    color: colors.black,
  },
  button: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.primary,
  },
  loginText: {
    ...globalStyles.text,
    color: colors.black,
  },
  loginHighlight: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;