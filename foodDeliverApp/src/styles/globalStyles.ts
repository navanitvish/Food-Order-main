import { StyleSheet, Platform, TextStyle, ViewStyle } from 'react-native';

export const colors: { [key: string]: string } = {
  primary: '#006B54',
  secondary: '#4A90E2',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#A4ABBA',
  inputBg: '#F2F2F7',
  lightGray: '#E5E5EA',
  darkGray: '#3A3A3C',
  transparent: 'transparent',
  bgGray:'#f3f4f9',
  lightGreen:'#62b349'
};

export const typography: { primary: string } = {
  primary: Platform.OS === 'ios' ? 'System' : 'Roboto',
};

type FontWeight = '400' | '500' | '600' | '700';

const fontWeight: { [key: string]: FontWeight } = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

interface GlobalStyles {
  container: ViewStyle;
  text: TextStyle;
  title: TextStyle; // Add the title property
  subtitle: TextStyle; // Add the subtitle property
  heading: TextStyle;
  subheading: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  input: TextStyle;
  card: ViewStyle;
}

export const globalStyles = StyleSheet.create<GlobalStyles>({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: typography.primary,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeight.regular,
    color: colors.gray,
  },
  title: { // Add the title style
    fontFamily: typography.primary,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: fontWeight.bold,
    color: colors.black,
  },
  subtitle: { // Add the subtitle style
    fontFamily: typography.primary,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: fontWeight.medium,
    color: colors.darkGray,
  },
  heading: {
    fontFamily: typography.primary,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: fontWeight.bold,
    color: colors.black,
  },
  subheading: {
    fontFamily: typography.primary,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: fontWeight.semiBold,
    color: colors.black,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: typography.primary,
    fontSize: 16,
    fontWeight: fontWeight.medium,
    color: colors.white,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: typography.primary,
    fontSize: 16,
    color: colors.black,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

type WeightOption = keyof typeof fontWeight;

export const createTextStyle = (weight: WeightOption, color: string = colors.gray): TextStyle => ({
  ...globalStyles.text,
  fontWeight: fontWeight[weight],
  color,
});

export const textStyles: { [key: string]: TextStyle } = {
  regular: createTextStyle('regular'),
  medium: createTextStyle('medium'),
  semiBold: createTextStyle('semiBold'),
  bold: createTextStyle('bold'),
  regularBlack: createTextStyle('regular', colors.black),
  mediumBlack: createTextStyle('medium', colors.black),
};