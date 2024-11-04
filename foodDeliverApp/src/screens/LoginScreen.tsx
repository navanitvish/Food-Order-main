import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthInput from '../components/AuthInput';
import { colors, globalStyles, typography } from '../styles/globalStyles';
import { userService } from '../api/services/userService';
import ButtonLoader from '../components/common/ButtonLoader';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

interface ILoginScreenProps {
  setAuthState: React.Dispatch<React.SetStateAction<any>>;
  setOtpEmail: React.Dispatch<React.SetStateAction<string>>;
  setOtpVerificationType: React.Dispatch<React.SetStateAction<"login" | "register" | "forgotPassword">>;
}

const LoginScreen: React.FC<ILoginScreenProps> = ({ setAuthState, setOtpEmail, setOtpVerificationType }) => {
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation() as any;

  const validateField = (field: string, value: string) => {
    if (!value.trim()) {
      return `${field} is required`;
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {
      email: validateField('Email', email),
      password: validateField('Password', password),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const payload = { email, password };
        const response = await userService.signIn(payload);
        
        if (response?.data?.success) {
          setAuthState('otp');
          setOtpEmail(email);
          setOtpVerificationType('login');
          await AsyncStorage.setItem('isLoggedIn', 'true');
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: response.data.message || 'OTP sent for verification.'
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: response.data.message || 'An error occurred during login.'
          });
        }
      } catch (error: any) {
        console.error('Login error:', error);
        Toast.show({
          type: 'error',
          text1: 'Login Error',
          text2: error.response?.data?.message || 'An unexpected error occurred. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View >
      <View style={{backgroundColor:colors.bgGray}}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color={colors.black} />
      </TouchableOpacity>
      
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>LOGIN</Text>
          <Text style={styles.subtitle}>Enter your email and password</Text>
        </View>
        <Image 
          source={require('../assets/images/Logo.png')} 
          style={styles.illustration}
        />
      </View>
      </View>

      <View style={styles.formContainer}>
        <AuthInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <AuthInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        {/* <View style={styles.phoneInputContainer}>
          <Text style={styles.phonePrefix}>+91</Text>
          <TextInput 
            style={styles.phoneInput}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View> */}

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ButtonLoader size={24} color={colors.white} />
          ) : (
            <Text style={styles.loginButtonText}>LOGIN</Text>
          )}
        </TouchableOpacity>

       <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}}>
       <View style={styles.supportButton}>
          <Text style={styles.supportButtonText}>Contact Support</Text>
          <Icon name="call-outline" size={20} color={colors.primary} />
        </View>
       </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 8,
  },
  subtitle: {
    ...globalStyles.subtitle,
  },
  illustration: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    padding:30
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    marginBottom: 20,
  },
  phonePrefix: {
    paddingLeft: 16,
    paddingVertical: 12,
    fontFamily: typography.primary,
    fontSize: 16,
    color: colors.darkGray,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 16,
    fontFamily: typography.primary,
    fontSize: 16,
    color: colors.black,
  },
  loginButton: {
    ...globalStyles.button,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    ...globalStyles.buttonText,
  },
  disabledButton: {
    opacity: 0.7,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth:1,
    width:'50%',
    borderRadius: 6,
    borderColor:colors.bgGray
  },
  supportButtonText: {
    marginLeft: 10,
    marginRight: 5,
    color: colors.primary,
    fontFamily: typography.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;