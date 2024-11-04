import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthInput from '../components/AuthInput';
import CustomCountryPicker from '../components/CountryPicker';
import { colors, globalStyles, typography } from '../styles/globalStyles';
import { userService } from '../api/services/userService';
import ButtonLoader from '../components/common/ButtonLoader';
import axios from 'axios';
import Toast from 'react-native-toast-message';

interface IRegisterScreenProps {
  setAuthState: React.Dispatch<React.SetStateAction<any>>;
  setOtpEmail: React.Dispatch<React.SetStateAction<any>>;
  setOtpVerificationType: React.Dispatch<React.SetStateAction<"login" | "register" | "forgotPassword">>;
}

const RegisterScreen: React.FC<IRegisterScreenProps> = ({ setAuthState, setOtpEmail, setOtpVerificationType }) => {
  const [errors, setErrors] = useState({
    phoneNumber: '',
    email: '',
    fullName: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'United States',
    callingCode: ['1'],
    cca2: 'US',
    flag: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field: string, value: string) => {
    if (!value.trim()) {
      return `${field} is required`;
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {
      phoneNumber: validateField('Phone number', phoneNumber),
      email: validateField('Email', email),
      fullName: validateField('Full name', fullName),
      password: validateField('Password', password),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleRegister = async () => {
    setIsSubmitted(true);
    if (validateForm()) {
      setIsLoading(true);
      try {
        const payload = {
          name: fullName,
          mobile: Number(phoneNumber),
          email: email,
          password: password,
        };
        
        const response = await userService.register(payload);
        console.log('Registration response:', response);
        
        if (response.data.success) {
          console.log('Registration successful', response);
          await AsyncStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
          setAuthState('otp');
          setOtpEmail(email);
          setOtpVerificationType('register');
          await AsyncStorage.setItem('isLoggedIn', 'true');
          
          // Show success toast
          Toast.show({
            type: 'success',
            text1: 'Registration Successful',
            text2: response.data.message,
          });
        } else {
          // Show error toast
          Toast.show({
            type: 'error',
            text1: 'Registration Failed',
            text2: response.data.message || 'An error occurred during registration.',
          });
        }
      } catch (error) {
        console.error('Registration error:', error);
        if (axios.isAxiosError(error)) {
          const errorResponse = error.response;
          console.log('Full error response:', errorResponse?.data?.message || "Error");
          
          // Show error toast
          Toast.show({
            type: 'error',
            text1: 'Registration Error',
            text2: errorResponse?.data?.message || 'An unexpected error occurred. Please try again.',
          });
        } else {
          // Show generic error toast
          Toast.show({
            type: 'error',
            text1: 'Registration Error',
            text2: 'An unexpected error occurred. Please try again.',
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <CustomCountryPicker
          phoneNumber={phoneNumber}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
          onPhoneNumberChange={value => {
            setPhoneNumber(value);
            if (isSubmitted) {
              setErrors(prev => ({
                ...prev,
                phoneNumber: validateField('Phone number', value),
              }));
            }
          }}
        />
        {isSubmitted && errors.phoneNumber ? (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        ) : null}

        <AuthInput
          value={email}
          onChangeText={value => {
            setEmail(value);
            if (isSubmitted) {
              setErrors(prev => ({
                ...prev,
                email: validateField('Email', value),
              }));
            }
          }}
          placeholder="Email"
          icon="email"
          keyboardType="email-address"
        />
        {isSubmitted && errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <AuthInput
          value={fullName}
          onChangeText={value => {
            setFullName(value);
            if (isSubmitted) {
              setErrors(prev => ({
                ...prev,
                fullName: validateField('Full name', value),
              }));
            }
          }}
          placeholder="Full Name"
          icon="user"
        />
        {isSubmitted && errors.fullName ? (
          <Text style={styles.errorText}>{errors.fullName}</Text>
        ) : null}

        <AuthInput
          value={password}
          onChangeText={value => {
            setPassword(value);
            if (isSubmitted) {
              setErrors(prev => ({
                ...prev,
                password: validateField('Password', value),
              }));
            }
          }}
          placeholder="Password"
        />
        {isSubmitted && errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        {/* <View style={styles.rememberMeContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberMe(!rememberMe)}>
            <View
              style={[
                styles.checkboxBox,
                rememberMe && styles.checkboxChecked,
              ]}>
              {rememberMe && <Text style={styles.checkboxTick}>✔</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <TouchableOpacity
        style={[globalStyles.button, styles.buttonAction, isLoading && styles.disabledButton]}
        onPress={handleRegister}
        disabled={isLoading}>
        {isLoading ? (
          <ButtonLoader size={24} color={colors.white} />
        ) : (
          <Text style={globalStyles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },

  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    alignItems: 'center',
  },
  registerText: {
    fontFamily: typography.regular,
    color: colors.gray,
  },
  registerHighlight: {
    color: colors.primary,
    fontFamily: typography.bold,
  },
  buttonAction: {
    borderRadius: 25,
    marginTop: screenHeight * 0.22,
  marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkboxLabel: {
    fontFamily: typography.regular,
    color: colors.gray,
  },
  rememberMeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  checkboxTick: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
    disabledButton: {
    opacity: 0.7,
  },
});

export default RegisterScreen;
