import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, globalStyles, typography} from '../../styles/globalStyles';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import OTPVerificationScreen from '../OtpVerficationScreen';
import ForgotPasswordScreen from '../ForgotPassword';

export type AuthState = 'login' | 'register' | 'otp' | 'forgotPassword';

const AuthScreen: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [rememberMe, setRememberMe] = useState(false);
  const [otpEmail, setOtpEmail] = useState<string>('');
  const [otpVerificationType, setOtpVerificationType] = useState<
    'register' | 'login' | 'forgotPassword'
  >('register');
  const [otpDigits, setOtpDigits] = useState<string>('');

  const navigation = useNavigation();

  // const handleLoginSuccess = () => {
  //   navigation.navigate('Home' as never);
  // };

  const handleOtpVerificationSuccess = () => {
    navigation.navigate('setProfile' as never);
  };

  const renderAuthContent = () => {
    switch (authState) {
      case 'login':
        return (
          <LoginScreen
            setOtpEmail={setOtpEmail}
            setOtpVerificationType={setOtpVerificationType}
            setAuthState={setAuthState}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            setOtpVerificationType={setOtpVerificationType}
            setOtpEmail={setOtpEmail}
            setAuthState={setAuthState}
          />
        );
      case 'otp':
        return (
          <OTPVerificationScreen
            verificationType={otpVerificationType}
            otpEmail={otpEmail}
            setAuthState={setAuthState}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordScreen
            setOtpEmail={setOtpEmail}
            otpEmail={otpEmail}
            setAuthState={setAuthState}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <View>
            {/* <Text style={styles.title}>
              {authState === 'otp'
                ? 'Verification'
                : authState === 'login'
                ? 'Login'
                : authState === 'forgotPassword'
                ? 'Forgot Password'
                : 'Register'}
            </Text> */}

            {renderAuthContent()}
          </View>

          {/* <View style={styles.signInContainer}>
            {authState !== 'otp' && (
              <>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>
                    Or {authState === 'login' ? 'signin' : 'signup'} with
                  </Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image
                      style={styles.socialButtonImage}
                      source={require('../../assets/images/google.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image
                      style={styles.socialButtonImage}
                      source={require('../../assets/images/fb.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image
                      style={styles.socialButtonImageApple}
                      source={require('../../assets/images/apple.png')}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                setAuthState(authState === 'login' ? 'register' : 'login')
              }>
              <Text style={styles.registerText}>
                {authState === 'login'
                  ? "Don't have an account? "
                  : authState === 'otp'
                  ? 'Back to '
                  : 'Already have an account? '}
                <Text style={styles.registerHighlight}>
                  {authState === 'login'
                    ? 'Register'
                    : authState === 'otp'
                    ? 'Signin'
                    : 'Login'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    backgroundColor: '#FFF',
  },
  verifyContainer: {
    flexDirection: 'row',
    gap: 60,
    alignItems: 'center',
  },
  signInContainer: {
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    // padding: 20,
  },
  title: {
    ...globalStyles.title,
    color: colors.primary,
    marginBottom: 30,
    marginTop: 30,
    fontSize: 30,
    fontWeight: '700',
  },
  signInButton: {
    marginBottom: 20,
    borderRadius: 25,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray,
  },
  dividerText: {
    marginHorizontal: 10,
    color: colors.gray,
    fontFamily: typography.regular,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 2,
  },
  socialButtonImage: {
    width: 24,
    height: 24,
  },
  socialButtonImageApple: {
    width: 17,
    height: 20,
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
});

export default AuthScreen;
