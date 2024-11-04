import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location';
import {useNavigation, useRoute} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {getToken} from '../api/services/foodService';
import {create} from 'lodash';
import {colors} from '../styles/globalStyles';
import SpinnerLoader from '../components/common/SppinerLoader';

interface SavedAddress {
  _id: string; // Changed from id to _id to match API response
  title: string;
  address: string;
  location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  isSelected?: boolean;
  createdAt?: string;
  updatedAt?: string;
  tag: string;
  addressName: string;
}

interface UserProfile {
  _id: string;
  address: string;
  location: {
    type: string;
    coordinates: number[];
  };
  // ... other profile fields
}

interface SelectedLocation {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}

const GOOGLE_PLACES_API_KEY = 'AIzaSyD125GPaw_9Nq5NmqW5BlMKrkbUXWlE7pc';

const colorsLoaction = {
  primary: '#007AFF',
  black: '#000000',
  white: '#FFFFFF',
  lightGray: '#E5E5E5',
  darkGray: '#666666',
  bgGray: '#F5F5F5',
};

const LocationDetails: React.FC = () => {
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);

  console.log(savedAddresses, 'savedAddresses');
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigation = useNavigation() as any;
  const route = useRoute() as any;
  console.log(route, 'parrrrramas');

  useEffect(() => {
    loadUserProfile();
    setupNetworkListener();
    loadUserProfile();
    setupLocationConfiguration();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const config = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.get(
        'http://192.168.1.40:4578/api/user/profile',
        config,
      );

      if (response.data.success) {
        const profileData = response.data.data;
        setUserProfile(profileData);

        // Transform the profile location into a saved address format
        if (profileData.location && profileData.address) {
          const userLocation = {
            _id: profileData._id,
            address: profileData.address,
            location: {
              type: profileData.location.type,
              coordinates: profileData.location.coordinates,
            },
            isSelected: true,
            createdAt: profileData.createdAt,
            updatedAt: profileData.updatedAt,
            tag: profileData?.tag,
            addressName: profileData?.addressName,
          };

          // Load and update saved addresses
          const addresses = await loadSavedAddresses();
          const updatedAddresses = addresses.map((addr: SavedAddress) => ({
            ...addr,
            isSelected: addr._id === profileData._id,
          }));

          // Add user's location if not already present
          if (!updatedAddresses.some(addr => addr._id === userLocation._id)) {
            updatedAddresses.push(userLocation);
          }

          setSavedAddresses(updatedAddresses);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Profile loading error:', error);
        Alert.alert('Error', 'Failed to load user profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const setupNetworkListener = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? true);
    });
    return () => unsubscribe();
  };

  const setupLocationConfiguration = () => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'whenInUse',
      locationProvider: 'auto',
    });
  };

  const loadSavedAddresses = async () => {
    try {
      const token = await getToken();

      const config = {
        timeout: 30000,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.get(
        'http://192.168.1.40:4578/api/location',
        config,
      );

      if (response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error loading saved addresses:', error);
      return [];
    }
  };

  const handleAddressSelect = async (address: SavedAddress) => {
    try {
      setLoading(true);
      const token = await getToken();

      // Update UI first
      const updatedAddresses = savedAddresses.map(addr => ({
        ...addr,
        isSelected: addr._id === address._id,
      }));
      setSavedAddresses(updatedAddresses);

      // Prepare update data matching API format
      const updateData = {
        address: address.address,
        location: {
          type: 'Point',
          coordinates: address.location.coordinates, // Already in [longitude, latitude] format
        },
        tag: address.tag,
      };

      const response = await axios.put(
        'http://192.168.1.40:4578/api/user/update-user',
        updateData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.success) {
        // await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAddresses));
        console.log('Address updated successfully');
        navigation.navigate('MainTabs');
      } else {
        throw new Error(
          response.data.message || 'Failed to update user profile',
        );
      }
    } catch (error) {
      console.error('Error selecting address:', error);
      Alert.alert('Error', 'Failed to update your address. Please try again.');
      await loadUserProfile(); // Reload profile to ensure correct state
    } finally {
      setLoading(false);
      navigation.navigate('MainTabs');
    }
  };

  const getCurrentLocation = async () => {
    if (!isOnline) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
      );
      return;
    }

    try {
      setLocationLoading(true);

      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 20000,
      });

      console.log('Location obtained:', location);

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_PLACES_API_KEY}`,
        );

        if (!response.ok) throw new Error('Geocoding failed');

        const data = await response.json();
        let address = 'Address not found';
        if (data.results && data.results.length > 0) {
          address = data.results[0].formatted_address;
        }

        const currentLocation = {
          title: 'Current Location',
          address: address,
          latitude: location.latitude,
          longitude: location.longitude,
        };

        navigation.navigate('Location', {
          selectedLocation: currentLocation,
        });
      } catch (error) {
        console.error('Geocoding error:', error);
        Alert.alert(
          'Error',
          'Failed to get address details. Please try again.',
          [{text: 'OK'}],
        );
      }
    } catch (error: any) {
      console.error('Get location error:', error);

      let errorMessage = 'Unable to get current location.';

      if (error.code === 'CANCELLED') {
        errorMessage = 'Location permission denied.';
      } else if (error.code === 'UNAVAILABLE') {
        errorMessage = 'Location service is disabled or unavailable.';
      } else if (error.code === 'TIMEOUT') {
        errorMessage = 'Location request timed out.';
      }

      Alert.alert('Location Error', errorMessage, [
        {text: 'Open Settings', onPress: () => Linking.openSettings()},
        {text: 'Cancel', style: 'cancel'},
      ]);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleGooglePlaceSelect = (data: any, details: any = null) => {
    if (!isOnline) {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
      );
      return;
    }

    if (details?.geometry?.location) {
      const selectedLocation: SelectedLocation = {
        title: data.structured_formatting?.main_text || data.description,
        address: data.description,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      };

      navigation.navigate('Location', {
        selectedLocation: selectedLocation,
      });
    }
  };

  if (!isOnline) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.offlineContainer}>
          <Icon name="cloud-offline" size={48} color={colors.darkGray} />
          <Text style={styles.offlineText}>No Internet Connection</Text>
          <Text style={styles.offlineSubtext}>
            Please check your connection and try again
          </Text>
        </View>
        <View>
          {/* <Icon name="cloud-offline" size={48} color={colors.darkGray} /> */}
          <Text>No Internet Connection</Text>
          <Text>Please check your connection and try again</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderSavedAddresses = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <SpinnerLoader />
        </View>
      );
    }

    if (savedAddresses.length === 0) {
      return <Text style={styles.noAddressText}>No saved addresses</Text>;
    }

    // Create a Map to store unique coordinates
    const uniqueAddresses = new Map();

    // Filter addresses to keep only the most recent entry for each coordinate pair
    savedAddresses
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      )
      .forEach(address => {
        const coordKey = address.location.coordinates.join(',');
        if (!uniqueAddresses.has(coordKey)) {
          uniqueAddresses.set(coordKey, address);
        }
      });

    // Convert Map values back to array and render
    return Array.from(uniqueAddresses.values()).map(address => (
      <TouchableOpacity
        key={address._id}
        style={[
          styles.addressCard,
          address.isSelected && styles.selectedAddressCard,
        ]}
        onPress={() => handleAddressSelect(address)}>
        <View style={styles.addressContent}>
          <Text style={{color: colors.black}}>{address?.tag}</Text>
          <Text
            style={[
              styles.addressTitle,
              address.isSelected && styles.selectedText,
            ]}>
            {address.title}
          </Text>
          <Text
            style={[
              styles.addressText,
              address.isSelected && styles.selectedSubText,
            ]}>
            {address.address}
          </Text>
        </View>
        {address.isSelected && (
          <View style={styles.checkmarkContainer}>
            <Icon name="checkmark-circle" size={24} color={colors.primary} />
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select your location</Text>
      </View>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search your area..."
          onPress={handleGooglePlaceSelect}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.searchInput,
            description: styles.autocompleteDescription,
            color: colors.black,
          }}
          enablePoweredByContainer={false}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.currentLocationButton,
          locationLoading && styles.currentLocationButtonDisabled,
        ]}
        onPress={getCurrentLocation}
        disabled={locationLoading}>
        {locationLoading ? (
          <ActivityIndicator size="small" color={colorsLoaction.primary} />
        ) : (
          <Icon name="locate" size={24} color={colorsLoaction.primary} />
        )}
        <View style={styles.currentLocationText}>
          <Text style={styles.useCurrentLocation}>
            {locationLoading ? 'Getting location...' : 'Use current location'}
          </Text>
          <Text style={styles.locationDescription}>
            Using Device Location ensures accurate address
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.savedAddressesContainer}>
        <Text style={styles.savedAddressesTitle}>Saved Addresses</Text>
        <ScrollView style={styles.addressList}>
          {renderSavedAddresses()}
        </ScrollView>
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
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  autocompleteContainer: {
    flex: 0,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  autocompleteDescription: {
    fontSize: 14,
    color: colors.black,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  currentLocationButtonDisabled: {
    opacity: 0.7,
  },
  currentLocationText: {
    marginLeft: 12,
    flex: 1,
  },
  useCurrentLocation: {
    fontSize: 16,
    color: colorsLoaction.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: colors.darkGray,
  },
  savedAddressesContainer: {
    flex: 1,
    backgroundColor: colors.bgGray,
    paddingTop: 16,
  },
  savedAddressesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  addressList: {
    flex: 1,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },

  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: colors.darkGray,
  },
  noAddressText: {
    textAlign: 'center',
    padding: 16,
    color: colors.darkGray,
  },

  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAddressCard: {
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressContent: {
    flex: 1,
    marginRight: 8,
  },
  checkmarkContainer: {
    width: 24,
    alignItems: 'center',
  },
  selectedText: {
    color: colors.primary,
    fontWeight: '600',
    textTransform:'capitalize'
  },
  selectedSubText: {
    color: '#666',
    textTransform:'capitalize'
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    marginBottom: -20,
    textTransform: 'capitalize',
  },
  addressText: {
    fontSize: 14,
    color: colors.darkGray,
    lineHeight: 20,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgGray,
    padding: 20,
  },
  offlineText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.darkGray,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  offlineSubtext: {
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});

export default LocationDetails;
