import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../redux/slices/activeTabSlice';

const BackButton: React.FC = () => {
  const navigation = useNavigation() as any;
  const dispatch = useDispatch();
  const route = useRoute() as any;
  const routes = ['Home', 'MyBasket', 'Orders', 'Favourites', 'Notifications', 'Profile'];

  const handleBack = () => {
    if (routes.includes(route.name)) {
      // If we're on one of the main routes, reset the navigation state
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
      dispatch(setActiveTab('Home'));
    } else {
      // For other screens, use goBack
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handleBack}>
      <View style={styles.backIconContainer}>
        <Image
          source={require('../../assets/images/leftArrow.png')}
          style={styles.backIconImage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backIconContainer: {
    padding: 4,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
});

export default BackButton;