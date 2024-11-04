import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { colors, typography, globalStyles } from '../styles/globalStyles';
import BackButton from '../components/common/BackButton';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/common/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSelectedLocation } from '../redux/slices/locationSlice';

type Location = {
  id: string;
  name: string;
  address: string;
};

const Button: React.FC<{ title: string; onPress: () => void; style?: object; textStyle?: object }> = ({ title, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const LocationItem: React.FC<{ location: Location; isSelected: boolean; onSelect: () => void }> = ({ location, isSelected, onSelect }) => (
  <TouchableOpacity style={styles.locationItem} onPress={onSelect}>
    <View>
      <Text style={styles.locationName}>{location.name}</Text>
      <Text style={styles.locationAddress}>{location.address}</Text>
    </View>
    <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
  </TouchableOpacity>
);

const MyLocationsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation() as any;
  const { locations, selectedLocationId } = useSelector((state: RootState) => state.locations);

  const handleAddLocation = () => {
    navigation.navigate('AddNewLocation');
  };

  const handleApply = () => {
    // navigation.navigate('PaymentMethods');
    navigation.goBack()
  };



  return (
    <View style={styles.container}>
    <Header title='My Locations' />
    
    <View style={styles.content}>
      {locations.map((location) => (
        <LocationItem 
          key={location.id}
          location={location}
          isSelected={selectedLocationId === location.id}
          onSelect={() => dispatch(setSelectedLocation(location.id))}
        />
      ))}
      <Button
        title="Add New Location"
        onPress={handleAddLocation}
        style={styles.addLocationButton}
        textStyle={styles.addLocationButtonText}
      />
    </View>

    <View style={styles.footer}>
      <Button
        title="Apply"
        onPress={handleApply}
        style={styles.applyButton}
        textStyle={styles.applyButtonText}
      />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.white,
   
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 25,
    padding: 20,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    ...globalStyles.title,
    flex: 1,
    textAlign: 'center',
    marginRight: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 8,       
    marginBottom: 10,
    borderWidth: 1,        
    borderColor: '#E9EAEB',  
  },
  
  locationName: {
    fontFamily: typography.robotoRegular,
    fontSize: 16,
    color: colors.black,
    marginBottom: 4,
  },
  locationAddress: {
    fontFamily: typography.robotoRegular,
    fontSize: 14,
    color: colors.darkGray,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  footer: {
    padding: 20,
  },
  button: {
    ...globalStyles.button,
    marginTop: 10,
  },
  buttonText: {
    ...globalStyles.buttonText,
  },
  addLocationButton: {
    backgroundColor: '#FFEFED',
    // borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,   
  },
  addLocationButtonText: {
    color: colors.primary,
  },
  applyButton: {
    backgroundColor: colors.primary500,
  },
  applyButtonText: {
    color: colors.white,
  },
});

export default MyLocationsScreen;