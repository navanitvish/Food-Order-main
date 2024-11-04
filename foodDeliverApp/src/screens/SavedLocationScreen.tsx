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
  ActivityIndicator,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import GetLocation from 'react-native-get-location';
import {useNavigation, useRoute} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {getToken} from '../api/services/foodService';

interface SavedAddress {
  _id: string;
  address: string;
  tag?: string;
  location: {
    type: string;
    coordinates: number[];
  };
  isCurrent?: boolean;
  userId?: string;
}

const GOOGLE_PLACES_API_KEY = 'AIzaSyD125GPaw_9Nq5NmqW5BlMKrkbUXWlE7pc';

const colors = {
  primary: '#006D5B',
  black: '#000000',
  white: '#FFFFFF',
  lightGray: '#E5E5E5',
  darkGray: '#666666',
  bgGray: '#F5F5F5',
  red: '#FF0000',
};

const SavedLocationDetails: React.FC = () => {
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigation = useNavigation() as any;
  
  useEffect(() => {
    loadUserProfile();
    setupNetworkListener();
    loadSavedAddresses();
  }, []);

  const setupNetworkListener = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? true);
    });
    return () => unsubscribe();
  };

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(
        'http://192.168.1.40:4578/api/user/profile',
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.data.success) {
        setUserProfile(response.data.data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSavedAddresses = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(
        'http://192.168.1.40:4578/api/location',
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.data.success) {
        setSavedAddresses(response.data.data);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = async (address: SavedAddress) => {
    try {
      setLoading(true);
      const token = await getToken();

      const updateData = {
        address: address.address,
        location: address.location,
        tag: address.tag || '',
      };

      const response = await axios.put(
        'http://192.168.1.40:4578/api/user/update-user',
        updateData,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.data.success) {
        await loadUserProfile();
        Alert.alert('Success', 'Address updated successfully');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      Alert.alert('Error', 'Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      const token = await getToken();
      const response = await axios.delete(
        `http://192.168.1.40:4578/api/location/${addressId}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.data.success) {
        await loadSavedAddresses();
        Alert.alert('Success', 'Address deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      Alert.alert('Error', 'Failed to delete address');
    }
  };

  const isSelectedAddress = (address: SavedAddress) => {
    return (
      userProfile?.location?.coordinates[0] === address.location.coordinates[0] &&
      userProfile?.location?.coordinates[1] === address.location.coordinates[1] &&
      userProfile?.address === address.address
    );
  };

  const renderActionIcon = (address: SavedAddress) => {
    const isSelected = isSelectedAddress(address);
    
    if (isSelected) {
      return (
        <View style={styles.iconContainer}>
          <Icon name="checkmark-circle" size={24} color={colors.primary} />
        </View>
      );
    }
    
    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handleDeleteAddress(address._id)}>
        <Icon name="trash-outline" size={20} color={colors.red} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MANAGE ADDRESS</Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.goBack()}>
          <Icon name="home-outline" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.addressList}>
        {loading ? (
          <ActivityIndicator style={styles.loader} color={colors.primary} />
        ) : (
          savedAddresses.map((address) => (
            <View key={address._id} style={styles.addressCard}>
              <TouchableOpacity
                style={styles.addressContent}
                onPress={() => handleAddressSelect(address)}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressTag}>{address.tag || 'Address'}</Text>
                </View>
                <Text style={styles.addressText}>{address.address}</Text>
              </TouchableOpacity>
              {renderActionIcon(address)}
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('LocationDetails')}>
        <Text style={styles.addButtonText}>NEW ADDRESS</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    padding: 4,
  },
  homeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  addressList: {
    flex: 1,
    padding: 16,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 16,
    alignItems: 'center',
  },
  addressContent: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressTag: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  addressText: {
    fontSize: 14,
    color: colors.darkGray,
    lineHeight: 20,
  },
  iconContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
});

export default SavedLocationDetails;