import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location';
import { colors, typography, globalStyles } from '../styles/globalStyles';
import { foodService } from '../api/services/foodService';

Geocoder.init("AIzaSyD125GPaw_9Nq5NmqW5BlMKrkbUXWlE7pc");

interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface RouteParams {
  selectedLocation?: {
    title: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

const { height, width } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DEFAULT_LOCATION = {
  name: "",
  address: "",
  latitude: 17.4344,  // Hyderabad coordinates
  longitude: 78.3866
};

const AddNewLocationScreen: React.FC = () => {
  const route = useRoute();
  const { selectedLocation } = route.params as RouteParams || {};
  const navigation = useNavigation() as any;
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState<Location>({
    name: selectedLocation?.title || '',
    address: selectedLocation?.address || '',
    latitude: selectedLocation?.latitude || DEFAULT_LOCATION.latitude,
    longitude: selectedLocation?.longitude || DEFAULT_LOCATION.longitude,
  });
  const [placeName, setPlaceName] = useState('');
  const [tag, setTag] = useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      return true;
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location to show it on the map.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0]?.formatted_address || '';
      setLocation(prev => ({ ...prev, address }));
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      Alert.alert('Error', 'Failed to get address for selected location');
    }
  };
  
  const handleMarkerDrag = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation(prev => ({ ...prev, latitude, longitude }));
    reverseGeocode(latitude, longitude);
  };
  
  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation(prev => ({ ...prev, latitude, longitude }));
    reverseGeocode(latitude, longitude);
  };

  const handleCurrentLocation = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      const { latitude, longitude } = location;
      setLocation(prev => ({ ...prev, latitude, longitude }));
      reverseGeocode(latitude, longitude);
      
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }, 1000);
      }
    } catch (error:any) {
      console.error('Get location error:', error);
      let errorMessage = 'Unable to get current location.';
      
      if (error.code === 'CANCELLED') {
        errorMessage = 'Location permission denied.';
      } else if (error.code === 'UNAVAILABLE') {
        errorMessage = 'Location service is disabled or unavailable.';
      } else if (error.code === 'TIMEOUT') {
        errorMessage = 'Location request timed out.';
      }

      Alert.alert('Error', errorMessage);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      setLocation({
        name: selectedLocation.title || 'Current Location',
        address: selectedLocation.address || 'Address not available',
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }, 1000);
      }
    } else {
      handleCurrentLocation();
    }
  }, [selectedLocation]);

  const handleSaveAddress = async () => {
    if (!location.address.trim()) {
      Alert.alert('Error', 'Please enter an address');
      return;
    }


    const locationValue = {
      name: location.name,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      tag: tag,
      addressName:placeName
    };

    console.log('Location Value:', locationValue);
  
    try {
      await foodService.createLocation(locationValue);
      console.log('Location saved successfully');
      navigation.navigate("MainTabs")
    } catch (error) {
      console.error('Error saving location:', error);
      // Alert.alert(
      //   'Error',
      //   'Failed to save location. Please try again.'
      // );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR LOCATION</Text>
      </View>
      
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_DEFAULT}
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onPress={handleMapPress}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            draggable
            onDragEnd={handleMarkerDrag}
          />
        </MapView>
        <TouchableOpacity 
          style={styles.currentLocationButton} 
          onPress={handleCurrentLocation}
        >
          <Icon name="locate" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSheet}>
      <Text style={styles.inputLabel}>Your Location</Text>
        <View style={styles.locationContainer}>
          <Text numberOfLines={1}  style={styles.locationText}>{location.address || 'Hyderabad, Telangana, India'}</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("LocationDetails")} style={styles.changeButton}>
            <Text style={styles.changeButtonText}>CHANGE</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.inputLabel}>Address</Text>
        <TextInput
          style={styles.input}
          value={placeName}
          onChangeText={(text) => setPlaceName(text)}
          placeholder="Address"
          placeholderTextColor={colors.black}
        />
        
        <Text style={styles.inputLabel}>Tag</Text>
        <TextInput
          style={styles.input}
          value={tag}
          onChangeText={setTag}
          placeholder="E.g. HOME, WORK"
          placeholderTextColor={colors.black}
        />
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
          <Text style={styles.saveButtonText}>SAVE ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    ...globalStyles.subtitle,
    flex: 1,
    textAlign: 'center',
  },
  mapContainer: {
    height: height * 0.4,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    ...globalStyles.text,
    fontWeight: 'normal',
    flex: 1,
    color:colors.black
  },
  changeButton: {
    paddingHorizontal: 10,
  },
  changeButtonText: {
    ...globalStyles.text,
    color: colors.primary,
    fontWeight: 'bold',
  },
  inputLabel: {
    ...globalStyles.text,
    fontWeight: 'normal',
    marginBottom: 5,
    textTransform:'uppercase',
    color:colors.black
  },
  input: {
    ...globalStyles.input,
    marginBottom: 20,
  },
  saveButton: {
    ...globalStyles.button,
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    ...globalStyles.buttonText,
    fontWeight: 'bold',
  },
});

export default AddNewLocationScreen;