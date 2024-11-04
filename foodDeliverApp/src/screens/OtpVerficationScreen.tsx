import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography, globalStyles, textStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { userService } from '../api/services/userService';
import ButtonLoader from '../components/common/ButtonLoader';
import { AuthState } from './common/AuthScreen';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../redux/slices/activeTabSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSession } from '../context/sessionContext';

interface OTPVerificationScreenProps {
  otpEmail: string;
  verificationType: 'register' | 'login' | 'forgotPassword';
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
}

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  otpEmail,
  verificationType,
  setAuthState,
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isResendActive, setIsResendActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const navigation = useNavigation() as any;
  const { initializeSession } = useSession();
  

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsResendActive(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      index > 0 &&
      otp[index] === ''
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (isResendActive) {
      setTimeLeft(45);
      setIsResendActive(false);
      // TODO: Implement resend OTP logic here
    }
  };
  const dispatch = useDispatch();

  const showToast = (type: 'success' | 'error', message: string) => {
    Toast.show({
      type: type,
      text1: type === 'success' ? 'Success' : 'Error',
      text2: message,
    });
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      showToast('error', 'Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const payload = { otp: Number(otpString), email: otpEmail };
      console.log("otp is", payload)
      let response;
      if (verificationType === 'register') {
        response = await userService.verifyOTP(payload);
      } else {
        response = await userService.loginVerify(payload);
      }


      console.log('Response data:@@@@@@@@@@@@@@@', response);

      if (response.data.success) {
        // Store user email and token regardless of rememberMe
        await AsyncStorage.setItem('userEmail', otpEmail);
        //@ts-ignore
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token);

        showToast('success', 'Verification successful');

        await initializeSession(token);

        if (verificationType === 'register') {
          navigation.navigate('MainTabs');
          // navigation.navigate('setProfile');
          dispatch(setActiveTab("Home"))
        } else {
          navigation.navigate('MainTabs');
          // dispatch(setActiveTab("Home"))
          
        }
      } else {
        showToast('error', response.data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      showToast('error', 'An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
      setOtp(['', '', '', '', '', '']);
      setAuthState('login');
    }
  };


  return (
    <SafeAreaView>
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
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* <Text style={styles.infoText}>Code has been sent to {otpEmail}</Text> */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={event => handleKeyPress(event, index)}
                keyboardType="numeric"
                maxLength={1}
                placeholderTextColor={colors.darkGray}
              />
            ))}
          </View>
          <Text style={styles.resendText}>Didn't receive code?</Text>
          <View style={styles.timerContainer}>
            {/* <Image
              source={require('../assets/images/clock.png')}
              style={styles.clockIconImage}
            /> */}
            <Text style={{color:colors.black}}>Resend OTP in</Text>
            <Text style={styles.timerText}>
              {timeLeft > 0
                ? `00:${timeLeft.toString().padStart(2, '0')}`
                : '00:00'}
            </Text>
          </View>
          {/* <TouchableOpacity onPress={handleResendCode}>
            <Text
              style={[
                styles.resendText,
                isResendActive && styles.resendActiveText,
              ]}>
              Resend Code
            </Text>
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity
          style={[
            globalStyles.button,
            styles.buttonAction,
            isLoading && styles.disabledButton,
          ]}
          onPress={handleVerify}
          disabled={isLoading}>
          {isLoading ? (
            <ButtonLoader size={24} color={colors.white} />
          ) : (
            <Text style={globalStyles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}}>
       <View style={styles.supportButton}>
          <Text style={styles.supportButtonText}>Contact Support</Text>
          <Icon name="call-outline" size={20} color={colors.primary} />
        </View>
       </TouchableOpacity>
    </SafeAreaView>
  );
};

const { height: screenHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    ...globalStyles.container,
    justifyContent: 'space-between',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  illustration: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    ...globalStyles.title,
    marginBottom: 8,
  },
  subtitle: {
    ...globalStyles.subtitle,
  },
  contentContainer: {
    alignItems: 'center',
  },
  infoText: {
    ...textStyles.regular,
    color: colors.black,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  buttonAction: {
    marginBottom: 20,
    marginTop: screenHeight * 0.02,
    borderRadius: 5,
    width: '100%',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: colors.inputBg,
    color: colors.black,
    fontFamily: typography.primary,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 13,
  },
  clockIconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  timerText: {
    ...textStyles.regular,
    color: colors.black,
    marginBottom: 10,
    marginTop: 10,
  },
  resendText: {
    ...textStyles.regular,
    color: colors.black,
    textAlign: 'center',
  },
  resendActiveText: {
    color: colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
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

export default OTPVerificationScreen;