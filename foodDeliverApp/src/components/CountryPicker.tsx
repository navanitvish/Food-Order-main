import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { colors, typography } from '../styles/globalStyles';
import CountryPicker, { Country, Flag as RNFlag, CountryCode } from 'react-native-country-picker-modal';

// Updated wrapper component for CountryPicker
const CountryPickerWrapper = ({
  withFlag = true,
  withFilter = true,
  withCallingCode = true,
  withEmoji = true,
  ...props
}: any) => {
  return (
    <CountryPicker
      withFlag={withFlag}
      withFilter={withFilter}
      withCallingCode={withCallingCode}
      withEmoji={withEmoji}
      {...props}
    />
  );
};

// New wrapper component for Flag
const Flag = ({ countryCode, flagSize = 25, ...props }: any) => {
  return <RNFlag countryCode={countryCode} flagSize={flagSize} {...props} />;
};

interface ICountry {
  name: string;
  callingCode: string[];
  cca2: string;
  flag: string;
}

interface CountryPickerProps {
  phoneNumber: string;
  selectedCountry: ICountry;
  onSelectCountry: (country: ICountry) => void;
  onPhoneNumberChange: (phoneNumber: string) => void;
}

const CustomCountryPicker: React.FC<CountryPickerProps> = ({
  phoneNumber,
  selectedCountry,
  onSelectCountry,
  onPhoneNumberChange,
}) => {
  const [showModal, setShowModal] = useState(false);

  const onSelect = (country: any) => {
    onSelectCountry({
      name: country.name || '',
      callingCode: country.callingCode || [''],
      cca2: country.cca2 || '',
      flag: country.flag || '',
    });
    setShowModal(false);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.countryPickerButton}
          onPress={() => setShowModal(true)}>
          <Flag 
            countryCode={selectedCountry.cca2 as CountryCode} 
            flagSize={24}
          />
          <Image
            style={styles.dropdownImage}
            source={require('../assets/images/dropdown.png')}
          />
          <Text style={styles.countryPickerTextCode}>
            {' +'}
            {selectedCountry.callingCode[0]}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="00 0000 0000"
          placeholderTextColor={colors.gray}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={onPhoneNumberChange}
        />
      </View>

      <CountryPickerWrapper
        countryCode={selectedCountry.cca2 as CountryCode}
        onSelect={onSelect}
        visible={showModal}
        onClose={() => setShowModal(false)}
        containerButtonStyle={styles.hiddenContainerButton}
        renderFlagButton={() => null}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  countryPickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#E9EAEB',
  },
  countryPickerTextCode: {
    fontFamily: typography.regular,
    fontSize: 16,
    marginLeft: 10,
    color: colors.black,
  },
  dropdownImage: {
    width: 18,
    height: 10,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontFamily: typography.regular,
    fontSize: 16,
    color: 'black',
    backgroundColor: colors.inputBg,
  },
  hiddenContainerButton: {
    display: 'none',
  },
});

export default CustomCountryPicker;