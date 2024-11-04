import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';

interface SessionContextType {
  isSessionExpired: boolean;
  setSessionExpired: (value: boolean) => void;
  checkSession: () => Promise<void>;
  handleLogout: () => Promise<void>;
  initializeSession: (token: string) => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

interface SessionProviderProps {
  children: React.ReactNode;
}

// Helper function to decode JWT token
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [isSessionExpired, setSessionExpired] = useState(false);
  const [hasExistingSession, setHasExistingSession] = useState(false);
  const navigation = useNavigation();

  // Check token expiration
  const checkTokenExpiration = (token: string) => {
    try {
      const decodedToken = decodeJWT(token);
      if (!decodedToken) return true;
      
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime >= decodedToken.exp;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  };

  // Initialize session with new token
  const initializeSession = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      // Set flag to indicate this is not a first-time session
      await AsyncStorage.setItem('hadPreviousSession', 'true');
      setHasExistingSession(true);
      
      const decodedToken = decodeJWT(token);
      
      if (!decodedToken) {
        console.error('Invalid token format');
        return;
      }

      const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      console.log('Token will expire in:', timeUntilExpiration / (1000 * 60 * 60), 'hours');

      // Set timeout for session expiration
      setTimeout(() => {
        console.log('Session expired, showing modal');
        setSessionExpired(true);
      }, timeUntilExpiration);

    } catch (error) {
      console.error('Error initializing session:', error);
    }
  };

  // Check session status
  const checkSession = async () => {
    try {
      const [token, hadPreviousSession] = await Promise.all([
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('hadPreviousSession')
      ]);

      // Update the existing session state
      setHasExistingSession(hadPreviousSession === 'true');

      if (!token) {
        // Only set session as expired if there was a previous session
        if (hadPreviousSession === 'true') {
          setSessionExpired(true);
        }
        return;
      }

      if (checkTokenExpiration(token)) {
        console.log('Token expired during session check');
        // Only show expiration modal if there was a previous session
        if (hadPreviousSession === 'true') {
          setSessionExpired(true);
        }
        await handleLogout();
      } else {
        // If token is still valid, set up expiration timer
        const decodedToken = decodeJWT(token);
        if (decodedToken) {
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = Date.now();
          const timeUntilExpiration = expirationTime - currentTime;

          if (timeUntilExpiration > 0) {
            setTimeout(() => {
              console.log('Session expired after timer');
              setSessionExpired(true);
            }, timeUntilExpiration);
          }
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
      // Only show expiration modal if there was a previous session
      if (await AsyncStorage.getItem('hadPreviousSession') === 'true') {
        setSessionExpired(true);
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userEmail']);
      setSessionExpired(false);
      
      // Use CommonActions instead of navigation.reset
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        })
      );
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check session on mount
  useEffect(() => {
    checkSession();
    return () => {
      // Clear any existing timeouts when component unmounts
      setSessionExpired(false);
    };
  }, []);

  return (
    <SessionContext.Provider
      value={{
        isSessionExpired: isSessionExpired && hasExistingSession, // Only show expired state if there was a previous session
        setSessionExpired,
        checkSession,
        handleLogout,
        initializeSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};