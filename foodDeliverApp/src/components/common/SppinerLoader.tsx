import React from 'react';
import { View, StyleSheet, Animated, Easing, ViewStyle } from 'react-native';
import { colors } from '../../styles/globalStyles';

type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColorVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

interface SpinnerLoaderProps {
  size?: SizeVariant;
  color?: ColorVariant | string;
  style?: ViewStyle;
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({ size = 'md', color = 'primary', style }) => {
  const spinValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const sizeMap: Record<SizeVariant, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
  };

  const loaderSize = sizeMap[size] || sizeMap.md;

  const colorMap: Record<ColorVariant, string> = {
    primary: colors.primary,
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
  };

  const loaderColor = colorMap[color as ColorVariant] || color;

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.loader,
          {
            width: loaderSize,
            height: loaderSize,
            borderColor: loaderColor,
            borderTopColor: 'transparent',
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    borderWidth: 2,
    borderRadius: 50,
  },
});

export default SpinnerLoader;