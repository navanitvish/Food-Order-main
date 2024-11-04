import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AuthInput from '../components/AuthInput';
import { colors, globalStyles, typography } from '../styles/globalStyles';
import { userService } from '../api/services/userService';
import ButtonLoader from '../components/common/ButtonLoader';
import Toast from 'react-native-toast-message';
import { AuthState } from './common/AuthScreen';

interface ForgotPasswordProps {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  setOtpEmail: React.Dispatch<React.SetStateAction<string>>;
  otpEmail: string;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordProps> = ({
  setAuthState,
  setOtpEmail,
  otpEmail
}) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifiedForgotPassword, setIsVerifiedForgotPassword] = useState(false);

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your email address',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await userService.forgotPassword({ email });
      console.log('Forgot password response:', response.data);
      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password reset OTP has been sent to your email',
        });
        setOtpEmail(email);
        setIsVerifiedForgotPassword(true);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message || 'An error occurred',
        });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
      setIsVerifiedForgotPassword(true);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await userService.forgotResetPassword({
        email: otpEmail,
        otp: parseInt(otp, 10),
        newPassword: newPassword
      });
      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password reset successfully',
        });
        setAuthState('login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message || 'Password reset failed',
        });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      {!isVerifiedForgotPassword ? (
        <>
          <AuthInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            icon="email"
            keyboardType="email-address"
          />
          <TouchableOpacity
            style={[globalStyles.button, styles.buttonAction, isLoading && styles.disabledButton]}
            onPress={handleForgotPassword}
            disabled={isLoading}>
            {isLoading ? (
              <ButtonLoader size={24} color={colors.white} />
            ) : (
              <Text style={globalStyles.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <AuthInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            // icon="lock"
            // secureTextEntry
          />
          <AuthInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm New Password"
            // icon="lock"
            // secureTextEntry
          />
          <AuthInput
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter 6-digit OTP"
            // keyboardType="number-pad"
            // maxLength={6}
          />
          <TouchableOpacity
            style={[globalStyles.button, styles.buttonAction, isLoading && styles.disabledButton]}
            onPress={handleResetPassword}
            disabled={isLoading}>
            {isLoading ? (
              <ButtonLoader size={24} color={colors.white} />
            ) : (
              <Text style={globalStyles.buttonText}>Set New Password</Text>
            )}
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => setAuthState('login')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      ...globalStyles.title,
      marginBottom: 20,
    },
    buttonAction: {
      marginTop: 20,
      borderRadius: 25,
    },
    disabledButton: {
      opacity: 0.7,
    },
    backToLogin: {
      marginTop: 20,
      color: colors.primary,
      textAlign: 'center',
    },
});

export default ForgotPasswordScreen;