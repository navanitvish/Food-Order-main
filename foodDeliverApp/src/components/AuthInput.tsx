import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

interface IAuthInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: 'email' | 'user' | 'phone' | 'map';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const AuthInput: React.FC<IAuthInputProps> = ({
  value,
  onChangeText,
  placeholder,
  icon,
  keyboardType = 'default',
}) => {
  const getIconSource = () => {
    switch (icon) {
      case 'email':
        return require('../assets/images/Letter.png');
      case 'user':
        return require('../assets/images/User.png');
      case 'map':
        return require('../assets/images/map.png');
      // case 'phone':
      //   return require('../assets/phone-icon.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {icon !== 'map' && icon && (
        <Image source={getIconSource()} style={styles.leftIcon} />
      )}
      <TextInput
        style={[
          styles.input,
          icon === 'map' && styles.inputWithRightIcon,
          !icon && styles.inputWithoutIcon,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        keyboardType={keyboardType}
      />
      {icon === 'map' && (
        <Image source={getIconSource()} style={styles.rightIcon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  rightIcon: {
    width: 17.5,
    height: 21.5,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputWithRightIcon: {
    paddingRight: 30, // Add some padding to prevent text from overlapping with the icon
  },
  inputWithoutIcon: {
    paddingLeft: 0,
  },
});

export default AuthInput;